// Simple script to run Vite dev server
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting development server...');

const viteBin = path.join(__dirname, 'node_modules', '.bin', 'vite');
const args = ['--host', '127.0.0.1'];

const child = spawn('node', [viteBin, ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
});

child.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
});