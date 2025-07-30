const http = require('http');
const url = require('url');
const myModule = require('./module');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Content-Type', 'text/html; charset=utf-8'); // ✅ Fix weird symbols

  if (path === '/') {
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Node.js Custom Module App</title>
        <style>
          body {
            background-color: #f9f9f9;
            font-family: 'Segoe UI', sans-serif;
            text-align: center;
            padding: 80px;
          }
          h1 {
            font-size: 32px;
            color: #333;
            margin-bottom: 30px;
          }
          input {
            padding: 10px;
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }
          button {
            padding: 10px 20px;
            margin: 15px;
            background: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          button:hover {
            background: #0056b3;
          }
          form {
            margin: 20px;
          }
        </style>
      </head>
      <body>
        <h1>👋 Welcome to My Node.js App</h1>
        <form action="/hello">
          <input type="text" name="name" placeholder="Enter your name" required />
          <br><br>
          <button type="submit">Say Hello</button>
        </form>
        <form action="/time">
          <button type="submit">Get Current Time</button>
        </form>
      </body>
      </html>
    `);
  }

  else if (path === '/hello') {
    const name = query.name || "Guest";
    const message = myModule.getHello(name);
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #fff;
            padding: 50px;
            text-align: center;
          }
          h2 {
            font-size: 28px;
            color: #333;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            background: #007BFF;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <h2>${message}</h2>
        <a href="/">⬅️ Back</a>
      </body>
      </html>
    `);
  }

  else if (path === '/time') {
    const timeMessage = myModule.getCurrentTime();
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #fff;
            padding: 50px;
            text-align: center;
          }
          h2 {
            font-size: 28px;
            color: #333;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            background: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
          }
          a:hover {
            background: #1c7c31;
          }
        </style>
      </head>
      <body>
        <h2>${timeMessage}</h2>
        <a href="/">⬅️ Back</a>
      </body>
      </html>
    `);
  }

  else {
    res.end('<h2>404 - Page Not Found</h2>');
  }
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
