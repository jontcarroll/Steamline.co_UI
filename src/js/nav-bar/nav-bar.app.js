class NavBar extends Authenticated {
	constructor(apiPaths) {
    super();
    this.baseUrl = apiPaths.backOffice;	
    riot.observable(this);

    riot.mount('nav-bar', { app: this });
  }
}