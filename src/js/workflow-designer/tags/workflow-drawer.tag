<workflow-drawer class="drawer { active: open }">
  
  <div class="drawer__close btn btn-square btn-icon" onclick={ drawerClose }><div class="icon"><span class="visuallyhidden">Close</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 16" width="26" height="16"><path d="M18 0l-1.4 1.4L22.2 7H0v2h22.2l-5.6 5.6L18 16l8-8-8-8z"></path></svg></div></div>
  
  <virtual if={type === 'workflow'} >
    <workflow-settings
      app= { app }>
    </workflow-settings>
  </virtual>
  <virtual  if={ type !== 'workflow' && !utils.isNullOrUndefined(node) }>
    <div id="drawerNode"></div>
    <workflow-action-node
      if={ node.type === 'action' }
      node={ node }
      app={ app }>
    </workflow-action-node>
    <workflow-form-node
      if={ node.type === 'form' }
      node={ node }
      app={ app }>
    </workflow-form-node>
    <workflow-rule-node
      if={ node.type === 'rule' }
      node={ node }
      app={ app }>
    </workflow-rule-node>
    <workflow-end-node
      if={ node.type === 'end' }
      node={ node }
      app={ app }>
    </workflow-end-node>
    <workflow-start-node
      if={ node.type === 'start' }
      node={ app.state.startNode }
      app={ app }>
    </workflow-start-node>
  </virtual>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script>
    const app = this.opts.app;
    this.app = app;
    this.node = null;
    this.open = app.drawerStatus;
    this.curNode = null;
    this.type = null;

    this.drawerClose = () => {
      this.app.removeTileStroke();
      this.update();
      this.curNode = null;
      app.drawerStatusUpdate(0);
      this.open = app.drawerStatus;
      this.app.lineStates.edgeTiles = null;
      this.app.lineStates.activeTile = null;
      this.app.lineStates.hideAll = false;
     this.app.updateNodeInteraction();

    };

    this.drawerOpen = (e) => {
      this.type = e.type;
      app.drawerStatusUpdate(1);
      if (e.type === 'workflow') {
        this.open = app.drawerStatus;
        this.curNode = null;
      } else {
        if(this.curNode != e.nodeId) {
          this.node = null;
          this.update();
          this.node = this.app.nodes[e.nodeId];
          if(e.type === 'start') {
            this.node = app.state.startNode;
          }
          this.open = app.drawerStatus;
          this.curNode = e.nodeId;
        } else {
          this.curNode = null;
          this.drawerClose();
        }
      }

      this.update();
    };

    this.on('mount', () => {
      app.on('drawerOpen', this.drawerOpen);
      app.on('drawerClose', this.drawerClose);
    });

    this.on('unmount', () => {
      app.off('drawerOpen', this.drawerOpen);
      app.off('drawerClose', this.drawerClose);
    });
  </script>
</workflow-drawer>