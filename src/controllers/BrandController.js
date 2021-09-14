const Brand = require('../models/Brand');
const slugify = require('slugify')
module.exports={
    async index(req,res){
        const brands = await Brand.findAll({raw:true});
        let HATEOAS = [
            {
                href: "http://localhost:8080/brand",
                method: "POST",
                rel: "create_new_brand"
            }
        ];
        return res.status(200).json({brands,_links:HATEOAS});
    },
    async store(req,res){
        let name = req.body.name.toUpperCase();
        let slug = slugify(name);
        let findBrand = await Brand.findOne({where:{name:name}});
        if(name){
            if(findBrand){
                res.status(403);
                res.json({err:"Brand already exists"}); 
            }else{
                let brand = await Brand.create({name:name, slug:slug});
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/brand/"+brand.id,
                        method: "DELETE",
                        rel: "delete_brand"
                    },
                    {
                        href: "http://localhost:8080/brand",
                        method: "POST",
                        rel: "create_new_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+brand.id,
                        method: "PUT",
                        rel: "update_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+brand.slug,
                        method: "GET",
                        rel: "get_brand"
                    },
                    {
                        href: "http://localhost:8080/categories",
                        method: "GET",
                        rel: "get_all_brands"
                    }
                ];
                return res.status(200).json({brand,_links:HATEOAS});
            }
        }else{
            res.status(400);
            res.json({err:"Bad request"});
        }
    },
    async show(req,res){
        let slug = req.params.slug.toUpperCase();
        if(slug){
            let brand = await Brand.findOne({where:{slug}});
            if(brand){
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/brand/"+brand.id,
                        method: "DELETE",
                        rel: "delete_brand"
                    },
                    {
                        href: "http://localhost:8080/brand",
                        method: "POST",
                        rel: "create_new_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+brand.id,
                        method: "PUT",
                        rel: "update_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+brand.slug,
                        method: "GET",
                        rel: "get_brand"
                    },
                    {
                        href: "http://localhost:8080/categories",
                        method: "GET",
                        rel: "get_all_brands"
                    }
                ];
                return res.status(200).json({brand,_links:HATEOAS});
            }else{
                res.status(404);
                return res.json({err:"Brand not found"});
            }
        }else{
            res.status(400);
            res.json({err:"Bad request"});
        }
    },
    async update(req,res){
        let name = req.body.name;
        let slug = slugify(name);
        let id = req.params.id;
        if(name && id){
            let brand = await Brand.update({name:name, slug:slug},{where:{id:id}});
            if(brand){
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/brand/"+id,
                        method: "DELETE",
                        rel: "delete_brand"
                    },
                    {
                        href: "http://localhost:8080/brand",
                        method: "POST",
                        rel: "create_new_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+id,
                        method: "PUT",
                        rel: "update_brand"
                    },
                    {
                        href: "http://localhost:8080/brand/"+slug,
                        method: "GET",
                        rel: "get_brand"
                    },
                    {
                        href: "http://localhost:8080/categories",
                        method: "GET",
                        rel: "get_all_brands"
                    }
                ];
                return res.status(200).json({brand,_links:HATEOAS});
            }else{
                return res.status(404).json({err:"Brand not found"})
            }
        }else{
            return res.status(400).json({err:"Bad request"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        let brand = await Brand.destroy({where:{id:id}});
        res.status(200);
        return res.json(brand);
    }
}