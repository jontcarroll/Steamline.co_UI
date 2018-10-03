<workflow-designer>

  <header class="opening">
    <div class="opening__body">
      <h2 class="opening__title h2">Workflow Designer</h2>
    </div>
    <div class="opening__controls">
      <ul class="opening__list  inline-list">
        <li class="opening__item">
          <button class="btn" onClick={ openDrawer }>Edit</button>
        </li>
        <li class="opening__item">
          <button class="btn" onClick={ revertWorkflow }>Revert</button>
        </li>
        <li class="opening__item">
          <button class="btn" onclick={ publishWorkflow }>Publish</button>
        </li>
        <li class="opening__item">
          <button class="btn" onclick={ saveWorkflow }>Save</button>
        </li>
        <li class="opening__item">
          <a class="btn btn-dark" href="/workflows">Done</a>
        </li>
      </ul>
    </div>
  </header>
  
  <header class="opening">
    <div class="opening__body">
      <p class="opening__subtitle">{ name }<span if={ app.isDraft }> (Draft)</span></p>
    </div>
  </header>



  <div class="row">
    <div class="col">

      <workflow-drawer app={ app }></workflow-drawer>
      <div class="tile-board group">
        <workflow-tile-select app={ app }></workflow-tile-select>
        <workflow-board-layer app={ app }></workflow-board-layer>
      </div>

    </div>
  </div>

  <!-- <div class="building-a-workflow">
    <select ref="tileType">
      <option value="action" selected>action</option>
      <option value="form">form</option>
      <option value="rule">rule</option>
    </select> 
    <input placeholder="tile name" type="text" ref="tileName">
    <button class="btn" onClick="{ buildTile }">Build tile</button>
  </div> -->

  <!-- <div class="created-workflow">
    <input class="created-workflow-name" 
      ref={ nameChange } placeholder={ name } onchange={ changeName }>
    <div if={ app.isDraft }>(Draft)</div>
    <p><strong>Select control for project name:</strong></p>
    <select onchange={ formNodeChange }>
      <option value="null" >select a form section</option>
      <option 
        each={ formNodes }
        selected={ projectName.formNodeId === id }
        value={ id }>
          { name + '-' + state.formSectionName }
      </option>
    </select>
    <select 
      if={ !utils.isNullOrUndefined(formSectionControls) } 
      onchange={ formControlChange }>
      <option value="null" selected={ utils.isNullOrUndefined(projectName.controlId) }>select a control</option>
      <option 
        each={ filterControls(formSectionControls) }
        value={ id }
        selected={ !utils.isNullOrUndefined(this.projectName.controlId) && this.projectName.controlId === id }>
          { label }
      </option>
    </select>
    <h4 class="h4">Nodes:</h4>
    <div class="start-node">
      <p><strong>start node links to:</strong></p>
      <select onchange={ changeStartEdge }>
        <option value="null">select a node</option> -->
        <!-- END can't be selected as start node -->
       <!--  <option 
          each={ node in nodes} 
          if={ node.type !== 'end' } 
          selected={ startEdge == node.id }
          value={ node.id }>
            { node.name }
        </option>
      </select>
    </div> -->
    
    <!-- <workflow-drawer app={ app }></workflow-drawer>
    <div class="tile-board group">
      <workflow-tile-select app={ app }></workflow-tile-select>
      <workflow-board-layer app={ app }></workflow-board-layer>
    </div> -->
  </div>

  <!-- <div class="btn-group">
    <button class="btn" onClick="{ revertWorkflow }">Revert to Last Draft</button>
    <button class="btn" onClick="{ saveWorkflow }">Save Workflow</button>
    <button class="btn" onClick="{ publishWorkflow }">Publish Workflow</button>
  </div> -->

  <message-bar app={ app }></message-bar>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.nodes = app.nodes;
    this.name = app.name;
    this.startEdge = app.startEdge;
    this.projectName = app.projectName;
    this.formNodes = app.getFormNodes();
    this.cancelStatusId = app.cancelStatusId;
    this.archiveStatusId = app.archiveStatusId;
    this.statuses = [];

    const formNode = this.formNodes.find(p => p.id === this.projectName.formNodeId);
    if (!utils.isNullOrUndefined(formNode)) {
      this.formSectionControls = app.cache.formSectionControls[formNode.formSectionId];
    }

    this.filterControls = (controls) => {
      return controls.filter(p => p.type == 'text');
    }

    this.formNodeChange = (e) => {
      e.preventUpdate = true;

      let nodeId = e.target.value;

      if (nodeId === 'null') {
        nodeId = null;
      }

      app.updateProjectNameFormNode(nodeId);
    };

    this.formControlChange = (e) => {
      e.preventUpdate = true;

      let controlId = e.target.value;

      if (controlId === 'null') {
        controlId = null;
      }

      app.updateProjectNameControlId(
        controlId,
      );
    };

    this.formCancelStatusChange = (e) => {
      e.preventUpdate = true;
      let statusId = parseInt(e.target.value);
      if (!isNaN(statusId)) {
        app.updateCancelStatusId(statusId);
      }
    }
    this.formArchiveStatusChange = (e) => {
      e.preventUpdate = true;
      let statusId = parseInt(e.target.value);
      if (!isNaN(statusId)) {
        app.updateArchiveStatusId(statusId);
      }
    }

    this.buildTile = (e) => {
      e.preventUpdate = true;
      let tileType = this.refs.tileType.value || "action";
      let tileName = this.refs.tileName.value;

      app.addNode(tileType, tileName);
    };

    this.openDrawer = (e) => {
      e.preventUpdate = true;
      app.openDrawer({type:'workflow', nodeId: null});
    };

    this.closeDrawer = (e) => {
      e.preventUpdate = true;
      app.closeDrawer();
    };

    // this.changeStartEdge = (e) => {
    //   e.preventUpdate = true;
    //   this.startEdge = e.target.value;
    //   app.updateStartEdge(e.target.value);
    // };

    this.changeName = (e) => {
      this.name = e.target.value;
      app.updateName(this.name);
    };

    this.nodesChanged = (nodes) => {
      this.nodes = nodes;
      this.formNodes = app.getFormNodes();
      this.update();
    };

    this.revertWorkflow = (e) => {
      e.preventUpdate = true;
      app.revertWorkflow();
    };

    this.saveWorkflow = (e) => {
      e.preventUpdate = true;
      app.saveWorkflowDesign();
    };

    this.publishWorkflow = () => {
      e.preventUpdate = true;
      app.publishWorkflowDesign();
    };

    this.updateFormControls = (e) => {
      this.formSectionControls = e.controls;
      this.update();
    };

    this.projectNameUpdated = (projectName) => {
      this.projectName = projectName;
      
      const fctrls = this.formSectionControls;
      this.formSectionControls = null;
      this.update();

      this.formSectionControls = fctrls;
      this.update();
    };

    this.statusesLoaded = () => {
      this.statuses = app.statuses;
      this.update();
    }

    this.on('mount', () => {
      app.on('nodesUpdated', this.nodesChanged);
      app.on('projectNameControlsUpdated', this.updateFormControls);
      app.on('projectNameUpdated', this.projectNameUpdated);
    });

    this.on('unmount', () => {
      app.off('nodesUpdated', this.nodesChanged);
      app.off('projectNameControlsUpdated', this.updateFormControls);
      app.off('projectNameUpdated', this.projectNameUpdated);
    });
  </script>
</workflow-designer>
