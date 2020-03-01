const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
	service: 'gmail',
	auth: {
	  user: 'abanchaudry@gmail.com',
	  pass: 'jetsparrow@123'
	}
    // host: 'mail.itrc.group',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    // auth: {
    //     user: 'adnan@itrc.group', //  user
    //     pass: '786.Allah@786@786' //  password
    // }
}); 

class EmailManager {    
    
    async sendEmail(values) {
       let mailOptions = {
            from: '"Matter  👻" <abanchaudry@gmail.com>', // sender address
            to: values.val, // list of receivers
            subject: 'Hello ✔ ', // Subject line
            text: ' Thank you', // plain text body
            html: `<!DOCTYPE html>
			<html>
			<head>
				<style type="text/css">
				*{
					margin: 0px;
					padding: 0px;
				}
				body{
					background-color:#F2F3F4;
				}
					.row{
						width:60%;
						margin:auto;
						background-color:#fff;
						margin-top:20px;
						border: 1px solid #007236;
					}
					.heading-div{
						width:100%;
					}
					.heading-div h1{
						color:#007236;
						text-align: center;
						padding-top:20px;
						padding-bottom: 20px;
					}
					.content{
						width: 80%;
						padding:10px 100px;
					}
					 h2{
						color:#007236;
						text-align: center;
					}
					h3{
						color:#f79809;
						text-align: center;
					}
					.content p{
						margin: 15px auto;
						color: black;
						line-height: 28px;
						letter-spacing: .5px;
						width: 100%;
						font-size: 18px;
					}
					.verify-button{
						text-align: center;
						   margin-bottom: 40px;
					}
					.verify-button a{
						background-color: #007236;
						color: #ffffff;
						width: 30%;
					   padding: 10px 40px;
					   margin: auto;
					   font-size: 22px;
					
					   text-decoration: none;
					}
				</style>
			</head>
			<body>
			<div class="row">
				<div class="heading-div">
					<h1> Matter </h1>
					
					
				</div>
				<div class="content">
					
					<p>${values.text}</p>
				</div>
				<div class="verify-button">
					<a href=${values.url}>${values.button}</a>
				</div>
			</div>
			</body>
			</html>`
            
        };  
        return new Promise((resolve, reject) => {
            // send mail with defined transport object        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    reject(error);
                resolve(info);
            });
        });
    }
}

module.exports = new EmailManager();