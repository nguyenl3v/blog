
const Upload = require('../model/upload');

module.exports.upload = async function (req, res){
  const filename = req.files[0].filename ? req.files[0].filename : null;
  const upload = new Upload({upload:filename});
  upload.save();
  res.json(upload)
}
