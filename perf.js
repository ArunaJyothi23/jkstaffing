const fs = require('fs');
const path = require('path');

// 1. Optimize Admin Pages (Remove blocking loading state)
const adminDir = 'src/app/admin/(dashboard)';
const getFilesRecursively = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(getFilesRecursively(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const adminFiles = getFilesRecursively(adminDir).filter(f => f.endsWith('.tsx'));
adminFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('if (loading) return')) {
        content = content.replace(/if\s*\(loading\)\s*return\s*<div[^>]*>Loading\.\.\.<\/div>;/g, '');
        // Also remove `setLoading(true)` or `const [loading, setLoading] = useState(true);` if possible, but just removing the block is enough for instant paint
        fs.writeFileSync(file, content);
        console.log('Optimized load time for:', file);
    }
});

// 2. We can also add subscribeDocument to key frontend components manually
const addSubscribeToComponent = (file, docName, stateDefaults) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already has subscribeDocument
    if (content.includes('subscribeDocument')) return;

    // Add import
    if (content.includes('import { subscribeDocument }')) {
        // already imported
    } else if (content.includes('@/lib/firebase/db')) {
        content = content.replace(/import {([^}]+)} from '@\/lib\/firebase\/db';/, 'import { $1, subscribeDocument } from \'@/lib/firebase/db\';');
    } else {
        content = content.replace(/(import React.*?;\n)/, '$1import { subscribeDocument } from \'@/lib/firebase/db\';\n');
    }
    
    // Ensure useState is imported
    if (!content.includes('useState')) {
        content = content.replace(/import React, {([^}]+)} from 'react';/, 'import React, { $1, useState } from \'react\';');
    }

    // Add state right after component declaration
    const compMatch = content.match(/export default function [^\(]+\(\) \{\n/);
    if (compMatch) {
        const stateStr = `  const [content, setContent] = useState(${JSON.stringify(stateDefaults, null, 4)});\n`;
        content = content.replace(compMatch[0], compMatch[0] + stateStr);
    }

    // Add subscribeDocument inside useEffect
    const useEffectMatch = content.match(/useEffect\(\(\) => {([^]+?)return \(\) =>/);
    if (useEffectMatch) {
        const subStr = `\n    const unsubscribe = subscribeDocument('site_content', '${docName}', (doc) => {\n      if (doc) setContent(prev => ({ ...prev, ...doc }));\n    });\n    `;
        
        // update return statement to include unsubscribe
        const returnMatch = content.match(/return \(\) => ([^\n;]+;?)/);
        if (returnMatch) {
            const cleanup = returnMatch[1].endsWith(';') ? returnMatch[1] : returnMatch[1] + ';';
            content = content.replace(returnMatch[0], `return () => {\n      ${cleanup}\n      unsubscribe();\n    };`);
            
            // Insert subStr before return
            content = content.replace(/return \(\) => \{/, subStr + '\n    return () => {');
        }
    }

    // Now, doing replacements for stateDefaults keys in the JSX
    // This is hard to do safely via string replacement without AST, but we can do it for obvious ones.
    // For simplicity, we will output the file and log that it needs manual JSX update.
    fs.writeFileSync(file, content);
    console.log('Added subscribe hook to:', file);
}

// Just doing the optimization for now
