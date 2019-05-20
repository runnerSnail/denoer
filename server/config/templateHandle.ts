import {  BufReader, stringsReader, exists, existsSync, TextProtoReader } from "../dependcy/dep.ts";
const { execPath } = Deno;
function reader(s: string): TextProtoReader {
    return new TextProtoReader(new BufReader(stringsReader(s)));
}
type filename = string;
export async function handleHtmlTemplate(file: filename | string, obj: Object) {
    const decoder = new TextDecoder("utf-8");
    let unit8data: Uint8Array, textHtml: string;
    if (existsSync("./foo")) {
        unit8data = await Deno.readFile(file);
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