/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: whyour
 * @Last Modified time: 2021-5-1 15:00:54
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 */

const querystring = require('querystring');
const $ = new Env();
const timeout = 15000; //超时时间(单位毫秒)
// =======================================gotify通知设置区域==============================================
//gotify_url 填写gotify地址,如https://push.example.de:8080
//gotify_token 填写gotify的消息应用token
//gotify_priority 填写推送消息优先级,默认为0
let GOTIFY_URL = '';
let GOTIFY_TOKEN = '';
let GOTIFY_PRIORITY = 0;
// =======================================go-cqhttp通知设置区域===========================================
//gobot_url 填写请求地址http://127.0.0.1/send_private_msg
//gobot_token 填写在go-cqhttp文件设置的访问密钥
//gobot_qq 填写推送到个人QQ或者QQ群号
//go-cqhttp相关API https://docs.go-cqhttp.org/api
let GOBOT_URL = ''; // 推送到个人QQ: http://127.0.0.1/send_private_msg  群：http://127.0.0.1/send_group_msg
let GOBOT_TOKEN = ''; //访问密钥
let GOBOT_QQ = ''; // 如果GOBOT_URL设置 /send_private_msg 则需要填入 user_id=个人QQ 相反如果是 /send_group_msg 则需要填入 group_id=QQ群

// =======================================微信server酱通知设置区域===========================================
//此处填你申请的SCKEY.
//(环境变量名 PUSH_KEY)
let SCKEY = '';

// =======================================PushDeer通知设置区域===========================================
//此处填你申请的PushDeer KEY.
//(环境变量名 DEER_KEY)
let PUSHDEER_KEY = '';
let PUSHDEER_URL = '';

// =======================================Synology Chat通知设置区域===========================================
//此处填你申请的CHAT_URL与CHAT_TOKEN
//(环境变量名 CHAT_URL CHAT_TOKEN)
let CHAT_URL = '';
let CHAT_TOKEN = '';

// =======================================Bark App通知设置区域===========================================
//此处填你BarkAPP的信息(IP/设备码，例如：https://api.day.app/XXXXXXXX)
let BARK_PUSH = '';
//BARK app推送图标,自定义推送图标(需iOS15或以上)
let BARK_ICON = 'https://qn.whyour.cn/logo.png';
//BARK app推送铃声,铃声列表去APP查看复制填写
let BARK_SOUND = '';
//BARK app推送消息的分组, 默认为"QingLong"
let BARK_GROUP = 'QingLong';

// =======================================telegram机器人通知设置区域===========================================
//此处填你telegram bot 的Token，telegram机器人通知推送必填项.例如：1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
//(环境变量名 TG_BOT_TOKEN)
let TG_BOT_TOKEN = '';
//此处填你接收通知消息的telegram用户的id，telegram机器人通知推送必填项.例如：129xxx206
//(环境变量名 TG_USER_ID)
let TG_USER_ID = '';
//tg推送HTTP代理设置(不懂可忽略,telegram机器人通知推送功能中非必填)
let TG_PROXY_HOST = ''; //例如:127.0.0.1(环境变量名:TG_PROXY_HOST)
let TG_PROXY_PORT = ''; //例如:1080(环境变量名:TG_PROXY_PORT)
let TG_PROXY_AUTH = ''; //tg代理配置认证参数
//Telegram api自建的反向代理地址(不懂可忽略,telegram机器人通知推送功能中非必填),默认tg官方api(环境变量名:TG_API_HOST)
let TG_API_HOST = 'api.telegram.org';
// =======================================钉钉机器人通知设置区域===========================================
//此处填你钉钉 bot 的webhook，例如：5a544165465465645d0f31dca676e7bd07415asdasd
//(环境变量名 DD_BOT_TOKEN)
let DD_BOT_TOKEN = '';
//密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串
let DD_BOT_SECRET = '';

// =======================================企业微信机器人通知设置区域===========================================
//此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//(环境变量名 QYWX_KEY)
let QYWX_KEY = '';

// =======================================企业微信应用消息通知设置区域===========================================
/*
 此处填你企业微信应用消息的值(详见文档 https://work.weixin.qq.com/api/doc/90000/90135/90236)
 环境变量名 QYWX_AM依次填入 corpid,corpsecret,touser(注:多个成员ID使用|隔开),agentid,消息类型(选填,不填默认文本消息类型)
 注意用,号隔开(英文输入法的逗号)，例如：wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
 可选推送消息类型(推荐使用图文消息（mpnews）):
 - 文本卡片消息: 0 (数字零)
 - 文本消息: 1 (数字一)
 - 图文消息（mpnews）: 素材库图片id, 可查看此教程(http://note.youdao.com/s/HMiudGkb)或者(https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)
 */
