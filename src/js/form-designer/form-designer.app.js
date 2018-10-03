class FormDesigner extends Authenticated {
    constructor(apiPaths, formId) {
        super();
        this.formId = formId;
        this.baseUrl = apiPaths.api + '/designer/forms';
        this.categoriesUrl = `${apiPaths.api}/tag/categories`;
        this.assetTypesUrl = `${apiPaths.api}/assets/types`;
        riot.observable(this);

        this.sections = [];
        this.currentSectionId = 0;
        this.currentControlId = 0;
        this.assetTypes = [];

        riot.mount('form-designer', { app: this });
    }

    // Retrieve stored clientVersion of the loaded form design
    // It's used to determine if any migration logic needs to be run
    // to bring this design up to the latest client version
    getSavedVersion() {
      if (utils.isNullOrUndefined(this.clientVersion)) {
        return 0;
      }

      return this.clientVersion;
    }

    // This should be bumped if there are ANY breaking changes
    // and should be paired with a migration function to upgrade
    // any old designs to work with new version
    getClientVersion() {
      return 2;
    }

    setFormName(name) {
        this.name = name;
    }

    addSection() {
        let id = this.currentSectionId++;
        this.sections.push({ id: id, name: '', controls: [] });

        this.curControlOpen = null;
        this.trigger('updateSections', this.sections);
    }

    removeSection(id) {
        let index = this.sections.findIndex(p => p.id == id);
        this.sections.splice(index, 1);

        this.curControlOpen = null;
        this.trigger('updateSections', this.sections);
    }

    addControlToSection(id, controlModel) {
        // let control = this.controlBuilder[controlModel.type](controlModel);
        controlModel.id = this.currentControlId++;
        let section = this.sections.find(p => p.id == id);

        section.controls.push(controlModel);
        this.curControlOpen = controlModel.id;
        this.trigger('updateSection', section);
    }

  /**
   * Creates a new control of the given type and subtype.
   * @param controlType
   * @param controlSubType
   * @param controlLabel
   * @returns {*}
   */
    createNewControl(controlType, controlSubType, controlLabel) {

      if (controlType === 'static') {
        if (controlSubType === 'text') {
          return {
            type: 'static',
            subType: 'text',
            label: 'Static text goes here.'
          };
        }
      }
      else if (controlType === 'text') {
        if (controlSubType === 'single') {
          return {
            type: 'text',
            subType: 'single',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false
          };
        }
        else if (controlSubType === 'area') {
          return {
            type: 'text',
            subType: 'area',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false
          };
        }
      }
      else if (controlType === 'choice') {
        if (controlSubType === 'radio') {
          return {
            type: 'choice',
            subType: 'radio',
            label: 'Untitled label',
            index: false,
            preview: false,
            choices: [
              {
                name: "Option 1",
                default: false
              }
            ],
            required: false
          };
        }
        else if (controlSubType === 'checkbox') {
            return {
              type: 'choice',
              subType: 'checkbox',
              label: 'Untitled label',
              index: false,
              preview: false,
              choices: [
                {
                  name: "Option 1",
                  default: false
                }
              ],
              required: false
            };
          }
        else if (controlSubType === 'single') {
          return {
            type: 'choice',
            subType: 'single',
            label: 'Untitled label',
            index: false,
            preview: false,
            choices: [
              {
                name: 'Option 1',
                default: false
              }
            ],
            required: false
          };
        }
        else if (controlSubType === 'multiple') {
            return {
              type: 'choice',
              subType: 'multiple',
              label: 'Untitled label',
              index: false,
              preview: false,
              choices: [
                {
                  name: 'Option 1',
                  default: false
                }
              ],
              required: false
            };
          }
      }
      else if (controlType === 'date') {
        if (controlSubType === 'single') {
          return {
            type: 'date',
            subType: 'single',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false
          };
        }
        else if (controlSubType === 'range') {
          return {
            type: 'date',
            subType: 'range',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false
          };
        }
      }
      else if (controlType === 'file') {
        if (controlSubType == 'single') {
          return {
            type: 'file',
            subType: 'single',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false
          };
        }
      }
      else if (controlType === 'asset') {
        if (controlSubType == 'multiple') {
          return {
            type: 'asset',
            subType: 'multiple',
            label: 'Untitled label',
            index: false,
            preview: false,
            required: false,
            assetTypeId: null,
            prepopulateFromWorkflow: true
          };
        }
      }

      // This means failure
      return null;
    }

    moveControlDown(sectionId, controlId) {
        let section = this.sections.find(p => p.id == sectionId);
        let index = section.controls.findIndex(p => p.id == controlId);

        if (index >= (section.controls.length - 1)) {
            console.log("can't move control past the start");
            return;
        }

        let nextControl = section.controls[index + 1];
        section.controls[index + 1] = section.controls[index];
        section.controls[index] = nextControl;

        this.curControlOpen = null;
        this.trigger('updateSection', section);
    }

    moveControlUp(sectionId, controlId) {
        let section = this.sections.find(p => p.id == sectionId);
        let index = section.controls.findIndex(p => p.id == controlId);
        
        if (index == 0) {
            console.log("can't move control past the end");
            return;
        }

        let prevControl = section.controls[index - 1];
        section.controls[index - 1] = section.controls[index];
        section.controls[index] = prevControl;

        this.curControlOpen = null;
        this.trigger('updateSection', section);
    }
    
    removeControlFromSection(sectionId, controlId) {
        let section = this.sections.find(p => p.id == sectionId);
        let controlIndex = section.controls.findIndex(p => p.id == controlId);

        section.controls.splice(controlIndex, 1);

        this.curControlOpen = null;
        this.trigger('updateSection', section);
    }

  /**
   * Changes a control to a new type.
   * @param sectionId
   * @param controlId
   * @param newType
   * @param newSubType
   */
    changeControlType(sectionId, controlId, newType, newSubType) {
      let section = this.sections.find(p => p.id === sectionId);
      let controlIndex = section.controls.findIndex(p => p.id === controlId);

      if (controlIndex < 0) {
        return;
      }

      const originalControl = section.controls[controlIndex];
      if (originalControl.type === newType && originalControl.subType === newSubType) {
        // new type/subtype are the same, so don't change anything
        return;
      }

      const newControl = this.createNewControl(newType, newSubType);
      if (utils.isNullOrUndefined(newControl)) {
        return;
      }

      newControl.id = originalControl.id;
      for (const key in originalControl) {
        if (!originalControl.hasOwnProperty(key) || !newControl.hasOwnProperty(key) ||
            key === 'type' || key === 'subType') {
          continue;
        }
        newControl[key] = originalControl[key];
      }
      section.controls[controlIndex] = newControl;
      this.curControlOpen = null;
      this.trigger('updateSection', section);
    }

    setSectionName(id, name) {
        let section = this.sections.find(p => p.id == id);

        section.name = name;
    }

    getFilters() {
        const config = api.helpers.page(0, 100, {
          url: this.categoriesUrl,
          method: 'get'
        });

        return this.authReq(config).then(resp => {
          const data = resp.data;
          this.filters = data.records;
          this.trigger("filtersLoaded", this.filters);
        });
    }

    getAssetTypes() {
      const config = {
        url: this.assetTypesUrl,
        method: 'get'
      };

      return this.authReq(config).then(resp => {
        const data = resp.data;
        this.assetTypes = data.records;
        this.trigger('assetTypesLoaded');
      });
    }

    loadModel() {
        if (this.formId) {
            this.authReq({
                method: 'get',
                url: this.baseUrl + '/' + this.formId,
            }).then(resp => {
                if (resp.status === 200) {
                    let form = JSON.parse(resp.data.model);

                    // console.log('loadModel', form);

                    this.name = resp.data.name;
                    this.isDraft = resp.data.isDraft;
                    this.sections = form.sections;
                    this.clientVersion = form.clientVersion;
                    this.currentSectionId = form.currentSectionId || 0;
                    this.currentControlId = form.currentControlId || 0;

                    new FormMigrations(this).runMigrations();
                    this.trigger('modelLoaded');
                }
            });
        }
        else {
            this.clientVersion = this.getClientVersion();
            this.trigger('modelLoaded');
        }

    }

    save() {
        let payload = {
            name: this.name,
            model: JSON.stringify({
                clientVersion: this.getClientVersion(),
                sections: this.sections,
                currentSectionId: this.currentSectionId,
                currentControlId: this.currentControlId
            })
        };

        if (this.formId) {
            this.authReq({
                method: 'put',
                url: this.baseUrl + '/' + this.formId,
                data: payload
            }).then(resp => {
                if (resp.status == 204) {
                    this.isDraft = true;
                    this.trigger('modelLoaded');
                    this.trigger('alert', { type: 'success', message: 'Form Saved'});
                }
            }).catch(error => {
                let resp = error.response;
                if (resp.status == 400 || resp.status == 404)
                {
                    this.sendErrors(resp.data);
                    console.log(resp.data);
                }
            });
        }
        else {
            this.authReq({
                method: 'post',
                url: this.baseUrl,
                data: payload
            }).then(resp => {
                if (resp.status == 200) {
                    this.isDraft = true;
                    this.formId = resp.data;
                    this.trigger('modelLoaded');
                    this.trigger('alert', { type: 'success', message: 'Form created and saved'});
                    window.history.pushState(null, null, '/formdesigner/' + resp.data);
                }                
            }).catch(error => {
                let resp = error.response;
                if (resp.status == 400)
                {
                    this.trigger('alert', { type: 'error', message: 'Failed to save form'});
                    this.sendErrors(resp.data);
                    console.log(resp.data);
                }
            });
        }
    }

    sendErrors(errorModel) {
        errorModel.errors.forEach(err => this.trigger('toast', { type: 'error', message: err}));

        if (errorModel.sections) {
            errorModel.sections.forEach(sec => sec.errors.forEach(err => this.trigger('toast', { type:'error', message: err})));
        }
    }

    removeDraft() {
        this.authReq({
            method: 'delete',
            url: this.baseUrl + '/' + this.formId + '/draft',
        }).then(resp => {
            if (resp.status == 204) {
                this.loadModel();
                this.trigger('alert', { type: 'success', message: 'Draft removed'});
            }
        }).catch(error => {
            let resp = error.response;
            if (resp.status == 400)
            {
                this.trigger('alert', { type: 'error', message: 'Failed to save form'});
                this.sendErrors(resp.data);
                console.log(resp.data);
            }
        });
    }

    publish() {
        let payload = {
            name: this.name,
            model: JSON.stringify({
                clientVersion: this.getClientVersion(),
                sections: this.sections,
                currentSectionId: this.currentSectionId,
                currentControlId: this.currentControlId
            })
        };

        this.authReq({
            method: 'put',
            url: this.baseUrl + '/' + this.formId,
            data: payload
        }).then(resp => {
            if (resp.status == 204) {
                this.authReq({
                    method: 'post',
                    url: this.baseUrl + '/' + this.formId + '/publish',
                }).then(resp => {
                    if (resp.status == 204) {
                        this.trigger('alert', { type: 'success', message: 'Form published'});
                        this.loadModel();
                    }
                }).catch(error => {
                    let resp = error.response;
                    if (resp.status == 400 || resp.status == 404)
                    {
                        this.trigger('alert', { type: 'error', message: 'Failed to publish form'});
                        this.sendErrors(resp.data);
                        console.log(resp.data);
                    }
                });
            }
        }).catch(error => {
            let resp = error.response;
            if (resp.status == 400 || resp.status == 404)
            {
                console.log(resp.data);
                this.trigger('alert', { type: 'error', message: 'Failed to save form'});
                this.sendErrors(resp.data);
            }
        }); 
    }

    backToList() {
        window.location = '/formdesigner';
    }
}