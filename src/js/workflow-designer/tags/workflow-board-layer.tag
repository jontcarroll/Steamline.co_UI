<workflow-board-layer class="workflow-board-layer">
  <workflow-tile-layer app={ app }></workflow-tile-layer>
  <workflow-lines-layer app={ app }></workflow-lines-layer> 
  <div class="board-tiles">
    <workflow-board-tile
      each={ set in gridCoords }
      coords={ set }
      app={ app }>
    </workflow-board-tile>
  </div>
  <div class="board-spacer"
    style="width: { 62 * app.state.boardWidth }px;
    height:{ 62 * app.state.boardHeight }px;">
  </div>

  
  <script>
    const app = this.opts.app;
    this.app = app;
    this.gridCoords = app.gridCoords;

    this.boardWidth = app.state.boardWidth;
    this.boardWidth = app.state.boardHeight;
  </script>
</workflow-board-layer>