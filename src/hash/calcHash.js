import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');

  const fileStream = createReadStream(filePath);

  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  fileStream.on('end', () => {
    const hashResult = hash.digest('hex');
    console.log(`SHA256 Hash: ${hashResult}`);
  });

  fileStream.on('error', (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};

await calculateHash();
