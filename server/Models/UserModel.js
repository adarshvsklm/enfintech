import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const Products = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expiry: { type: Date, required: true },
    price: { type: Number, required: true },
    stock: { type: String ,required:true},
  },
  {
    collection: 'products',
  }
);

export default mongoose.model('products', Products);
