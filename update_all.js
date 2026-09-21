const fs = require('fs');

const tasks = [
  {
    file: 'src/app/for-candidates/components/CandidateHero.tsx',
    docName: 'candidates_page',
    defaults: {
      heroTitle: 'Find Your Next Opportunity',
      heroText: 'We help individuals identify employment opportunities that match their skills, experience and career goals. Explore roles across multiple sectors throughout the UK.',
      heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_148b9b9ca-1786125102528.png',
    },
    replacements: [
      ['Find Your Next Opportunity', '{content.heroTitle}'],
      ['We help individuals identify employment opportunities that match their skills, experience and career goals. Explore roles across multiple sectors throughout the UK.', '{content.heroText}'],
      ['src="https://img.rocket.new/generatedImages/rocket_gen_img_18f673196-1777085736780.png"', 'src={content.heroImage}']
    ]
  },
  {
    file: 'src/app/for-candidates/components/SubmitCVForm.tsx',
    docName: 'candidates_page',
    defaults: {
      formTitle: 'Submit Your CV',
      formText: 'Register your details and upload your CV. We will review your profile and contact you when a suitable opportunity becomes available.',
    },
    replacements: [
      ['Submit Your CV', '{content.formTitle}'],
      ['Register your details and upload your CV. We will review your profile and contact you when a suitable opportunity becomes available.', '{content.formText}']
    ]
  },
  {
    file: 'src/app/for-employers/components/EmployerHero.tsx',
    docName: 'employers_page',
    defaults: {
      heroTitle: 'Reliable Staffing for Your Business',
      heroText: 'We provide temporary, permanent, and contract staff across multiple sectors, ensuring your operational needs are met with compliance-verified candidates.',
      heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_17e3be970-1785507727763.png',
    },
    replacements: [
      ['Reliable Staffing for Your Business', '{content.heroTitle}'],
      ['We provide temporary, permanent, and contract staff across multiple sectors, ensuring your operational needs are met with compliance-verified candidates.', '{content.heroText}'],
      ['src="https://img.rocket.new/generatedImages/rocket_gen_img_10b100985-1772186536069.png"', 'src={content.heroImage}']
    ]
  },
  {
    file: 'src/app/for-employers/components/RequestStaffForm.tsx',
    docName: 'employers_page',
    defaults: {
      formTitle: 'Request Staff',
      formText: 'Tell us about your staffing requirements and a member of our team will contact you to discuss how we can help.',
    },
    replacements: [
      ['>Request Staff<', '>{content.formTitle}<'],
      ['Tell us about your staffing requirements and a member of our team will contact you to discuss how we can help.', '{content.formText}']
    ]
  },
  {
    file: 'src/app/contact/components/ContactHero.tsx',
    docName: 'contact_page',
    defaults: {
      heroTitle: 'Get in Touch',
      heroText: 'Whether you are an employer looking for reliable staff or a candidate seeking your next opportunity, we are here to help.',
      heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bdca183f-1783457597561.png',
    },
    replacements: [
      ['>Get in Touch<', '>{content.heroTitle}<'],
      ['Whether you are an employer looking for reliable staff or a candidate seeking your next opportunity, we are here to help.', '{content.heroText}'],
      ['src="https://img.rocket.new/generatedImages/rocket_gen_img_16e6d1839-1782012586071.png"', 'src={content.heroImage}']
    ]
  },
  {
    file: 'src/app/contact/components/ContactForm.tsx',
    docName: 'contact_page',
    defaults: {
      formTitle: 'Send us a Message',
      formText: 'Fill out the form below and we will get back to you as soon as possible.',
      officeAddress: '123 Business Center, London, UK',
      officePhone: '+44 (0) 20 1234 5678',
      officeEmail: 'info@jkstaffing.co.uk'
    },
    replacements: [
      ['>Send us a Message<', '>{content.formTitle}<'],
      ['Fill out the form below and we will get back to you as soon as possible.', '{content.formText}'],
      ['123 Business Center, London, UK', '{content.officeAddress}'],
      ['+44 (0) 20 1234 5678', '{content.officePhone}'],
      ['info@jkstaffing.co.uk', '{content.officeEmail}']
    ]
  },
  {
    file: 'src/app/about/components/AboutStory.tsx',
    docName: 'about_page',
    defaults: {
      storyTitle: 'A UK Workforce Agency Built on Trust',
      storyText1: 'JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.',
      storyText2: 'Since our establishment in April 2021, we have built our reputation on responsiveness, compliance, and genuine understanding of our clients and candidates needs.',
      storyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d516d798-1768437649458.png'
    },
    replacements: [
      ['>A UK Workforce Agency Built on Trust<', '>{content.storyTitle}<'],
      ['JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.', '{content.storyText1}'],
      ['Since our establishment in April 2021, we have built our reputation on responsiveness, compliance, and genuine understanding of our clients and candidates needs.', '{content.storyText2}'],
      ['src="https://img.rocket.new/generatedImages/rocket_gen_img_1615fba39-1780517565313.png"', 'src={content.storyImage}']
    ]
  }
];

tasks.forEach(task => {
  if (!fs.existsSync(task.file)) {
    console.log('Skipping (not found):', task.file);
    return;
  }
  let code = fs.readFileSync(task.file, 'utf8');

  // Skip if already has subscribeDocument
  if (code.includes('subscribeDocument')) {
    console.log('Already dynamic:', task.file);
    return;
  }

  // 1. Add import
  if (code.includes('@/lib/firebase/db')) {
    code = code.replace(/import {([^}]+)} from '@\/lib\/firebase\/db';/, 'import { $1, subscribeDocument } from \'@/lib/firebase/db\';');
  } else {
    code = code.replace(/(import React.*?;\n)/, '$1import { subscribeDocument } from \'@/lib/firebase/db\';\n');
  }

  // 2. Add useState
  if (!code.includes('useState')) {
    if (code.includes('import React from')) {
        code = code.replace(/import React from 'react';/, 'import React, { useState, useEffect } from \'react\';');
    } else {
        code = code.replace(/import React, {([^}]+)} from 'react';/, 'import React, { $1, useState, useEffect } from \'react\';');
    }
  } else if (!code.includes('useEffect')) {
     code = code.replace(/useState([^}]*)} from 'react';/, 'useState$1, useEffect } from \'react\';');
  }

  // 3. Inject state
  const compMatch = code.match(/export default function [^\(]+\([^)]*\) \{\n/);
  if (compMatch) {
    const stateStr = `  const [content, setContent] = useState(${JSON.stringify(task.defaults, null, 4)});\n`;
    code = code.replace(compMatch[0], compMatch[0] + stateStr);
  }

  // 4. Inject useEffect hook
  // Find where to put it - usually before return
  const returnMatch = code.match(/\n  return \(/);
  if (returnMatch) {
    const hook = `
  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', '${task.docName}', (doc) => {
      if (doc) setContent(prev => ({ ...prev, ...doc }));
    });
    return () => unsubscribe();
  }, []);
`;
    code = code.replace(returnMatch[0], hook + returnMatch[0]);
  }

  // 5. Replace text
  task.replacements.forEach(([search, replace]) => {
    code = code.replace(search, replace);
  });

  fs.writeFileSync(task.file, code);
  console.log('Made dynamic:', task.file);
});
