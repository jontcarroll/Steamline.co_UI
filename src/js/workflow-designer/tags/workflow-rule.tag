<workflow-rule>

  <button class="drawer__delete drawer__delete-rule btn btn-square btn-icon"><span class="visuallyhidden">Delete condition</span><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 7.4L1.6 0 0 1.6 7.4 9 0 16.4 1.6 18 9 10.6l7.4 7.4 1.6-1.6L10.6 9 18 1.6 16.4 0 9 7.4z"></path></svg></i></button>

  <virtual each={ condition, index in rule.conditions }>
    <div class="drawer__innergroup" >
      <p class="drawer__msg" if={ index !== 0 }><span>&</span></p>
      <workflow-rule-condition
        app={ app }
        nodeid={ nodeId }
        ruleid={ rule.id }
        condition={ condition }>
      </workflow-rule-condition>
    </div>
  </virtual>

  <div class="drawer__innergroup">
    <button class="drawer__add btn btn-small" onclick={ addCondition }>Add condition</button>
  </div>

  <div class="drawer__innergroup">
    <!-- <div class="drawer__child"> -->
    <div class="form">
      <div>
        <label for="rule-then-go-to" class="label">Then go to:</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select
            name="rule-then-go-to"
            id="rule-then-go-to"
            class="field field-dark-bg"
            onchange={ thenGoToChange }>
            <option value="null">Select a node</option>
            <option 
              each={ otherNodes }
              selected={ rule.edge === id }
              value={ id }>
                { name }
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>

  <!-- <p><strong>Then go to:</strong></p>
  <select 
    onchange={ thenGoToChange }>
    <option value="null">select a node</option>
    <option 
      each={ otherNodes }
      selected={ rule.edge === id }
      value={ id }>
        { name }
    </option>
  </select> -->

  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.nodeId = this.opts.nodeid;
    this.rule = this.opts.rule;
    this.otherNodes = app.getOtherNodes(this.nodeId);

    this.thenGoToChange = (e) => {
      e.preventUpdate = true;
      const connectTo = e.target.value;

      app.updateRuleEdge(connectTo, this.rule.id, this.nodeId);
    };

    this.addCondition = (e) => {
      this.preventUpdate = true;
      app.addRuleCondition(this.rule.id, this.nodeId);
    };

    this.on('mount', () => {

    });
    this.on('unmount', () => {

    });
  </script>

</workflow-rule>