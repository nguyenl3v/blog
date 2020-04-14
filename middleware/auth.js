const jwt = require('jsonwebtoken');

module.exports.auth = function(req,res,next){
  const token = req.header("Authorization");
  if(!token){
    res.json({msg:"not token, authorization denied"})
  }try {
    const decoded = jwt.verify(token, process.env.secretToken);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({ message: "token is not valid" });
  }
}