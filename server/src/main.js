import express from 'express';
import { join } from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { router } from './router.js';
import { apiErrorMiddleware } from './middlewares/apiErrorMiddlewares.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT | 3333;

app.use(cors());
app.use(express.json());
app.use(express.static(join(process.cwd(), '/public')));
app.use(fileUpload({ useTempFiles: false }));
app.use('/api', router);
app.all('*', (req, res) =>
  res.redirect(`${process.env.CLIENT_URL}/404NotFound`)
); // if nonexistent method-URL pair

app.use(apiErrorMiddleware);

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.BASE_URL);
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} port...`);
    });
  } catch (e) {
    console.log(e.message);
  }
})();
