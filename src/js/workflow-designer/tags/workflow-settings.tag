<workflow-settings>
    <div class="form">
      <div>
        <label for="add-user-action" class="label">Workflow Name</label>
        <div class="field-wrap">
          <input class="field" class="created-workflow-name" ref={ nameChange } placeholder={ name } onchange={ changeName }>
        </div>
      </div>
      <div>
        <label for="form-section" class="label">Form Section:</label>
        <div class="field-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="form-section" id="form-section" class="field field-dark-bg" onchange={ formNodeChange }>
            <option value="null">Select Form Section</option>
            <option each={ formNodes } selected={ projectName.formNodeId===id } value={ id }>
              { name + '-' + state.formSectionName }
            </option>
          </select>
        </div>
      </div>
      <div>
        <label for="form-control" class="label">Form Control:</label>
        <div class="field-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="form-control" id="form-control" class="field field-dark-bg" onchange={ formControlChange }>
            <option value="null" selected={ utils.isNullOrUndefined(projectName.controlId) }>Select Control</option>
            <option each={ filterControls(formSectionControls) } value={ id } selected={ !utils.isNullOrUndefined(this.projectName.controlId)
              && this.projectName.controlId===id }>
              { label }
            </option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <div class="form">
      <label>Share project filter</label>
      <div>
        <label for="user-filter-from" class="label">filter from:</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="user-filter-from" id="user-filter-from" class="field" onchange={ tagPeoplUserFilterChange }>
            <option value="null">Select source</option>
            <option value="field" selected={ auFrom === 'field' }>Form Field</option>
            <option value="tag_cat" selected={ auFrom === 'tag_cat' }>Tag Category</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form" if={ auFrom === 'field' }>
      <div>
        <label for="uf-form-node-select" class="label">Select form step</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select
            class="field field-dark-bg"
            onchange={ shareFormNodeChange }>
            <option value="null">Select a form step</option>
            <option 
              each={ formNodes }
              selected={ auNodeId === id }
              value={ id }>
                { name + '-' + state.formSectionName }
            </option>
          </select>
        </div>
      </div>
      <div if={ shareFormSectionControls }>
        <label for="user-filter-tag-category" class="label">Select a control</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select 
            class="field field-dark-bg"
            onchange={ shareFormControlChange }>
            <option value="null">Select a control</option>
            <option 
              each={ filterShareControls(shareFormSectionControls) }
              value={ id }
              selected={ auControlId === id }>
                { label }
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="form" if={ auFrom === 'tag_cat' }>
      <div>
        <label for="user-filter-tag-category" class="label">Choose the filter category</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="user-filter-tag-category" id="user-filter-tag-category" class="field" onchange={ auFilterCategory }>
            <option value="null">Select a category</option>
            <option each={cat in categories} value={ cat.id } selected={ cat.id===auTagCategoryId } class="">
              { cat.name }
            </option>
          </select>
        </div>
      </div>
    </div>
  <script>

    const app = this.opts.app;
    this.app = app;
    this.name = app.name;
    this.projectName = app.projectName;
    this.formNodes = app.getFormNodes();
    this.categories = app.cache.categories;
    this.settings = app.settings;

    if (!utils.isNullOrUndefined(this.settings.shareProjectUserFilter)) {
      this.auFrom = this.settings.shareProjectUserFilter.from;
      this.auControlId = this.settings.shareProjectUserFilter.controlId;
      this.auNodeId = this.settings.shareProjectUserFilter.nodeId;
      this.auTagCategoryId = this.settings.shareProjectUserFilter.tagCategoryId;

    }
    else {
      this.auFrom = null;
      this.auControlId = null;
      this.auNodeId = null;
      this.auTagCategoryId = null;
    }

    const formNode = this.formNodes.find(p => p.id === this.projectName.formNodeId);
    if (!utils.isNullOrUndefined(formNode)) {
      this.formSectionControls = app.cache.formSectionControls[formNode.formSectionId];
    }

    if (!utils.isNullOrUndefined(this.auNodeId)) {
      const sfrmnd = this.formNodes.find(p => p.id === this.auNodeId);
      this.shareFormSectionControls = app.cache.formSectionControls[sfrmnd.formSectionId];
    }

    this.filterControls = (controls) => {
      if (utils.isNullOrUndefined(controls)) {
        return [];
      }

      return controls.filter(p => p.type == 'text');
    }

    this.filterShareControls = (controls) => {
      if (utils.isNullOrUndefined(controls)) {
        return [];
      }

      return controls.filter(p => p.type == 'choice');
    }

    this.tagPeoplUserFilterChange = (e) => {
      this.preventUpdate = true;
      this.auFrom = e.target.value;

      app.updateShareFilterFrom(this.auFrom);

      this.update();
    }

    this.formControlChange = (e) => {
      e.preventUpdate = true;

      let controlId = e.target.value;

      if (controlId === 'null') {
        controlId = null;
      }

      app.updateProjectNameControlId(
        controlId,
      );
    };

    this.formNodeChange = (e) => {
      e.preventUpdate = true;

      let nodeId = e.target.value;

      if (nodeId === 'null') {
        nodeId = null;
      }

      app.updateProjectNameFormNode(nodeId);
    };
    
    this.shareFormNodeChange = (e) => {
      e.preventUpdate = true;
      let nodeId = e.target.value;

      if (nodeId === 'null') {
        nodeId = null;
      }
      app.updateShareFilterFormNode(nodeId);
    };

    this.shareFormControlChange = (e) => {
      e.preventUpdate = true;

      let controlId = e.target.value;

      if (controlId === 'null') {
        controlId = null;
      }

      app.updateShareFilterFormNodeControl(
        controlId,
      );
    };

    this.changeName = (e) => {
      this.name = e.target.value;
      app.updateName(this.name);
    };

    this.updateFormControls = (e) => {
      this.formSectionControls = e.controls;
      this.update();
    };

    this.projectNameUpdated = (projectName) => {
      this.projectName = projectName;

      const fctrls = this.formSectionControls;
      this.formSectionControls = null;
      this.update();

      this.formSectionControls = fctrls;
      this.update();
    };

    this.spFiltersUpdate = (e) => {
      this.shareFormSectionControls = e.controls;
      this.update();
    }

    this.auFilterCategory = (e) => {
      const tagCatId = e.target.value;

      app.updateShareFilterTagCat(tagCatId);
      this.update();
    }

    this.on('mount', () => {
      app.on('nodesUpdated', this.nodesChanged);
      app.on('projectNameControlsUpdated', this.updateFormControls);
      app.on('projectNameUpdated', this.projectNameUpdated);
      app.on('shareFilterControlsUpdate', this.spFiltersUpdate);
    });
    this.on('unmount', () => {
      app.off('nodesUpdated', this.nodesChanged);
      app.off('projectNameControlsUpdated', this.updateFormControls);
      app.off('projectNameUpdated', this.projectNameUpdated);
      app.off('shareFilterControlsUpdate', this.spFiltersUpdate);
    });
  </script>
</workflow-settings>