const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    //start of sign up request
    app.post('/api/account/signup', function (req, res, next) {
        const {body} = req;
        const{
            firstName,
            lastName,
            password
        } = body;

        let{
            email
        } = body;

        if(!firstName){
            return res.send({
                success:false,
                message:'Error: First name cannot be blank'
            });
        }
        if(!lastName){
            return res.send({
                success:false,
                message:'Error: last name cannot be blank'
            });
        }
        if(!email){
            return res.send({
                success:false,
                message:'Error: email  cannot be blank'
            });
        }
        if(!password){
            return res.send({
                success:false,
                message:'Error: password cannot be blank'
            });
        }

        email = email.toLowerCase();

        //Steps:
        // 1. Verify email doesn't exist
        // 2. Save

        User.find({
            email:email
        },(err,previousUsers)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: Server error'
                })
            } else if (previousUsers.length >0){
                return res.send({
                    success:false,
                    message:'Error: Account already exist'
                })
            }   
            
            // save the new user
            const newUser = new User();

            newUser.email =email;
            newUser.firstName =firstName;
            newUser.lastName =lastName;
            newUser.password =newUser.generateHash(password);
            newUser.save((err,user) =>{
                
                if (err){
                    return res.send({
                        success:false,
                        message:'Error: Server error'
                    })
                }
                return res.send({
                    success:true,
                    message:'Signed up'
                })
            });

        }) // end of find user   
    }); // end of sign up

    //start of sign in request
    app.post('/api/account/signin', function (req, res, next) {
        const {body} = req;
        const{
            password
        } = body;

        let{
            email
        } = body;

        // checking the email and password
        if(!email){
            return res.send({
                success:false,
                message:'Error: email  cannot be blank'
            });
        }
        if(!password){
            return res.send({
                success:false,
                message:'Error: password cannot be blank'
            });
        }

        //turn email to lower case
        email = email.toLowerCase();

        User.find({
            email:email
        },(err,users)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: server error'
                });
            }
            if(users.length !=1){
                return res.send({
                    success:false,
                    message:'Error: email more than 1'
                });
            }
            const user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success:false,
                    message:'Error: password wrong'
                });
            }
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc)=>{
                if(err){
                    return res.send({
                        success:false,
                        message:'Error: server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Valid sign in',
                    token:doc._id
                });
            });
        }) // end of find user      
    }); //end of sign in post request

    //start of verify request
    app.get('/api/account/verify', function (req, res, next) {
        // get the token
        const {query} = req;
        const {token} = query
        
        // verify the token is one of a kind and it's not deleted
        UserSession.find({
            _id:token,
            isDeleted:false
        },(err,session)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: server error in find usersession id'
                });   
            }else{
                return res.send({
                    success:true,
                    message:'good'
                });
            }
        });
    }); //end of verify get request



    // start of logut get request
    app.get('/api/account/logout', function (req, res, next) {
        // get the token
        const {query} = req;
        const {token} = query
        
        // verify the token is one of a kind and it's not deleted
        UserSession.findOneAndUpdate({
            _id:token,
            isDeleted:false
        },
        {
            $set:{isDeleted:true}
        },
        null,(err,session)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: server error in find usersession id'
                });   
            }else{
                return res.send({
                    success:true,
                    message:'good'
                });
            }
        });
    }); // end of logout get request

    app.get('/api/account/:id', function (request, respone) {
        
        User.findOne({email:request.params.id}).then((user)=>{
            if (user){
                respone.json({
                    success:true,
                    message:'good',
                    user
                })
            }
            else{
                respone.status(500).send({error:"could not find user email"})
            }
            
        }) .catch(err=>{
            if(err){
                respone.status(500).send({error:"error"})
                throw err;
            }
        }) 

    }); //end of get specific acount request
    
}