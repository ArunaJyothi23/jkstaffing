const fs = require('fs');

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

  // Fix import
  content = content.replace(/import\s+\{\s*getDocument\s*\}\s+from\s+['"]@\/lib\/firebase\/db['"];/, "import { subscribeDocument } from '@/lib/firebase/db';");
  content = content.replace(/import\s+\{\s*getCollection,\s*getDocument\s*\}\s+from\s+['"]@\/lib\/firebase\/db['"];/, "import { getCollection, subscribeDocument } from '@/lib/firebase/db';");

  // Regex to match the entire fetchContent definition up to its call
  // This matches:
  // 1. `const fetchContent = async () => {` OR `async function fetchContent() {`
  // 2. Anything until `const doc = await getDocument('site_content', 'xyz');`
  // 3. Extract the ID `xyz`
  // 4. Extract the body after `const doc ...` until the `} catch`
  // 5. Extract the catch block until `fetchContent();`
  
  const regex = /(?:const\s+fetchContent\s*=\s*async\s*\(\)\s*=>|async\s+function\s+fetchContent\(\))\s*\{\s*try\s*\{\s*const\s+doc\s*=\s*await\s+getDocument\('site_content',\s*'([^']+)'\);([\s\S]*?)\}\s*catch\s*\(([^)]+)\)\s*\{([\s\S]*?)\}\s*\};?\s*fetchContent\(\);/g;

  content = content.replace(regex, (match, docId, tryBody, errVar, catchBody) => {
    return `const unsubscribe = subscribeDocument('site_content', '${docId}', (doc) => {
      try {${tryBody}} catch (${errVar}) {${catchBody}}
    });`;
  });

  // Handle cleanup
  if (content.includes("unsubscribe = subscribeDocument")) {
    if (content.includes("return () => observer?.disconnect();")) {
      content = content.replace(/return\s+\(\)\s*=>\s*observer\??\.disconnect\(\);/, "return () => { observer?.disconnect(); unsubscribe(); };");
    } else if (content.includes("return () => observer.disconnect();")) {
      content = content.replace(/return\s+\(\)\s*=>\s*observer\.disconnect\(\);/, "return () => { observer.disconnect(); unsubscribe(); };");
    } else {
      // Find the closing of the useEffect containing unsubscribe
      content = content.replace(/(\s*\}\);)(\s*\}\,\s*\[\]\);)/g, "$1\n    return () => unsubscribe();$2");
    }
  }

  fs.writeFileSync(file, content);
});

console.log("Done refactoring.");
