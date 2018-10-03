<workflow>
  <div class="workflow-node">
    <h3>Nodes</h3>
    <div class="workflow-node" each={ node in workflow.nodes }>
      <p>ID: { node.id }</p>
      <p>Current Version: { node.currentVersion }</p>
    </div>
  </div>
  <script type="es6">
    this.workflow = opts.workflow;
  </script>
</workflow>