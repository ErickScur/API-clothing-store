const fs = require('fs').promises;
async function updateData(req,res){
    let data = JSON.stringify(req.body)
    try{
        await fs.writeFile( __dirname + '/configs.json', data);
        return res.status(200).json(req.body);
    }catch(err){
        return res.status(400).json({err:err});
    }
}
async function getData(req,res){
    try{
        let rawData = await fs.readFile( __dirname + '/configs.json');
        let data = JSON.parse(rawData);
        return res.status(200).json(data);
    }catch(err){
        return res.status(400).json({err:err});
    }
}
module.exports = {updateData, getData};



   