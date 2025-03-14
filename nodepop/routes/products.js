import express from'express';
import products from '../models/products.js'
var router = express.Router();


router.get('/', async(request, response, next)=> {
    return response.status(200).send(products)
  });


export default router;