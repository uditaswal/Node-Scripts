//JS script to initialize a vite react project with vanilla javascript and tailwind

//command to execute the script
// node <path> <App Name>
//node '..\..\..\node script\react-tailwind-setup.js' reactapp

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get target project folder from CLI arg
const projectName = process.argv[2];
if (!projectName) {
  console.error('❌ Please provide a project name: node create-vite-tailwind.js my-app');
  process.exit(1);
}


const projectPath = path.join(process.cwd(), projectName);
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath);
}

console.log(`📁 Creating project in: ${projectPath}`);


// Step into the folder
process.chdir(projectPath);

// 1. Create Vite project
console.log(`🚧 Creating Vite + React project in "${projectName}"...`);
execSync('npm create vite@latest . -- --template react', { stdio: 'inherit' });




// 10. Install Tailwind + Plugin
console.log('📦 Installing npm...');
execSync('npm install', { stdio: 'inherit' });


// 1. Install Tailwind + Plugin
console.log('📦 Installing tailwindcss and @tailwindcss/vite...');
execSync('npm install tailwindcss @tailwindcss/vite', { stdio: 'inherit' });


// 2. Update vite.config.js
const viteConfigPath = path.join(process.cwd(), 'vite.config.js');

if (fs.existsSync(viteConfigPath)) {
  let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');
  if (!viteConfig.includes('@tailwindcss/vite')) {
    viteConfig = viteConfig.replace(
      /from ['"]vite['"]/,
      `from 'vite'\nimport tailwindcss from '@tailwindcss/vite'`
    );
    viteConfig = viteConfig.replace(/plugins:\s*\[/, 'plugins: [\n    tailwindcss(),');
    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log('✅ Updated vite.config.js with Tailwind plugin.');
  } else {
    console.log('✅ vite.config.js already includes Tailwind plugin.');
  }
} else {
  console.error('❌ vite.config.js not found.');
}

// 3. Add Tailwind @import to index.css
const cssIndexFilePath = path.join(process.cwd(), 'src', 'index.css');
if (fs.existsSync(cssIndexFilePath)) {
  let cssContent = fs.readFileSync(cssIndexFilePath, 'utf-8');
  if (!cssContent.includes('@import "tailwindcss";')) {
    cssContent = `@import "tailwindcss";\n` + cssContent;
    fs.writeFileSync(cssIndexFilePath, cssContent);
    console.log('✅ Added @import to index.css.');
  } else {
    console.log('✅ index.css already contains @import "tailwindcss".');
  }
} else {
  console.error('❌ src/index.css not found.');
}



// 3. Add Tailwind @import to app.css
const cssAppFilePath = path.join(process.cwd(), 'src', './src/app.css');
if (fs.existsSync(cssAppFilePath)) {
  let cssContent = fs.readFileSync(cssAppFilePath, 'utf-8');
  if (!cssContent.includes('@import "tailwindcss";')) {
    cssContent = `@import "tailwindcss";\n` + cssContent;
    fs.writeFileSync(cssAppFilePath, cssContent);
    console.log('✅ Added @import to app.css.');
  } else {
    console.log('✅ app.css already contains @import "tailwindcss".');
  }
} else {
  console.error('❌ src/app.css not found.');
}


// 4. Run dev server
console.log('🚀 Starting dev server...');
execSync('npm run dev', { stdio: 'inherit' });
