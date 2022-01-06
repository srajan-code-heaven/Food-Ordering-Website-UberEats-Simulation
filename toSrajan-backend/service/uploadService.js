var aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const bucketName = "273-images-dump";

aws.config.update({
  accessKeyId: 'AKIA6KDS4SHUBLQUX345',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const isImage = (req,file,callbck)=>{
    if(file.mimetype.startsWith('image')){
      console.log('Call back');
      callbck(null,true)
    }else{
        callbck(new Error('Only Image is allowed'))
    }
}

var upload = multer({
    // fileFilter : isImage,
    storage: multerS3({
      s3: new aws.S3(),
      bucket: bucketName,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'testing'});
      },
      key: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const imagePath = req.params.entity + "/" + Date.now().toString() + "." + ext;
        cb(null, imagePath);
      }
    })
  })
  
exports.upload = upload;
  