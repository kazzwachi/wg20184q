/**
 * vcap環境のアクセスユーティリティ。
 * 開発or本番環境によって、設定ファイルを読み込んだりが、いちいち面倒なので、
 * ここに集約。
 */
var fs = require('fs');

//process.env.VCAP_SERVICESの有無によりBluemix下での稼動かどうかを判定
//Bluemix下でない場合は、ローカルのvcap-local.jsonの情報を元に同等の情報を生成。
if (process.env.VCAP_SERVICES) {
    module.exports.vcapServices = JSON.parse(process.env.VCAP_SERVICES);
} else {
    module.exports.vcapServices = JSON.parse(fs.readFileSync("./vcap-local.json", "utf-8"));
}

//getServicesの呼び出して、欲しい情報が取り出せる（はず）
module.exports.getServices = function(serviceName){
    var regex = new RegExp(serviceName , 'i');
    for (var vcapService in this.vcapServices) {
        if (vcapService.match(regex)) {
            return this.vcapServices[vcapService];
        }
    }
    throw new Error('[' + serviceName + ']の設定が見つかりませんでした。');
};
