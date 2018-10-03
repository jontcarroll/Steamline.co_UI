<workflow-form-node>
  <header class="drawer__header">
    <h3 class="h3">Form node</h3>
    <workflow-node-header
      app={ app }
      name={ node.name }
      type={ node.type }
      track={ node.track }
      statusid={ node.statusId }
      nodeid={ node.id }
      emailtemplateid={ node.emailTemplateId }>
    </workflow-node-header>
  </header>
  
  <div class="drawer__body">
    <div class="drawer__section">
      <label for="select-a-form" class="drawer__info block-label">Select a form</label>
      <div class="drawer__group">
        <div class="form">

          <div>
            <div class="field-wrap custom-select-wrap">
              <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
              <select
                name="select-a-form"
                id="select-a-form"
                class="field"
                ref="formList"
                onchange={ formChange }>
                <option value="null">Select a form</option>
                <option 
                  each={ publishedForms }
                  value={ id }
                  selected={ node.state.formId === id }>
                    { name }
                </option>
              </select>
            </div>
          </div>

          <div class="field-row field-colcount-2">
            <div class="field-col-1-2">
              <div class="field-wrap custom-select-wrap">
                <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
                <select 
                  class="field"
                  ref="formVersionList"
                  if={ !utils.isNullOrUndefined(formVersions) }
                  onchange={ formVersionChange }>
                  <option value="null">select a form version</option>
                  <option
                    each={ formVersions }
                    value={ id }
                    selected={ node.state.formVersionId === id}>
                      { versionNumber } { node.state.formLatestVersionId === id ? ' - latest' : '' }
                  </option>
                </select>
              </div>
            </div>

            <div class="field-col-1-2">
              <div class="field-wrap custom-select-wrap">
                <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
                <select
                  class="field"
                  ref="formSectionList"
                  if={ !utils.isNullOrUndefined(formSections) }
                  onchange={ formSectionChange }>
                  <option value="null">select a section</option>
                  <option 
                    each={ formSections }
                    value={ id }
                    selected={ node.formSectionId === id }>
                      { name }
                  </option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div> <!-- end .drawer__section -->
  

    <!-- <select 
      ref="formList"
      onchange={ formChange }>
      <option value="null">select a form</option>
      <option 
        each={ publishedForms }
        value={ id }
        selected={ node.state.formId === id }>
          { name }
      </option>
    </select>
    <select 
      ref="formVersionList"
      if={ !utils.isNullOrUndefined(formVersions) }
      onchange={ formVersionChange }>
      <option value="null">select a form version</option>
      <option
        each={ formVersions }
        value={ id }
        selected={ node.state.formVersionId === id}>
          { versionNumber } { node.state.formLatestVersionId === id ? ' - latest' : '' }
      </option>
    </select>
    <select ref="formSectionList"
      if={ !utils.isNullOrUndefined(formSections) }
      onchange={ formSectionChange }>
      <option value="null">select a section</option>
      <option 
        each={ formSections }
        value={ id }
        selected={ node.formSectionId === id }>
          { name }
      </option>
    </select> -->

    <div class="drawer__section">
      <label for="select-a-form" class="drawer__info block-label">Filters</label>
        <div class="drawer__group">
        <label for="include-requestor-checkbox" class="custom-checkbox-outer  block-label">
          <input name="include-requestor-checkbox"
            id="include-requestor-checkbox" class="visuallyhidden" type="checkbox"
            onChange={ includeRequestorUpdate }
            checked={ includeRequestor }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">include requestor</span>
        </label>
        <virtual each={ filterCloud, index in filterClouds }>
          <div class="drawer__innergroup" >
            <p class="drawer__msg" if={ index !== 0 }><span>or</span></p>
            <workflow-filter-select
              app={ app }
              filtercloud={ filterCloud }
              node={ node }
              filtercloudindex={ index }>
            </workflow-filter-select>
          </div>
        </virtual>
        <button class="btn btn-small"
          onClick={ addFilterCloud }>Add New Filter Cloud</button>
      </div>
    </div>

    <div class="drawer__section">
      <workflow-action-panel
        app={ app }
        rank={ 'primary' }
        nodeid={ node.id }
        useractions={ node.userActions }>
      </workflow-action-panel>
    </div>
  
    <div class="drawer__section">    
      <workflow-action-panel
        app={ app }
        rank={ 'secondary' }
        nodeid={ node.id }
        useractions={ node.userActions }>
      </workflow-action-panel>
    </div>

