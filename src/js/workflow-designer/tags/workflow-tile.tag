<workflow-tile
  onmousedown={ mouseDownEvent } 
  onmousemove={ mouseMoveEvent } 
  onmouseup={ mouseUpEvent }
  onmouseover={mouseOverEvent}
  onmouseout={mouseOutEvent}
  class="workflow-node workflow-node--{ node.type } x--{ coords[0] } y--{ coords[1] }
    { being-dragged: beingDragged}"
  data-xcoord={ coords[0] }
  data-ycoord={ coords[1] }>
  <div class="action-starts"></div>
  <div class="tile" style={borderStyle}><span class="node-id">{node.id}</span><div class="node-name">{node.name}</div></div>
  <style>
  .node-id {
    font-size: 9px;
    color: #fff;
    font-weight: 700;
    display: block;
    padding: 2px 4px;
    position: absolute;
    pointer-events: none;
    user-select: none;
  }
  .node-name {
    position: absolute;
    width: 160%;
    top: -45px;
    left: -30%;
    background-color: #4fc3f7;
    color: #fff;
    font-size: 10px;
    font-weight: 100;
    text-align: center;
    padding: 3px;
    border-radius: 2px;
    display:none;
    user-select: none;
  }

  .tile:hover .node-name {
    display:block;
  }
  </style>

  <script>
    const thisTile = this;
    this.app = this.opts.app;
    this.node = this.opts.node;
    this.coords = this.opts.coords;
    this.potentialTarget = this.coords;

    this.userActions = this.node.userActions;

    // target(s) to draw lines to
    // this.connections = [];
    
    //console.log('tile info', this);
    if(utils.isNullOrUndefined(this.coords[0])) {
      this.coords[0] = 0;
    }
    if(utils.isNullOrUndefined(this.coords[1])) {
      this.coords[1] = 0;
    }

    //mouse stuff for click/drag
    this.mouseIsDown = false;
    this.beingDragged = false;
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    let draggedX = 0;
    let draggedY = 0;
    let curMoveX = 0;
    let curMoveY = 0;
    this.drawerOpen = false;

    this.openDrawer = () => {
      let isStart = false;
      if(this.node.type == 'start') {
        isStart = true;
      }
      this.app.openDrawer({nodeId: this.node.id, type: this.node.type});
      this.drawerOpen = true;
    };

    this.mouseUpEvent = () => {
      if(!thisTile.beingDragged) {
        thisTile.openDrawer();
        this.borderStyle = 'border: 4px solid ' + this.node.state.selectedStroke + ';';
      }
    };

    this.mouseUpFunc = (e) => {
      if(thisTile.beingDragged) {
        document.body.removeEventListener('mousemove', thisTile.mouseMoveFunc);
        document.body.removeEventListener('mouseup', thisTile.mouseMoveFunc);
        // let coords = thisTile.findBoardPosition();
        thisTile.root.style.left = '';
        thisTile.root.style.top = '';
        thisTile.coords[0] = thisTile.potentialTarget[0];
        thisTile.coords[1] = thisTile.potentialTarget[1];
        this.app.tileMoveDone();
        let isStart = false;
        if(thisTile.node.type == 'start') {
          isStart = true;
        }
        this.app.moveNode(thisTile.node.id, thisTile.potentialTarget, isStart);
        thisTile.update();
      }
      thisTile.mouseIsDown = false;
      thisTile.beingDragged = false;
    };

    this.mouseMoveEvent = (e) => {
      //console.log('mouse move on tile');
      if(this.mouseIsDown) {
        if(!this.beingDragged) {
          thisTile.root.style.zindex = '9999';
          this.beingDragged = true;
          document.body.addEventListener('mousemove', thisTile.mouseMoveFunc);
        }
      }
    };
    this.mouseOverEvent = (e) => {
     // this.borderStyle = 'border: 4px solid ' + this.node.state.selectedStroke + ';';
     if(!this.beingDragged) {
      this.app.lineStates.edgeTiles = this.edges;
      this.app.lineStates.activeTile = this.node.id;
      this.app.lineStates.hideAll = true;
      this.app.updateNodeInteraction();
     }
    }
    this.removeTileBorderStyle = () => {
        //todo this is still buggy
        this.borderStyle = '';
        this.update();
    }
    this.mouseOutEvent = (e) => {
      if(!this.app.getDrawerStatus()) {
        this.removeTileBorderStyle();
      //remove status of other lines
      this.app.lineStates.edgeTiles = null;
      this.app.lineStates.activeTile = null;
      this.app.lineStates.hideAll = false;
      }

     this.app.updateNodeInteraction();

    }

    this.findBoardPosition = () => {
      // find the board position that is currently being hovered over.
      // get the current x and y, then divide those by app.state.gridSquareSize.
      let curX = parseInt(thisTile.root.style.left) || 0;
      let curY = parseInt(thisTile.root.style.top) || 0;

      let gridX = Math.round(curX / this.app.state.gridSquareSize) || 0;
      let gridY = Math.round(curY / this.app.state.gridSquareSize) || 0;

      return [gridX, gridY];
    };

    this.lookForOpenTile = (coords, draggedTile) => {
      // give the app the initial coords for searching
      this.app.initialCoordsSearched = coords;
      let openTileCoords = this.app.lookForOpenTile(coords[0], coords[1], draggedTile);
      return openTileCoords;
    };

    this.mouseMoveFunc = (e) => {
      console.log('mouse move')
      if(this.mouseIsDown) {
        if(!this.beingDragged) {
          this.beingDragged = true;
        }
      }
      curMoveX = draggedX + (e.clientX - thisTile.mouseDownX);
      curMoveY = draggedY + (e.clientY - thisTile.mouseDownY);
      if(curMoveX < 0) {
        curMoveX = 0;
      }
      if(curMoveY < 0) {
        curMoveY = 0;
      }
      thisTile.root.style.left = curMoveX + 'px';
      thisTile.root.style.top = curMoveY + 'px';

      let boardPos = this.findBoardPosition();
      this.app.setCurrentHover(boardPos);
      let potentialTargetData = this.lookForOpenTile(boardPos, this.node);
      this.potentialTarget = [potentialTargetData.x, potentialTargetData.y];
      this.app.setPotentialTarget(this.potentialTarget);
    };

    this.mouseDownEvent = (e) => {
      this.mouseIsDown = true;
      this.mouseDownX = e.clientX;
      this.mouseDownY = e.clientY;
      draggedX = (this.coords[0]) * this.app.state.gridSquareSize || 0;
      draggedY = (this.coords[1]) * this.app.state.gridSquareSize || 0;
      document.body.addEventListener('mouseup', thisTile.mouseUpFunc);
    };

    // get all the edges of this node for use in the action lines
    let isStart = false;
    if(this.node.type == 'start') {
      isStart = true;
      this.edges = [this.app.startEdge];
    } else {
      this.edges = this.app.getNodeEdges(this.node.id);
    }

    //set the color for the tile
    this.node.state.selectedStroke = this.app.selectedStroke();

    this.tileStrokeStatus = (value) => {
      if(value) {
        this.removeTileBorderStyle();
      }
    }
    this.on('mount', ()=>{
      this.app.on('drawerStatusUpdate', (value) => {
        this.tileStrokeStatus(value)
      } );
    });
    this.on('unmount', ()=>{
      this.app.off('drawerStatusUpdate', (value) => {
        this.tileStrokeStatus(value)
      } );
    });


  </script>
</workflow-tile> 