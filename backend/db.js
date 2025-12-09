const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'businfo',
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Test connection on startup
pool.getConnection().then(conn => {
  console.log('✅ Database connected successfully!');
  conn.release();
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  console.error('Please make sure MySQL is running and credentials are correct.');
  console.error('Connection details:', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'businfo'
  });
});

module.exports = pool;