</div> <!-- end .drawer__body -->

  <style>
    :scope {
      display: block;
    }
  </style>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.node = this.opts.node;
    this.publishedForms = app.publishedForms;
    this.formVersions = app.cache.formVersions[this.node.state.formId];
    this.formSections = app.cache.formSections[this.node.state.formVersionId];
    this.filterClouds = this.node.state.filters;
    this.includeRequestor = this.node.filter.includeRequestor;

    if(utils.isNullOrUndefined(this.filterClouds)) {
      this.filterClouds = [];
    } else {
      let nextSequence = 0;
      for(let i = 0; i < this.filterClouds.length; i++) {
        if(nextSequence < this.filterClouds[i].sequence) {
          nextSequence = this.filterClouds[i].sequence;
        }
      }
      nextSequence++;
      this.node.nextFilterSeq = nextSequence;
    }

    if(utils.isNullOrUndefined(this.includeRequestor)) {
      this.includeRequestor = false;
    }

    this.formChange = (e) => {
      let selectedFormId = null;
      if (e.target.value !== 'null') {
        selectedFormId = parseInt(e.target.value);
      }

      const state = this.node.state;
      if (!utils.isNullOrUndefined(selectedFormId)) {
        const form = this.publishedForms.find(p => p.id === selectedFormId);
        state.formVersionId = form.versionId;
        state.formLatestVersionId = form.versionId;
      }
      else {
        state.formVersionId = null;
      }

      state.formId = selectedFormId;

      app.updateNodeState(state, this.node.id);
      app.loadFormVersions(state.formId, this.node.id);
      app.loadFormSections(state.formVersionId, this.node.id);
    };  

    this.formVersionChange = (e) => {
      let selectedFormVersionId = null;
      if (e.target.value !== 'null') {
        selectedFormVersionId = parseInt(e.target.value);
      }

      const state = this.node.state;
      state.formVersionId = selectedFormVersionId;

      app.updateNodeState(state, this.node.id);
      app.loadFormSections(state.formVersionId, this.node.id);
    };

    this.formSectionChange = (e) => {
      let selectedFormSectionId = null;
      if (e.target.value !== 'null') {
        selectedFormSectionId = parseInt(e.target.value);
      }

      const state = this.node.state;
      if (!utils.isNullOrUndefined(selectedFormSectionId)) {
        const formSection = this.formSections.find(p => p.id == selectedFormSectionId);
        state.formSectionName = formSection.name;
      } else {
        state.formSectionName = null;
      }

      app.updateNodeState(state, this.node.id);
      app.updateFormSectionId(selectedFormSectionId, this.node.id);
    };

    this.formVersionsUpdated = (e) => {
      if (e.nodeId !== this.node.id) {
        // not meant for this node
        return;
      }

      this.formVersions = e.formVersions;
      this.update();
    };

    this.formSectionsUpdated = (e) => {
      if (e.nodeId !== this.node.id) {
        // not meant for this node
        return;
      }

      this.formSections = e.formSections;
      this.update();
    };

    this.addFilterCloud = () => {
      app.addFilterCloud(this.node.id);
      this.update();
    };

    this.nodeUpdated = (node) => {
      if (node.id !== this.node.id) {
        // skip this node if the ids don't match
        return;
      }

      this.node = node;
      this.update();
    };

    this.cloudRemoved = () => {
      this.update();
    }

    this.includeRequestorUpdate = () => {
      this.includeRequestor = !this.includeRequestor;
      app.includeRequestorUpdate(this.node.id, this.includeRequestor);
      console.log(this.includeRequestor);
      this.update();
    }

    this.on('mount', () => {
      app.on('nodeUpdated', this.nodeUpdated);
      app.on('formVersionsUpdated', this.formVersionsUpdated);
      app.on('formSectionsUpdated', this.formSectionsUpdated);
      app.on('cloudRemoved', this.cloudRemoved);
    });

    this.on('unmount', () => {
      app.off('nodeUpdated', this.nodeUpdated);
      app.off('formVersionsUpdated', this.formVersionsUpdated);
      app.off('formSectionsUpdated', this.formSectionsUpdated);
      app.off('cloudRemoved', this.cloudRemoved);
    });
  </script>
</workflow-form-node>