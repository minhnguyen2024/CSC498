"use strict";
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { Email } from './email';

const transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "minhnguyen_csc498@outlook.com",
    pass: "csc498_Fall",
  },
});


// const emailHtml:string = 
// const emailHtml:string = render(<ResetPassword/>)

// async..await is not allowed in global scope, must use a wrapper
export async function sendSetPasswordEmail({ username, email, password}) {
  // send mail with defined transport object
  const emailHtml = render(<Email username={username} password={password}/>);

  const info = await transporter.sendMail({
    from: 'minhnguyen_csc498@outlook.com', // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "", // plain text body
    // html: `<b>Hello world? ${{ username, email, password}} go to localhost:3000/resetPassword</b>`, // html body
    html: emailHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

// sendSetPasswordEmail({ username, email, password }).catch(console.error);
