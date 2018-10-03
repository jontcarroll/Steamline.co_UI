<workflow-tile-select-node
  onmousedown={ mouseDownEvent }  
  class="workflow-node workflow-node--{ type } { being-dragged: beingDragged }">
  <div class="tile tile--alt-color"></div>
  <div class="tile dragged-tile"></div>

  <script>
    const app = this.opts.app;
    this.app = app;
    this.type = this.opts.type;
    let thisTile = this;

    this.draggedTile = this.root.querySelector('.dragged-tile');
    this.boardLayer = document.body.querySelector('.workflow-board-layer');

    //mouse stuff for click/drag
    this.mouseIsDown = false;
    this.beingDragged = false;
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    let draggedX = 0;
    let draggedY = 0;
    let curMoveX = 0;
    let curMoveY = 0;

    this.isOverBoard = false;
    this.potentialTarget = [-1,-1];


    this.mouseUpFunc = (e) => {
      document.body.removeEventListener('mousemove', thisTile.mouseMoveFunc);
      document.body.removeEventListener('mouseup', thisTile.mouseUpFunc);
      this.boardLayer.removeEventListener('mousemove', thisTile.mouseOverBoard);
      this.boardLayer.removeEventListener('mouseout', thisTile.mouseOutBoard);
      if(thisTile.beingDragged) {
        this.draggedTile.style.left = '';
        this.draggedTile.style.top = '';

        if(this.isOverBoard) {
          if(this.potentialTarget[0] >= 0 && this.potentialTarget[1] >= 0) {
            app.addNode(this.type, null, this.potentialTarget);
          }
        }
      }
      thisTile.mouseIsDown = false;
      thisTile.beingDragged = false;

      thisTile.update();
    };

    this.findBoardPosition = (e) => {
      // find the board position that is currently being hovered over.
      let rect = this.boardLayer.getBoundingClientRect();
      let topDist = e.clientY - rect.top;
      let leftDist = e.clientX - rect.left;
      let topScroll = this.boardLayer.scrollTop;
      let leftScroll = this.boardLayer.scrollLeft;
      let gridY = Math.floor((topDist + topScroll) / app.state.gridSquareSize);
      let gridX = Math.floor((leftDist + leftScroll) / app.state.gridSquareSize);

      return [gridX, gridY];
    };

    this.lookForOpenTile = (coords) => {
      // give the app the initial coords for searching
      app.initialCoordsSearched = coords;
      let openTileCoords = app.lookForOpenTile(coords[0], coords[1]);
      return openTileCoords;
    };

    this.mouseMoveFunc = (e) => {
      curMoveX = draggedX + (e.clientX - thisTile.mouseDownX);
      curMoveY = draggedY + (e.clientY - thisTile.mouseDownY);
      this.draggedTile.style.left = curMoveX + 'px';
      this.draggedTile.style.top = curMoveY + 'px';
      if(!this.beingDragged) {
        this.beingDragged = true;
        this.update();
      }
    };

    this.mouseOverBoard = (e) => {
      this.isOverBoard = true;
      let boardPos = this.findBoardPosition(e);
      app.setCurrentHover(boardPos);
      let potentialTargetData = this.lookForOpenTile(boardPos, null);
      this.potentialTarget = [potentialTargetData.x, potentialTargetData.y];
      app.setPotentialTarget(this.potentialTarget);
    }

    this.mouseOutBoard = (e) => {
      this.isOverBoard = false;
      app.setPotentialTarget([-1,-1]);
    }

    this.mouseDownEvent = (e) => {
      this.mouseIsDown = true;
      this.mouseDownX = e.clientX;
      this.mouseDownY = e.clientY;
      draggedX = 0;
      draggedY = 0;
      document.body.addEventListener('mousemove', thisTile.mouseMoveFunc);
      document.body.addEventListener('mouseup', thisTile.mouseUpFunc);
      // add mousemove for the board layer
      //this.boardLayer.addEventListener('mouseover', thisTile.mouseOverBoard);
      this.boardLayer.addEventListener('mousemove', thisTile.mouseOverBoard);
      this.boardLayer.addEventListener('mouseout', thisTile.mouseOutBoard);
    };


    this.on('mount', () => {
      this.draggedTile = this.root.querySelector('.dragged-tile');
      this.boardLayer = document.body.querySelector('.workflow-board-layer');
    });

    this.on('unmount', () => {
    });
  </script>
</workflow-tile-select-node>