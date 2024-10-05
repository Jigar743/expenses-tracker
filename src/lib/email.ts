import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email: string, otp: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Example using Gmail
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
};
