const Category = require('../models/Category');
const slugify = require('slugify')

module.exports = {
    async index(req,res){
        const categories = await Category.findAll({raw:true});
        let HATEOAS = [
            {
                href: "http://localhost:8080/category",
                method: "POST",
                rel: "create_new_category"
            }
        ];
        res.status(200);
        return res.json({categories,_links: HATEOAS});
    },
    async show(req,res){
        let slug = req.params.slug.toUpperCase();
        if(slug){
            const category = await Category.findOne({where:{slug:slug}});
            if(category){
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/category/"+category.id,
                        method: "DELETE",
                        rel: "delete_category"
                    },
                    {
                        href: "http://localhost:8080/category",
                        method: "POST",
                        rel: "create_new_category"
                    },
                    {
                        href: "http://localhost:8080/category/"+category.id,
                        method: "PUT",
                        rel: "update_category"
                    },
                    {
                        href: "http://localhost:8080/category/"+category.slug,
                        method: "GET",
                        rel: "get_category"
                    },
                    {
                        href: "http://localhost:8080/categories",
                        method: "GET",
                        rel: "get_all_categories"
                    }
                ];
                res.status(200);
                return res.json({category,_links:HATEOAS});
            }else{
                res.status(404);
                return res.json({err:"Category not found"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async store(req,res){
        let name = req.body.name.toUpperCase();
        if(name){
            let slug = slugify(name);
            let findCategory = await Category.findOne({where:{name:name}});
            if(findCategory){
                res.status(403);
                res.json({err:"Category already exists"}); 
            }else{
                let category = await Category.create({name:name, slug:slug});
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/category/"+category.id,
                        method: "DELETE",
                        rel: "delete_category"
                    },
                    {
                        href: "http://localhost:8080/category",
                        method: "POST",
                        rel: "create_new_category"
                    },
                    {
                        href: "http://localhost:8080/category/"+category.id,
                        method: "PUT",
                        rel: "update_category"
                    },
                    {
                        href: "http://localhost:8080/category/"+category.slug,
                        method: "GET",
                        rel: "get_category"
                    },
                    {
                        href: "http://localhost:8080/categories",
                        method: "GET",
                        rel: "get_all_categories"
                    }
                ];
                res.status(200);
                return res.json({category,_links:HATEOAS});
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
            let category = await Category.update({name:name, slug:slug},{where:{id:id}});
            let HATEOAS = [
                {
                    href: "http://localhost:8080/category/"+id,
                    method: "DELETE",
                    rel: "delete_category"
                },
                {
                    href: "http://localhost:8080/category",
                    method: "POST",
                    rel: "create_new_category"
                },
                {
                    href: "http://localhost:8080/category/"+id,
                    method: "PUT",
                    rel: "update_category"
                },
                {
                    href: "http://localhost:8080/category/"+slug,
                    method: "GET",
                    rel: "get_category"
                },
                {
                    href: "http://localhost:8080/categories",
                    method: "GET",
                    rel: "get_all_categories"
                }
            ];
            if(category != undefined){
                res.status(200);
                return res.json({category,_links:HATEOAS});
            }else{
                res.status(404);
                return res.json({err:"Category not found"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        if(id){
            let category = await Category.destroy({where:{id:id}});
            if(category){
                res.status(200);
                return res.json(category);
            }else{
                res.status(404);
                return res.json({err:"Category not found"});
            }
        }else{
            res.status(422);
            return res.json({err:"One or more parameters are missing!"});
        }
    }
}