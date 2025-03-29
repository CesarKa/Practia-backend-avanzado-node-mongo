import express from'express';
import Product from '../models/Products.js'

var router = express.Router();



router.get('/', async function (request, response, next){ 
  try {
    response.locals.products = Product
    response.render('products');
  } catch(error) {
    next(error)
  }
  });


export default router;