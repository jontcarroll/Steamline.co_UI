<form-control-asset-selector>
  <div class="designer__group { is-edit-mode: showEditMode }">
    <div class="designerRemote" if="{ showEditMode }">
      <form-designer-control-nav
        app="{app}"
        sectionid="{sectionid}"
        control="{control}"></form-designer-control-nav>
    </div>
    <!-- View Mode -->
    <div class="designer__form" if="{ !showEditMode }" onclick="{toggleEditMode}">
      <p class="designer__subtitle">{ control.label }</p>
      <p>{ control.description }</p>
      <p>(asset control)</p>
    </div>
    <!-- Edit Mode -->
    <div class="designer__form" if="{ showEditMode }">
      <textarea class="designer__subtitle" type="text" ref="label" onchange="{onLabelChanged}">{ control.label }</textarea>
      <textarea class="designer__desc"
                type="text"
                placeholder="Add description"
                onchange="{ onDescriptionChanged }"
                ref="description"></textarea>
      <div class="field-wrap custom-select-wrap">
        <select name="Form designer dropdown" id="Form designer dropdown"
          class="field" ref="assetType"
          onchange={ assetTypeChanged }>
          <option value="null">select an asset type</option>
          <option 
            selected={ id == control.assetTypeId }
            each={ assetTypes }
            value={ id }>
              { name }
          </option>
        </select>
        <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
      </div>
    </div>
    <!-- Action Bar -->
    <form-designer-actions if="{ showEditMode }"
                           app="{app}"
                           sectionid="{sectionid}"
                           control="{control}"></form-designer-actions>
  </div>

  <script>
    this.control = opts.control;
    this.sectionid = opts.sectionid;
    this.app = opts.app;
    this.showEditMode = opts.isOpen;
    this.isNavActive = false;
    this.assetTypes = this.app.assetTypes;

    if(this.app.curControlOpen == this.sectionid) {
      this.showEditMode = true;
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

    this.assetTypeChanged = (e) => {
      this.control.assetTypeId = parseInt(this.refs.assetType.value);
      this.update();
    };

    this.assetTypesLoaded = () => {
      this.assetTypes = this.app.assetTypes;
      console.log('asset types loaded: ', this.assetTypes);
      this.update();
    }

    this.on('mount', () => {
      this.app.on('assetTypesLoaded', this.assetTypesLoaded);
      this.app.getAssetTypes();
    });

    this.on('unmount', () => {
      this.app.off('assetTypesLoaded', this.assetTypesLoaded);
    });

  </script>

</form-control-asset-selector>