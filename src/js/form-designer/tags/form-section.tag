<!--suppress CssInvalidPseudoSelector -->
<form-section class="designer__main group" data-mode="edit">

  <div class="designer__inner">
    <header class="designer__header designer__area">
      <div class="designer__group">
        <button class="designerUtility" onclick="{ remove }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" width="15" height="18"><path d="M1.1 16c0 1.1 1 2 2.1 2h8.6c1.2 0 2.1-.9 2.1-2V4H1.1v12zM15 1h-3.8l-1.1-1H4.8l-1 1H0v2h15V1z"></path></svg>
        </button>
        <div class="designer__form">
        <input
          class="designer__title"
          placeholder="Enter section title"
          value="{ section.name }"
          ref="sectionName"
          onblur="{ updateName }">
        <textarea class="designer__desc" placeholder="Enter section description." if="{ sectionDescription }"></textarea>
        </div>
      </div>
    </header>

    <div class="designer__body designer__area">
      <div each="{ control, index in section.controls }">

        <!-- Static » Text -->
        <form-control-static-text if="{ control.type === 'static' && control.subType === 'text' }"
          app="{app}"
          sectionid="{sectionid}"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-static-text>

        <!-- Text » Single -->
        <form-control-text-input if="{ control.type === 'text' && control.subType === 'single'}"
          app="{app}"
          sectionid="{sectionid}"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-text-input>

        <!-- Text » Area -->
        <form-control-text-input if="{ control.type === 'text' && control.subType === 'area'}"
          app="{app}"
          sectionid="{sectionid}"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-text-input>

        <!-- Choice » Single -->
        <form-control-choice-single if="{ control.type === 'choice' && control.subType === 'single' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-choice-single>

        <!-- Choice » Multiple -->
        <form-control-choice-multiple if="{ control.type === 'choice' && control.subType === 'multiple' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-choice-multiple>

        <!-- Choice » Radio -->
        <form-control-choice-radio if="{ control.type === 'choice' && control.subType === 'radio' }"
          app="{app}"
          sectionid="{sectionid}"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-choice-radio>

        <!-- Choice » Checkbox -->
        <form-control-choice-checkbox if="{ control.type === 'choice' && control.subType === 'checkbox' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-choice-checkbox>

        <!-- Date » Single -->
        <form-control-date if="{ control.type === 'date' && control.subType === 'single' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-date>

        <!-- Date » Range -->
        <form-control-date if="{ control.type === 'date' && control.subType === 'range' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-date>

        <form-control-file-upload if="{ control.type === 'file' && control.subType === 'single' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-file-upload>

        <form-control-asset-selector if="{ control.type === 'asset' && control.subType === 'multiple' }"
          app="{ app }"
          sectionid="{sectionid }"
          control="{ control }"
          controlindex={index}
          isopen="{ control.id == app.curControlOpen }">
        </form-control-asset-selector>
      </div>
    </div>
  </div>

  <!-- Add New Question Button -->
  <div class="designerFooter">
    <button class="designer__btn" onclick="{ addNewQuestionClick }"><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"></path><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"></path></svg></i> Add Question</button>
  </div>

  <style>
    :scope {
      display: block;
    }
  </style>
  
  <script type="es6">
    const app = this.opts.app;

    this.app = app;
    this.section = this.opts.section;
    this.sectionid = this.opts.sectionid;

    this.updateName = () => {
      let name = this.refs.sectionName.value;
      app.setSectionName(this.section.id, name);
    };

    this.remove = () => {
      app.removeSection(this.section.id);
    };

    this.updateSection = (section) => {
      if (this.section.id !== section.id) {
        return;
      }

      this.section = section;
      this.update();
    };

    this.on('mount', () => {
      app.on('updateSection', this.updateSection);
    });

    this.on('unmount', () => {
      app.off('updateSection', this.updateSection);
    });

    /**
     * Click handler for the "Add new Question" button. Creates a new control and
     * adds it to the section.
     * @param e
     */
    this.addNewQuestionClick = (e) => {
      const control = this.app.createNewControl('text', 'area');
      if (!utils.isNullOrUndefined(control)) {
        this.app.addControlToSection(this.section.id, control);
      }
    };

  </script>

</form-section>