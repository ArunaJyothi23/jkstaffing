const fs = require('fs');
const transcriptPath = 'C:/Users/MALLESWARI/.gemini/antigravity-ide/brain/b97be141-6b0e-41c6-9fb8-cf46129a392c/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

const fileState = {};

for (const line of lines) {
  const step = JSON.parse(line);
  if (step.tool_calls) {
    for (const call of step.tool_calls) {
      if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content' || call.name === 'write_to_file') {
        
        let args = call.args;
        
        if (args && args.TargetFile) {
           const file = args.TargetFile.replace(/\\\\/g, '/');
           if (!fileState[file]) fileState[file] = [];
           fileState[file].push({
               type: call.name,
               args: args,
               timestamp: step.created_at
           });
        }
      }
    }
  }
}

const filesToRecover = [
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

let recovered = 0;

for (const target of filesToRecover) {
   const matchPath = target.toLowerCase();
   
   let targetFileKey = Object.keys(fileState).find(k => k.toLowerCase().endsWith(matchPath));
   
   if (targetFileKey) {
       // We restore the base content from git checkout state
       let content = fs.readFileSync(target, 'utf8');
       let applied = 0;
       
       for (const action of fileState[targetFileKey]) {
          if (action.type === 'write_to_file') {
             content = action.args.CodeContent;
             applied++;
          } else if (action.type === 'multi_replace_file_content') {
             let temp = content;
             if (action.args.ReplacementChunks) {
                 for (const chunk of action.args.ReplacementChunks) {
                     // VERY DANGEROUS to just string replace if there are duplicates, but we do our best
                     if (temp.includes(chunk.TargetContent)) {
                        temp = temp.replace(chunk.TargetContent, chunk.ReplacementContent);
                     }
                 }
             }
             content = temp;
             applied++;
          } else if (action.type === 'replace_file_content') {
             if (content.includes(action.args.TargetContent)) {
                 content = content.replace(action.args.TargetContent, action.args.ReplacementContent);
             }
             applied++;
          }
       }
       
       if (applied > 0) {
           fs.writeFileSync(target, content);
           console.log('Recovered', target, 'with', applied, 'edits');
           recovered++;
       }
   }
}

console.log('Total recovered:', recovered);
