// Simple script to run Vite dev server using ES modules
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting development server...');

const viteBin = join(__dirname, 'node_modules', '.bin', 'vite');
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