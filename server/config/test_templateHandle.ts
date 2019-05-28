import { test, runTests, assertEquals } from "../dependcy/dep.ts";
import { handleHtmlTemplate } from "./templateHandle.ts";
/** 测试模版解析函数 */
test(async function testLogger(){
    let  html = await handleHtmlTemplate('fsfsfsf${a}',{a:1,b:2});
    assertEquals(html,'fsfsfsf1');
})
test(async function testLogger(){
    let  html = await handleHtmlTemplate('fsfsfsf ${ a   }',{a:1,b:2});
    assertEquals(html,'fsfsfsf 1');
})
test(async function testLogger(){
    let  html = await handleHtmlTemplate('<html>title:${ a   }<html>',{a:'测试'});
    assertEquals(html,'<html>title:测试<html>');
})
runTests()