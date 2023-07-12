const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'containers-us-west-44.railway.app',
  user: 'root',
  password: 'cuzFvia3Ml2Wb3JeKfJL',
  database: 'railway',
  port: '5623',
  waitForConnections: true,
});

if(pool){
    console.log("banco conectado")
}

module.exports = pool;
