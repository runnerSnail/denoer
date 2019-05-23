/**
 * github 获取授权过程 
 * 1 获取code https://github.com/login/oauth/authorize
 * 2 获取access_token post https://github.com/login/oauth/access_token
 * 3 发送get请求到https://api.github.com/user 需要设置user-Agent
 * 
 */
const { fetch } = window;
export default async function  login() {
    // 
    // await fetch('https://github.com/login/oauth/authorize?client_id=8bf81a16134ffeef7284&redirect_uri=http://127.0.0.1:8000/home')
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(myJson);
    //     });
    var url = 'https://github.com/login/oauth/access_token';
    var data = {
        client_id:'8bf81a16134ffeef7284',
        client_secret:'b93eb413a2e1e3243f8deadb3fc31f8dca18e404',
        code:'1059fa3689c8195ddde5'
    };

    await fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}
login()
// access_type: offline
// client_id: 5a4b7d7e8f0ee9d54af2
// response_type: code
// scope: user:email
// state: state
// Client ID
// 8bf81a16134ffeef7284
// Client Secret
// b93eb413a2e1e3243f8deadb3fc31f8dca18e404