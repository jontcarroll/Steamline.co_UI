<workflow-action-trigger>

  <div class="drawer__innergroup">
    <div class="field-wrap custom-select-wrap">
      <i class="custom-select-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
          <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
        </svg>
      </i>
      <select name="select-a-trigger" id="select-a-trigger" class="field" onchange={ updateTrigger }>
        <option value="null">Select a trigger</option>
        <option value="validate_form" selected={ val === 'validate_form' }>Validate Form</option>
        <option value="send_email" selected={ val === 'send_email' }>Send Email</option>
      </select>

    </div>
    <button class="drawer__delete drawer__delete-condition btn btn-square btn-icon" onClick={ deleteTrigger }>
      <span class="visuallyhidden">Delete trigger</span>
      <i class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 2" width="20" height="2">
          <path d="M0 0h20v2H0V0z"></path>
        </svg>
      </i>
    </button>
  </div>

  <script type="es6">
    const app = this.opts.app;
    this.id = this.opts.id;
    this.val = this.opts.val;
    this.actionId = this.opts.actionid;
    this.nodeId = this.opts.nodeid;

    this.deleteTrigger = (e) => {
      app.trigger('triggerDeleted', this.id, this.actionId);
    }

    this.updateTrigger = (e) => {
      app.updateUserActionTriggerValue(this.id, this.actionId, this.nodeId, e.target.value)
    }
    
    this.on('mount', () => {
    });
    this.on('unmount', () => {
    });

  </script>
</workflow-action-trigger>