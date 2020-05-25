const formidable=require("formidable");
const path=require("path");
const {Article}=require("../../model/article")
module.exports=async(req,res,next)=>{
    const id=req.query.id;
    // let article=await Article.findOne({_id:id});
    const form=new formidable.IncomingForm();
    form.uploadDir=path.join(__dirname,"../","../","public","uploads");
    form.keepExtensions=true;
    form.parse(req,async(err,fields,files)=>{
        await Article.updateOne({_id:id},{
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content,
        });
        res.redirect("/admin/article");
    });
    
    // res.send(req.body);
}