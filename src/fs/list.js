import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, 'files');

  try {
    await fs.promises.access(folderPath, fs.constants.R_OK);

    const filenames = await fs.promises.readdir(folderPath);

    console.log('List of filenames in "files" folder:', filenames);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Folder does not exist');
    }
    console.error('FS operation failed:', error.message);
  }
};

await list();
