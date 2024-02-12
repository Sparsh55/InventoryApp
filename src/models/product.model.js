export default class ProductModel{

    constructor(id, name, description, price, imageUrl){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl= imageUrl;
    }


    static get(){

        return products;

    }


    static delete(id){
       products = products.filter((p) => p.id !== id);
    }

    static update(id, name , description , price, imageUrl){

        const index = products.findIndex(p=> p.id===id);

        const product = products[index];
        product.name = name;
        product.description = description;
        product.price = price;
        product.imageUrl = imageUrl;
        products[index] = product;
    }

    static add(name, description, price, imageUrl){
        // console.log(product);
        let newProduct = new ProductModel(products.length+1,
            name,
            description,
            price,
            imageUrl
        );
        products.push(newProduct);
    }

    static getById(id){
        return products.filter((p) => p.id === id)[0];
    }

}

var products = [
    new ProductModel(1,'Product 1', 'Description for product 1', 19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2,'Product 2', 'Description for product 2', 29.99, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3,'Product 3', 'Description for product 3', 39.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg')

];