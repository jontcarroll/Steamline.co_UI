<workflow-action-panel-item>
  <div class="drawer__innergroup form">
    <button class="drawer__delete drawer__delete-condition btn btn-square btn-icon" onClick={ deleteUserAction }>
      <span class="visuallyhidden">Delete user action</span>
      <i class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 2" width="20" height="2">
          <path d="M0 0h20v2H0V0z"></path>
        </svg>
      </i>
    </button>
    <div class="field-row field-colcount-2">
      <div class="field-col-2-3">
        <label for="action-name" class="label">Action name</label>
        <div class="field-wrap">
          <input name="action-name" id="action-name" class="field field-dark-bg" value={ userAction.name } placeholder="Action Name"
            onchange={ updateUserActionName }>
        </div>
      </div>
    </div>
    <div class="field-row field-colcount-2">
      <div class="field-col-1-2">
        <label for="action-edge" class="label">Type:</label>
        <div class="field-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <select name="action-type" id="action-type" class="field field-dark-bg" ref="actionType" onchange={ updateUserActionType }>
            <option value="advance_all" selected={userAction.type==='advance_all' }>Advance All</option>
            <option value="advance_any" selected={userAction.type==='advance_any' }>Advance Any</option>
            <option value="tag_people" selected={userAction.type==='tag_people' }>Tag People</option>
          </select>
        </div>
      </div>
      <div if={ (userAction.type !=='tag_people' || tagPeopleAdvance) } class="field-col-1-2">
      <action-panel-search-select nodeid={nodeId} app={app} othernodes={otherNodes} useraction={userAction}>
      </action-panel-search-select>
        
      </div>
    </div>
    <div class="field-row field-colcount-2">
      <div class="field-col-1-2">
        <label for="ac-validate-{actionId}" class="custom-checkbox-outer  block-label">
          <input name="ac-validate-{actionId}"
            id="ac-validate-{actionId}" class="visuallyhidden" type="checkbox"
            onChange={ validateChange }
            checked={ validate }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Validate form</span>
        </label>
      </div>
    </div>
    <div class="field-row field-colcount-2">
      <div class="field-col-1-2">
        <label for="ac-require-comment-{actionId}" class="custom-checkbox-outer  block-label">
          <input name="ac-require-commen-{actionId}"
            id="ac-require-comment-{actionId}" class="visuallyhidden" type="checkbox"
            onChange={ requireCommentChange }
            checked={ requireComment }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Require comment</span>
        </label>
      </div>
    </div>
    <div class="field-row field-colcount-2">
      <div class="field-col-1-2">
        <label for="ac-track-{actionId}" class="custom-checkbox-outer  block-label">
          <input name="ac-track-{actionId}"
            id="ac-track-{actionId}" class="visuallyhidden" type="checkbox"
            onChange={ setTrack }
            checked={ track }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Track action</span>
        </label>
      </div>
    </div>
    <div  if={ userAction.type === 'tag_people' } class="field-row field-colcount-2">
      <div class="field-col-1-2">
        <label for="ac-tag-advance-{actionId}" class="custom-checkbox-outer  block-label">
          <input name="ac-tag-advance-{actionId}"
            id="ac-tag-advance-{actionId}" class="visuallyhidden" type="checkbox"
            onChange={ setTagPeopleAdvance }
            checked={ tagPeopleAdvance }>
          <span class="custom-checkbox">
            <i class="custom-checkbox-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.8 10" width="13.8" height="10"><path d="M5.2 10L0 4.8l1.4-1.4 3.8 3.8L12.3 0l1.5 1.4z"></path></svg></i>
          </span>
          <span class="custom-checkbox-label label">Advance Workflow</span>
        </label>
      </div>
    </div>
    <div class="" if={ track }>
        <label for="ac-track-text" class="label">Enter action text override</label>
          <div class="field-wrap">
            <input name="ac-track-text" id="ac-track-text" class="created-node-name field field-dark-bg" value={ trackingText } placeholder="action text"
              onchange={ trackTextChanged }>
          </div>
    </div>
    <!--
    <div class="form">
      <label for="select-a-trigger" class="label">Triggers:</label>
      <virtual each={ trigger in userAction.triggers }>
       <workflow-action-trigger
        val={ trigger.value } 
        app={ app } 
        id={ trigger.id }
        actionid={ userAction.id }
        nodeid= { nodeId }>
        </workflow-action-trigger>
      </virtual> 
    </div>
    <div>
      <button class="btn btn-dark btn-small" onclick={ addNewTrigger }>New Trigger</button>
    </div>
    -->
    <div if={ userAction.type==='tag_people' }>
      <label>Ad Hoc role setup</label>
      <hr>
      <div class="filters">
        <div class="form">
          <div>
            <label for="select-a-category" class="label">Tags:</label>
            <div class="field-wrap custom-select-wrap">
              <i class="custom-select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                  <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
                </svg>
              </i>
              <select name="select-a-category" id="select-a-category" class="field" onchange={ updateUserActionCategory }>
                <option value="null">Select a category</option>
                <option each={cat in categories} value={ cat.id }>
                  { cat.name }
                </option>
              </select>
            </div>
          </div>
        </div>
        <ul class="filter__list">
          <li each={ curTags[userAction.id] } class="filter__item" onClick={ addUserActionTag }>{ name }
            <i class="filter__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
              </svg>
            </i>
          </li>
        </ul>
      </div>
      <div class="tags">
        <button each={tag in userAction.tags } onClick={ removeUserActionTag } class="tag-icon">{ tag.name }
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
            <path d="M9 7.4L1.6 0 0 1.6 7.4 9 0 16.4 1.6 18 9 10.6l7.4 7.4 1.6-1.6L10.6 9 18 1.6 16.4 0 9 7.4z"></path>
          </svg>
        </button>
      </div>
      <div class="form">
        <div>
          <label for="role-category" class="label">Role Category:</label>
          <div class="field-wrap custom-select-wrap">
            <i class="custom-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
              </svg>
            </i>
            <select name="role-category" id="role-category" class="field" onchange={ updateUserActionRoleCategory }>
              <option value="null">Select a category</option>
              <option each={cat in categories} value={ cat.id } selected={cat.id===userAction.adhocFilter.tagCategoryId} class="">
                { cat.name }
              </option>
            </select>
          </div>
        </div>
      </div>
      <label>Ad Hoc user setup</label>
      <hr>
      <div class="form">
        <div>
          <label for="user-filter-from" class="label">Filter user from:</label>
          <div class="field-wrap custom-select-wrap">
            <i class="custom-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
              </svg>
            </i>
            <select name="user-filter-from" id="user-filter-from" class="field" onchange={ tagPeoplUserFilterChange }>
              <option value="null">Select source</option>
              <option value="field" selected={ auFrom === 'field' }>Form Field</option>
              <option value="tag_cat" selected={ auFrom === 'tag_cat' }>Tag Category</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form" if={ auFrom === 'field' }>
        <div>
          <label for="uf-form-node-select" class="label">Select form step</label>
          <div class="field-wrap custom-select-wrap">
            <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
            <select
              class="field field-dark-bg"
              onchange={ formNodeChange }>
              <option value="null">Select a form step</option>
              <option 
                each={ formNodes }
                selected={ auNodeId === id }
                value={ id }>
                  { name + '-' + state.formSectionName }
              </option>
            </select>
          </div>
        </div>
        <div if={ formSectionControls }>
          <label for="user-filter-tag-category" class="label">Select a control</label>
          <div class="field-wrap custom-select-wrap">
            <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
            <select 
              class="field field-dark-bg"
              onchange={ formControlChange }>
              <option value="null">Select a control</option>
              <option 
                each={ filterControls(formSectionControls) }
                value={ id }
                selected={ auControlId === id }>
                  { label }
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form" if={ auFrom === 'tag_cat' }>
        <div>
          <label for="user-filter-tag-category" class="label">Choose the filter category</label>
          <div class="field-wrap custom-select-wrap">
            <i class="custom-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
              </svg>
            </i>
            <select name="user-filter-tag-category" id="user-filter-tag-category" class="field" onchange={ auFilterCategory }>
              <option value="null">Select a category</option>
              <option each={cat in categories} value={ cat.id } selected={ cat.id===userAction.adhocUsers.tagCategoryId } class="">
                { cat.name }
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.nodeId = this.opts.nodeid;
    this.otherNodes = app.getOtherNodes(this.nodeId);
    this.rank = this.opts.rank;
    this.userAction = this.opts.action;
    this.categories = app.cache.categories;
    this.curTags = {}; //working copy of available tags for each tag_people action
    this.formNodes = app.getFormNodes();
    this.adhocUsers = {};

    if (!utils.isNullOrUndefined(this.userAction.adhocUsers)) {
      this.adhocUsers = this.userAction.adhocUsers;
    }

    this.validate = this.userAction.validate;
    this.track = this.userAction.track;
    this.tagPeopleAdvance = this.userAction.tagPeopleAdvance;
    this.requireComment = this.userAction.withComment;
    this.trackingText = this.userAction.trackingText;
    this.actionId = this.userAction.id;
    this.auFrom = this.adhocUsers.from;
    this.auControlId = this.adhocUsers.controlId;
    this.auNodeId = this.adhocUsers.nodeId;
    this.auTagCategoryId = this.adhocUsers.tagCategoryId;

    const formNode = this.formNodes.find(p => p.id === this.auNodeId);
    if (!utils.isNullOrUndefined(formNode)) {
      this.formSectionControls = app.cache.formSectionControls[formNode.formSectionId];
      if (!utils.isNullOrUndefined(this.formSectionControls)) {
        const formControl = this.formSectionControls.find(p => 
          p.id === this.auControlId
        );

        if(!utils.isNullOrUndefined(formControl)) {
          this.formControlValues = formControl.choices;
        }
      }
    }

    this.filterControls = (controls) => {
      return controls.filter(p => p.type == 'choice');
    }

    this.addNewTrigger = (e) => {
      var actionId = this.userAction.id;
      app.addUserActionTrigger(actionId, this.nodeId);
      this.update();
    }

    this.deleteTrigger = (id) => {
      app.removeUserActionTrigger(id, this.userAction.id, this.nodeId);
      this.update();
    }

    this.setTagPeopleAdvance = (e) => {
      this.tagPeopleAdvance = !this.tagPeopleAdvance;
      app.updateUserActionTagPeopleAdvance (this.tagPeopleAdvance, this.userAction.id, this.nodeId);
      this.update();
    }

    this.setTrack = (e) => {
      this.track = !this.track;
      app.updateUserActionTrack(this.track, this.userAction.id, this.nodeId);
      this.update();
    }

    this.validateChange = (e) => {
      this.validate = !this.validate;
      app.updateUserActionValidate(this.validate, this.userAction.id, this.nodeId);
    }

    this.requireCommentChange = (e) => {
      this.requireComment = !this.requireComment;
      app.updateUserActionRequireComment(this.requireComment, this.userAction.id, this.nodeId);
    }
    
    this.trackTextChanged = (e) => {
      this.trackingText = e.target.value;
      app.updateUserActionTrackText(this.trackingText, this.userAction.id, this.nodeId);
    }

    this.tagPeoplUserFilterChange = (e) => {
      this.preventUpdate = true;
      this.auFrom = e.target.value;

      app.updateActionUserFilterFrom(
        this.auFrom,
        this.userAction.id,
        this.nodeId
      );

      this.update();
    }

    this.updateUserActionName = (e) => {
      this.preventUpdate = true;
      const actionName = e.target.value;

      app.updateUserActionName(actionName, this.userAction.id, this.nodeId);
    };

    //this.updateUserActionEdge = (e) => {
    //  this.preventUpdate = true;
    //  const userActionId = e.item.userAction.id;
    //  const newEdge = e.target.value;
    //  console.log(newEdge);
    //  app.updateUserActionEdge(newEdge, this.userAction.id, this.nodeId);
    //};

    this.updateUserActionType = (e) => {
      this.preventUpdate = true;
      const actionType = e.target.value;

      const userActionId = this.userAction.id;
      if (userActionId !== 'tag_people') { // clear working copy of available tags if action type is changed
        if (this.curTags[userActionId]) {
          this.curTags[userActionId] = undefined;
        }
      }
      app.updateUserActionType(actionType, userActionId, this.nodeId);
    };

    this.deleteUserAction = (e) => {
      this.preventUpdate = true;

      app.removeUserAction(this.userAction.id, this.nodeId);
    };

    this.updateUserActionCategory = (e) => {
      var curUserActionId = this.userAction.id;
      var category = parseInt(e.target.value);
      if (!isNaN(category)){
        app.updateUserActionCategory(category, curUserActionId, this.nodeId);
        app.getTagsByCatId(0, 100, category, curUserActionId);
      } else app.updateUserActionCategory(-1, curUserActionId, this.nodeId);
    }

    this.addUserActionTag = (e) => {
      var tagId = e.item.id;
      var tagName = e.item.name;
      var actionId = this.userAction.id;

      app.addUserActionTag(tagId, tagName, actionId, this.nodeId);
    }

    this.removeUserActionTag = (e) => {
      var tagId = e.item.tag.id;
      var actionId = this.userAction.id;

      app.removeUserActionTag(tagId, actionId, this.nodeId);
    }

    this.tagsLoaded = (data) => {
      for(let i = 0; i < data.data.length; i++) {
        data.data[i].actionId = data.id; //set action id on tag to use when selecting a tag
      }
      this.curTags[data.id] = data.data;
      this.update();
    }
    
    this.updateUserActionRoleCategory = (e) => {
      var catId = parseInt(e.target.value);
      var actionId = this.userAction.id;
      if (!isNaN(catId)){
        app.updateUserActionRoleCategory(catId, actionId, this.nodeId);
      }
    }

    this.formNodeChange = (e) => {
      e.preventUpdate = true;

      let nodeId = e.target.value;

      if (nodeId === 'null') {
        nodeId = null;
      }

      app.updateActionUserFilterFormNode(
        nodeId,
        this.userAction.id,
        this.nodeId
      );
    };

    this.formControlChange = (e) => {
      e.preventUpdate = true;

      let controlId = e.target.value;

      if (controlId === 'null') {
        controlId = null;
      }

      app.updateActionUserFilterFormNodeControl(
        controlId,
        this.userAction.id,
        this.nodeId
      );
    }

    this.formSectionControlsUpdated = (e) => {
      if (e.actionId != this.userAction.id) {
        return;
      }

      this.formSectionControls = e.controls;
      this.update();
    };

    this.auFilterCategory = (e) => {
      const tagCatId = e.target.value;

      app.updateActionUserFilterTagCat(
        tagCatId,
        this.userAction.id,
        this.nodeId
      );

      this.update();
    }

    this.on('mount', () => {
      app.on('categoryTagsLoaded', this.tagsLoaded);
      app.on('triggerDeleted', this.deleteTrigger)
      app.on('adhocUserFilterControlsUpdate', this.formSectionControlsUpdated);
    });

    this.on('unmount', () => {
      app.off('categoryTagsLoaded', this.tagsLoaded);
      app.off('triggerDeleted', this.deleteTrigger);
      app.off('adhocUserFilterControlsUpdate', this.formSectionControlsUpdated);
    })
  </script>
</workflow-action-panel-item>