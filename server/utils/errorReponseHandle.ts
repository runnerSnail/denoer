export default function errorReponseHandle(code:400 | 500 | 404,msg:string){
    return JSON.stringify({
        code,
        msg
    })
}