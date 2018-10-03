<workflow-start-node>
  <p><strong>Start links to:</strong></p>
  <select onchange={ changeStartEdge }>
    <option value="null">select a node</option>
    <option 
      each={ node in nodes} 
      if={ node.type !== 'end' } 
      selected={ startEdge == node.id }
      value={ node.id }>
        { node.name }
    </option>
  </select>
  
  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.nodes = app.nodes;
    this.startEdge = app.startEdge;

    this.node = this.opts.node;

    this.nodeUpdated = (node) => {
      if (node.id !== this.node.id) {
        // skip this node if the ids don't match
        return;
      }

      this.node = node;
      this.update();
    };

    this.changeStartEdge = (e) => {
      e.preventUpdate = true;
      this.startEdge = e.target.value;
      app.updateStartEdge(e.target.value);
    };

    this.on('mount', () => {
      app.on('nodeUpdated', this.nodeUpdated);
    });

    this.on('unmount', () => {
      app.off('nodeUpdated', this.nodeUpdated);
    });
  </script>
</workflow-start-node>