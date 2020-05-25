// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports= async (req,res)=>{
    // 自己测试用的
    // console.log(req.app.locals.userInfo);
    // console.log(req.session.username);
    
	// 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink="user"
	// 接收客户端传递过来的当前页参数
    let page=req.query.page || 1;
	// 每一页显示的数据条数
    let pagesize=10;
    // 查询用户数据的总数
    let count=await User.countDocuments({});
	// 总页数
    let total=Math.ceil(count/pagesize);
    // 将用户信息从数据库中查询出来
	// 页码对应的数据查询开始位置
    let start = (page-1)*pagesize;
    let users=await User.find({}).limit(pagesize).skip(start);
    // res.send(users);
    res.render("admin/user",{
        users:users,
        page:page,
        total:total
    })
}