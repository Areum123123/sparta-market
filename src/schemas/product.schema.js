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
    required: false, 
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Products', productSchema);
