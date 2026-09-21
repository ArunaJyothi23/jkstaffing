const fs = require('fs');
const path = require('path');

const placeholders = [
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2064&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
];

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

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
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('img.rocket.new')) {
    content = content.replace(/https:\/\/img\.rocket\.new[a-zA-Z0-9_\-\/\.]+/g, (match) => {
      const index = getHash(match) % placeholders.length;
      return placeholders[index];
    });
    fs.writeFileSync(file, content);
    console.log('Replaced in', file);
  }
}
