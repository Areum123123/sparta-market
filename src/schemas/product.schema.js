// schemas/product.schema.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true, //중복되면 안됨
  },
  description: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false, // 일반적으로는 안가지고 오게 ..몽구스에서 find 라는 명령어로 조회할때 자동적으로는 선택되지 않게. 보이려면 명시적으로 가져오겠다 추가해야함
  },
  createdAt: {
    type: Date,
    required: false, 
  },
  status: {
    type: String,
    required: true,
    // enum:['FOR_SALE','SOLD_OUT'],    //enum 특정값만 받을 수 있게 정의
    // default :"FOR_SALE",
  },
},
); //{timestamps: true, toJSON:{ virtuals : true} },이거 뭔지 잘 이해 안감. createAt 이랑 updateAt 이 생성됨.

export default mongoose.model('Products', productSchema);
