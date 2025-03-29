import express from'express';
import Product from '../models/Products.js'

var router = express.Router();



// router.get('/', async function (request, response, next){ 
//   try {
//     response.locals.products = Product.find()
//     response.render('products');
//   } catch(error) {
//     next(error)
//   }
//   });

  export async function index(req, res, next) {
    try {
      //const userId = req.session.userId;
  
      res.locals.products = await Product.find()/*({owner: userId});*/
      res.render('products');
  
    } catch (error) {
      next(error);
    }
  }

//export default router;