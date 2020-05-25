// 引入mongoose第三方模块
const mongoose=require("mongoose");
// 导入config模块
const config=require("config");
// 连接数据库
// 下面这一句自己加的
// 已经创建的数据库再创建就会爆出一个警告
// 下面这句话就是消除这个警告
mongoose.set('useCreateIndex', true)
// 新建了数据库的验证quan:quan@账号密码     后面加的还有27017这个默认可以不加
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>console.log("数据库连接成功"))
    .catch(()=>console.log("数据库连接失败"))