const pjson = require('./package.json');
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

require('dotenv').config();

if (!process.env.EXPRESS_ENV) {
  console.error('Server environment not properly set up. Are you missing the .env file?');
  return;
}

const isDevelopment = process.env.EXPRESS_ENV !== 'production';

const serverPort = process.env.EXPRESS_PORT || 3000;

app.use(cookieParser());

// const apiUrl = 'http://localhost:5000';

const apiUrl = process.env.EXPRESS_API_URL;
let apiProxyOpts = {};
if (isDevelopment) {
  apiProxyOpts = {
    changeOrigin: true,
    target: {
      https: true,
    }
  };
}
const apiProxy = httpProxy.createProxyServer(apiProxyOpts);

// TODO: switch to this cookie
const tokenCookieName = "jwt_token";

// Used for dev with local API, commented out so I can easily swap between them.


// This is passed to the template for nav bar
// this has to be kept in sync manually
const routes = [
  { key: 'index', name: 'Home', route: '/' },
];


nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

function getBaseVars() {
    return {
        apiPaths: JSON.stringify({ 
          api: '/api/v1.0',
          auth: '/auth/v1.0'
        }),
        appVersion: pjson.version,
        routes: JSON.stringify(routes)
    };
}

app.get('/', (req, res) => {
    vars = getBaseVars();
    vars.currentRouteKey = 'home';
    res.render('index.html', vars);
});

/* app.get('/login', (req, res) => {
    const token = req.query.token;
    vars = getBaseVars();
    vars.token = token;
    res.render('login.html', vars);
});


app.get('/formdesigner/:formId', (req, res) => {
    vars = getBaseVars();
    vars.formId = req.params.formId;
    vars.currentRouteKey = 'form-designer';
    res.render('form_designer.html', vars);
});

app.get('/workflows', (req, res) => {
    vars = getBaseVars();
    vars.currentRouteKey = 'workflow-designer';
    res.render('workflow_index.html', vars);
});

app.get('/workflows/designer', (req, res) => {
    vars = getBaseVars();
    vars.workflowId = null;
    vars.currentRouteKey = 'workflow-designer';
    res.render('workflow_designer.html', vars);
}); */

function forwardApi(req, res) {
  console.log(`fowarding auth traffic to ${apiUrl}`);
  if (isDevelopment) {
    req.headers['dynamic-builder-dev-host'] = 'mb.verizon.com.dev.epqa.us';
  }
  apiProxy.web(req, res, { target: apiUrl });
}

/**
 * Adds the JWT Token from the cookie to the request headers if it exists.
 * @param req
 * @param res
 * @param next
 */
/* function addAuthorizationTokenToRequest(req, res, next) {
    console.log(req.cookies);
    const token = req.cookies[`${tokenCookieName}`];
    if (token) {
        // console.log('Adding token to header', req.originalUrl);
        req.headers['Authorization'] = `Bearer ${token}`;
    }

    if (isDevelopment) {
      req.headers['dynamic-builder-dev-host'] = 'mb.verizon.com.dev.epqa.us';
    }

    next();
}

app.all('/api/*', addAuthorizationTokenToRequest);
app.all('/api/*', forwardApi);

if (isDevelopment) {
  app.all('/auth/*', (req, res, next) => {
    req.headers['dynamic-builder-dev-host'] = 'mb.verizon.com.dev.epqa.us';
    next();
  });
}

app.all('/auth/*', forwardApi);
app.all('/backoffice/*', addAuthorizationTokenToRequest);
app.all('/backoffice/*', forwardApi); */

app.use(express.static('static'));

app.listen(serverPort, () => console.log(`${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'} Server listening on port ${serverPort}.`));