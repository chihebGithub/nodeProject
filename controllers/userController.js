const User =require('../model/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require ('fs'); 
const {
    validateSignupData,
    validateLoginData
  } = require('../util/validators');




// Log user in
exports.login = (req, res , next ) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
  const { email,password }=req.body;
  console.log(  User.findOne({email:req.body.email}))
    const { valid, errors } = validateLoginData(user);
    console.log('test');
    if (!valid) return res.status(400).json({error:errors});
    u=User.findOne({email:req.body.email})
    console.log(u);
    if(u)
     { jwt.sign({user}, 'chiheb', { expiresIn: '3000s' }, (err, token) => {
        res.json({
          message:"token",
          token
        })
      })
   
     }
     else{
      res.json({
        message:"invalide username or password "
      })
     } 
  
   
   

  }


exports.get_all_users=(req, res, next) => {
    User.find()
    .then( (user) => {
        res.json(user);
    })
    .catch(
         (err)=>{
             res.json({error:err})
         }

    ) 
}
exports.get_user_by_id=(req, res, next) => {
    User.findById(req.params.id)
    .then( (user) => {
        res.json(user);
    })
    .catch(
         (err)=>{
             res.json({error:err})
         }

    ) 
}
exports.add_user=(req, res, next) => {
  bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){return res.status(500).json()}
                else {
                  const user= new User(
                    { 
                     fullName:req.body.fullName,
                     email:req.body.email,
                     password:hash,
                     confirmpassword:hash,
                     genre:req.body.genre,
                     birthday:req.body.birthday,
                     image:req.body.image,
                     created_at:req.body.created_at
                    }
                 );
                 user.save()
                 .then(
                  user => {
                     res.json({status:"user added Successfully",
                     user:user})
                     }
                   )
                   

                }
           })  
  
}

exports.change_password=(req, res, next) => {
  bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){return res.status(500).json()}
                else {
                  const user= User.findOne({email:req.params.email});
                  user.then(
                    user => {
                    
                      user.password=hash,
                      user.confirmpassword=hash,
                      user.save()
                       .then(
                          user => {
                           res.json({message:'password changed successfully',
                                   status:'success',
                                   user:user
                                    })
                          }
                      ) .catch(err=>res.json({error:err}))
                       }
                     )
                   .catch(err=>res.json({error:err}))
                   

                }
           })  
  
}

 


 exports.update_user=(req, res, next) => {
    
    const user= User.findById(req.params.id);

    user.then(
      user => {
        user.fullName=req.body.fullName;
        user.email=req.body.email,
        user.genre=req.body.genre,
        user.birthday=req.body.birthday,
        user.image=req.body.image,
        user.created_at=req.body.created_at
        user.save()
         .then(
            user => {
             res.json({message:'user updated successfully',
                     status:'success',
                     user:user
                      })
            }
        ) .catch(err=>res.json({error:err}))
         }
       )
     .catch(err=>res.json({error:err}))
    
 }


 exports.delete_user=(req, res, next) => {
   
    User.findById(req.params.id)

    .then(
     user => {
       user.delete()
        .then(
           user => {
            res.json({message:'user delelted successfully',
                    status:'success',
                    user:user
                     })
           }
       ) .catch(err=>res.json({error:err}))
        }
      )
    .catch(err=>res.json({error:err}))
   
}









