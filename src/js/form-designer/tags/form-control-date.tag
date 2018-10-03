<form-control-date>

  <div class="designer__group { is-edit-mode: showEditMode }">
    <!-- Nav -->
    <div class="designerRemote" if="{ showEditMode }">
      <form-designer-control-nav
              app="{app}"
              sectionid="{sectionId}"
              control="{control}"></form-designer-control-nav>
      <div class="designer__smallgroup"></div>
    </div>
    <!-- View Mode -->
    <div class="designer__form" if="{ !showEditMode }" onClick="{ toggleEditMode }">
      <!--  <small class="">{ control.type } / { control.subType }</small>  -->
      <p class="designer__subtitle">{ control.label }</p>
      <div class="field-wrap" if = { control.subType === 'single' }>
        <input class="field" type="date"/>
      </div>
      <div class="field-row field-colcount-2" if = { control.subType === 'range' }>
        <div class="field-col-1-2">
          <label for="" class="label">From</label>
          <div class="field-wrap">
            <input class="field" type="date">
          </div>
        </div>
        <div class="field-col-1-2">
          <label for="" class="label">To</label>
          <div class="field-wrap">
            <input class="field" type="date">
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Mode -->
    <div class="designer__form" if="{ showEditMode }">
      <textarea class="designer__subtitle"
                type="text"
                onchange="{ onLabelChanged }"
                ref="label">{ control.label }</textarea>
    </div>
    <!-- Edit Mode Settings -->
    <div class="designerSettings" if="{ showEditMode }">
      <!-- Date Range -->
      <!-- TODO: handle Date Range in the code -->
      <div>
        <label for="Date Range" class="custom-switch-outer">
          <span class="custom-switch-little-label label">Date Range</span>
          <input class="visuallyhidden"
                 name="Date Range"
                 id="Date Range"
                 type="checkbox"
                 checked={ control.subType === 'range' }
                 onChange={ toggleDateRange }>
          <div class="custom-switch">
            <div class="custom-switch-knob"></div>
          </div>
        </label>
      </div>
      <!-- Include Time -->
      <!-- TODO: handle Include time in the code -->
      <!--  <div>
        <label for="Include Time" class="custom-switch-outer">
          <span class="custom-switch-little-label label">Include Time</span>
          <input name="Include Time" id="Include Time" class="visuallyhidden" type="checkbox">
          <div class="custom-switch">
            <div class="custom-switch-knob"></div>
          </div>
        </label>
      </div>  -->
      <!-- Include Year -->
      <!-- TODO: handle Include Year in the code -->
      <!--  <div>
        <label for="Include Year" class="custom-switch-outer">
          <span class="custom-switch-little-label label">Include Year</span>
          <input name="Include Year" id="Include Year" class="visuallyhidden" type="checkbox">
          <div class="custom-switch">
            <div class="custom-switch-knob"></div>
          </div>
        </label>
      </div>  -->
    </div>
    <!-- Bottom Bar -->
    <form-designer-actions if="{ showEditMode }"
                           app="{ app }"
                           sectionid="{sectionId}"
                           control="{control}"></form-designer-actions>
  </div>

  <script type="es6">
    this.app = opts.app;
    this.sectionId = opts.sectionid;
    this.control = opts.control;
    this.showEditMode = false;
    this.isNavActive = false;
    this.isDateRange = false;

    this.onDocumentClicked = (e) => {
      const path = utils.GetComposedPath(e.target);
      // If the click happened outside of this tag, then toggle edit mode
      // also make sure the child nav is not open
      if (path.indexOf(this.root) < 0 && !this.isNavActive) {
        this.toggleEditMode(e);
        this.update();
      }
    };

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

    //Toggling prepopulated data controls
    this.showPrepopulatedControl = false;

    this.togglePrepopulatedControl = (e) => {
      this.showPrepopulatedControl = !this.showPrepopulatedControl;
    }

    //Setting the Date Range... or not
    this.toggleDateRange = (e) => {
      if (e.target.checked) {
        this.control.subType = 'range';
      } else {
        this.control.subType = 'single';
      }
      this.update();
    }

  </script>

</form-control-date>