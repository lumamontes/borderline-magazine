export const prerender = false;
import type { APIRoute } from 'astro';
import { resend } from '@/lib/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Contact API called');
    
    const formData = await request.formData();
    console.log('Form data received:', {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    });
    
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      timestamp: new Date().toISOString()
    };

    // Basic validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      console.log('Validation failed: missing required fields');
      return new Response(
        JSON.stringify({ error: 'All required fields must be filled.' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      console.log('Validation failed: invalid email format');
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

      // Send email via Resend
      const toEmail = 'theborderline21@gmail.com';
      const fromEmail = 'noreply@thetaharpia.com';
      const subject = `New contact message from ${contactData.name}`;
      const html = `
        <h2>New contact message received via website</h2>
        <ul>
          <li><strong>Name:</strong> ${contactData.name}</li>
          <li><strong>Email:</strong> ${contactData.email}</li>
          <li><strong>Message:</strong><br>${contactData.message.replace(/\n/g, '<br>')}</li>
        </ul>
        <p><small>Sent on: ${new Date(contactData.timestamp).toLocaleDateString()}</small></p>
      `;

      try {
        const res = await resend.emails.send({
          to: toEmail,
          from: fromEmail,
          subject,
          html,
          replyTo: contactData.email,
        });
        console.log('Resend response:', res);
        if (res.error) {
          throw new Error(res.error.message || 'Error sending email');
        }
      } catch (err) {
        console.error('Error sending email via Resend:', err);
        return new Response(
          JSON.stringify({ error: 'Error sending email. Please try again later.' }),
          {
            status: 500,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          }
        );
      }

    // Success response
    console.log('Email sent successfully');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! We will get back to you within 48 hours.' 
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error. Please try again in a few moments.' 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};