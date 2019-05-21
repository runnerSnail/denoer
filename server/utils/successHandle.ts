export default function successHandle(code:200,result:Object|Array<any>,msg?:string){
    return JSON.stringify({
        code,
        result,
        msg:msg||''
    })
}