const Brand = require('../models/Brand');

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
        let findBrand = await Brand.findOne({where:{name:name}});
        if(name){
            if(findBrand){
                res.status(403);
                res.json({err:"Brand already exists"}); 
            }else{
                let brand = await Brand.create({name:name});
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
                        href: "http://localhost:8080/brand/"+brand.id,
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
        let id = req.params.id;
        if(id){
            let brand = await Brand.findOne({where:{id}});
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
                        href: "http://localhost:8080/brand/"+brand.id,
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
    }
}