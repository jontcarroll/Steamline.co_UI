class MigrationRunner {
  constructor(app) {
    this.app = app;
    /* 
     * list of migration functions to run
     * should take the form of f(app)
     */
    this.migrations = [];
  }

  runMigrations() {
    const savedVersion = this.app.getSavedVersion();
    const currentVersion = this.app.getClientVersion();
    console.log(`Start migration`);
    console.log(`Current ClientVersion: ${currentVersion}`);
    console.log(`Saved ClientVersion: ${savedVersion}`);

    if (!utils.isNullOrUndefined(savedVersion) && savedVersion >= currentVersion) {
      console.log('noting to run, versions match');
      return;
    }

    for (let i = 0; i < this.migrations.length; i++) {
      this.migrations[i](this.app);
    }

    console.log(`End migration`);
  }
}