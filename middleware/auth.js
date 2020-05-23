const jwt = require('jsonwebtoken');

module.exports.auth = function(req,res,next){
  const token = req.header("Authorization");
  if(!token){
    res.status(401).json({msg:"not token, authorization denied"})
    return;
  }try {
    const decoded = jwt.verify(token, process.env.secretToken);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "token is not valid" });
    return;
  }
}