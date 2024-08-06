const { oAuth2Client } = require('../../../../../Services/GoogleDrive/GoogleApiConn');
const fs = require('node:fs');
const {StoreGoogleCredentials} = require('../../repository/google.repository');
module.exports = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.error('No code found in query parameters');
    res.status(400).send('No code found in query parameters');
    return;
  }

  console.log("Code: ", code);

  oAuth2Client.getToken(code, async (err, token) => {
    if (err) {
      console.error('Error retrieving access token', err);
      res.status(500).send('Error retrieving access token');
      return;
    }

    console.log("Token: ", token);

    oAuth2Client.setCredentials(token);
    
    await StoreGoogleCredentials(token);

    fs.writeFile('credentials.json', JSON.stringify(token), (err) => {
      if (err) {
        console.error('Error saving credentials', err);
        res.status(500).send('Error saving credentials');
        return;
      }
      console.log('Token stored to', 'credentials.json');
      res.send('Token stored to credentials.json - Successfully authenticated!');
    });
  });
}
