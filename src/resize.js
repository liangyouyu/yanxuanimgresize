const fs = require('fs');

const path = require('path');

const sharp = require("sharp");

const Type = /(jpg|png|jpeg|webp|gif)$/i;

const Escape = /\.[a-zA-Z]*?$/i;

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}


function resize(config) {

    const fileList = fs.readdirSync(config.path);

    for (let i = 0; i < fileList.length; i += 1) {

        if (Type.test(fileList[i])) {

            if (config.filterName) {
                console.log(config.filterName , fileList[i])
                if (config.filterName !== fileList[i]) {
                    console.log('-n 参数为过滤非当前输入名称的文件，输入：' + config.filterName + '｜过滤当前文件' + fileList[i]);
                    continue;
                }
            }


            let toPath = config.toPath;
            // let fileName = fileList[i].split('.')[0];
            let fileName = '详情图';
            let fileType = fileList[i].split('.')[1];
            // let pathName = toPath + '/' + fileList[i].split('.')[0];
            let pathName = toPath;

            if (!fsExistsSync(toPath)) {
                fs.mkdirSync(toPath,{recursive:true});
            }



            let img = sharp(path.join(config.path, fileList[i]));                     //Load image from file

            //加载图像文件
            img.metadata().then(info => {
                let num = Math.ceil(info.height / config.toHeight)
                let toHeight = info.height > config.toHeight ? config.toHeight : info.height;
                let toWidth = info.width > config.toWidth ? config.toWidth : info.width;

                if (num >= 18) {
                    num = 18
                    toHeight = Math.ceil(info.height / 18)
                }
                console.log(path.join(config.path, fileList[i]) + "\n分割成" + num + "张\n存储在"+path.join(pathName)+"。\n")

                for (let i = 0; i < num; i++) {
                    //最后一个剪裁到最后一个像素，可能不满一页
                    if (i == num - 1) {
                        img.extract({ left: 0, top: i * toHeight, width: toWidth, height: info.height - (i * toHeight) })                          //Geometric scaling the image to 400 pixels width
                            .toFile(path.join(pathName, fileName + '-' + (i + 1) + '.' + fileType));
                    } else {
                        img.extract({ left: 0, top: i * toHeight, width: toWidth, height: toHeight })                          //Geometric scaling the image to 400 pixels width
                            .toFile(path.join(pathName, fileName + '-' + (i + 1) + '.' + fileType));
                    }
                }

            })
        }

        else if (!Escape.test(fileList[i]) && fs.statSync(path.join(config.path, fileList[i])).isDirectory()) {
            resize(Object.assign({}, config, { path: path.join(config.path, fileList[i]), toPath: path.join(config.toPath, fileList[i]) }));
        }
    }
}

module.exports = resize;