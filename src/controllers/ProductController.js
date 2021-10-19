const Product = require('../models/Product');
const slugify = require('slugify');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

module.exports = {
    async index(req,res){
        let page = req.params.page;
        let offset=0;
        if(page){
            if(isNaN(page) || page == 1){
                offset=0
            }else{
                offset = (parseInt(page)-1) * 10;
            }
        }
        let products = await Product.findAndCountAll({
            raw:true,
            limit:10,
            offset: offset
        });
        let HATEOAS;
        if(offset==0){
            HATEOAS = [
                {
                    href: "http://localhost:8080/products/"+ (parseInt(page)+1),
                    method: "GET",
                    rel: "next_page"
                },
                {
                    href: "http://localhost:8080/product",
                    method: "POST",
                    rel: "create_new_product"
                }
            ]
        }else if(products.count > offset){
            HATEOAS = [
                {
                    href: "http://localhost:8080/products/"+ (parseInt(page)+1),
                    method: "GET",
                    rel: "next_page"
                },
                {
                    href: "http://localhost:8080/products/"+ (parseInt(page)-1),
                    method: "GET",
                    rel: "previous_page"
                },
                {
                    href: "http://localhost:8080/product",
                    method: "POST",
                    rel: "create_new_product"
                }
            ]
        }else{
            HATEOAS = [
                {
                    href: "http://localhost:8080/products/"+ (parseInt(page)-1),
                    method: "GET",
                    rel: "previous_page"
                },
                {
                    href: "http://localhost:8080/product",
                    method: "POST",
                    rel: "create_new_product"
                }
            ]
        }
        if(products.rows.length > 0){
            return res.status(200).json({products, _links:HATEOAS});
        }else{
            return res.status(404).json({err:"No products were found on this page"});
        }
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
                return res.json({err:"Product already exists"}); 
            }else{
                let findCategory = await Category.findOne({where:{id:categoryId}});
                if(!findCategory){
                    return res.status(404).json({err:"Category not Found!"});
                }
                let findBrand = await Brand.findOne({where:{id:brandId}});
                if(!findBrand){
                    return res.status(404).json({err:"Brand not Found!"});
                }
                let slug = slugify(name);
                colors = colors.toString(); //HTML Checkbox form outputs is a array so convert it into a String to store in the database
                sizes = sizes.toString();   //HTML Checkbox form outputs is a array so convert it into a String to store in the database
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
                return res.status(200).json({product,_links:HATEOAS});
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
    },
    async findBySlug(slug){
        console.log('chamou');
        console.log(slug);
        let product = await Product.findOne({where:{slug:slug}});
        console.log(product);
        return product;
    }
}