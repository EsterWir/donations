const express = require("express");
const request = require("request");
const querystring = require("querystring");
const creds = require("./login-proxy.creds.json");

const app = express();

const NG_PORT = 4200;
const PORT = process.env.PORT || 3000;

const APP_BASE =  creds['SERVER_NAME'];
const SERVER_HOST = creds['SERVER_HOST'];
const USERNAME = creds['SSO_USERNAME'];
const PASSWORD = creds['SSO_PASSWORD'];

const SERVER = `http://${SERVER_HOST}`;
const NG_URL = `http://localhost:${NG_PORT}`;
const API_URL = `${SERVER}/${APP_BASE}/`;

console.log(`## Proxy initialized on http://localhost:${PORT} ##`);
console.log(SERVER, NG_URL, API_URL);

function nocache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

function authenticate(req, res) {
  try {
        const form = {
          no_cert_storing: "on",
          j_salt: '',
          j_username: USERNAME,
          j_password: PASSWORD,
        };
        const uri = `${API_URL}sso.jsp`;
        const formData = querystring.stringify(form);
        
        console.log(`## [Login in] with data: ${formData} on ${uri} ##`);

        request({
          uri,
          method: "POST",
          body: formData,
          headers: {
            "Content-Length": formData.length,
            "Content-Type": "application/x-www-form-urlencoded",
            Host: SERVER_HOST,
            Origin: SERVER,
            Referer: `${API_URL}index.html`,
          }
        })
        .on("response", (response) => {
          console.log(`## [Login in] SUCCESS: ${response} ##`);
          
          const setCookies = response.headers["set-cookie"];

          for (const keyvalCookie of setCookies) {
            const partsCookie = keyvalCookie.split(/=(.+)/);
            res.cookie(partsCookie[0], decodeURIComponent(partsCookie[1]), {
              encode: decodeURIComponent,
            });
          }

          return res.redirect(NG_URL);
        })
        .on('error', (e) => {
          console.log(`## [Login in] FAILED: ${e} ##`);
        });
  } catch (e) {
    console.log(e);
  }
}

app.use("/login", nocache, authenticate);

app.listen(PORT, () => {
  console.log(`proxy listening on PORT :${PORT}`);
});
