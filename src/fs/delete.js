import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK);

    await fs.promises.unlink(filePath);
    console.log('File deleted successfully: fileToRemove.txt');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    }

    console.error('FS operation failed:', error.message);
  }
};

await remove();
