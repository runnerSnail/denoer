import { test, runTests } from "../dependcy/dep.ts";
import { setLogger } from "./config.ts";

test(async function testLogger(){
    let logger:any = await setLogger();
    logger.debug("fizz");
})
runTests()