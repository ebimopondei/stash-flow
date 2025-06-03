import { HOST, PASSWORD, PORT, SECURE, USER } from "../config/mailer";

const nodemailer = require('nodemailer');
const Imap = require('imap');
  
const host = HOST;
const port = PORT;
const secure = SECURE;
const auth = {
    user: USER,
    pass: PASSWORD,
};

const rejectUnauthorized= false;

const imapConfig = {
    user: USER,
    password: PASSWORD,
    host: 'mail.privateemail.com',
    port: 993,
    tls: {
        rejectUnauthorized: true,
      }
  };

const transport = () =>{
    let transport =  nodemailer.createTransport({
        host,
        port,
        secure,
        auth,
        tls: {rejectUnauthorized},
    })
    
    return transport;
}

const imap =  new Imap(imapConfig);

export { 
    nodemailer,
    imap,
    transport
}