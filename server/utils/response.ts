import { ServerRequest } from "../dependcy/dep.ts";

// req.respond({ body: new TextEncoder().encode(successHandle(200, result, '文章查询成功')), 
// status: 200 });

export default function reponse(req: ServerRequest, res: Response) {
    let headers = new Headers(), body: string;
    if (res.headers) {
        for (const key in res.headers) {
            if (res.headers.hasOwnProperty(key)) {
                headers.set(key, res.headers[key])
            }
        }
    }
    if (typeof res.body === 'object') {
        body = JSON.stringify(res.body)
    }
    let response = {
        body: new TextEncoder().encode(body),
        status: res.status
    };
    if (res.headers) {
        reponse['headers'] = headers;
    }
    req.respond(response)
}
interface Response {
    body: Object | string,
    status: number,
    headers?: any
}