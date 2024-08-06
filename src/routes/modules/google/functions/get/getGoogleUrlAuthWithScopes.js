const {oAuth2Client} = require('../../../../../Services/GoogleDrive/GoogleApiConn');
const ScopeList = require("../../../../../config/google/scopes");
module.exports = async (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ScopeList,
  });
  console.log("URL: ", url);

  res.redirect(url);
}