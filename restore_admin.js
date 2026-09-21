const fs = require('fs');

const mappings = [
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\page.tsx","LineNumber":13,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\page.tsx","LineNumber":18,"LineContent":"    aboutImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a1c35946-1769214275939.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":16,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":41,"LineContent":"    empImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_111288e54-1776866345849.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":47,"LineContent":"    candImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_11c2c4670-1778965269126.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":56,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_11c1d13fc-1785550297802.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":62,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_1c3494f48-1772541068284.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":68,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_198a71793-1773232115350.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":74,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_10c945f5d-1784580521819.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":80,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_1120d767b-1786319157185.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":86,"LineContent":"        img: \"https://img.rocket.new/generatedImages/rocket_gen_img_1cc420a95-1772191564593.png\","},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\home\\page.tsx","LineNumber":105,"LineContent":"    compImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_15caab975-1776993510521.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\services\\page.tsx","LineNumber":14,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b79077ab-1767420515885.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\employers\\page.tsx","LineNumber":15,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_133b1e7cf-1768750078214.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\contact\\page.tsx","LineNumber":14,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\candidates\\page.tsx","LineNumber":15,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_148b9b9ca-1786125102528.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\about\\page.tsx","LineNumber":15,"LineContent":"    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_180e0c8b0-1768822557344.png',"},
  {"File":"c:\\Users\\MALLESWARI\\OneDrive\\Desktop\\jkstaffing\\jkstaffing\\src\\app\\admin\\(dashboard)\\about\\page.tsx","LineNumber":20,"LineContent":"    storyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d516d798-1768437649458.png',"}
];

// Group by file
const files = {};
for (const m of mappings) {
  if (!files[m.File]) files[m.File] = [];
  files[m.File].push(m);
}

for (const filepath in files) {
  let content = fs.readFileSync(filepath, 'utf8');
  let lines = content.split('\n');
  
  for (const m of files[filepath]) {
    lines[m.LineNumber - 1] = m.LineContent;
  }
  
  fs.writeFileSync(filepath, lines.join('\n'));
  console.log('Restored admin urls in', filepath);
}
