import { mapTableName } from './conn.js'

let tableNames = await mapTableName()
console.log('tableNames ', tableNames)