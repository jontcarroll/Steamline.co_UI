<form-control-choice-single>

  <div class="designer__group { is-edit-mode: showEditMode }">
    <div class="designerRemote" if="{ showEditMode }">
      <form-designer-control-nav
              app="{app}"
              sectionid="{sectionid}"
              control="{control}"></form-designer-control-nav>
      <div class="designer__smallgroup">
        <label for="Pre-populated data for multiple choice" class="custom-checkbox-outer label block-label">
          <input name="Pre-populated data for multiple choice" id="Pre-populated data for multiple choice" class="visuallyhidden" type="checkbox"
          checked={ isPrePopulated }
          onChange={ togglePrePopulatedControl }>
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
      <div class="field-wrap custom-select-wrap">
        <select name="Form designer dropdown" id="Form designer dropdown" class="field">
          <option each="{ val in control.choices }">
            { val.name }
          </option>
        </select>
        <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
      </div>
    </div>
    <!-- Label: Edit Mode -->
    <div class="designer__form" if="{ showEditMode }">
      <textarea class="designer__subtitle"
                type="text"
                placeholder="Label"
                onchange="{ onLabelChanged }"
                ref="label">{ control.label }</textarea>
      <textarea class="designer__desc"
                type="text"
                placeholder="Add description"
                onchange="{ onDescriptionChanged }"
                ref="description">{ control.description }</textarea>
    </div>
    <!-- PrePopulated Data -->
    <div class="designerData group"
      if="{ control.showPrePopulatedControl && showEditMode }">
      <div class="designerData-field-wrap">
        <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        <select onChange={ onPrePopChanged } class="designer__field">
          <option value="">Select Dataset</option>
          <option  each={ filter in filters } value={ filter.id }
            selected={ control.prePopulateFrom.tagCategoryId == filter.id }>
            { filter.name } { filter.id }</option>
        </select>
      </div>
      <div class="designerData-checks">
        <label for="Filter" class="custom-checkbox-outer  block-label">
          <input onChange={ toggleFiltered }
            checked={ control.prePopulateFrom.filtered }
            name="Filter" id="Filter" class="visuallyhidden" type="checkbox">
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Filter</span>
        </label>
        <label for="pre-selected" class="custom-checkbox-outer  block-label">
          <input onChange={ togglePreSelected }
            checked={ control.prePopulateFrom.preSelected }
            name="pre-selected" id="pre-selected" class="visuallyhidden" type="checkbox">
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Pre-selected</span>
        </label>
      </div>
    </div>
    <!-- Edit Mode -->
    <virtual if="{ showEditMode }">

      <div class="designerController" each="{ choice, index in control.choices }">
        <div class="designerController-prompts designerController-action">
          <span class="designerController-info">
            <span class="designerController-int">{ index + 1}.</span>
            <input class="designerController-input"
                   type="text"
                   placeholder="Option {index + 1}"
                   ref="optionLabel{index}"
                   value="{ choice.name }"
                   onchange="{ onOptionLabelChanged }"/>
          </span>
        </div>
      </div>

    </virtual>

    <!-- Action Bar -->
    <form-designer-actions if="{ showEditMode }"
                           app="{app}"
                           sectionid="{sectionid}"
                           control="{control}">
      <span class="designerController-link" onclick="{parent.addOptionClick}">Add Option</span>
    </form-designer-actions>
  </div>

  <!-- <script type="es6"> -->
  <script >
    const app = opts.app;
    this.app = app;
    this.sectionid = opts.sectionid;
    this.control = opts.control;
    this.controlId = this.control.id;
    this.showEditMode = opts.isOpen;
    this.isNavActive = false;
    this.isPrePopulated = !utils.isNullOrUndefined(this.control.prePopulateFrom);

    this.filters = null;

    if(utils.isNullOrUndefined(this.control.showPrePopulatedControl)) {
      this.control.showPrePopulatedControl = false;
    }
    if(utils.isNullOrUndefined(this.control.state)) {
      this.control.state = {};
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
      this.update();
    };

    this.onDescriptionChanged = (e) => {
      const value = this.refs.description.value;
      if (value.length === 0) {
        // remove optional value
        if (this.control.hasOwnProperty('description')) {
          delete this.control['description'];
        }
      }
      else {
        this.control['description'] = value;
      }
      this.update();
    };

    this.onOptionLabelChanged = (e) => {
      const index = e.item.index;
      this.control.choices[index].name = this.refs[`optionLabel${index}`].value;
      this.update();
    };

    this.addOptionClick = (e) => {
      this.control.choices.push({
        name: 'New Option',
        default: false
      });
      this.update();
    };

    this.togglePrePopulatedControl = (e) => {
      this.control.showPrePopulatedControl = 
        !this.control.showPrePopulatedControl;
      if(!this.control.showPrePopulatedControl) {
        // they have un-selected the pre-populated data check,
        // so clear the prePopulated stuff.
        if(!utils.isNullOrUndefined(this.control.state.choices)) {
          this.control.choices = this.control.state.choices;
        }
        delete this.control['prePopulateFrom'];
        this.update();
      } else {
        //they have selected pre-populated data
        this.control.state.choices = this.control.choices;
        delete this.control['choices'];
        if(utils.isNullOrUndefined(this.control.prePopulateFrom)) {
          this.control.prePopulateFrom = {
            source: 'tag',
            filtered: false,
            preSelected: false
          };
          app.getFilters();
          this.update();
        }
      }
    };

    this.togglePreSelected = () => {
      this.control.prePopulateFrom.preSelected = 
        !this.control.prePopulateFrom.preSelected;
    };

    this.toggleFiltered = () => {
      this.control.prePopulateFrom.filtered = 
        !this.control.prePopulateFrom.filtered;
    };

    this.onPrePopChanged = (e) => {
      if(utils.isNullOrUndefined(this.control.prePopulateFrom)) {
        this.control.prePopulateFrom = {
          source: 'tag',
          tagCategoryId: parseInt(e.target.value)
        }
      } else {
        this.control.prePopulateFrom.tagCategoryId = parseInt(e.target.value);
      }
    };

    this.filtersLoaded = (filters) => {
      this.filters = filters;
      this.update();
    }

    this.on('mount', () => {
      if(this.control.showPrePopulatedControl) {
        app.getFilters();
      };
      app.on('filtersLoaded', this.filtersLoaded);
    });

    this.on('unmount', () => {
      app.off('filtersLoaded', this.filtersLoaded);
    });

  </script>
</form-control-choice-single>