let QYWX_AM = '';

// =======================================iGot聚合推送通知设置区域===========================================
//此处填您iGot的信息(推送key，例如：https://push.hellyw.com/XXXXXXXX)
let IGOT_PUSH_KEY = '';

// =======================================push+设置区域=======================================
//官方文档：http://www.pushplus.plus/
//PUSH_PLUS_TOKEN：微信扫码登录后一对一推送或一对多推送下面的token(您的Token)，不提供PUSH_PLUS_USER则默认为一对一推送
//PUSH_PLUS_USER： 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码，如果您是创建群组人。也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送）
let PUSH_PLUS_TOKEN = '';
let PUSH_PLUS_USER = '';

// =======================================Cool Push设置区域=======================================
//官方文档：https://cp.xuthus.cc/docs
//QQ_SKEY: Cool Push登录授权后推送消息的调用代码Skey
//QQ_MODE: 推送模式详情请登录获取QQ_SKEY后见https://cp.xuthus.cc/feat
let QQ_SKEY = '';
let QQ_MODE = '';

// =======================================智能微秘书设置区域=======================================
//官方文档：http://wechat.aibotk.com/docs/about
//AIBOTK_KEY： 填写智能微秘书个人中心的apikey
//AIBOTK_TYPE：填写发送的目标 room 或 contact, 填其他的不生效
//AIBOTK_NAME: 填写群名或用户昵称，和上面的type类型要对应
let AIBOTK_KEY = '';
let AIBOTK_TYPE = '';
let AIBOTK_NAME = '';

// =======================================飞书机器人设置区域=======================================
//官方文档：https://www.feishu.cn/hc/zh-CN/articles/360024984973
//FSKEY 飞书机器人的 FSKEY
let FSKEY = '';

// =======================================SMTP 邮件设置区域=======================================
// SMTP_SERVER: 填写 SMTP 发送邮件服务器，形如 smtp.exmail.qq.com:465
// SMTP_SSL: 填写 SMTP 发送邮件服务器是否使用 SSL，内容应为 true 或 false
// SMTP_EMAIL: 填写 SMTP 收发件邮箱，通知将会由自己发给自己
// SMTP_PASSWORD: 填写 SMTP 登录密码，也可能为特殊口令，视具体邮件服务商说明而定
// SMTP_NAME: 填写 SMTP 收发件人姓名，可随意填写
let SMTP_SERVER = '';
let SMTP_SSL = 'false';
let SMTP_EMAIL = '';
let SMTP_PASSWORD = '';
let SMTP_NAME = '';

//==========================云端环境变量的判断与接收=========================
if (process.env.GOTIFY_URL) {
  GOTIFY_URL = process.env.GOTIFY_URL;
}
if (process.env.GOTIFY_TOKEN) {
  GOTIFY_TOKEN = process.env.GOTIFY_TOKEN;
}
if (process.env.GOTIFY_PRIORITY) {
  GOTIFY_PRIORITY = process.env.GOTIFY_PRIORITY;
}

if (process.env.GOBOT_URL) {
  GOBOT_URL = process.env.GOBOT_URL;
}
if (process.env.GOBOT_TOKEN) {
  GOBOT_TOKEN = process.env.GOBOT_TOKEN;
}
if (process.env.GOBOT_QQ) {
  GOBOT_QQ = process.env.GOBOT_QQ;
}

if (process.env.PUSH_KEY) {
  SCKEY = process.env.PUSH_KEY;
}

if (process.env.DEER_KEY) {
  PUSHDEER_KEY = process.env.DEER_KEY;
  PUSHDEER_URL = process.env.DEER_URL;
}

if (process.env.CHAT_URL) {
  CHAT_URL = process.env.CHAT_URL;
}

if (process.env.CHAT_TOKEN) {
  CHAT_TOKEN = process.env.CHAT_TOKEN;
}

if (process.env.QQ_SKEY) {
  QQ_SKEY = process.env.QQ_SKEY;
}

if (process.env.QQ_MODE) {
  QQ_MODE = process.env.QQ_MODE;
}

