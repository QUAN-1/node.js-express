const {Article}=require("../../model/article");
module.exports=async (req,res)=>{
    await Article.findOneAndDelete({_id:req.query.id});
    res.redirect('/admin/article');
    // console.log("hahahah")
}