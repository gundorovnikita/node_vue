const models = require('../models')
const path = require('path')
const fs = require('fs');


module.exports = {
  uploadImage:(req,res)=>{
  	const authUser = models.users.find(user=>user.id===req.user.id)
  	if(authUser.image && authUser.image!=='/1.jpg'){
  		fs.unlink(path.join(__dirname,'..','..' ,'uploads',authUser.image), function(err) {

    			console.log('error image')

    		})
  	}

  	authUser.image=req.file.filename
  	res.send(true)
  }
}
