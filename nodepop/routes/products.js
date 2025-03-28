import express from'express';
import products from '../models/products.js'

var router = express.Router();



router.get('/', async function (request, response, next){ 
  try {
    response.locals.products = products
    response.render('products');
  } catch(error) {
    next(error)
  }
  });


export default router;