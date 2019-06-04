export default function setUpdateSql(tablename: string, whereValue: {
    column: string,
    id: string
}, obj: Object): string {
    let sql: string = `update ${tablename} set`;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if(key==='support_num' || key==='read_num'){
                sql+=` ${key} = ${key} + 1,`
            }else{
                sql+=` ${key} = ${obj[key]},`;
            }
        }
    }
    sql = sql.slice(0,sql.length-1);
    sql+=` where ${whereValue.column} = ${whereValue.id};`;
    return sql;
}