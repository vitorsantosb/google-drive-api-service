const {GetDatabase} = require('../../../../db/database');

async function StoreGoogleCredentials(credentials) {
  const { collections } = await GetDatabase();

  await collections.google_credentials.insertOne(JSON.parse(JSON.stringify(credentials)));
}


module.exports = {
  StoreGoogleCredentials
};