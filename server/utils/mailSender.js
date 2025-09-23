const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function mailSender(email, title, body) {
  const result = await resend.emails.send({
    from: 'Study Notion <prakhar9704@gmail.com>', 
    to: [email],
    subject: title,
    html: body,
  });
  return result;
}

module.exports = mailSender;


// //nodemailer is a nodejs library used to connect the service of sending emails with ur application
// //firstly u have to create a tansporter it is used to get the password and sign in to the gamil account from where u want to send the gmail
// const nodemailer=require("nodemailer");
// require("dotenv").config();

// const mailSender=async function(email,title,body){
//     console.log("inside mail sender");
// //email->receivers address, title->title of the email
//    try{
//     console.log("inside try of mail sender");
//         let transporter=nodemailer.createTransport({
//             host:process.env.MAIL_HOST, 
//             port:587,
//             secure:false,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         })
//         //this line is used to specify the PLATFORM(GMAIL, or any other) from which we are sending email
//         //gets the email id from where the email need to be send by the help of dotenv file
//         //gets the password of the account from where the email need to be send(host)
// //sendMail is a fn provided by transporter to send the email
// console.log("after creating transporter sending mail");
//         let info=await transporter.sendMail({
//             from: `"Study Notion" <prakhar9704@gmail.com>`,
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`
//         })
//         //receiver will see this as the sender
//         //email of the receiver this email we took in the mailSender fn()
//         //the receiver will see the content(otp) of email in form of html

//         console.log("info of the mailsender function",info);
//         return info;
// }
// catch(error){
//     console.log(error.message);
// }
// }
// module.exports=mailSender;