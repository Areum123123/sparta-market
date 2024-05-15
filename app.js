import express from "express";
import connect from "./schemas/index.js";

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

const router = express.Router()

app.get('/', (req, res) => {
    res.send('안녕하세요!! 반갑습니다!')
})
router.get('/', (req,res)=>{
    return res.json({ message: 'Hi!' });
})  //localhost:3000/products


app.use('/products',[router]) // 수정삭제구현하는 router.js에서 router 내보내면 가져오기

app.listen(PORT, ()=>{
    console.log(PORT, '포트로 서버가 열렸어요!');
})