const nodemailer = require('nodemailer');
import configKeys from "../../config";


export const emailService = () => {
    const transporter = nodemailer.createTransport({
        service: configKeys.EMAIL_SERVICE || 'gmail',
        auth: {
            user: configKeys.EMAIL_USER,
            pass: configKeys.EMAIL_PASSWORD,
        }
    });
    
    
    let send_email = async (from_mail: string = configKeys.EMAIL_USER, to_mail: string, message: string, subject: string) => {
/*         console.log(from_mail, to_mail, message, subject);
 */        await transporter.sendMail(
            {
                from: from_mail,
                to: to_mail,
                subject: subject,
                text: message,
            }, (err: any) => {
                if (err) {
/*                     console.log(err);
 */                    return false;
                } else {
                    return true;
                }
            }
        );
    }    
  
    return {
        send_email,
    };
  };
  
  export type EmailService = typeof emailService;