/**
 * メンバーレポジトリ
 */
var fs = require('fs');
var Cloudant = require('@cloudant/cloudant');
var dbCredentials = {};
var vcapServices ={};

//process.env.VCAP_SERVICESの有無によりBluemix下での稼動かどうかを判定
//Bluemix下でない場合は、ローカルのvcap-local.jsonの情報を元に同等の情報を生成。
if (process.env.VCAP_SERVICES) {
    vcapServices = JSON.parse(process.env.VCAP_SERVICES);
} else {
    vcapServices = JSON.parse(fs.readFileSync("./vcap-local.json", "utf-8"));
}

var conf = vcapServices.cloudantNoSQLDB[0];

//VCAP_SERVICESからcloudantへのアクセス情報を取得。
dbCredentials.url = conf.credentials.url;

//cloudantのアクセスクライアント生成
var cloudant = Cloudant(dbCredentials.url);
//cloudantに接続
dbCredentials.dbName = 'members';   //データベース名
module.exports.db = cloudant.use(dbCredentials.dbName);

//crud operations
module.exports.create = (data, callback) => {
    this.db.insert(data, callback);
};

module.exports.read = (id, callback) => {
    this.db.get(id, callback);
};

module.exports.update = (data, callback) => {
    this.db.insert(data, callback);
};

module.exports.del = (id, rev, callback) => {
    this.db.destroy(id, rev, callback);
};

module.exports.list = (params, callback) => {
    this.db.view('default', 'allByAccount', params, callback);
};
