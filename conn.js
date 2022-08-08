import mysql from 'mysql'
import config from './config.js'
const connection = mysql.createConnection({
    ...config
})

const query = (queryValues) =>
    new Promise((reslove, reject) => {
        connection.connect()
        connection.query(queryValues, (e, res) => {
            reslove({ error: e, res })
        })
    })

/**
 * connDBQuery
 * 获取当前库下的所有表名
 */
export const mapTableName = async() => {
    let queryTables = `select TABLE_NAME from INFORMATION_SCHEMA.Tables where table_schema = "${config.database}"`
    const { error, res: tables } = await query(queryTables)
    if (!error) {
        return tables.map(item => item.TABLE_NAME)
    }
    return []
}