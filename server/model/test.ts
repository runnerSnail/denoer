import { testDB } from "./db";
import { runTests, test } from "../dependcy/dep";
test(function(){
    testDB();
})
runTests()