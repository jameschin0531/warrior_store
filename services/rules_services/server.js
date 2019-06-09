var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let xml_string = fs.readFileSync("simple.xml", "utf8");

app.listen(3002,function(){
    console.log("shipment api running on port 3002")
});
app.get('/',function (request,respone){
    parser.parseString(xml_string, function(error, result) {
        if(error === null) {
            respone.send(
                {success:true,
                message:'good',                    
                data:result.shipment});
        }
        else {
            console.log(error);
        }
    });
})
