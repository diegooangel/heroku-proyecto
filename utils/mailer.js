
const nodemailer = require('nodemailer');
const { EMAIL_ADMIN, PASS_ADMIN } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'diego09.11.2000@gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_ADMIN,
        pass: PASS_ADMIN
    },
    tls: {
        rejectUnauthorized: false
    }
});

const genericEmail = async(obj) => {
    try {
        const body = {
            to: obj.email,
            subject: obj.subject,
            html: obj.template
        }
        const info = await transporter.sendMail(body);
        console.log(info.messageId);
        return info;

    } catch (error) {
        throw error;
    }
}

const comments = async(obj) => {
    try {
        const subject = 'Realizaste una reserva. BariBike';
        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
        </head>
        <body style="background-color: black ">
        <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
            
            <tr>
                <td style="background-color: #ecf0f1">
                    <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                        <h2 style="color: #e67e22; margin: 0 0 7px">Hola </h2>
                        <p style="margin: 2px; font-size: 15px">
                          Esto es para recordarle que ha hecho una reserva el dia ${obj.date}
                        </p>
                        <ul style="font-size: 15px;  margin: 10px 0">
                            <li style="margin: 5px">Direccion: Avenida Bustillo km 20 - San Carlos de Bariloche - Argentina</li>
                            <li style="margin: 5px">Tel: 4444444</li>
                            <li style="margin: 5px">Cel: 2944333333</li>
                            <li style="margin: 5px; margin-bottom: 20px;">Email: baribike@gmail.com</li>
                        </ul>
                        <div style="width: 100%; text-align: center; margin-bottom: 20px">
                            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db;" 
                            href="#">Ir a la página</a>	
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        </body>
        `;

        const info = await genericEmail({ 
            email: obj.email,
            subject: subject,
            template: htmlTemplate
        });

        return info;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    genericEmail,
    comments
}
