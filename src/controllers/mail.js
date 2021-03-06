import mailer from '../helpers/mailer';

// Send an email function
const sendConfirmEmail = (user = '') => {
  if (user) {
    const mailBody = `
      <div style="color: #5a5a5a;">
        <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
          <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
        </div>
        <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
          Hello ${user.firstName}, <br>
          Thank you for creating an account with us, please proceed to confirm your email.
        <p/>
        <div style="text-align: center; padding: 20px;">
          <a href="${URL}/api/v1/users/${user.id}/confirmEmail/${user.confirmationCode}"
            style="color: #fff; background-color: #3359DF; padding: 10px 20px; font-size: 1.2rem; text-align: center; text-decoration: none;"
          > Confirm email </a>
          <p style="font-size: 1.5rem; margin-top: 30px; color: #5a5a5a !important">
            Or copy the link below
          <p><br>
          ${URL}/api/v1/users/${user.id}/confirmEmail/${user.confirmationCode} 
        </div>
        <p style="color: #5a5a5a !important;>
          Thank you, <br>
          SendIT Team
        </p>
      </div>
    `;
    mailer({ subject: 'Email confirmation', to: user.email, html: mailBody });
  }
};

// Send a confirmation email function
const sendEmailConfirmed = (user = '') => {
  if (user) {
    const mailBody = `
      <div style="color: #5a5a5a;">
        <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
          <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
        </div>
        <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
          Your email <${user.email}> has been confirmed, your are now
          able to make a parcel delivery order
        <p/>
        <p style="color: #5a5a5a !important;"
          Thank you, <br>
          SendIT Team
        </p>
      </div>
    `;
    mailer({ subject: 'Email confirmed', to: user.email, html: mailBody });
  }
};

export default {
  sendConfirmEmail,
  sendEmailConfirmed,
};
