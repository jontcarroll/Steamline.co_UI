class LoginForm {
  constructor(apiPaths) {
    this.baseUrl = apiPaths.auth;
    riot.observable(this);

  /*   if (!utils.isNullOrUndefined(token) && token.length != 0) {
      Cookies.set(api.helpers.JWT_COOKIE_NAME, token);
      window.location = '/';
    } */

    riot.mount('login-form', { app: this });
  }

  login(username, password) {
    //this.doLogin(username, password, 'backoffice/signin');
  }

  doLogin(username, password, path) {
/*     const axiosConfig = {
      url: `${this.baseUrl}/${path}`,
      method: 'post',
      data: {
        username: username,
        password: password
      }
    };

    axios(axiosConfig).then(resp => {
      const data = resp.data;
      
      Cookies.set(api.helpers.JWT_COOKIE_NAME, data.accessToken);
      window.location = '/';
      return;
    }).catch(error => {
      if (utils.isNullOrUndefined(error.response))
      {
        console.error(error);
        return;
      }

      if (error.response.status === 400) {
        const data = error.response.data;

        if (data.type === 'auth_invalid') {
          this.trigger('loginError', data.errors);
          return;
        }

        console.error(data);
      }
    }); */
  }
}