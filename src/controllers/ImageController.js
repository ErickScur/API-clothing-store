const Image = require('../models/Image');
const multer = require('multer');
const slugify = require('slugify');
const {findBySlug} = require('./ProductController');
const path = require('path');
const Product = require('../models/Product');

async function storeImageDB(path,productId){
    let image = await Image.create({path,productId});
    if(image){
        console.log('a');
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + "/../../public/img/uploads/");
    },
    filename: function(req,file,cb){
        let enc = Date.now();
        cb(null, enc + file.originalname);
        let path = "/img/uploads/" + enc + file.originalname;
        let slug = slugify(req.body.name.toUpperCase());
        let productId;
        setTimeout(()=>{
            findBySlug(slug).then((product)=>{
                productId = product.id;
                storeImageDB(path,productId);
            })
        }, 5000);
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
    }),
    async getImages(req,res){
        let productId = req.params.productId;
        if(productId){
            let product = await Product.findOne({where:{id:productId}});
            if(product){
                let images = await Image.findAll({raw:true, where:{productId:productId}});
                if(images.length > 0){
                    return res.status(200).json(images);    
                }else{
                    return res.status(404).json({err:"No Images were Found!"});    
                }
            }else{
                res.status(404);
                return res.json({err:"Product not found"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    }
}