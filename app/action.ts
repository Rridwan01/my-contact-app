'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL as string; 

export async function sendContactEmail(formData: FormData) {
  const senderName = formData.get('senderName') as string;
  const senderEmail = formData.get('senderEmail') as string;
  const readingType = formData.get('readingType') as string;
  const price = formData.get('price') as string;
  const senderMessage = formData.get('senderMessage') as string;

  try {
    let emailText = `Name: ${senderName}\nEmail: ${senderEmail}\n\nRequested Reading: ${readingType}\nPrice: $${price}`;
    if (senderMessage && senderMessage.trim()) {
      emailText += `\n\nMessage:\n${senderMessage}`;
    }

    await resend.emails.send({
      from: 'Consultation Form <consultation@babalawoifawuyi.com>',
      to: OWNER_EMAIL, 
      replyTo: senderEmail, 
      subject: `New Reading Request from ${senderName}`,
      text: emailText,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send email." };
  }
}