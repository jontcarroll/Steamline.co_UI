<workflow-node-header>

  <div class="form">
    <div>
      <label>Node&nbsp;Id: { nodeId }</label>
    </div>
    <div>
      <label for="node-header-type" class="label">{ type }</label>
      <div class="field-wrap">
        <input name="node-header-type" id="node-header-type" class="created-node-name field field-dark-bg" value={ name } placeholder="Please enter node name"
          onchange={ updateNodeName }>
      </div>
    </div>
    <virtual if={ type==='form' || type==='action' || type==='end' }>
      <div>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="select-a-status" id="select-a-status" class="field" onchange={ updateNodeStatus }>
            <option value="null">Select a status</option>
            <option each={ statuses } value={ id } selected= {id === opts.statusid }>
              { name }
            </option>
          </select>
        </div>
      </div>
    </virtual>
    <div if={ type === "form" || type === "action" }>
      <label for="ac-track-{nodeId}" class="custom-checkbox-outer  block-label">
        <input name="ac-track-{nodeId}"
          id="ac-track-{nodeId}" class="visuallyhidden" type="checkbox"
          onChange={ setTrack }
          checked={ track }>
        <span class="custom-checkbox">
          <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
        </span>
        <span class="custom-checkbox-label label">Track status</span>
      </label>
    </div>
    <div if= {type === "form" || type === "action" || type === "end"}>
      <div>
         <label for="action-edge" class="label">When Tile Becomes Active, Send Email Using Template:</label>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="select-a-status" id="select-a-status" class="field" onchange={ updateAdvanceTileTemplate }>
            <option value="null">Select an email template</option>
            <option each={ advanceTileTemplates } value={ id } selected= {id === opts.emailtemplateid }>
              { name }
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-small" onclick={ removeNode }>Remove { type } node</button>
    </div>
  </div>
  <div class="form">
  </div>

  <!-- <label>{ type }</label>
  <input 
    class="created-node-name"
    value={ name }
    placeholder="Please enter node name"
    onchange={ updateNodeName }>

  <virtual if={ type === 'form' || type === 'action'}>
    <label>Status</label>
    <input 
      class="created-node-name"
      value={ status }
      placeholder="Please enter worklow status"
      onchange={ updateNodeStatus }>
  </virtual>
  
  <button class="btn" onclick={ removeNode }>Remove Node</button> -->

  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;

    this.name = this.opts.name;
    this.statusId = this.opts.statusid;
    this.type = this.opts.type;
    this.nodeId = this.opts.nodeid;
    this.statuses = app.cache.statuses;
    this.track = this.opts.track;
    this.advanceTileTemplates = app.cache.advanceTileTemplates;

    this.statusesLoaded = () => {
      this.statuses = app.statuses;
      this.update();
    }

    this.updateNodeName = (e) => {
      const newName = e.target.value;
      app.updateNodeName(newName, this.nodeId);
    };

    this.updateNodeStatus = (e) => {
      const newStatus = parseInt(e.target.value);
      if (!isNaN(newStatus)) {
        app.updateNodeStatus(newStatus, this.nodeId);
      }
    };

    this.setTrack = () => {
      this.track = !this.track;
      app.updateNodeTrack(this.track, this.nodeId);
    };

    this.updateAdvanceTileTemplate = (e) => {
      const templateId = parseInt(e.target.value);
      app.updateAdvanceTileTemplate(templateId, this.nodeId);
    }

    this.removeNode = () => {
      app.removeNode(this.nodeId);
    };

    this.on('mount', () => {
  
      //app.on('statusesLoaded', this.statusesLoaded );
    })
    this.on('unmount', () => {
      //app.off('statusesLoaded', this.statusesLoaded );
    })

  </script>
</workflow-node-header>