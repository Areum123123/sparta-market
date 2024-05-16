// schemas/product.schema.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  },
  doneAt: {
    type: Date,
    required: false, //상품목록 생성일시.. 를 위해.
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Products', productSchema);
