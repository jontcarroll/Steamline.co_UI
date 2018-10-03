<workflow-end-node>
    <header class="drawer__header">
        <h3 class="h3">End node</h3>
        <workflow-node-header
          app={ app }
          name={ node.name }
          type={ node.type }
          statusid={ node.statusId }
          nodeid={ node.id }
          emailtemplateid={ node.emailTemplateId }>
        </workflow-node-header>
      </header>

  <script type="es6">
      const app = this.opts.app;
      this.app = app;
      this.node = this.opts.node;
    
  </script>
  
</workflow-end-node>
