import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

const router = express.Router()

app.get('/', (req,res)=>{
    res.send('여기는 루트입니다.')
})




app.listen(PORT, ()=>{
    console.log(PORT, '포트로 서버가 열렸어요!');
})