if (process.env.BARK_PUSH) {
  if (
    process.env.BARK_PUSH.indexOf('https') > -1 ||
    process.env.BARK_PUSH.indexOf('http') > -1
  ) {
    //兼容BARK自建用户
    BARK_PUSH = process.env.BARK_PUSH;
  } else {
    BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH}`;
  }
  if (process.env.BARK_ICON) {
    BARK_ICON = process.env.BARK_ICON;
  }
  if (process.env.BARK_SOUND) {
    BARK_SOUND = process.env.BARK_SOUND;
  }
  if (process.env.BARK_GROUP) {
    BARK_GROUP = process.env.BARK_GROUP;
  }
} else {
  if (
    BARK_PUSH &&
    BARK_PUSH.indexOf('https') === -1 &&
    BARK_PUSH.indexOf('http') === -1
  ) {
    //兼容BARK本地用户只填写设备码的情况
    BARK_PUSH = `https://api.day.app/${BARK_PUSH}`;
  }
}
if (process.env.TG_BOT_TOKEN) {
  TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
}
if (process.env.TG_USER_ID) {
  TG_USER_ID = process.env.TG_USER_ID;
}
if (process.env.TG_PROXY_AUTH) TG_PROXY_AUTH = process.env.TG_PROXY_AUTH;
if (process.env.TG_PROXY_HOST) TG_PROXY_HOST = process.env.TG_PROXY_HOST;
if (process.env.TG_PROXY_PORT) TG_PROXY_PORT = process.env.TG_PROXY_PORT;
if (process.env.TG_API_HOST) TG_API_HOST = process.env.TG_API_HOST;

if (process.env.DD_BOT_TOKEN) {
  DD_BOT_TOKEN = process.env.DD_BOT_TOKEN;
  if (process.env.DD_BOT_SECRET) {
    DD_BOT_SECRET = process.env.DD_BOT_SECRET;
  }
}

if (process.env.QYWX_KEY) {
  QYWX_KEY = process.env.QYWX_KEY;
}

if (process.env.QYWX_AM) {
  QYWX_AM = process.env.QYWX_AM;
}

if (process.env.IGOT_PUSH_KEY) {
  IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY;
}

if (process.env.PUSH_PLUS_TOKEN) {
  PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN;
}
if (process.env.PUSH_PLUS_USER) {
  PUSH_PLUS_USER = process.env.PUSH_PLUS_USER;
}

if (process.env.AIBOTK_KEY) {
  AIBOTK_KEY = process.env.AIBOTK_KEY;
}
if (process.env.AIBOTK_TYPE) {
  AIBOTK_TYPE = process.env.AIBOTK_TYPE;
}
if (process.env.AIBOTK_NAME) {
  AIBOTK_NAME = process.env.AIBOTK_NAME;
}

if (process.env.FSKEY) {
  FSKEY = process.env.FSKEY;
}

if (process.env.SMTP_SERVER) {
  SMTP_SERVER = process.env.SMTP_SERVER;
}
if (process.env.SMTP_SSL) {
  SMTP_SSL = process.env.SMTP_SSL;
}
if (process.env.SMTP_EMAIL) {
  SMTP_EMAIL = process.env.SMTP_EMAIL;
}
if (process.env.SMTP_PASSWORD) {
  SMTP_PASSWORD = process.env.SMTP_PASSWORD;
}
if (process.env.SMTP_NAME) {
  SMTP_NAME = process.env.SMTP_NAME;
}
//==========================云端环境变量的判断与接收=========================

/**
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 * @returns {Promise<unknown>}
 */
async function sendNotify(
  text,
  desp,
  params = {},
  author = '\n\n本通知 By：https://github.com/whyour/qinglong',
) {
  //提供6种通知
  desp += author; //增加作者信息，防止被贩卖等
  await Promise.all([
    serverNotify(text, desp), //微信server酱
    pushPlusNotify(text, desp), //pushplus(推送加)
  ]);
  //由于上述两种微信通知需点击进去才能查看到详情，故text(标题内容)携带了账号序号以及昵称信息，方便不点击也可知道是哪个京东哪个活动
  text = text.match(/.*?(?=\s?-)/g) ? text.match(/.*?(?=\s?-)/g)[0] : text;
  await Promise.all([
    BarkNotify(text, desp, params), //iOS Bark APP
    tgBotNotify(text, desp), //telegram 机器人
    ddBotNotify(text, desp), //钉钉机器人
    qywxBotNotify(text, desp), //企业微信机器人
    qywxamNotify(text, 