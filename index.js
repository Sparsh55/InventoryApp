import express from 'express';
import ProductController from './src/controller/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import { ValidateRequest } from './src/middleware/validation.middleware.js';
import { uplpadFile } from './src/middleware/file-upload.middleware.js';
import UserController from './src/controller/user.controller.js';
import session from 'express-session';
import { auth } from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setlastVisit } from './src/middleware/lastvisit.middleware.js';

const server = express();

server.use(express.static('public'));
server.use(cookieParser());
// server.use(setlastVisit);
server.use(session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Parse form data
server.use(express.urlencoded({ extended: true }));

// Setup View Engine settings
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);

// Create an instance of Product Controller
const productController = new ProductController();

// Create an instance of Users Controller
const userController = new UserController();


server.get("/login", userController.getLogin);
server.post('/login', userController.postLogin);
server.get("/register", userController.getRegister);
server.get("/logout", userController.logout);
server.post('/register', userController.postRegister);
server.get("/", auth, productController.getProducts);
server.get("/new",setlastVisit, auth, productController.getAddForm);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/", uplpadFile.single('imageUrl'), auth, ValidateRequest, productController.addNewProduct);
server.post("/update-product", auth, productController.postUpateProduct);
server.post("/delete-product/:id", auth, productController.postDeleteProduct);



server.listen(3100, () => {
    console.log("Server is running on port 3100");
});