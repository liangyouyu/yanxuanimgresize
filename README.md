## img-resize

*注:这是一个正在完善的内容,如果您发现有任何问题,可以到这里给我提issue.*

这是一个基于node的图像大小调整工具，需要你本机上装有node和npm

### 安装方法

```
npm install img-resize -g
```

### 使用


将图片宽度调整到750，高度调整到300,剪裁成多张:
-f 图片来源的文件or文件夹
-t 图片剪切后输出的文件夹
-w 图片剪切的宽度
-h 图片剪切的高度
-n 符合文件夹内的文件名才进行剪裁（可以不传，传了就只过滤符合文件名的文件）

```

node index.js -f ~/Downloads/2022-07-09 -t img -w 750 -h 1000 -n 详情长图.jpg

```

### 说明

目前支持JPEG、JPG、PNG、GIF、WEBP等常用图片格式