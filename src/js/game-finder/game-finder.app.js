class GameFinderApp {
    constructor(apiPaths) {
      this.baseUrl = apiPaths.api;
      riot.observable(this);
  
  
      riot.mount('game-finder-app', { app: this });
    }

    /* Business Logic Goes Here */
    

    /*  */
  }