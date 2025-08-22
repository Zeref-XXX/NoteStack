const nodemailer = require('nodemailer')
 
const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.PASSWORD
    }
}) 

const SendMail = async (verificationCode,email) => {
     
    try {
        const info = await transporter.sendMail({
            from: `"Welcome to NotStack" <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Verification Code ✔",
            text: "verify code",  
            html:  `
                <html>
                    <body>
                        <h1>Welcome to NoteStack!</h1>
                        <p>Your verification code is:</p>
                        <h2 style="color:blue;">${verificationCode}</h2>
                    </body>
                </html>
            `
        })
    }
    catch (err) {
        console.log("Error is", err)
    }

}
 

module.exports = SendMail;
// };