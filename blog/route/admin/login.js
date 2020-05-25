// 导入用户集合构造函数
const {User}=require("../../model/user");
// 加密
const bcrypt=require("bcrypt");
module.exports = async (req,res)=>{
    // 接收请求参数
    const{email,password}=req.body;
    // 如果用户没有输入邮件地址
    // if(email.trim().length==0||password.trim().length==0) {
    //     return res.status(400).send("<h4>邮件地址或者密码错误</h4>");
    // }
    if(email.trim().length==0||password.trim().length==0) {
        return res.status(400).render("admin/error",{msg:"邮件地址或者密码错误"});
    }
    // 根据邮箱地址查询用户信息
	// 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
    // 如果没有查询到用户 user变量为空
    // let user=await User.findOne({email:email});
    // es6新特性
    let user=await User.findOne({email});
    if(user){
        // 将客户端传递过来的密码和用户信息中的密码进行比对
		// true 比对成功
        // false 对比失败
        let isValid=await bcrypt.compare(password,user.password);
        if(isValid){
            // 将用户名存储在请求对象中
            // 不能实现真正的登录
            // req.username=user.username;
            // 能实现真正的登录
            req.session.username=user.username;
			// 将用户角色存储在session对象中
            req.session.role=user.role;
            // 登录成功
            // res.send("登录成功")
            // req.app就是app这个服务器      
            req.app.locals.userInfo=user;
			// 对用户的角色进行判断
            if(user.role=="admin"){
                // 重定向到用户列表页面
                res.redirect("/admin/user");
            }else{
				// 重定向到博客首页
                res.redirect("/home/");
            }       
        }else{
            // 没有查询到用户
            res.status(400).render("admin/error",{msg:"密码错误"});//邮件地址或者密码错误
        }
    }else{
        // 没有查询到用户
        res.status(400).render("admin/error",{msg:"邮件地址错误"});//邮件地址或者密码错误
    }
}