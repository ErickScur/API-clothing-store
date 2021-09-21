const Image = require('../models/Image');
const multer = require('multer');
const slugify = require('slugify');
const {findBySlug} = require('./ProductController');
const path = require('path');

async function storeImageDB(path,productId){
    let image = await Image.create({path,productId});
    if(image){
        console.log('a');
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + "/../uploads");
    },
    filename: function(req,file,cb){
        let enc = Date.now();
        cb(null, enc + file.originalname);
        let path = __dirname + "/../uploads/" + enc + file.originalname;
        let slug = slugify(req.body.name.toUpperCase());
        let productId;
        findBySlug(slug).then((product)=>{
            productId = product.id;
            storeImageDB(path,productId);
        })
    }
});

module.exports = {
    upload : multer({
        storage:storage,
        fileFilter: function(req,file,cb){
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return cb(new Error('Only images are allowed'))
            }
            cb(null, true)
        }
    })
}