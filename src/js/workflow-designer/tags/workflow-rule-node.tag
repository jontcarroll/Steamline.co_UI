<workflow-rule-node>

  <header class="drawer__header">
    <h3 class="drawer__title h3">Rule node</h3>
    <workflow-node-header
      app={ app }
      name={ node.name }
      type={ node.type }
      nodeid={ node.id }>
    </workflow-node-header>
  </header>

  <div class="drawer__body">
  
    <div class="drawer__section">
      <virtual each= {rule, index in node.rules }>
        <p class="drawer__info" if={ index === 0 }>If:</p>
        <p class="drawer__info" if={ index > 0 }>Else if:</p>
        <div class="drawer__group">
          <workflow-rule
            nodeid={ node.id } 
            app={ app }
            rule={ rule }>
          </workflow-rule>
        </div>
      </virtual>
    </div>

    <div class="drawer__section">
      <label for="rule-else-go-to" class="drawer__info block-label">Else go to:</label>
      <div class="drawer__group">
        <div class="form">
          <div>
            <!-- <label for="rule-else-go-to" class="label">Else Go to:</label> -->
            <div class="field-wrap">
              <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
              <select
                name="rule-else-go-to"
                id="rule-else-go-to"
                class="field field-dark-bg"
                onchange={ elseRuleChanged }>
                <option value="null">Select a node</option>
                <option 
                  each={ otherNodes }
                  selected={ node.elseEdge === id }
                  value={ id }>
                    { name }
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="drawer__section">
      <button class="drawer__add btn btn-with-icon" onClick={ addRule }>
        Add Rule
        <i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"></path><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"></path></svg></i>
      </button>
    </div>

  </div> <!-- end .drawer__body -->

  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.node = this.opts.node;
    this.otherNodes = app.getOtherNodes(this.node.id);

    this.addRule = (e) => {
      e.preventUpdate = true;
      app.addRule(this.node.id);
    };

    this.elseRuleChanged = (e) => {
      const connectTo = e.target.value;

      app.updateElseEdge(connectTo, this.node.id);
    };

    this.nodeUpdated = (node) => {
      if (node.id !== this.node.id) {
        // skip this node if the ids don't match
        return;
      }

      this.node = node;
      this.update();
    };

    this.on('mount', () => {
      app.on('nodeUpdated', this.nodeUpdated);

    });
    this.on('unmount', () => {
      app.off('nodeUpdated', this.nodeUpdated);

    });
  </script>
</workflow-rule-node>