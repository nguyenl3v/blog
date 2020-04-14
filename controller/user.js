const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.index = async function (req, res) {
  const { name, email, password, avatar } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ msg: "email already exist" });
  } else {
    const user = new Register({
      name,
      email,
      password,
      avatar: typeof avatar !== "object" ? null : avatar,
    });
    bcrypt.genSalt(10, function (err, password) {
      bcrypt.hash(userregister.password, password, function (err, hash) {
        user.password = hash;
        user.save();
        res.json(user);
      });
    });
  }
};

module.exports.login = async function(req,res){
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(user){
    if(bcrypt.compareSync(password,user.password)){
      const payload = {
        id:user._id,
        name:user.name,
        email:user.email
      };
      const token = jwt.sign({
        data: payload
      }, process.env.secretToken, { expiresIn: 1000 });
      res.json(token)
    }else{
      res.json({msg:"password do not match"})
    }
  }else{
    res.json({msg:'email not exist'})
  }
}

module.exports.profile = async function(req,res){
  const user = await User.findById({_id:req.user.data.id}).select('-password');
  res.json(user)
}