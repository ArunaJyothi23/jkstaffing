const fs = require('fs');

const files = [
  'src/app/for-candidates/components/CandidateHero.tsx',
  'src/app/for-candidates/components/SubmitCVForm.tsx',
  'src/app/for-employers/components/EmployerHero.tsx',
  'src/app/for-employers/components/RequestStaffForm.tsx',
  'src/app/contact/components/ContactHero.tsx',
  'src/app/contact/components/ContactForm.tsx',
  'src/app/about/components/AboutStory.tsx'
];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes('import { subscribeDocument }')) {
    code = code.replace(/'use client';\n/, "'use client';\nimport { subscribeDocument } from '@/lib/firebase/db';\n");
    fs.writeFileSync(file, code);
    console.log('Fixed import in', file);
  }
});
