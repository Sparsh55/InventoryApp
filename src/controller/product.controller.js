import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        // return res.sendFile(
        //     path.join(path.resolve(),"src","views","products.html")
        // );
        res.render("products", { products: products , userEmail:req.session.userEmail });
    }

    getAddForm(req, res) {
        
        return res.render('new-product', { errorMessage: null , userEmail:req.session.userEmail });
    }

    addNewProduct(req, res) {
        const {name , description , price} = req.body;
        const imageUrl = "images/"+req.file.filename;
        ProductModel.add(name , description , price , imageUrl);
        let products = ProductModel.get();
        res.render("products", { products: products, userEmail:req.session.userEmail});
    }

    getUpdateProductView(req, res) {
        // If product exixts then return view
        const id = Number(req.params.id);
        const productFound = ProductModel.getById(id);

        if (productFound) {
            return res.render('update-product', { product:productFound, errorMessage: null,  userEmail:req.session.userEmail });
        } else {
            return res.status(401).send("Product not found");

        }
    }

    postUpateProduct(req,res){

        const {id, name , description , price , imageUrl} = req.body;

        const product = ProductModel.update(Number(id), name , description , price, imageUrl);
        // console.log(req.body);
        let products = ProductModel.get();
        // res.render("products", { products: products, userEmail:req.session.userEmail });
        res.redirect('/');
    }

    postDeleteProduct(req,res){
        const id = Number(req.params.id);
        ProductModel.delete(id);
        let products = ProductModel.get();
        console.log(products);
        res.render("products", { products: products, userEmail:req.session.userEmail });
    }
}