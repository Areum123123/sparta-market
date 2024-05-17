import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); //.env 파일 로드

const connect = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI,

      {
        dbName: process.env.DB_NAME, // 데이터베이스명
      },
    )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
