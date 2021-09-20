const Product = require('../models/Product');
const slugify = require('slugify');
module.exports = {
    async index(req,res){
        let products = await Product.findAll({raw:true});
        let HATEOAS = [
            {
                href: "http://localhost:8080/product",
                method: "POST",
                rel: "create_new_product"
            }
        ]
        return res.status(200).json({products, _links:HATEOAS});
    },
    async show(req,res){
        let slug = req.params.slug
        if(slug){
            slug = slug.toUpperCase();
            let product = await Product.findOne({where:{slug}});
            if(product){
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
                return res.status(200).json({product, _links:HATEOAS});
            }else{
                return res.status(404).json({err:"404 Product not Found!"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
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
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        if(id){
            let product = await Product.destroy({where:{id}});
            if(product==1){
                return res.status(200).json(product);
            }else{
                return res.status(404).json({err:"404 Product not found!"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async update(req,res){
        let id = req.params.id;
        let {price,sizes,inventory,colors,categoryId,brandId } = req.body;
        let name = req.body.name.toUpperCase();
        if(name&&price&&sizes&&inventory&&colors&&categoryId&&brandId&&id){
            let slug= slugify(name);
            let product = await Product.update({name,price,sizes,inventory,colors,categoryId,brandId,slug},{where:{id}});
            if(product==1){
                return res.status(200).json(product);
            }else{
                return res.status(404).json({err:"404 Product not found!"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    }
    
}