const fs = require('fs');
const transcriptPath = 'C:/Users/MALLESWARI/.gemini/antigravity-ide/brain/b97be141-6b0e-41c6-9fb8-cf46129a392c/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

const fileState = {};

for (const line of lines) {
  const step = JSON.parse(line);
  if (step.tool_calls) {
    for (const call of step.tool_calls) {
      if (call.function?.name === 'default_api:replace_file_content' || call.function?.name === 'default_api:multi_replace_file_content' || call.function?.name === 'default_api:write_to_file') {
        
        let args = null;
        try {
            args = JSON.parse(call.function.arguments);
        } catch(e) {}
        
        if (args && args.TargetFile) {
           const file = args.TargetFile.replace(/\\\\/g, '/');
           if (!fileState[file]) fileState[file] = [];
           fileState[file].push(args);
        }
      }
    }
  }
}

// Reconstruct files
// Since write_to_file overwrites completely, and replace_file_content modifies, it's hard to replay them perfectly without actual code logic.
// But wait! Did the previous agent use write_to_file or replace_file_content?
// If the previous agent used write_to_file, it's easy.
// If it used replace_file_content, we have the TargetContent and ReplacementContent.
// But we actually only need the files to be dynamic. 
// Can we just output the list of files modified and the tool used?
const files = Object.keys(fileState).filter(f => f.includes('src/app') || f.includes('src/components'));

console.log('Modified files count:', files.length);

const edits = files.map(f => {
   return { file: f, count: fileState[f].length, types: fileState[f].map(a => Object.keys(a).includes('ReplacementChunks') ? 'multi' : (Object.keys(a).includes('ReplacementContent') ? 'replace' : 'write')) };
});

console.log(JSON.stringify(edits, null, 2));
