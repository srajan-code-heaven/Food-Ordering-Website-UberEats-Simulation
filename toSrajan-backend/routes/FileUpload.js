const { upload } = require("../service/uploadService");
const { checkAuth } = require("../utils/passport");

const router = require("express").Router();

router.post("/image/:entity",upload.single('image'),(req,res,next)=>{
    res.send({imageUrl:req.file.location});
});

module.exports = router;
