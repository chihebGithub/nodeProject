const User =require('../model/user');

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
   const user= new User(
       { 
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
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
    .catch(err=>res.json({error:err}))
}



exports.add_user=(req, res, next) => {
    const user= new User(
        { 
         fullName:req.body.fullName,
         email:req.body.email,
         password:req.body.password,
         confirmpassword:req.body.confirmpassword,
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
     .catch(err=>res.json({error:err}))
 }


 exports.update_user=(req, res, next) => {
    
     User.findById(req.params.id)

     .then(
      user => {
        user.fullName=req.body.fullName;
        user.email=req.body.email,
        user.password=req.body.password,
        user.confirmpassword=req.body.confirmpassword,
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









