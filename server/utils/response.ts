import { ServerRequest } from "../dependcy/dep.ts";
export default function reponseUtil(req: ServerRequest, res: Response) {
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
    }else{
        body = res.body;
    }

    let response:any = {
        body: new TextEncoder().encode(body),
        status: res.status
    };
    if (res.headers) {
        response['headers'] = headers;
    }
    req.respond(response)
}
interface Response {
    body: Object | string,
    status: number,
    headers?: any
}