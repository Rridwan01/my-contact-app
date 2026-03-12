'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// The single owner's email is stored securely in your .env file
const OWNER_EMAIL = process.env.OWNER_EMAIL as string; 

export async function sendContactEmail(formData: FormData) {
  const senderName = formData.get('senderName') as string;
  const senderEmail = formData.get('senderEmail') as string;
  const message = formData.get('message') as string;

  try {
    await resend.emails.send({
      from: 'Consultation Form <consultation@babalawoifawuyi.com>',
      to: OWNER_EMAIL, 
      replyTo: senderEmail, 
      subject: `New Message from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send email." };
  }
}