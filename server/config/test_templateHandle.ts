import { test, runTests } from "../dependcy/dep.ts";
import { handleHtmlTemplate } from "./templateHandle";
const { cwd } = Deno
test(async function testLogger(){
    let currentDir = cwd();
    handleHtmlTemplate(`${currentDir}/config/testHtml.html`,{a:1,b:2});
})
runTests()