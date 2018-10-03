<workflow-action-panel>

  <p class="drawer__info">{ rank }</p>

  <div class="drawer__group">
    <!-- <button class="drawer__delete drawer__delete-rule btn btn-square btn-icon"><span class="visuallyhidden">Delete condition</span><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 7.4L1.6 0 0 1.6 7.4 9 0 16.4 1.6 18 9 10.6l7.4 7.4 1.6-1.6L10.6 9 18 1.6 16.4 0 9 7.4z"></path></svg></i></button> -->
    <virtual each={ userAction in filterActions(userActions) }>
      <workflow-action-panel-item 
        app={ app }
        rank={ rank }
        nodeid={ nodeId }
        action={ userAction }
        >
      </workflow-action-panel-item>
      <hr>
    </virtual>
    <div>
      <button class="btn btn-small" onClick={ addUserAction }>Add New Action</button>
    </div>
  </div>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.nodeId = this.opts.nodeid;
    this.rank = this.opts.rank;
    this.userActions = this.opts.useractions;

    this.filterActions = (actions) => {
      return actions.filter(p => p.rank === this.rank);
    };

    this.addUserAction = () => {
      app.addUserAction(this.rank, this.nodeId);

      this.refs.newUserActionName.value = null;
    };

    this.updateUserActionCategory = (e) => {
      var curUserActionId = e.item.userAction.id;
      var category = parseInt(e.target.value);
      if (!isNaN(category)){
        app.updateUserActionCategory(category, curUserActionId, this.nodeId);
        app.getTagsByCatId(0, 100, category, curUserActionId);
      } else app.updateUserActionCategory(-1, curUserActionId, this.nodeId);
    }

    this.addUserActionTag = (e) => {
      var tagId = e.item.id;
      var tagName = e.item.name;
      var actionId = e.item.actionId;

      app.addUserActionTag(tagId, tagName, actionId, this.nodeId);
    }

    this.on('mount', () => {
      app.on('triggerDeleted', this.deleteTrigger)
    });

    this.on('unmount', () => {
      app.off('triggerDeleted', this.deleteTrigger);
    })
  </script>

</workflow-action-panel>