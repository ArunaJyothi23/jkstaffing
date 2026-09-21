const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const files = walkSync(path.join(__dirname, 'src'));

for (const file of files) {
  let currentContent = fs.readFileSync(file, 'utf8');
  if (currentContent.includes('images.unsplash.com')) {
    // Get original file content from git
    try {
      const gitPath = path.relative(__dirname, file).replace(/\\/g, '/');
      const originalContent = execSync(`git show HEAD:"${gitPath}"`).toString();
      
      // Find all rocket URLs in original
      const rocketMatch = originalContent.match(/https:\/\/img\.rocket\.new[a-zA-Z0-9_\-\/\.]+/g);
      
      if (rocketMatch) {
        // Find all unsplash URLs in current
        let i = 0;
        currentContent = currentContent.replace(/https:\/\/images\.unsplash\.com[a-zA-Z0-9_\-\/\.\?\=\&]+/g, (match) => {
          const original = rocketMatch[i] || rocketMatch[0];
          i++;
          return original;
        });
        fs.writeFileSync(file, currentContent);
        console.log('Restored rocket URLs in', file);
      }
    } catch (e) {
      console.log('Failed for', file);
    }
  }
}
