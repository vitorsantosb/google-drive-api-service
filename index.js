const dotenv = require('dotenv');
dotenv.config();

function startHTTPServer() {
  const http = require('http');
  const app = require('./src/routes/app');
  const port = process.env.PORT || 8000;
  const server = http.createServer(app);

  return new Promise((resolve) => {
    server.listen(port, () => {

      console.log('[ROUTER] routes is now enabled: ' + port);
      resolve();
    });
  });
}

async function Init() {
  await startHTTPServer();
}

Init().catch(function (err) {
  console.error(err);
});