<workflow-tile-select class="workflow-tile-select">
  <workflow-tile-select-node
    app={ app }
    each={ type in app.nodeTypes }
    type={ type }>
  </workflow-tile-select-node>
  <workflow-tile-select-label></workflow-tile-select-label> 
  <script>
    const app = this.opts.app;
    this.app = app;
    this.selectNodes = app.selectNodes;

  </script>
</workflow-tile-select>