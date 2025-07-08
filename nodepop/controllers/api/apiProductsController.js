import Product from "../../models/Products.js";



export async function list(req, res, next) {
    try {
    const userId = req.apiUserId;
      const pageSize = 3
      const skip = parseInt(req.query.skip) || 0
      const limit = parseInt(req.query.limit) || pageSize
      const sort = req.query.sort || '_id'
      const price = req.query.price

      const filters = {
        owner: userId
      }

      if (req.query.tag) filters.tags = { $in: req.query.tag }

      if (typeof price !== 'undefined' && price !== '-') {
        if (price.indexOf('-') === -1) filters.price = price
        else {
          filters.price = {}
          const range = price.split('-')
          if (range[0] !== '') filters.price.$gte = range[0]
          if (range[1] !== '') filters.price.$lte = range[1]
        }
      }

      if (typeof req.query.nombre !== 'undefined') {
        filters.nombre = new RegExp('^' + req.query.nombre, 'i')
      }

      const totalCount = await Product.find(filters).countDocuments()
      const products = await Product.list(filters, skip, limit, sort)
      res.json({ result: products });
    

    
  } catch (error) {
    next(error)
  }
    
}

export async function getOne(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;

    const product = await Product.findOne({
      _id: productId,
      owner: userId,
    });
     
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ result: product });
  } catch (err) {
    next(err);
  }
}



export async function newProduct(req, res, next) {
  try { 
    const userId = req.apiUserId;
    const {name, price, tags} = req.body

    const product = new Product({
      name,
      price,
      tags,
      image: req.file.filename,
      owner: userId
    });
    
    product.tags = product.tags?.filter(tag => !!tag)
    
  
    const savedProduct = await product.save()
    res.json({ result: savedProduct });
    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;

    const productData = req.body;
    productData.image = req.file?.filename;
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        owner: userId,
      },
      productData,
      { new: true }
    );

    res.json({ result: updatedProduct });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const userId = req.apiUserId
    const productId = req.params.productId

  
    const product = await Product.findOne({ _id: productId })

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    if (product.owner.toString() !== userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    await Product.deleteOne({ _id: productId })
    res.status(204).json();
    
  } catch (error) {
    next(error)
  }

}
