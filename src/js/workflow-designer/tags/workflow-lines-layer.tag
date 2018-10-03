<workflow-lines-layer class="workflow-lines-layer" ondrop="{ondrop}" ondragover="{ondragover}">
  <action-line each={ actionObj in actionObjs }
    actionobj={ actionObj }
    app={ app }
  ></action-line>
  <virtual each={label in labels}>
    <workflow-tile-label app={app} label={label}>
    </workflow-tile-label>
  </virtual>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.labels = app.state.tileLabels;
    // make one action line for each edge in a node.
    this.nodes = app.nodes;

    this.actionObjs = [];

    let buildActionObjs = () => {
    this.actionObjs = [];
    // for each node, create an action object with the node and end coords.
    for(const key in this.nodes) {
      const curNode = this.nodes[key];

      let curEdges = [];
      // get all the edges of this node
      let isStart = false;
      if(curNode.type == 'start') {
        isStart = true;
        curEdges = [app.startEdge];
      } else {
        curEdges = app.getNodeEdges(curNode.id);
      }

      for(let i = 0; i < curEdges.length; i++) {
        let actionObj = {
          node: curNode,
          edge: curEdges[i],
          index: i,
          total: curEdges.length
        };
        this.actionObjs.push(actionObj);
      }
    }

    let startActionObj = {
      node: app.state.startNode,
      edge: app.startEdge,
      index: 0,
      total: 1
    };

    this.actionObjs.push(startActionObj);
    this.update();
    }
      buildActionObjs();

    /* label drop control */
    let label = ()=>{
      this.offsetX = null;
      this.offsetY = null;
      this.label = 'label'
    }
    this.ondragover = (e) => {
      //console.log('draggin over', e);
      e.preventDefault();
      e.preventUpdate = true;
      e.dataTransfer.dropEffect = 'move';
    }
    this.ondrop = (e) =>{
      let data;
      if(e.dataTransfer.getData('text').length > 0) {
        data = JSON.parse(e.dataTransfer.getData('text'));
        if(data.type == 'move'){
          this.app.state.tileLabels[data.objectId].offsetX = e.offsetX  - data.mouseOffset.x;
          this.app.state.tileLabels[data.objectId].offsetY = e.offsetY - data.mouseOffset.y;
        }
      } else {
        var myLabel = new label();
          myLabel.offsetX = e.offsetX;
          myLabel.offsetY = e.offsetY;
            
        if(this.app.state.tileLabels == undefined) {
          this.app.state['tileLabels'] = {};
        }
        myLabel['id'] = Date.now();;
        this.app.state.tileLabels[myLabel.id] = myLabel;
        this.labels = app.state.tileLabels;
      }
      this.update();
    }
    /* mount events */
    this.on('mount', () => {
      app.resetGridCoordObj();
      app.on('nodeUpdated', buildActionObjs);

    });

    this.on('unmount', () => {
      app.on('nodeUpdated', buildActionObjs);
    });
  </script>
</workflow-lines-layer>