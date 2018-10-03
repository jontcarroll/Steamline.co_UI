<email-templates>

  <header class="opening">
    <div class="opening__body">
      <h2 class="opening__title h2">Email Templates</h2>
    </div>
  </header>

  <div class="zebra">

    <div class="row">
      <div class="col">
        <div class="filters">
          <div class="filter__group">
            <div class="filter">
              <h3>Events</h3>
              <ul class="filter__list">
                <li class="filter__item {is-active: curEventId == id}" each={ emailEvents } onClick={ chooseEvent }>
                  { name }
                  <i class="filter__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                      <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
                    </svg>
                  </i>
                </li>
              </ul>
            </div>
            <div class="filter">
              <h3>Templates</h3>
              <ul class="filter__list">
                <li each={ curTemplates } onClick={ chooseTemplate } class="filter__item { is-active: curTemplateId == id }">
                  <i class="filter__grab">
                    <span></span>
                    <span></span>
                    <span></span>
                  </i>
                  { name }
                  <i class="filter__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                      <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
                    </svg>
                  </i>
                </li>
              </ul>
              <div if={curEventId !== null} class="filter__controls">
                <button class="btn btn-dark btn-with-icon" onClick={ startNewTemplate }>
                  Add New Template
                  <i class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                      <path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"
                      />
                      <path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z" />
                    </svg>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" if={ editEventUp }>
      <div class="col">
        <div class="form">
          <div>
              <label for="custom-switch-1" class="custom-switch-outer label">
                <span class="custom-switch-label label">Active?</span>
                <input name="custom-switch-1" id="custom-switch-1" class="visuallyhidden" type="checkbox" onchange={updateEventActive} checked={curEvent.active}>
                <div class="custom-switch">
                  <div class="custom-switch-knob"></div>
                </div>
              </label>
          </div>
          <div>
              <label for="user-filter-from" class="label">Default Template:</label>
              <div class="field-wrap custom-select-wrap">
                <i class="custom-select-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                    <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
                  </svg>
                </i>
                <select name="user-filter-from" id="user-filter-from" class="field" onchange={ updateEventDefaultTemplate }>
                  <option value="null">Select default template</option>
                  <option each={t in curTemplates} value="{t.id}" selected={ t.id === curEvent.defaultTemplateId }>{t.name}</option>
                </select>
              </div>
            </div>
          <div class="form-controls btn-group">
            <button class="btn" onClick={ saveEvent }>Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" if={ editTemplateUp }>
      <div class="filter__list" if={showVariables} style="overflow:auto; height:auto; max-height: 500px;">
        <div class="filter__item" each={v in variables()}>
      <!--       <small style="white-space: pre-wrap;"> -->
              <pre>{v}</pre>
      <!--       </small> -->
        </div>
      </div>
      <br>
      <button class="btn btn-with-icon" onclick={showVariablesClick} style="display:block;">
        <i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"></path><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"></path></svg></i>
        {showVariables ? "Hide Variables" : "Show Variables"}
      </button>
      <br>
 
      <div class="col">
        <div class="field-wrap">
          <label class="label">Template Name</label>
          <input onblur={updateTemplateName} type="text" class="field" value={currentTemplateEdit.name}>
        </div>
        <div class="form">
          <div style="padding-bottom:20px;">
            <label for="filter-tag-name" class="label">Subject</label>
            <div class="field-wrap">
              <input value={ currentTemplateEdit.subject } onblur={ updateTemplateSubject } name="filter-tag-name" id="filter-tag-name"
                type="text" class="field">
            </div>
          </div>
          <label for="filter-tag-name" class="label">Body</label>
          <template-editor ref="templateBody" text={currentTemplateEdit.body}></template-editor>
          <div class="form-controls btn-group">
            <button class="btn" onClick={ save }>Save</button>
            <button class="btn btn-dark" onClick={ onDeleteclick }>Delete</button>
          </div>
        </div>
      </div>
    </div>

    <prompt-modal onchoice="{ onDeleteChoice }"
        headline="Delete Template"
        intro="Are you sure you want to delete this template?"
        ref="deletePrompt">
    </prompt-modal>

    <div class="scrollToNew"></div>

  </div>
  <message-bar app={ app }></message-bar>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.emailEvents = app.emailEvents;
    this.curTemplates = [];

    this.editEventUp = false;
    this.editTemplateUp = false;

    this.currentTemplateEdit = {};
    this.currentEventEdit = {};

    this.curEvent = null;
    this.curEventId = null;
    this.curTemplateId = null;


    this.updateEventActive = (e) => {
      this.currentEventEdit.active = !this.currentEventEdit.active;
    }

    this.updateEventDefaultTemplate = (e) => {
      this.currentEventEdit.defaultTemplateId = parseInt(e.target.value);
    }

    this.saveEvent = () => {
      app.saveEvent(this.currentEventEdit, this.curEventId);
      app.reload();
    }

    this.showVariables = false;
    this.showVariablesClick = () => {
      this.showVariables = !this.showVariables;
      this.update();
    }
    this.variables = () => {
      if (this.curEvent == null) return;
      return this.curEvent.variables.split("---");
    }

    this.startNewTemplate = () => {
      this.curTemplateId = null;
      this.showVariables = false;
      this.editTemplateUp = true;
      this.editEventUp = false;
      clearTemplateBody();
      this.currentTemplateEdit = {
        eventId: this.curEventId,
      };

      this.update();
    }

    this.updateTemplateSubject = (e) => {
      this.currentTemplateEdit.subject = e.target.value;
    };

    this.updateTemplateName = (e) => {
      this.currentTemplateEdit.name = e.target.value;
    }

    this.updateCatName = (e) => {
      this.currentTemplateEdit.name = e.target.value;
    };

    this.chooseEvent = (e) => {
      this.curTemplates = [];
      this.showVariables = false;
      this.curTemplateId = null;
      this.curEventId = e.item.id;
      this.curEvent = e.item;
      this.editTemplateUp = false;

      this.editEventUp = true;
      this.currentEventEdit.active = this.curEvent.active;
      this.currentEventEdit.defaultTemplateId = this.curEvent.defaultTemplateId;

      clearTemplateBody();

      app.chooseEvent(e.item.id).then(() => {
        this.curTemplates = app.curTemplates;
        this.update();
      });
    };

    this.chooseTemplate = (e) => {
      this.editEventUp = false;
      this.showVariables = false;
      this.curTemplateId = e.item.id;
      this.editTemplateUp = true;
      this.currentTemplateEdit = {
        name: e.item.name,
        subject: e.item.subject,
        body: e.item.body,
        eventId: e.item.eventId
      };
      setTemplateBody(e.item.body);

      this.update();
    };

    var clearTemplateBody = () => {
      if (this.refs.templateBody) {
        this.refs.templateBody.clear();
      }
    }
    var setTemplateBody = (body) => {
      if (this.refs.templateBody) {
        this.refs.templateBody.setValue(body);
      }
    }

    this.save = () => {
      this.currentTemplateEdit.body = this.refs.templateBody.getValue();
      app.saveTemplate(this.currentTemplateEdit, this.curTemplateId);
      app.reload();
    };

    this.templateDeleteId = null;
    this.onDeleteclick = () => {
      this.refs.deletePrompt.activate();
    }

    this.onDeleteChoice = (e, choice) => {
      if (choice === 'confirm') {
        app.deleteTemplate(this.curTemplateId);
      }
    }

  

    this.on('mount', () => {
    });
    this.on('unmount', () => {
    });
  </script>
</email-templates>