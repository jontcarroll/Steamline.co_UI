<form-designer-actions>

  <div class="designerController">
    <div class="designerController-prompts designerController-action">
      <span class="designerController-info">
        <yield/>
      </span>
      <virtual if={ controlType !== 'static' && controlType !== 'file' }>
        <label for="preview_{sectionid}_{controlId}" class="designerController-switch custom-switch-outer">
          <span class="custom-switch-label label">Preview: </span>
          <input name="preview_{sectionid}_{controlId}"
                 id="preview_{sectionid}_{controlId}"
                 class="visuallyhidden"
                 type="checkbox"
                 ref="controlPreview"
                 checked="{ control.preview }"
                 onchange="{ previewChanged }"/>
          <div class="custom-switch">
            <div class="custom-switch-knob"></div>
          </div>
        </label>
        <label for="indexed_{sectionid}_{controlId}" class="designerController-switch custom-switch-outer">
          <span class="custom-switch-label label">Index: </span>
          <input name="indexed_{sectionid}_{controlId}"
                 id="indexed_{sectionid}_{controlId}"
                 class="visuallyhidden"
                 type="checkbox"
                 ref="controlIndex"
                 checked="{ control.index }"
                 onchange="{ indexChanged }"/>
          <div class="custom-switch">
            <div class="custom-switch-knob"></div>
          </div>
        </label>
      </virtual>
      <label for="required_{sectionid}_{controlId}" class="designerController-switch custom-switch-outer">
        <span class="custom-switch-label label">Required: </span>
        <input name="required_{sectionid}_{controlId}"
               id="required_{sectionid}_{controlId}"
               class="visuallyhidden"
               type="checkbox"
               ref="controlRequired"
               checked="{ control.required }"
               onchange="{ requiredChanged }"/>
        <div class="custom-switch">
          <div class="custom-switch-knob"></div>
        </div>
      </label>
    </div>
    <div class="designerController-commands designerController-action">
      <button onclick="{ up }"><span class="visuallyhidden">Move controller up</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.8 18" width="14.8" height="18"><path d="M14.8 11.7L7.4 4.3 0 11.7h4.2V18h6.3v-6.3h4.3zM0 2.1h14.8V0H0v2.1z"></path></svg></button>
      <button onclick="{ down }"><span class="visuallyhidden">Move controller down</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.8 18" width="14.8" height="18"><path d="M0 6.3l7.4 7.4 7.4-7.4h-4.2V0H4.3v6.3H0zm14.8 9.6H0V18h14.8v-2.1z"></path></svg></button>
      <!--<button><span class="visuallyhidden">Copy controller</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M10 2.2V10h7.8V2.2H10zM7.8 0H20v12.2H7.8V0zM10 17.8v-3.3h2.2V20H0V7.8h5.6V10H2.2v7.8H10z"></path></svg></button>-->
      <button onclick="{ removeControl }"><span class="visuallyhidden">Remove controller</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" width="15" height="18"><path d="M1.1 16c0 1.1 1 2 2.1 2h8.6c1.2 0 2.1-.9 2.1-2V4H1.1v12zM15 1h-3.8l-1.1-1H4.8l-1 1H0v2h15V1z"></path></svg></button>
    </div>
    <div class="designerController-options designerController-action">
      <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16.6" width="4" height="16.6"><ellipse cx="2" cy="14.5" rx="2" ry="2.1"></ellipse><ellipse cx="2" cy="8.3" rx="2" ry="2.1"></ellipse><ellipse cx="2" cy="2.1" rx="2" ry="2.1"></ellipse></svg></button>
    </div>
  </div>

  <style>
  
    :scope {
      display: block;
    }

  </style>

  <script type="es6">

    const app = this.opts.app;
    this.app = app;
    this.sectionid = opts.sectionid;
    this.control = opts.control;
    this.controlType = opts.control.type;
    this.controlId = opts.control.id;

    this.down = (e) => {
      this.app.moveControlDown(this.sectionid, this.controlId);
    };

    this.up = (e) => {
      this.app.moveControlUp(this.sectionid, this.controlId);
    };

    this.removeControl = (e) => {
      this.app.removeControlFromSection(this.sectionid, this.controlId);
    };

    this.requiredChanged = (e) => {
      this.control.required = this.refs.controlRequired.checked;
    };

    this.indexChanged = (e) => {
      this.control.index = this.refs.controlIndex.checked;
    };

    this.previewChanged = (e) => {
      this.control.preview = this.refs.controlPreview.checked;
    };

  </script>

</form-designer-actions>