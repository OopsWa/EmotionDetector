var config = {
    port: 3000,
    cookie: {
        cookieSecret: 'EmotionDetector',
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'EmotionDetector'
    }
};
module.exports = config;