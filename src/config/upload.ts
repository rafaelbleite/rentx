import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),

  // upload(folder: string) {
  //   return {
  //     storage: multer.diskStorage({
  //       destination: resolve(__dirname, '..', '..', folder),
  //       filename: (request, file, callback) => {
  //         const fileHash = crypto.randomBytes(16).toString('hex');
  //         const fileName = `${fileHash}-${file.originalname}`;

  //         return callback(null, fileName);
  //       },
  //     }),
  //   };
  // },
};
