var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3001,function(){
    console.log("swag shop api running on port 3001")
});

//product API
app.post('/product',function (request,respone){
    var product = new Product();
    product.title =request.body.title;
    product.price =request.body.price;
    product.save(function(err,savedProduct){
        if(err){
            respone.status(500).send({error:"could not save product"});
        }
        else{
            respone.send(savedProduct);
        }
    });
});

app.get('/product',function (request,respone){
    Product.find({},function(err,products){
        if(err){
            respone.status(500).send({error:"could not fetch data"})
        }
        else{
            respone.send(
                {
                    success:true,
                    message:'good',
                    data:{products}
                }
            );
        }
    }); 
});

app.get('/product/:id',function (request,respone){
    Product.find({_id:request.params.id},function(err,product){
        if(err){
            respone.status(500).send({error:"could not fetch data"})
        }
        else{
            respone.send(
                {
                    success:true,
                    message:'good',
                    product
                }
            );
        }
    }); 
});

//wishlist API

app.post('/wishlist',function(request,respone){
    var wishList= new WishList();
    wishList.title = request.body.title;

    wishList.save(function(err,newWishList){
        if (err){
            respone.status(500).send({error:"could not create wishlist"})
        }
        else{
            respone.send(newWishList);
        }
    })
})

app.get('/wishlist',function(request,respone){
    WishList.find().populate({path:'products',model:'Product'})
    .exec(function(err,wishLists){
        if(err){
            respone.status(500).send({error:"could not fetch wishlist"})
        }
        else{
            respone.send(wishLists);
        }
    })
})

app.put('/wishlist/product/add', function(request,respone){
    Product.findOne({_id:request.body.productId},function(err,product){
        if (err){
            respone.status(500).send({error:"could not find the product id"})
        }
        else{
            WishList.update({_id:request.body.wishListId},{$addToSet:
            {products:product._id}},function(err,wishList){
                if (err){
                    respone.status(500).send({error:"could not add item to wishlist"})
                }
                else{
                    respone.send(wishList);
                }
            })
        }
    })
});






