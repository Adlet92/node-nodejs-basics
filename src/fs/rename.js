import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const sourceFilePath = join(__dirname, 'files', 'wrongFilename.txt');
  const destinationFilePath = join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.promises.access(sourceFilePath, fs.constants.R_OK);

    try {
      await fs.promises.access(destinationFilePath, fs.constants.R_OK);
      throw new Error('FS operation failed: Destination file already exists');
    } catch (destinationAccessError) {
      await fs.promises.rename(sourceFilePath, destinationFilePath);
      console.log('File renamed successfully: wrongFilename.txt to properFilename.md');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Source file does not exist');
    }
    console.error('FS operation failed:', error.message);
  }
};

await rename();
