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
        if(name){
            let slug = slugify(name);
            let findBrand = await Brand.findOne({where:{slug}});
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
                        href: "http://localhost:8080/brand/"+brand.slug.toLowerCase(),
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
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
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
                        href: "http://localhost:8080/brand/"+brand.slug.toLowerCase(),
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
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async update(req,res){
        let name = req.body.name.toUpperCase();
        let id = req.params.id;
        if(name && id){
            let slug = slugify(name);
            let brand = await Brand.update({name:name, slug:slug},{where:{id:id}});
            if(brand==1){
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
                        href: "http://localhost:8080/brand/"+slug.toLowerCase(),
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
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        if(id){
            let brand = await Brand.destroy({where:{id:id}});
            if(brand==1){
                res.status(200);
                return res.json(brand);
            }else{
                return res.status(404).json({err:"Brand not found"})
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    }
}