import nodemailer from "nodemailer";

export async function POST(request) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /*
      Setting service as 'gmail' is the same as providing these settings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than Gmail, you need to provide these manually.
      Alternatively, you can use the well-known services and their settings from:
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
    */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, // Uncomment this line if you want to send a copy to the sender
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return new Response(JSON.stringify({ message: "Email sent" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}
