const Product = require('../models/Product');
const slugify = require('slugify');
module.exports = {
    async store(req,res){
        let { name,price,sizes,inventory,colors,categoryId,brandId } = req.body;
        if(name&&price&&sizes&&inventory&&colors&&categoryId&&brandId){
            name = name.toUpperCase();
            let findProduct = await Product.findOne({where:{name}});
            if(findProduct!=undefined){
                res.status(403);
                res.json({err:"Product already exists"}); 
            }else{
                let slug = slugify(name);
                colors = colors.toString(); //HTML Checkbox form outputs is a array so I convert it into a String to store in the database
                sizes = sizes.toString();   //HTML Checkbox form outputs is a array so I convert it into a String to store in the database
                let product = await Product.create({name,price,sizes,inventory,colors,categoryId,brandId,slug});
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/product/"+product.id,
                        method: "DELETE",
                        rel: "delete_product"
                    },
                    {
                        href: "http://localhost:8080/product",
                        method: "POST",
                        rel: "create_new_product"
                    },
                    {
                        href: "http://localhost:8080/product/"+product.id,
                        method: "PUT",
                        rel: "update_product"
                    },
                    {
                        href: "http://localhost:8080/product/"+product.slug,
                        method: "GET",
                        rel: "get_product"
                    },
                    {
                        href: "http://localhost:8080/products",
                        method: "GET",
                        rel: "get_all_products"
                    }
                ];
                res.status(200).json({product,_links:HATEOAS});
            }
        }else{
            res.status(400);
            res.json({err:"400 Bad Request!"});
        }

    }
    
}