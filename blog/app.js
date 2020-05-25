// 引用expess框架
const express=require("express");
// 处理路径
const path=require("path");
// 引入body-parser模块 用来处理post请求参数
const bodyPaser=require("body-parser");
// 导入express-session模块
const session=require("express-session");
// 导入art-tempate模板引擎
const template=require("art-template");
// 导入dateformat第三方模块
const dateFormat=require("dateformat");
// 导入morgan这个第三方模块
const morgan=require("morgan");
// 导入config模块
const config=require("config");
// 创建网站服务器
const app=express();
// 数据库连接
require("./model/connect");

// 处理post请求参数
app.use(bodyPaser.urlencoded({extended:false}));
// require("./model/user");

// 配置session
app.use(session({
    secret:"secret key",
    saveUninitialized:false,//添加 saveUninitialized 选项
    resave: false, //添加 resave 选项
    // 延长登录时间
    cookie:{
        maxAge:24*60*60*1000
    }
}));

// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine("art",require("express-art-template"));
// 告诉express框架模板所在的位置
app.set("views",path.join(__dirname,"views"));
// 告诉express框架模板的默认后缀是什么
app.set("view engine","art");
// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat=dateFormat;
// 开放静态资源文件
app.use(express.static(path.join(__dirname,"public")));
// 获取config里面json里的数据
console.log(config.get("title"))

// 获取系统环境变量 返回值是对象 
// console.log(process.env);
if(process.env.NODE_ENV=="development"){
    console.log("当前是开发环境");
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan("dev"))
}else{
	console.log('当前是生产环境')
}

// 引入路由模块
const home=require("./route/home.js");
const admin=require("./route/admin.js");
// 拦截请求 判断用户登录状态
app.use("/admin",require("./middeware/loginGuard"));

// 为路由匹配请求路径
app.use("/home",home);
app.use("/admin",admin);

// 错误处理中间件
app.use((err,req,res,next)=>{
    // 将字符串对象转换为对象类型

    const result=JSON.parse(err);
    
    let params=[];
    for(let attr in result){
        if(attr!="path"){
            params.push(attr+"="+result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join("&")}`);
})

app.listen(80);
console.log("网站服务器启动成功，请访问localhost");