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

// crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product