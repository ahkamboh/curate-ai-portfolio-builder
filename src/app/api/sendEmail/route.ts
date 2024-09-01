import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "../../../lib/firebase"; // Import your Firebase configuration
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json(); // Receive email and name from the request body

    // Reference to the user's document in the "waitlist" collection
    const userRef = doc(db, "waitlist", email); // Assume "waitlist" is your Firestore collection
    const userDoc = await getDoc(userRef);

    let emailSubject;
    let htmlContent;

    // Define countdown duration in milliseconds (e.g., 9 days)
    const countdownDuration =10 * 24 * 60 * 60 * 1000;

    let countdownEndTime;

    if (userDoc.exists()) {
      // If user already exists, fetch the joinedAt timestamp from the database
      const userData = userDoc.data();
      const joinedAt = userData.joinedAt.toMillis(); // Assuming Firestore Timestamp
      countdownEndTime = new Date(joinedAt + countdownDuration); // Calculate end time based on join date
    } else {
      // If new user, set the join time as now and calculate the countdown end time
      const joinedAt = new Date().getTime();
      countdownEndTime = new Date(joinedAt + countdownDuration); // Calculate end time for countdown

      // Add the new user to the waitlist with the current timestamp
      await setDoc(userRef, { name, email, joinedAt: new Date() });
    }

    // Calculate the remaining time for countdown
    const now = new Date().getTime();
    const distance = countdownEndTime.getTime() - now;

    // Calculate days, hours, minutes, and seconds remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (userDoc.exists()) {
      // User already exists in waitlist
      emailSubject = "You have already joined the waitlist!";
      htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
                text-align: center;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .message-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                text-align: center;
              }
              .message-content {
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                width: 100%;
                text-align: center;
              }
              .message-content h2 {
                margin: 0;
                font-size: 24px;
                color: #fa0053;
              }
              .message-content p {
                margin: 10px 0 0 0;
                font-size: 16px;
                color: #777;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #fa0053;
              }
              .countdown-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
              }
              .countdown-item {
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                width: 80px;
                text-align: center;
              }
              .countdown-item h2 {
                margin: 0;
                font-size: 32px;
                color: #fa0053;
              }
              .countdown-item p {
                margin: 0;
                font-size: 12px;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="https://i.imghippo.com/files/XKmIc1725101575.png" alt="curate" width="200" style="display:block; margin:0 auto;"/>
              <h1>Hello, ${name}!</h1>
              <p>You have already joined our waitlist!</p>
              <p>Curate is launching soon with exclusive early access to our portfolio-building platform, featuring AI guidance and stunning templates. Stay tuned!</p>
              <div class="message-container">
                <div class="message-content">
                  <h2>Thank You for Your Patience!</h2>
                  <p>We noticed that you've already joined our waitlist. No need to sign up again—we've got you covered!</p>
                  <p>We'll be in touch with more updates soon. Stay tuned!</p>
                </div>
              </div>
              <div class="countdown-container">
                <div class="countdown-item">
                  <h2>${String(days).padStart(2, '0')}</h2>
                  <p>DAYS</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(hours).padStart(2, '0')}</h2>
                  <p>HOURS</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(minutes).padStart(2, '0')}</h2>
                  <p>MIN</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(seconds).padStart(2, '0')}</h2>
                  <p>SEC</p>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>If you have any questions, feel free to <a href="mailto:hello@curateai.online">contact us</a>.</p>
            </div>
          </body>
        </html>
      `;
    } else {
      // User is new, add them to the waitlist
      await setDoc(userRef, { name, email, joinedAt: new Date() });

      emailSubject = `Welcome to the Waitlist, ${name}!`;
      htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
                text-align: center;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .countdown-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
              }
              .countdown-item {
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                width: 80px;
                text-align: center;
              }
              .countdown-item h2 {
                margin: 0;
                font-size: 32px;
                color: #fa0053;
              }
              .countdown-item p {
                margin: 0;
                font-size: 12px;
                color: #777;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #fa0053;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="https://i.imghippo.com/files/XKmIc1725101575.png" alt="curate" width="200" style="display:block; margin:0 auto;"/>
              <h1>Welcome, ${name}!</h1>
              <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
              <p>Curate is launching soon with exclusive early access to our portfolio-building platform, featuring AI guidance and stunning templates. Stay tuned!</p>
              <div class="countdown-container">
                <div class="countdown-item">
                  <h2>${String(days).padStart(2, '0')}</h2>
                  <p>DAYS</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(hours).padStart(2, '0')}</h2>
                  <p>HOURS</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(minutes).padStart(2, '0')}</h2>
                  <p>MIN</p>
                </div>
                <div class="countdown-item">
                  <h2>${String(seconds).padStart(2, '0')}</h2>
                  <p>SEC</p>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>If you have any questions, feel free to <a href="mailto:hello@curateai.online">contact us</a>.</p>
            </div>
          </body>
        </html>
      `;
    }   

    // Configure the transporter using your SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // True for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: `"Curate ai" <${process.env.SMTP_USER}>`,
      to: email, // Recipient's email address
      subject: emailSubject, // Subject line
      html: htmlContent, // HTML body content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Email sent successfully",
      previewURL: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
