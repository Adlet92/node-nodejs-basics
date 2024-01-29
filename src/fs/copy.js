import fs from 'fs';
import fse from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const copy = async () => {
  const sourceFolderPath = join(__dirname, 'files');
  const destinationFolderPath = join(__dirname, 'files_copy');

  try {
    await fs.promises.access(sourceFolderPath, fs.constants.R_OK);

    try {
      await fs.promises.access(destinationFolderPath, fs.constants.R_OK);

      throw new Error('FS operation failed: Destination folder already exists');
    } catch (destinationAccessError) {

      await fs.promises.mkdir(destinationFolderPath);
    }

    await fse.copy(sourceFolderPath, destinationFolderPath);
    console.log('Folder copied successfully: files to files_copy');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Source folder does not exist');
    }
    console.error('FS operation failed:', error.message);
  }
};

await copy();
