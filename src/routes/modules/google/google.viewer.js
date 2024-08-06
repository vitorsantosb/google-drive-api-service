const GetGoogleAuthUrl = require('./functions/get/getGoogleUrlAuthWithScopes');
const GetGoogleCallBackUrl = require('./functions/get/getGoogleCallBackUrl');

const GoogleViewers = {
  GetGoogleAuthUrl,
  GetGoogleCallBackUrl
};

module.exports = GoogleViewers;