import mysql from 'mysql'
import config from './config.js'
const connection = mysql.createConnection({
    ...config
})

connection.connect()

/**
 * 封装sql query
 */
const query = (queryValues) =>
    new Promise((reslove, reject) =>
        connection.query(queryValues, (e, res) => {
            reslove({ error: e, res })
        })
    )

/**
 * mapTableName
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

/**
 * mapTableStructure
 * 获取表格相关的所有结构
 */
export const mapTableStructure = async() => {
    let tables = await mapTableName()
    tables.map(async table => {
        const queryStructure = `select * from information_schema.columns where table_schema= "${config.database}" and table_name = "${table}"`
        const { error, res } = await query(queryStructure)
        if (!error) {
            return [...res]
        } else {
            return []
        }
    })
}