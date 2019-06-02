// 引入模块
var COS = require('cos-nodejs-sdk-v5');
var OSSConfig = require('../config/OSSConfig');
var fs = require('fs');
var path = require('path');
// 使用永久密钥创建实例
var cos = new COS({
    SecretId: OSSConfig.SecretId,
    SecretKey: OSSConfig.SecretKey
});
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
}

var filesList = [];
readFileList(path.resolve(__dirname, '../build'), filesList);
filesList.map((value) => {
    cos.sliceUploadFile({
        Bucket: 'denoer-1255609850',
        Region: 'ap-chengdu',
        Key: value.split('build/')[1],
        FilePath: value
    }, function (err, data) {
        console.log(err, data);
    });
})