const Category = require('../models/Category');
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
        let id = req.params.id;
        const category = await Category.findOne({where:{id:id}});
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
                    href: "http://localhost:8080/category/"+category.id,
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
            return res.json({err:"User not found"});
        }
    },
    async store(req,res){
        let name = req.body.name.toUpperCase();
        if(name){
            let findCategory = await Category.findOne({where:{name:name}});
            if(findCategory){
                res.status(403);
                res.json({err:"Category already exists"}); 
            }else{
                let category = await Category.create({name:name});
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
                        href: "http://localhost:8080/category/"+category.id,
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
            res.status(400);
            res.json({err:"400 Bad Request!"});
        }
    },
    async update(req,res){
        let {name} = req.body;
        let id = req.params.id;
        if(name){
            let category = await Category.update({name:name},{where:{id:id}});
            console.log(category);
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
                    href: "http://localhost:8080/category/"+id,
                    method: "GET",
                    rel: "get_category"
                },
                {
                    href: "http://localhost:8080/categories",
                    method: "GET",
                    rel: "get_all_categories"
                }
            ];
            if(category){
                res.status(200);
                return res.json({category,_links:HATEOAS});
            }else{
                res.status(404);
                return res.json({err:"Category not found"});
            }
        }else{
            res.status(400);
            return res.json({err:"Bad Request"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        let category = await Category.destroy({where:{id:id}});
        res.status(200);
        return res.json(category);
    }
}