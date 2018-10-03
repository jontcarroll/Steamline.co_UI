<workflow-action-node>
  
  <header class="drawer__header">
    <h3>Action node</h3>
    <workflow-node-header
      app={ app }
      name={ node.name }
      type={ node.type }
      track={ node.track }
      statusid={ node.statusId }
      nodeid={ node.id }
      emailtemplateid={ node.emailTemplateId }>
    </workflow-node-header>
  </header>

  <div class="drawer__body">

    <div class="drawer__section">
      <workflow-action-panel
        app={ app }
        rank={ 'primary' }
        nodeid={ node.id }
        useractions={ node.userActions }>
      </workflow-action-panel>
    </div>
    
    <div class="drawer__section">
      <workflow-action-panel
        app={ app }
        rank={ 'secondary' }
        nodeid={ node.id }
        useractions={ node.userActions }>
      </workflow-action-panel>
    </div>

    <div class="drawer__section">
      <label for="select-a-form" class="drawer__info block-label">Filters</label>
        <div class="drawer__group">
        <label for="include-requester-checkbox" class="custom-checkbox-outer  block-label">
          <input name="include-requester-checkbox"
            id="include-requester-checkbox" class="visuallyhidden" type="checkbox"
            onChange={ includeRequestorUpdate }
            checked={ includeRequestor }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">include requester</span>
        </label>
        <virtual each={ filterCloud, index in filterClouds }>
          <div class="drawer__innergroup" >
            <p class="drawer__msg" if={ index !== 0 }><span>or</span></p>
            <workflow-filter-select
              app={ app }
              filtercloud={ filterCloud }
              node={ node }
              filtercloudindex={ index }>
            </workflow-filter-select>
          </div>
        </virtual>
        <button class="btn btn-small"
          onClick={ addFilterCloud }>Add New Filter Cloud</button>
      </div>
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
    this.filterClouds = this.node.state.filters;
    this.includeRequestor = this.node.filter.includeRequestor;

    if(utils.isNullOrUndefined(this.filterClouds)) {
      this.filterClouds = [];
    } else {
      let nextSequence = 0;
      for(let i = 0; i < this.filterClouds.length; i++) {
        if(nextSequence < this.filterClouds[i].sequence) {
          nextSequence = this.filterClouds[i].sequence;
        }
      }
      nextSequence++;
      this.node.nextFilterSeq = nextSequence;
    }

    this.nodeUpdated = (node) => {
      if (node.id !== this.node.id) {
        // skip this node if the ids don't match
        return;
      }

      this.node = node;
      this.update();
    };

    this.addFilterCloud = () => {
      app.addFilterCloud(this.node.id);
      this.update();
    };

    this.includeRequestorUpdate = () => {
      this.includeRequestor = !this.includeRequestor;
      app.includeRequestorUpdate(this.node.id, this.includeRequestor);
      this.update();
    }

    this.on('mount', () => {
      app.on('nodeUpdated', this.nodeUpdated);
      app.on('cloudRemoved', this.cloudRemoved);
    });

    this.on('unmount', () => {
      app.off('nodeUpdated', this.nodeUpdated);
      app.off('cloudRemoved', this.cloudRemoved);
    });
  </script> 
</workflow-action-node>