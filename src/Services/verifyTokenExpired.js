function VerifyTokenIsExpired(token) {
  const timeNow = new Date().getTime();

  return timeNow >= token.expires;
}

module.exports = {
  VerifyTokenIsExpired,
};
