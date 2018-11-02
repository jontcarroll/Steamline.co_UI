class Authenticated {
  constructor() {

    const steamUrl = Cookies.get(api.helpers.STEAM_URL_COOKIE_NAME);
    if (utils.isNullOrUndefined(steamUrl)) {
      console.error('could not find steam url');
      window.location = '/login';
      return;
    }
    
    return {
      jti: "",
      username: "",
      currentTenant: "",
    };

    /* For implementing JWT authentication */
    const token = Cookies.get(api.helpers.JWT_COOKIE_NAME);

    if (utils.isNullOrUndefined(token)) {
      console.error('No user available');
      window.location = '/login';
      return;
    }
  }

  setTokenCookie(token) {
    Cookies.set(api.helpers.JWT_COOKIE_NAME, token);
  }

  getUser() {
    const token = Cookies.get(api.helpers.JWT_COOKIE_NAME);

    if (utils.isNullOrUndefined(token)) {
      console.error('No user available');
      window.location = '/login';
      return;
    }

    const jwtParts = token.split('.');
    const payload = jwtParts[1];

    const decoded = window.atob(payload);
    const tokenObj = JSON.parse(decoded);

    return {
      jti: tokenObj.jti,
      username: tokenObj.uname,
      currentTenant: tokenObj.txref,
    };
  }

  signout() {
    Cookies.remove(api.helpers.JWT_COOKIE_NAME, '');
    window.location = '/login';
  }

  authReq(axiosConfig) {
  /*   const jwtName = api.helpers.JWT_COOKIE_NAME;
    const token = Cookies.get(jwtName);

    let hasError = false;
    if (utils.isNullOrUndefined(token)) {
      console.error(`Can't find ${jwtName} cookie`);
      hasError = true;
    } 

    if (hasError) {
      window.location = '/login';
      return;
    } */

    axiosConfig.headers = axiosConfig.headers || {};
/* 
    axiosConfig.headers['Authorization'] = `Bearer ${token}`;
 */
    const newConfig = api.helpers.complexParams(axiosConfig);
    const req = axios(newConfig);

    req.catch(error => {
      if (!utils.isNullOrUndefined(error.response)) {
        if (error.response.status === 401) {
          // Probably needs to be more graceful than this
          window.location = '/login';
          return;
        }
      } 
    });

    return req;
  }
}