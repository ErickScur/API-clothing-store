const User = require('../models/User');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const sendMail = require('../sendMail/sendMail');

module.exports = {
    async index(req,res){
        let HATEOAS = [
            {
                href: "http://localhost:8080/user",
                method: "POST",
                rel: "create_new_user"
            }
        ];
        const users = await User.findAll({raw:true});
        res.status(200);
        return res.json({users,_links: HATEOAS});
    },
    async store(req,res){
        let {name,cpf,email,password,phone,zipcode,state,city,street,number,complement} = req.body;
        if(name && cpf && email && password && phone && zipcode && state && city && street && number && complement){
            let findUser = await User.findOne({where:{email:email}});
            if(findUser==undefined){
                let uuid = uuidv1();
                const user = await User.create({
                    name,cpf,email,password,phone,zipcode,state,city,street,number,complement,
                    isVerified:false,
                    uuid:uuid
                });
                let HATEOAS = [
                    {
                        href: "http://localhost:8080/user/"+user.id,
                        method: "DELETE",
                        rel: "delete_user"
                    },
                    {
                        href: "http://localhost:8080/user",
                        method: "POST",
                        rel: "create_new_user"
                    },
                    {
                        href: "http://localhost:8080/user/"+user.id,
                        method: "PUT",
                        rel: "update_user"
                    },
                    {
                        href: "http://localhost:8080/user/"+user.id,
                        method: "GET",
                        rel: "get_user"
                    },
                    {
                        href: "http://localhost:8080/users",
                        method: "GET",
                        rel: "get_all_users"
                    }
                ];
                sendMail(user.email, user.uuid, user.name);
                res.status(200);
                return res.json({user,_links: HATEOAS});
            }else{
                res.status(400);
                res.json({err:"Email already in use!"}); 
            }
        }else{
            res.status(400);
            res.json({err:"400 Bad Request!"});
        }
    },
    async show(req,res){
        let id = req.params.id;
        const user = await User.findOne({where:{id:id}});
        if(user!=undefined){
            let HATEOAS = [
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "DELETE",
                    rel: "delete_user"
                },
                {
                    href: "http://localhost:8080/user",
                    method: "POST",
                    rel: "create_new_user"
                },
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "PUT",
                    rel: "update_user"
                },
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "GET",
                    rel: "get_user"
                },
                {
                    href: "http://localhost:8080/users",
                    method: "GET",
                    rel: "get_all_users"
                }
            ]
            res.status(200);
            return res.json({user,_links: HATEOAS});
        }else{
            res.status(404);
            res.json({err:"404 Not Found!"});
        }
    },
    async update(req,res){
        let {name,cpf,email,password,phone,zipcode,state,city,street,number,complement} = req.body;
        let id = req.params.id;
        if(name && cpf && email && password && phone && zipcode && state && city && street && number && complement){
            const user = await User.update({name,cpf,email,password,phone,zipcode,state,city,street,number,complement
            },{where:{id:id}});
            let HATEOAS = [
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "DELETE",
                    rel: "delete_user"
                },
                {
                    href: "http://localhost:8080/user",
                    method: "POST",
                    rel: "create_new_user"
                },
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "PUT",
                    rel: "update_user"
                },
                {
                    href: "http://localhost:8080/user/"+user.id,
                    method: "GET",
                    rel: "get_user"
                },
                {
                    href: "http://localhost:8080/users",
                    method: "GET",
                    rel: "get_all_users"
                }
            ]
            res.status(200);
            return res.json({user,_links:HATEOAS});
        }else{
            res.status(400);
            res.json({err:"400 Bad Request!"});
        }
    },
    async destroy(req,res){
        let id = req.params.id;
        const user = await User.destroy({
            where:{id}
        });
        res.status(200);
        return res.json(user);
    },
    async confirmMail(req,res){
        let uuid = req.params.uuid;
        let user = await User.findOne({where:{uuid:uuid}});
        if(user){
            let verifiedUser = await User.update({
                isVerified : true
            },{where:{uuid:uuid}});
            res.status(200);
            return res.json(verifiedUser);
        }else{
            res.status(404);
            return res.json({err:"404 User not found!"});
        }
    }
}