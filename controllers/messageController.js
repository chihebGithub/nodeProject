const Message =require('../model/message');

exports.get_all_messages=(async(req, res, next) => {
    await Message.find()
    .then( (msg) => {
        res.json(msg);
    })
    .catch(
         (err)=>{
             res.json({error:err})
         }

    )
    
});
exports.dispatch_msg=(async(req, res, next) => {
   const msg= new Message(
       { 
        source:req.body.source,
        msg:req.body.msg,
        date_msg:req.body.date_msg,
        distination:req.body.distination
       }
    );
    const savedmsg=await msg.save()
    .then(
        res.json({status:"msg dispatched Successfully",
        msg:savedmsg})
        
      )
    .catch(err=>res.json({error:err}))
});












