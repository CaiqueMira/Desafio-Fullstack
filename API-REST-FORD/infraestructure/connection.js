const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sqladmin852.',
    database: 'ford'
})

module.exports = connection