// 1.引入mongoose模块
const mongoose=require("mongoose");
// 引入joi模块
const Joi = require('joi');
// 2.创建文章集合规则
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        maxlength:20,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"请传递作者"]
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }
});
// 3.根据规则创建集合
const Article=mongoose.model("Article",articleSchema);

// 验证用户信息
const validateArticle=article=>{
	// 定义对象的验证规则
    const schema={
        title:Joi.string().min(4).max(20).required().error(new Error('题目不符合验证规则')),
    };
	// 实施验证
    return Joi.validate(article,schema);
}

// 4.将集合做为模块成员进行导出
module.exports={
    Article,
    validateArticle
}
