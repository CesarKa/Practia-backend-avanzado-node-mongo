import mongoose, { Schema } from 'mongoose'

// definir el esquema de los agentes
const productSchema = new Schema({
  name: String,
  price: { type: Number},
  imge: { type: String},
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }

}, {
  collection: 'products' // para forzar el nombre de la colección
})

productSchema.statics.list = function(filter, skip, limit, sort, fields) {
  const query = Product.find(filter); // devuelve un objeto de tipo query que es un thenable
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product