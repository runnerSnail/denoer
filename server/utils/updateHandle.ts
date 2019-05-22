export default function setUpdateSql(tablename: string, whereValue: {
    column: string,
    id: string
}, obj: Object): string {
    let sql: string = `update ${tablename} set`;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            sql+=`${key} = ${obj[key]} `;
        }
    }
    sql+=`where ${whereValue.column} = ${whereValue.id}`;
    return sql;
}