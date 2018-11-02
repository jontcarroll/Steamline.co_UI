class LoginForm {
  constructor(apiPaths) {
    this.baseUrl = apiPaths.api;
    console.log(this.baseUrl);
    riot.observable(this);
    this.steamId = null;

/*     const steamUrl = Cookies.get(api.helpers.STEAM_URL_COOKIE_NAME);
    if (!utils.isNullOrUndefined(steamUrl) && steamUrl.length != 0) {
      Cookies.set(api.helpers.STEAM_URL_COOKIE_NAME, steamUrl);
      window.location = '/';
    }
 */
    riot.mount('login-form', { app: this });
  }

  login(steamUrl) {
    this.getSteamId(steamUrl);
  }

  getSteamId(steamUrl) {
    const axiosConfig = {
      url: encodeURI(`${this.baseUrl}/gamefinder/getSteamIdFromProfileUrl?url=${steamUrl}`),
      method: 'get'
    };

    axios(axiosConfig).then(resp => {
      console.log(resp.data);
      this.steamId = resp.data;
      Cookies.set(api.helpers.STEAM_URL_COOKIE_NAME, this.steamId);
      window.location = "/";
    }).catch(error => {
      console.log(error);
      alert('error');
    })
  }

  doLogin(steamUrl) {
    if (!utils.isNullOrUndefined(steamUrl) && steamUrl.length > 0) {
      Cookies.set(api.helpers.STEAM_URL_COOKIE_NAME, steamUrl);
      window.location = '/';
    }
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