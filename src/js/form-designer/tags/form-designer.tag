<form-designer>

  <toast-notification app={ app }></toast-notification>

  <message-bar app={ app }></message-bar>

  <header class="opening">
    <div class="opening__body">
      <input 
        class="opening__title"
        ref="formName"
        placeholder="Form title"
        onblur={ setFormName }
        value={ name }>
    </div>
    <div class="opening__controls">
      <ul class="opening__list  inline-list">
        <li class="opening__item" if={ isDraft } >
          <button class="btn" onclick={ remove }>Delete Draft</button>
        </li>
        <li class="opening__item">
          <button class="btn" onclick={ publish }>Publish</button>
        </li>
        <li class="opening__item">
          <button class="btn" onclick={ save }>Save</button>
        </li>
        <li class="opening__item">
          <button class="btn btn-dark" onclick={ back }>Done</button>
        </li>
      </ul>
    </div>
  </header>

  <div class="row">
    <div class="designers">

      <div class="designer">
        <div class="designer__body designer__area">
        
          <form-section each={ section in sections } section={ section }
            sectionid={section.id} app={ app }></form-section>
          
        </div>
        <div class="designer__footer">
          <button class="designer__btn" onclick={ addSection }><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"></path><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"></path></svg></i> New Section</button>
        </div>
      </div>

      <message-bar app={ app }></message-bar>

    </div>
  </div>

  <style>
    :scope {
      display: block;
    }
  </style>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;

    this.setFormName = () => {
      let name = this.refs.formName.value;
      app.setFormName(name);
    };

    this.addSection = () => {
      app.addSection();
    };

    this.updateSections = (sections) => {
      this.sections = sections;
      this.update();
    };

    this.modelLoaded = () => {
      this.name = app.name;
      this.isDraft = app.isDraft;
      this.sections = app.sections;
      this.update();
    };

    this.back = () => {
      app.backToList();
    };

    this.save = () => {
      app.save();
    };

    this.remove = () => {
      app.removeDraft();
    };

    this.publish = () => {
      app.publish();
    }

    this.on('mount', () => {
      app.on('updateSections', this.updateSections);
      app.on('modelLoaded', this.modelLoaded);

      app.loadModel();
    });

    this.on('unmount', () => {
      app.off('updateSections', this.updateSections);
      app.off('modelLoaded', this.modelLoaded);
    });
  </script>

</form-designer>