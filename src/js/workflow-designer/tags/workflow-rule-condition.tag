<workflow-rule-condition>

  <!-- <p class="drawer__msg">And:</p> -->

  <button class="drawer__delete drawer__delete-condition btn btn-square btn-icon" onclick={ removeCondition }><span class="visuallyhidden">Delete condition</span><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 2" width="20" height="2"><path d="M0 0h20v2H0V0z"/></svg></i></button>
  
  <div class="form">
    <div>
      <!-- <label for="rule-then-go-to" class="label">Then go to</label> -->
      <div class="field-wrap custom-select-wrap">
        <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        <select
          class="field field-dark-bg"
          onchange={ formNodeChange }>
          <option value="null">Select a form section</option>
          <option 
            each={ formNodes }
            selected={ condition.nodeId === id }
            value={ id }>
              { name + '-' + state.formSectionName }
          </option>
        </select>
      </div>
    </div>
    <div class="field-row field-colcount-3" if={ !utils.isNullOrUndefined(formSectionControls) }>

      <div class="field-col-1-3 field-wrap">
        <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        <select 
          class="field field-dark-bg"
          onchange={ formControlChange }>
          <option value="null">Select a control</option>
          <option 
            each={ filterControls(formSectionControls) }
            value={ id }
            selected={ this.condition.controlId === id }>
              { label }
          </option>
        </select>
      </div>
      <virtual if={ !utils.isNullOrUndefined(this.condition.controlId) }>
        <div class="field-col-1-3 field-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select
            class="field field-dark-bg"
            onchange={ ruleOperatorChange }>
            <option 
              value={ app.ruleOperators.EQUALS }
              selected={ this.condition.operator == app.ruleOperators.EQUALS}>
                =
            </option>
            <option 
              value={ app.ruleOperators.NOT_EQUALS }
              selected={ this.condition.operator == app.ruleOperators.NOT_EQUALS}>
                ≠
            </option>
          </select>
        </div>
        <div class="field-col-1-3 field-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select
            class="field field-dark-bg"
            onchange={ ruleControlValueChange }>
            <option value="null">Select a field option</option>
            <option 
              each={ formControlValues }
              value={ id }
              selected={ this.condition.expectedValueId === id }>
                { value }
            </option>
          </select>
        </div>
      </virtual>
    </div>
  </div>

  <!-- <select onchange={ formNodeChange }>
    <option value="null">select a form section</option>
    <option 
      each={ formNodes }
      selected={ condition.nodeId === id }
      value={ id }>
        { name + '-' + state.formSectionName }
    </option>
  </select>
  <select 
    if={ !utils.isNullOrUndefined(formSectionControls) } 
    onchange={ formControlChange }>
    <option value="null">select a control</option>
    <option 
      each={ filterControls(formSectionControls) }
      value={ id }
      selected={ this.condition.controlId === id }>
        { label }
    </option>
  </select>
  <virtual if={ !utils.isNullOrUndefined(this.condition.controlId) }>
    <select onchange={ ruleOperatorChange }>
      <option 
        value={ app.ruleOperators.EQUALS }
        selected={ this.condition.operator == app.ruleOperators.EQUALS}>
          =
      </option>
      <option 
        value={ app.ruleOperators.NOT_EQUALS }
        selected={ this.condition.operator == app.ruleOperators.NOT_EQUALS}>
          ≠
      </option>
    </select>
    <select onchange={ ruleControlValueChange }>
      <option value="null">select a field option</option>
      <option 
        each={ formControlValues }
        value={ id }
        selected={ this.condition.expectedValueId === id }>
          { value }
      </option>
    </select>
  </virtual>
  <button class="x-btn" onclick={ removeCondition }>X</button> -->

  <style>
    :scope {
      display: block;
    }

    /* workflow-rule-condition:first-of-type .drawer__msg {
      display: none;
    }

    workflow-rule-condition + workflow-rule-condition {
      border-top: 1px dotted;
      border-color: #666;
      padding-top: 16px;
      margin-top: 16px;
    } */
  </style>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.nodeId = this.opts.nodeid;
    this.ruleId = this.opts.ruleid;
    this.condition = this.opts.condition;
    this.formNodes = app.getFormNodes();

    // reload state on mount if it exist for drop downs
    const formNode = this.formNodes.find(p => p.id === this.condition.nodeId);
    if (!utils.isNullOrUndefined(formNode)) {
      this.formSectionControls = app.cache.formSectionControls[formNode.formSectionId];
      if (!utils.isNullOrUndefined(this.formSectionControls)) {
        const formControl = this.formSectionControls.find(p => 
          p.id === this.condition.controlId
        );

        if(!utils.isNullOrUndefined(formControl)) {
          this.formControlValues = formControl.choices;
        }
      }
    }

    this.filterControls = (controls) => {
      return controls.filter(p => p.type == 'choice');
    }

    this.formNodeChange = (e) => {
      e.preventUpdate = true;

      let nodeId = e.target.value;

      if (nodeId === 'null') {
        nodeId = null;
      }

      app.updateRuleConditionFormNode(
        nodeId,
        this.condition.id,
        this.ruleId,
        this.nodeId
      );
    };

    this.formControlChange = (e) => {
      e.preventUpdate = true;

      let controlId = e.target.value;

      if (controlId === 'null') {
        controlId = null;
      }

      const formControl = this.formSectionControls.find(p =>
        p.id === parseInt(controlId)
      );

      app.updateRuleConditionFormControl(
        formControl,
        this.condition.id,
        this.ruleId,
        this.nodeId
      );
    }

    this.ruleOperatorChange = (e) => {
      e.preventUpdate = true;
      const operator = e.target.value;

      app.updateRuleConditionOperator(
        operator,
        this.condition.id,
        this.ruleId,
        this.nodeId
      );
    };

    this.ruleControlValueChange = (e) => {
      e.preventUpdate = true;

      let valueId = e.target.value;
      if (valueId === 'null') {
        valueId = null;
      }

      app.updateRuleConditionFormControlValue(
        valueId,
        this.condition.id,
        this.ruleId,
        this.nodeId
      );
    };

    this.formSectionControlsUpdated = (e) => {
      console.log(e);
      if (e.nodeId !== this.nodeId ||
          e.conditionId !== this.condition.id ||
          e.ruleId != this.ruleId) {
        return;
      }

      this.formSectionControls = e.controls;
      this.update();
    };

    this.formControlValuesUpdated = (e) => {
      if (e.nodeId !== this.nodeId ||
          e.conditionId !== this.condition.id ||
          e.ruleId != this.ruleId) {
        return;
      }

      this.formControlValues = e.values;
      this.update();
    };

    this.removeCondition = (e) => {
      this.preventUpdate = true;
      app.removeRuleCondition(this.ruleId, this.nodeId, this.condition.id);
    };

    this.on('mount', () => {
      app.on('formSectionControlsUpdated', this.formSectionControlsUpdated);
      app.on('formControlValuesUpdated', this.formControlValuesUpdated);
    });

    this.on('unmount', () => {
      app.off('formSectionControlsUpdated', this.formSectionControlsUpdated);
      app.off('formControlValuesUpdated', this.formControlValuesUpdated);
    });
  </script>
</workflow-rule-condition>