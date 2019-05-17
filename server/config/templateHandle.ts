import { TextProtoReader, BufReader, stringsReader } from "../dependcy/dep.ts";
const { execPath }=Deno;
function reader(s: string): TextProtoReader {
    return new TextProtoReader(new BufReader(stringsReader(s)));
}
export async function handleHtmlTemplate(filePath:string,obj:Object){
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(filePath);
    let textHtml = decoder.decode(data);
    let reg = /\${(.*)}/gm;
    textHtml = textHtml.replace(reg,(match,key)=>{
        console.log(match)
        console.log(key);
        console.log(obj)
        return obj[key];
    })
    console.log(textHtml);
    // let r = reader();
    // let [s, err] = await r.readLine();
    // console.log(s)
}
console.log(Deno.cwd())