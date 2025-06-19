import mongoose, { Schema } from 'mongoose'


const productSchema = new Schema({
  name: String,
  price: { type: Number},
  image: { type: String},
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }

}, {
  collection: 'products'
})

productSchema.statics.list = function(filter, skip, limit, sort, fields) {
  const query = Product.find(filter); 
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}


const Product = mongoose.model('Product', productSchema)

export default Product