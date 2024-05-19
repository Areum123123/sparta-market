import express from 'express';
import connect from './schemas/index.js';
import productRouter from './routers/products.router.js';
import 'dotenv/config';
import { errorHandler } from './middlewares/error-handler.middleware.js';


const app = express();
const PORT = process.env.SERVER_PORT;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

app.use('/', [router, productRouter]);

app.use(errorHandler);   //에러처리 500

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});