export default function formatSelectResult(queryResult:any, type?: string){
    let result : Object | Array<any>;
    if(!queryResult || !queryResult.rows || queryResult.rows.length === 0) return null;
    // 单行结果
    if(queryResult.rows.length === 1){
        if (type === 'array') {
            result = []
            let obj = {}
            for (let index = 0; index < queryResult.rows[0].length; index++) {
                obj[queryResult.rowDescription.columns[index].name] = queryResult.rows[0][index];
            }
            result = [obj]
        } else {
            result = {};
            for (let index = 0; index < queryResult.rows[0].length; index++) {
                result[queryResult.rowDescription.columns[index].name] = queryResult.rows[0][index];
            }
        }
    }
    // 多行结果
    if(queryResult.rows.length > 1){
        let tempResult = [];
        for(let row = 0;row < queryResult.rows.length;row++){
            let obj = {};
            for (let index = 0; index < queryResult.rows[0].length; index++) {
                obj[queryResult.rowDescription.columns[index].name] = queryResult.rows[row][index];
            }
            tempResult.push(obj);
        }
        result = tempResult;
    }

    return result;
}