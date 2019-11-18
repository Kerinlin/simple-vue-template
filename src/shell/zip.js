const path = require("path");
const compressing = require("compressing");
const resolve = dir => path.join(__dirname, "..", dir);
const zipName = (() => `shell/dist.zip`)();
// const shellName=(() => `shell/deploy.sh`)();
// const exec = require('child_process').exec;

compressing.zip
  .compressDir(resolve("dist/"), resolve(zipName))
  .then(() => {
    console.log(`Tip: 文件压缩成功，已压缩至【${resolve(zipName)}】`);
    // const cli = `sh ${resolve(shellName)} ${resolve(zipName)}`;
    // exec(cli, { encoding: 'utf8' }, function (err, stdout, stderr) {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log('stdout' + stdout);
    //   console.log('stderr' + stderr);
    // })
  })
  .catch(err => {
    console.log("Tip: 压缩报错");
    console.error(err);
  });