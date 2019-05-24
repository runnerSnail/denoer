export default function formatSelectResult(queryResult:any){
    if(!queryResult || !queryResult.rows || queryResult.rows.length === 0) return null;
    let obj:any = {};
    for (let index = 0; index < queryResult.rows[0].length; index++) {
        obj[queryResult.rowDescription.columns[index].name] = queryResult.rows[0][index];
    }
    return obj;
}