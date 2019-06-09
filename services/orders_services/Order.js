const mongoose = require('mongoose')

mongoose.model('Order',{
    orderEmail:{
        type:String,
        require:true,   
    },
    orderProduct:[{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    }],
    orderDate:{
        type:Date,
        require:true
    },
    orderStatus:{
        type:String,
        default:"accepted",
        require:true
    }
})