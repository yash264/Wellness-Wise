const nodemailer = require("nodemailer");

const sendMail = async(email, name, message) => {
    try{
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "yp5094280@gmail.com",
                pass: "baneojbbbwbcbgwc",    //   bane ojbb bwbc bgwc
            },
        }); 

        const mailOptions = {
            from: {
                name: "Wellness Wise",
                address: "yp5094280@gmail.com"
            },
            to: email,
            subject: "Regarding your Response ",
            html:
                ` 
                    <html>
                            <h3>Welcome to WellNess Wise !! </h3>
                            <h5> Dear ${name} </h5>
                            <br>
                            <h5> ${message} </h5>
                            <br>
                            <p>We’re excited to have you as part of our community!! . If you have any questions or need help getting started, feel free to reach out.</p>
                            <br>
                            <p>We look forward to helping you get the most out of our services!</p>
                            <p>Best regards,</p>
                            <br>
                        <div>
                            <p>&copy; 2024 Designed, Developed and Hosted by Team Dev Designers.</p>
                        </div>
                    </html>
                `,
        };
        transport.sendMail(mailOptions, (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { sendMail };
