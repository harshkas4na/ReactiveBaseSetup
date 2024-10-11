console.log('=== Reactive Contracts Installation Script Started ===');
console.log('Current working directory:', process.cwd());

const fs = require('fs-extra');
const path = require('path');

try {
  // Source directories
  const sourceSrcDir = path.join(__dirname, '..', 'src');
  const sourceContractsDir = path.join(sourceSrcDir, 'Contracts');

  console.log('Source directories:');
  console.log('sourceSrcDir:', sourceSrcDir);
  console.log('sourceContractsDir:', sourceContractsDir);

  // Target directories
  const targetSrcDir = path.join(process.cwd(), 'src');
  const targetContractsDir = path.join(targetSrcDir, 'Contracts');

  console.log('Target directories:');
  console.log('targetSrcDir:', targetSrcDir);
  console.log('targetContractsDir:', targetContractsDir);

  // Ensure target directories exist
  console.log('Creating target directories if they don\'t exist...');
  fs.ensureDirSync(targetSrcDir);
  fs.ensureDirSync(targetContractsDir);

  // Copy files from src directory
  console.log('Copying files from src directory...');
  fs.readdirSync(sourceSrcDir).forEach(file => {
    if (file !== 'Contracts') {
      const sourcePath = path.join(sourceSrcDir, file);
      const targetPath = path.join(targetSrcDir, file);
      console.log(`Attempting to copy ${sourcePath} to ${targetPath}`);
      if (sourcePath !== targetPath) {
        fs.copySync(sourcePath, targetPath, { overwrite: false });
        console.log(`Successfully copied ${file}`);
      } else {
        console.log(`Skipping ${file}: Source and destination are the same.`);
      }
    }
  });

  // Copy ReactiveSmartContract.sol from Contracts directory
  console.log('Copying ReactiveSmartContract.sol...');
  const sourceContractPath = path.join(sourceContractsDir, 'ReactiveSmartContract.sol');
  const targetContractPath = path.join(targetContractsDir, 'ReactiveSmartContract.sol');
  console.log(`Attempting to copy from ${sourceContractPath} to ${targetContractPath}`);
  if (sourceContractPath !== targetContractPath) {
    fs.copySync(sourceContractPath, targetContractPath, { overwrite: false });
    console.log('Successfully copied ReactiveSmartContract.sol');
  } else {
    console.log('Skipping ReactiveSmartContract.sol: Source and destination are the same.');
  }

  // Copy TECH.md to the root of the project
  console.log('Copying TECH.md...');
  const techMdSource = path.join(__dirname, '..', 'TECH.md');
  const techMdTarget = path.join(process.cwd(), 'TECH.md');
  console.log(`Attempting to copy from ${techMdSource} to ${techMdTarget}`);
  if (techMdSource !== techMdTarget) {
    fs.copySync(techMdSource, techMdTarget, { overwrite: false });
    console.log('Successfully copied TECH.md');
  } else {
    console.log('Skipping TECH.md: Source and destination are the same.');
  }

  console.log('Installation process completed successfully.');
} catch (error) {
  console.error('Error during installation:', error);
  process.exit(1);
}