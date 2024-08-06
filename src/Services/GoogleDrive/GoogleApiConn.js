const dotenv = require('dotenv');
dotenv.config();

const {google} = require('googleapis');
const {readFileSync} = require('fs');


console.log('redirect_uri', process.env.REDIRECT_URI);

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

async function CheckCredentials(){
  try {
    const creds = readFileSync('credentials.json');
    oAuth2Client.setCredentials(JSON.parse(creds));
  } catch (error) {
    console.log('Error loading credentials file:', error);
  }
}

module.exports = {oAuth2Client, CheckCredentials};

