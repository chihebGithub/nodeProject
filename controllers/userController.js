const User =require('../model/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
//const {upload} = require('../util/upload');
const {
    validateSignupData,
    validateLoginData
  } = require('../util/validators');

exports.update_image=(async (req, res) => {

  try{ 
  const userEXist = await User.findById(req.params.id);
 
    userEXist
    .save()
    .then(result => {
      res.setHeader('Content-Type', 'text/json');
      res.status(201).json({
      
        message: "image changed successfully",
        file:req.file.path
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

  
  }
    catch(err){
    res.json({error:err});
              }

});



// Log user in
exports.login = (async (req, res ) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const { valid, errors } = validateLoginData(user);
    if (!valid) return res.status(400).json({error:errors});
     //Checking if the email exists 
    const userExist= await User.findOne({email:user.email});

      if(!userExist)  return res.json({message:'Invalid email'})
     //password is correct 
     const validpassword = await bcrypt.compare(user.password,userExist.password)
     .catch(err=>res.json({error:err}))
    if(!validpassword) res.status(400).json({message:'Invalid password'})
    //create and assign a token 
    try{
      const token = jwt.sign({_id:userExist._id},process.env.JWK_KEY);
      res.header('auth-token',token).json({token:token});
    }catch(err){
      res.json({error:err})
    }
     
    

  });


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
exports.add_user=(async(req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmpassword
  };
  
  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);
   
  const userExist= await User.findOne({email:newUser.email});

  if(userExist)  return res.json({message:'Email address already used'})

  await bcrypt.hash(req.body.password,10,(err,hash) =>{
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
                   .catch(
                     (err)=> res.json({error:err})
                   )

                }
           })  
  
});

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









