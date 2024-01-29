
import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const folderPath = join(__dirname, 'files');
  const filePath = join(folderPath, 'fresh.txt');

  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK);

    throw new Error('FS operation failed: File already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fsPromises.writeFile(filePath, 'I am fresh and young');
        console.log('File created successfully: fresh.txt');
      } catch (writeError) {
        console.error('FS operation failed:', writeError.message);
      }
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};

await create();
