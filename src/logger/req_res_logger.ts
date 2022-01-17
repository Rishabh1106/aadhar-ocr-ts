import expressWinston from 'express-winston';
import winston from 'winston';
import uuid from 'node-uuid';

const { timestamp , label } = winston.format;
export const reqResLogger = 
    expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/req-res.log' }),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ],
    requestWhitelist: ['app','baseurl','cookies','hostname','ip','params','path','subdomains','secure','url', 'headers', 'method', 'httpVersion', 'originalUrl', 'query','body'],
    responseWhitelist: ['body','statusCode','statusMessage'],
    bodyBlacklist:['password'],
    format: winston.format.combine(
        timestamp(),
        label({ label: uuid.v4()}),
        winston.format.json()
    )
  })
 