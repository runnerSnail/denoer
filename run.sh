echo '前端打包'
cd webapp && npm i && npm run build

echo '前端上传cdn'
cd webapp && npm run deploy

echo '拷贝打包后的html前端文件到template'
cp -r webapp/build/*.html server/template

echo '启动server'
