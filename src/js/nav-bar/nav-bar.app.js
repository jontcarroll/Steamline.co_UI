class NavBar {
	constructor(apiPaths) {
    this.baseUrl = apiPaths.backOffice;	
    riot.observable(this);

    riot.mount('nav-bar', { app: this });
  }

  logOut() {
    Cookies.remove(api.helpers.STEAM_URL_COOKIE_NAME);
    window.location = "/login";
  }

  test() {
    alert('test');
  }
}