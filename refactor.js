const fs = require('fs');
const path = require('path');

const files = [
  'src/app/services/components/ServicesHero.tsx',
  'src/app/services/components/ServicesDetail.tsx',
  'src/app/services/components/ServicesCTA.tsx',
  'src/app/for-employers/components/EmployerProcess.tsx',
  'src/app/for-employers/components/RequestStaffForm.tsx',
  'src/app/for-employers/components/EmployerHero.tsx',
  'src/app/for-candidates/components/CandidateHero.tsx',
  'src/app/for-candidates/components/JobSearch.tsx',
  'src/app/for-candidates/components/SubmitCVForm.tsx',
  'src/app/components/AboutPreview.tsx',
  'src/app/components/AudienceCTA.tsx',
  'src/app/contact/components/ContactHero.tsx',
  'src/app/components/ComplianceSection.tsx',
  'src/app/components/TrustStrip.tsx',
  'src/app/components/ObjectivesSection.tsx',
  'src/app/components/IndustriesSection.tsx',
  'src/app/components/CoreValues.tsx',
  'src/app/contact/components/ContactForm.tsx',
  'src/app/components/HomeCTA.tsx',
  'src/app/about/components/AboutValues.tsx',
  'src/app/about/components/AboutObjectives.tsx',
  'src/app/about/components/AboutStory.tsx',
  'src/app/about/components/AboutHero.tsx',
  'src/app/about/components/AboutAim.tsx',
  'src/app/about/components/AboutCompliance.tsx',
  'src/components/Footer.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix import if it was messed up by the previous run
  if (content.includes("import { subscribeDocument } from '@/lib/firebase/db';") || content.includes("import { getDocument } from '@/lib/firebase/db';") || content.includes("import { getCollection, getDocument } from '@/lib/firebase/db';")) {
    content = content.replace(/import\s+\{\s*getDocument\s*\}\s+from\s+['"]@\/lib\/firebase\/db['"];/, "import { subscribeDocument } from '@/lib/firebase/db';");
    content = content.replace(/import\s+\{\s*subscribeDocument\s*\}\s+from\s+['"]@\/lib\/firebase\/db['"];/, "import { subscribeDocument } from '@/lib/firebase/db';");
    content = content.replace(/import\s+\{\s*getCollection,\s*getDocument\s*\}\s+from\s+['"]@\/lib\/firebase\/db['"];/, "import { getCollection, subscribeDocument } from '@/lib/firebase/db';");
    
    // Now let's match the old fetchContent block
    const fetchRegex = /(?:const\s+fetchContent\s*=\s*async\s*\(\)\s*=>|async\s+function\s+fetchContent\(\))\s*\{\s*try\s*\{\s*const\s+doc\s*=\s*await\s+(?:getDocument|subscribeDocument)\('site_content',\s*'([^']+)'\);([\s\S]*?)\}?\s*catch\s*\([^)]+\)\s*\{\s*console\.error\([^)]+\);\s*\}\s*\};?\s*fetchContent\(\);/g;

    content = content.replace(fetchRegex, (match, docId, tryBody) => {
      // Find the if statement inside tryBody
      // e.g. "if (doc?.trustItemsList) { setContent(prev => ({ ...prev, trustItemsList: doc.trustItemsList })); }"
      // Or "if (doc) { setContent(prev => ({ ...prev, ...doc })); }"
      const ifMatch = tryBody.match(/if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}/);
      
      let condition = "doc";
      let innerContent = "setContent(prev => ({ ...prev, ...doc }));";
      
      if (ifMatch) {
         condition = ifMatch[1];
         innerContent = ifMatch[2].trim();
      } else {
         // Some components might just do `setJobs(data)` before this, but our regex matches tryBody after getDocument.
         // Let's assume innerContent is just `setContent({ ...doc })`
      }
      
      return `const unsubscribe = subscribeDocument('site_content', '${docId}', (doc) => {
      if (${condition}) {
        ${innerContent}
      }
    });`;
    });
    
    // Now fix the cleanup
    if (content.includes("unsubscribe")) {
      // Check if it already has cleanup for observer
      if (content.includes("return () => observer?.disconnect();")) {
        content = content.replace(/return\s+\(\)\s*=>\s*observer\??\.disconnect\(\);/, "return () => { observer?.disconnect(); unsubscribe(); };");
      } else if (content.includes("return () => observer.disconnect();")) {
        content = content.replace(/return\s+\(\)\s*=>\s*observer\.disconnect\(\);/, "return () => { observer.disconnect(); unsubscribe(); };");
      } else if (!content.includes("return () => unsubscribe();") && !content.includes("unsubscribe(); };")) {
        // Find the end of useEffect where unsubscribe is defined
        content = content.replace(/(\s*\}\);)(\s*\}\,\s*\[\]\);)/g, "$1\n    return () => unsubscribe();$2");
      }
    }
  }

  fs.writeFileSync(file, content);
});

console.log("Done");
