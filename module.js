// module.js

function getHello(name) {
  return `Hello, ${name}! Welcome to our Node.js app 🌟`;
}

function getCurrentTime() {
  const now = new Date();
  return `Current Server Time is: ${now.toLocaleString()}`;
}

module.exports = {
  getHello,
  getCurrentTime
};
