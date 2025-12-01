import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  description: { type: String }
});
export default mongoose.model('Product', productSchema);
