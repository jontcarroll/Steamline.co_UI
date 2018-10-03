<form-control-text-input>

  <div class="designer__group { is-edit-mode: showEditMode }">
    <div class="designerRemote" if="{ showEditMode }">
      <form-designer-control-nav
              app="{app}"
              sectionid="{sectionid}"
              control="{control}"></form-designer-control-nav>
      <div class="designer__smallgroup">
        <label for="prePop-check-{sectionid}-{control.id}" class="custom-checkbox-outer label block-label">
          <input name="prePop-check-{sectionid}-{control.id}"
          id="prePop-check-{sectionid}-{control.id}" class="visuallyhidden"
          type="checkbox" onchange="{ togglePrePopulatedControl }"
          checked={ isPrePopulated }
          checked={ control.showPrePopulatedControl }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Pre-populated data</span>
        </label>
      </div>
    </div>
    <!-- View Mode -->
    <div class="designer__form" if="{ !showEditMode }" onClick="{ toggleEditMode }">
      <!--  <small class="">{ control.type } / { control.subType }</small>  -->
      <p class="designer__subtitle">{ control.label }</p>
      <p>{ control.description }</p>
      <p if={ control.showPrePopulatedControl }>[Pre-populated fields]</p>
      <div class="field-wrap">
        <textarea class="field" type="text" rows="4" if={ control.subType === 'area' }></textarea>
        <input class="field" type="text" if={ control.subType === 'single' }>
      </div>
    </div>
    <!-- Edit Label and Description -->
    <div class="designer__form" if="{ showEditMode }">
      <textarea class="designer__subtitle" type="text" ref="label" onchange="{onLabelChanged}">{ control.label }</textarea>
      <textarea class="designer__desc"
                type="text"
                placeholder="Add description"
                onchange="{ onDescriptionChanged }"
                ref="description"></textarea>
    </div>
    <!-- PrePopulated -->
    <div class="designerData"
      if="{ control.showPrePopulatedControl && showEditMode }">
        <div class="designerData-field-wrap">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select onChange={ onPrePopChanged } class="designer__field">
            <option value="">Select Dataset</option>
            <option
              selected={ control.prePopulateFrom.source == 'requestor_name' }
              value="requestor_name">Requester Name</option>
            <option
              selected={ control.prePopulateFrom.source == 'requestor_email' }
              value="requestor_email">Requester Email</option>
          </select>
        </div>
      </div>
    <!-- Edit Placeholder -->
    <div class="designerController" if="{ showEditMode }">
      <div class="designerController-prompts designerController-action">
        <span class="designerController-info">
          Placeholder: <input class="designerController-input"
                                    type="text"
                                    placeholder="Add placeholder text"
                                    ref="placeholderText"
                                    value="{ control.placeholderText ? control.placeholderText : ''}"
                                    onchange="{ onPlaceholderChanged }"/>
        </span>
      </div>
    </div>

    <form-designer-actions if="{ showEditMode }"
                           app="{app}"
                           sectionid="{sectionid}"
                           control="{control}"></form-designer-actions>
  </div>


  <!-- <script type="es6"> -->
  <script >
    const app = this.opts.app;
    this.app = app;
    this.sectionid = opts.sectionid;
    this.control = opts.control;
    // is this short text or long text, based on subType:
    this.mode = this.control.subType;
    this.showEditMode = opts.isopen;

    this.isNavActive = false;
    this.isPrePopulated = !utils.isNullOrUndefined(this.control.prePopulateFrom);

    if(utils.isNullOrUndefined(this.control.showPrePopulatedControl)) {
      this.control.showPrePopulatedControl = false;
    }

    this.onDocumentClicked = (e) => {
      const path = utils.GetComposedPath(e.target);
      // If the click happened outside of this tag, then toggle edit mode
      // also make sure the child nav is not open
      if (path.indexOf(this.root) < 0 && !this.isNavActive) {
        this.toggleEditMode(e);
        this.update();
      }
    };

    if(this.showEditMode) {
      window.addEventListener('click', this.onDocumentClicked, true);
    }

    this.toggleEditMode = (e) => {
      this.showEditMode = !this.showEditMode;

      if (this.showEditMode) {
        window.addEventListener('click', this.onDocumentClicked, true);
      }
      else {
        window.removeEventListener('click', this.onDocumentClicked, true);
      }
    };

    this.onLabelChanged = (e) => {
      this.control.label = this.refs.label.value;
    };

    this.onDescriptionChanged = (e) => {
      // If blank, remove from control
      if (this.refs.description.value.length === 0) {
        if (this.control.hasOwnProperty('description')) {
          delete this.control['description'];
        }
      }
      else {
        this.control['description'] = this.refs.description.value;
      }
    };

    this.onPlaceholderChanged = (e) => {
      // If blank, remove from control
      if (this.refs.placeholderText.value.length === 0) {
        if (this.control.hasOwnProperty('placeholderText')) {
          delete this.control['placeholderText'];
        }
      }
      else {
        this.control['placeholderText'] = this.refs.placeholderText.value;
      }
    };

    this.onPrePopChanged = (e) => {
      if(utils.isNullOrUndefined(this.control.prePopulateFrom)) {
        this.control.prePopulateFrom = {
          source: e.target.value
        }
      } else {
        this.control.prePopulateFrom.source = e.target.value;
      }
    };

    this.togglePrePopulatedControl = (e) => {
      this.control.showPrePopulatedControl = 
        !this.control.showPrePopulatedControl;
      if(!this.control.showPrePopulatedControl) {
        // they have un-selected the pre-populated data check,
        // so clear the prePopulated stuff.
        delete this.control['prePopulateFrom'];
        this.update();
      } else {
        if(utils.isNullOrUndefined(this.control.prePopulateFrom)) {
          this.control.prePopulateFrom = {};
          this.update();
        }
      }
    }

  </script>

</form-control-text-input>