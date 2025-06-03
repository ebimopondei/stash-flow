import { Details } from "express-useragent";
import User from "../database/models/User";
import { nodemailer, imap, transport } from "./config";
 
const path = require('path');
// const hbs = require('nodemailer-express-handlebars')
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'

const HOST_MAIL = "info@preskeyshop.com";
const TEST_RECIEVER = "ebi4jah15@gmail.com";

const handlebarOptions:NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve('./views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars",
  }
  

const sendMailToUser = async(email:string, subject:string, body:string)=>{
    const mailConfig = {
        from: HOST_MAIL,
        to: email,
        template: "user",
        context: {
            body: body
            
        },

        
        subject: subject,
    }

    // initialize transporter
    const transporter = transport();
    
    transporter.use('compile', hbs(handlebarOptions));
    transporter.verify(async function(error:Error) {
        if (error)console.log("❌ Error connecting to email connection <noreply_mail>");
        else console.log("<noreply_mail> Email connection successful 🚀");
    });
    
    try{

        const emailResponse = transporter.sendMail(mailConfig, (error:unknown, info:unknown)=>{
            if (error) {
                console.log("Error sending email:", error);
              } else {
                // @ts-expect-error
                console.log("Email sent:", info.response);
                // Save a copy of the sent email to the server's sent folder
                // @ts-expect-error
                transporter.copySentMail(info.messageId, (copyError, copyInfo) => {
                  if (copyError) {
                    console.log("Error saving sent email:", copyError);
                  } else {
                    console.log("Sent email saved:", copyInfo.response);
                  }
                });
              }
        }); 
        console.log(`a <noreply_mail> Email sent: ${(await emailResponse).messageId}`);
        console.log("b Preview URL: %s", nodemailer.getTestMessageUrl(emailResponse))
        return {success: true, message: "Email Sent Successfully"};
    } catch (err) {
        console.log("c ❌ Error sending <noreply_mail> email");
        return {success: false, message: "Error sending Email"};
    }
}

const login = async(user: User, options: { ip: string, useragent:Details })=>{
    // 3. Get and format the current date and time
const now = new Date();
const formattedDateTime = now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: '2-digit'
}).replace(',', '');

const time = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
const day = now.toLocaleString('en-US', { day: 'numeric' });
const month = now.toLocaleString('en-US', { month: 'short' });
const year = now.toLocaleString('en-US', { year: '2-digit' });

const combinedFormattedDateTime = `${time.replace(',', '')} ${day}${month}, ${year}`; 
    const mailConfig = {
        from: HOST_MAIL,
        to: user.email,
        template: "login",
        context: {
            name: user.firstname ,
            login_time: combinedFormattedDateTime,
            ip_address: options.ip,
            device_info: options.useragent.os,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Login Successful!",
    }

    // initialize transporter
    const transporter = transport();
    
    transporter.use('compile', hbs(handlebarOptions));
    transporter.verify(async function(error:Error) {
        if (error) console.error("❌ Error connecting to email connection <noreply_mail>");
        else console.info("<noreply_mail> Email connection successful 🚀");
    });
    
    try{

        const emailResponse = transporter.sendMail(mailConfig); 
        console.info(`a <noreply_mail> Email sent: ${(await emailResponse)?.messageId}`);
        console.info("b Preview URL: %s", nodemailer.getTestMessageUrl(emailResponse))
        return {success: true};
    } catch (err) {
        console.error("c ❌ Error sending <noreply_mail> email");
        return {success: false};
    }
}
const signup = async(user: User)=>{
    const mailConfig = {
        from: HOST_MAIL,
        to: user.email,
        template: "welcome",
        context: {
            name: user.email ,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Welcome To StashFlow",
    }

    // initialize transporter
    const transporter = transport();
    
    transporter.use('compile', hbs(handlebarOptions));
    transporter.verify(async function(error:Error) {
        if (error) console.error("❌ Error connecting to email connection <noreply_mail>");
        else console.info("<noreply_mail> Email connection successful 🚀");
    });
    
    try{

        const emailResponse = transporter.sendMail(mailConfig); 
        console.info(`a <noreply_mail> Email sent: ${(await emailResponse)?.messageId}`);
        console.info("b Preview URL: %s", nodemailer.getTestMessageUrl(emailResponse))
        return {success: true};
    } catch (err) {
        console.error("c ❌ Error sending <noreply_mail> email");
        return {success: false};
    }
}
const testMail = async()=>{
    const mailConfig = {
        from: HOST_MAIL,
        to: TEST_RECIEVER,
        template: "welcome",
        context: {
            name: "Pondei" ,
            support_email: "info@preskeyshop.com"
        },
        
        subject: "Welcome To StashFlow",
    }

    // initialize transporter
    const transporter = transport();
    
    transporter.use('compile', hbs(handlebarOptions));
    transporter.verify(async function(error:Error) {
        if (error) console.error("❌ Error connecting to email connection <noreply_mail>");
        else console.info("<noreply_mail> Email connection successful 🚀");
    });
    
    try{

        const emailResponse = transporter.sendMail(mailConfig); 
        console.info(`a <noreply_mail> Email sent: ${(await emailResponse)?.messageId}`);
        console.info("b Preview URL: %s", nodemailer.getTestMessageUrl(emailResponse))
        return {success: true};
    } catch (err) {
        console.error("c ❌ Error sending <noreply_mail> email");
        return {success: false};
    }
}

export { 
    sendMailToUser,
    testMail,
    login, signup
}


