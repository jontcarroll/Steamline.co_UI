<form-control-file-upload>

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
    <p>(file control)</p>
  </div>
  <!-- Edit Mode -->
  <div class="designer__form" if="{ showEditMode }">
    <textarea class="designer__subtitle" type="text" ref="label" onchange="{onLabelChanged}">{ control.label }</textarea>
    <textarea class="designer__desc"
              type="text"
              placeholder="Add description"
              onchange="{ onDescriptionChanged }"
              ref="description"></textarea>
  </div>
  <!-- Action Bar -->
  <form-designer-actions if="{ showEditMode }"
                         app="{app}"
                         sectionid="{sectionid}"
                         control="{control}"></form-designer-actions>
</div>


<script type="es6">

  this.control = opts.control;
  this.sectionid = opts.sectionid;
  this.app = opts.app;
  this.showEditMode = opts.isOpen;
  this.isNavActive = false;

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

</script>

</form-control-file-upload>