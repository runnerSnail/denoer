import {  BufReader, stringsReader, existsSync, TextProtoReader } from "../dependcy/dep.ts";
import { path } from "../dependcy/dep.ts";
const { readFileSync,cwd} = Deno;
function reader(s: string): TextProtoReader {
    return new TextProtoReader(new BufReader(stringsReader(s)));
}
type filename = string;
export async function handleHtmlTemplate(file: filename | string, obj: Object) {
    const decoder = new TextDecoder("utf-8");
    let unit8data: Uint8Array, textHtml: string;
    const actual = path.posix.resolve.apply(null, [cwd(),file]);
    if (existsSync(actual)) {
        unit8data = await readFileSync(actual);
        textHtml = decoder.decode(unit8data);
    } else {
        textHtml = file;
    }
    let reg = /\${\s*(.*)\s*}/gm;
    textHtml = textHtml.replace(reg, (match, key) => {
        return obj[key.trim()];
    })
    return textHtml;
}