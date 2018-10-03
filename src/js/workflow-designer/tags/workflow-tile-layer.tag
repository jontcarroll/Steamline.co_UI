<workflow-tile-layer class="workflow-tile-layer">
  <workflow-tile
    node={ startNode }
    app={ app }
    coords={ app.state.startCoords }>
  </workflow-tile>
  <workflow-tile
    each={ node in nodes }
    node={ node }
    app={ app }
    coords={ node.state.coords }>
  </workflow-tile>

  <script>
    const app = this.opts.app;
    this.app = app;
    this.nodes = app.nodes;
    this.startNode = app.state.startNode;
  </script>
</workflow-tile-layer>