import mysql from 'mysql'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
})
connection.connect()
export default connection