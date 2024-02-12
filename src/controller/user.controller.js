import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController{

    getRegister(req,res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login', { errorMessage: null });
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login', { errorMessage: null } );
    }

    postLogin(req, res){
        const {email, password} = req.body;

        if (UserModel.authenticate(email,password)){
            req.session.userEmail = email;
            const products = ProductModel.get();
            res.render('products' , {products:products, userEmail:req.session.userEmail});
        }else{
            res.render('login',{ errorMessage: "Invaild Credentials" });
        }
    }

    logout(req,res){
        // Destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        })

        res.clearCookie('lastVisit');
    }

}