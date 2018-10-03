class FormMigrations extends MigrationRunner {
  constructor(app) {
    super(app);

    this.migrations.push(this.addIndexAndPreviewCheckoxes);
  }

  addIndexAndPreviewCheckoxes(app) {
    if (app.getSavedVersion() < 2) {
      console.log("upgrading controls");
      const sections = app.sections;
      console.log(sections);
      for (let i = 0; i < sections.length; i++) {
        const ctrls = sections[i].controls;
        for (let j = 0; j < ctrls.length; j++) {
          console.log(ctrls[j].label, ": index and preview added and set to false");
          ctrls[j].index = false;
          ctrls[j].preview = false;
        }
      }
    }
  }  
}