  
import MailGen from 'mailgen';
import sgMail from '@sendgrid/mail'
// const MailGen = require('mailgen');
// const sgMail = require('@sendgrid/mail');

import fs from 'fs'
// import dotenv from 'dotenv-defaults'
// dotenv.config()

const sendMail = async (username, userEmail, item, type) => {
  var mailGenerator
  var email
  var emailTemplate
  var msg
  if (type === 'verify') {
    mailGenerator = new MailGen({
      theme: 'salted',
      product: {
        name: 'NTU CSIE Badminton',
        link: 'https://ntucsiebadminton.netlify.app/',
      }
    });
  
    email = {
      body: {
        name: username,
        intro: 'Welcome to email verification',
        action: {
          instructions: 'Please click the button below to verify your account',
          button: {
            color: '#33b5e5',
            text: 'Verify account',
            link: item
          }
        }
      }
    };
  
    emailTemplate = mailGenerator.generate(email);
    fs.writeFileSync('preview.html', emailTemplate, 'utf8');
  
    msg = {
      to: userEmail,
      from: 'b07902022@ntu.edu.tw',
      subject: 'Account Verification',
      html: emailTemplate,
    };
    
  } else if (type === 'add') {
    mailGenerator = new MailGen({
      theme: 'salted',
      product: {
        name: 'NTU CSIE Badminton',
        link: 'https://ntucsiebadminton.netlify.app/',
      }
    });
  
    email = {
      body: {
        name: username,
        intro: `You have registered ${item.title} from ${item.startDatetime} to ${item.endDatetime}`,
      }
    };
  
    emailTemplate = mailGenerator.generate(email);
    fs.writeFileSync('preview.html', emailTemplate, 'utf8');
  
    msg = {
      to: userEmail,
      from: 'b07902022@ntu.edu.tw',
      subject: 'Activity Registration',
      html: emailTemplate,
    };
  } else if (type === 'delete') {
    mailGenerator = new MailGen({
      theme: 'salted',
      product: {
        name: 'NTU CSIE Badminton',
        link: 'https://ntucsiebadminton.netlify.app/',
      }
    });
  
    email = {
      body: {
        name: username,
        intro: `You have unregistered ${item.title} from ${item.startDatetime} to ${item.endDatetime}`,
      }
    };
  
    emailTemplate = mailGenerator.generate(email);
    fs.writeFileSync('preview.html', emailTemplate, 'utf8');
  
    msg = {
      to: userEmail,
      from: 'b07902022@ntu.edu.tw',
      subject: 'Activity Unregistration',
      html: emailTemplate,
    };
  }


  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('____________________________________')
    return sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
}


export { sendMail as default };