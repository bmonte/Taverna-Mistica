import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHashed = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHashed} - ${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
