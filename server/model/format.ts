export default function formatSelectResult(queryResult:any){
    let obj:any = {};
    for (let index = 0; index < queryResult.rows[0].length; index++) {
        obj[queryResult.rowDescription.columns[index].name] = queryResult.rows[0][index];
    }
    return obj;
}