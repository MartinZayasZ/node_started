// config.js
module.exports = {
    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'chat-app'
  }