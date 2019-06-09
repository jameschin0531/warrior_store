const express = require('express');
const app =express();
const mongoose =require ('mongoose');
const bodyParser = require('body-parser');
const  axios = require('axios');

app.use(bodyParser.json());

//connect mongodb
mongoose.connect('mongodb://localhost/orders', () =>{
    console.log("database is connected")
});

//load model
require("./Order")
const Order = mongoose.model("Order")

//create order
app.post("/order",(request,respone)=>{
    // this is create function

    var newOrder =
    {
        orderEmail:request.body.orderEmail,
        orderProduct: request.body.orderProduct,
        orderDate:request.body.orderDate,
        orderStatus:request.body.orderStatus
    }

    var order = new Order(newOrder);
    order.save().then(() => {
        console.log("new order created")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
  
    respone.send({
        success:true,
        message:'order created'
    });
})

//get orders record
app.get("/orders",(request,respone) =>{

    Order.find().then((orders)=>{
        respone.json(orders)
    }) .catch(err=>{
        if(err){
            throw err;
        }
    }) 
})


//find specific order record
app.get("/orders/:email",(request,respone) =>{

    //respone.send(request.params.id);

    Order.find({orderEmail:request.params.email}).then((order)=>{
        if (order){
            // var orderObject = {customerName:"",bookTitle:""};
            // axios.get("http://localhost:4001/customers/"+ order.CustomerID).then((customer)=>{
            //     //console.log(respone);
                    
            //     orderObject.customerName= order.CustomerID;
            //     console.log("customer name ::::"+customer.data) ;
            //     respone.json(customer.data);

            //     axios.get("http://localhost:4000/books/"+ order.BookID).then((book)=>{
                    
            //         console.log("book title ::::"+book.data) ;   
            //         respone.json(book.data);            
                    
            //     })            
            // })
            respone.json({
                success:true,
                message:'order created',
                order
            });
        }
        else{
            respone.status(500).send({error:"could not find order record"})
        }
        
    }) .catch(err=>{
        if(err){
            respone.status(500).send({error:"some error"})
            throw err;
        }
    }) 
})

// listen to port 3003
app.listen(3003,()=>{
    console.log("up and runing 3003, this is our order services")
})