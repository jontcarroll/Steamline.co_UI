<filters>

  <header class="opening">
    <div class="opening__body">
      <h2 class="opening__title h2">Filters</h2>
    </div>
  </header>

  <div class="zebra">

    <div class="row">
      <div class="col">
        <div class="filters">
          <div class="filter__group">
            <div class="filter">
              <div class="filter__controls">
                <div class="field-wrap">
                  <label for="filter-category-search" class="search-label block-label"><span class="visuallyhidden">Search</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><title>Search</title><path d="M12.9 11.3h-.8l-.3-.3c1-1.2 1.6-2.8 1.6-4.4 0-3.7-3-6.7-6.7-6.7S0 3 0 6.7s3 6.7 6.7 6.7c1.7 0 3.2-.6 4.4-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5.1-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></label>
                  <input name="filter-category-search" id="filter-category-search" type="search" class="search-field field-pill" placeholder="I am searching for">
                </div>
              </div>
              <ul class="filter__list">
                <li class="filter__item {is-active: curCatId == id}"
                  each={ filters } onClick={ chooseCategory }>
                  <!-- <i class="filter__grab"><span></span><span></span><span></span></i> -->
                  <div class="order-sort">
                    <div onclick={ orderDownCat } class="sort sort__up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></div>
                    <div onclick={ orderUpCat } class="sort sort__down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></div>
                  </div>
                  { name }
                  <i class="filter__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
                </li>
              </ul>
              <div class="filter__controls">
                <button class="btn btn-dark btn-with-icon"
                  onClick={ startNewCategory }>
                  Add New Category
                  <i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"/><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"/></svg></i>
                </button>
              </div>
            </div>
            <div class="filter">
              <div class="filter__controls">
                <div class="field-wrap">
                  <label for="filter-tag-search" class="search-label block-label"><span class="visuallyhidden">Search</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><title>Search</title><path d="M12.9 11.3h-.8l-.3-.3c1-1.2 1.6-2.8 1.6-4.4 0-3.7-3-6.7-6.7-6.7S0 3 0 6.7s3 6.7 6.7 6.7c1.7 0 3.2-.6 4.4-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5.1-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></label>
                  <input name="filter-tag-search" id="filter-tag-search" type="search" class="search-field field-pill" placeholder="I am searching for">
                </div>
              </div>
              <ul class="filter__list">
                <li each={ curTags } onClick={ chooseTag }
                  class="filter__item { is-active: curTagId == id }">
                  <!-- <i class="filter__grab"><span></span><span></span><span></span></i> -->
                  <div class="order-sort">
                    <div onclick={ orderDownTag } class="sort sort__up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></div>
                    <div onclick={ orderUpTag } class="sort sort__down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></div>
                  </div>
                  { name }
                  <i class="filter__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
                </li>
              </ul>
              <div class="filter__controls">
                <button class="btn btn-dark btn-with-icon"
                  onClick={ startNewTag } if={ curCatId }>
                  Add New Tag
                  <i class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16.9c-4.3 0-7.9-3.5-7.9-7.9S4.7 1.1 9 1.1s7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9z"/><path d="M8.4 4.5v3.9H4.5v1.2h3.9v3.9h1.2V9.6h3.9V8.4H9.6V4.5z"/></svg></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" if={ editCategoryUp }>
      <div class="col" style="width: 600px;">

        <h4>Category Settings</h4>
        
        <div class="form">
          <div>
            <label for="filter-category-type" class="label">Type</label>
            <div class="field-wrap custom-select-wrap">
              <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
              <select onChange={ updateCatType } 
                name="filter-category-type" id="filter-category-type"
                class="field">
                <option value="">Select One</option>
                <option value="admin"
                  selected={ currentCatEdit.type == 'admin' }>Admin</option>
                <option value="asset"
                  selected={ currentCatEdit.type == 'asset' }>Asset</option>
              </select>
            </div>
          </div>
          <div>
            <label for="filter-category-name" class="label">Name</label>
            <div class="field-wrap">
              <input placeholder="Enter category name"
                value={ currentCatEdit.name }
                onblur={ updateCatName }
                name="filter-category-name" id="filter-category-name"
                type="text" class="field">
            </div>
          </div>
          <div>
            <label if={ curCatId } for="filter-category-status"
              class="custom-switch-outer label">
              <span class="custom-switch-label label">Active?</span>
              <input onChange={ updateCatActive }
                name="filter-category-status" id="filter-category-status"
                class="visuallyhidden" type="checkbox" checked={ currentCatEdit.active }>
              <div class="custom-switch">
                <div class="custom-switch-knob"></div>
              </div>
            </label>
          </div>
          <div class="form-controls btn-group">
            <button class="btn" onClick={ saveCategory }>Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row"  if={ editTagUp }>
      <div class="col" style="width: 600px;">

        <h4>Filter/Tag Settings</h4>
        
        <div class="form">
          <div>
            <p class="label inline-label">Parent</p>
            <div class="field-wrap custom-select-wrap">
              <p>{currentCatEdit.name}</p>
            </div>
          </div>
          <div>
            <label for="filter-tag-name" class="label">Name</label>
            <div class="field-wrap">
              <input 
                value={ currentTagEdit.name }
                onblur={ updateTagName }
                name="filter-tag-name" id="filter-tag-name"
                type="text" class="field">
            </div>
          </div>
          <div>
            <label if={ curTagId }
              for="filter-tag-status" class="custom-switch-outer label">
              <span class="custom-switch-label label">Active?</span>
              <input onChange={ updateTagActive }
                name="filter-tag-status" id="filter-tag-status"
                class="visuallyhidden" type="checkbox" checked={ currentTagEdit.active }>
              <div class="custom-switch">
                <div class="custom-switch-knob"></div>
              </div>
            </label>
          </div>
          <div>
            <label for="filter-tag-template-copy" class="label">Template-specific Copy</label>
            <div class="field-wrap">
              <textarea name="filter-tag-template-copy"
                id="filter-tag-template-copy" cols="30" rows="10" class="field"
                onChange={ updateTSCopy }></textarea>
            </div>
          </div>
          <div class="form-controls btn-group">
            <button class="btn" onClick={ saveTag }>Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollToNew"></div>
    <message-bar app={ app }></message-bar>

  </div>

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.filters = app.filters;

    this.editCategoryUp = false;
    this.editTagUp = false;

    this.currentCatEdit = {};
    this.currentTagEdit = {};

    this.curCatId = null;
    this.curTagId = null;

    this.startNewCategory = () => {
      this.curCatId = null;
      this.curTagId = null;

      this.editCategoryUp = true;
      this.editTagUp = false;
      
      this.currentCatEdit = {
        name: '',
        type: '',
        order: app.getNextOrderNumCat(),
        active: true
      };

      this.update();
    }

    this.startNewTag = () => {
      this.curTagId = null;

      this.editCategoryUp = false;
      this.editTagUp = true;
      
      this.currentTagEdit = {
        name: '',
        type: '',
        order: app.getNextOrderNumTag(this.curCatId),
        active: true,
        text: ''
      };

      this.update();
    }

    this.updateCatType = (e) => {
      this.currentCatEdit.type = e.target.value;
    };

    this.updateCatName = (e) => {
      this.currentCatEdit.name = e.target.value;
    };

    this.updateTagName = (e) => {
      this.currentTagEdit.name = e.target.value;
    };

    this.updateTSCopy = (e) => {
      this.currentTagEdit.text = e.target.value;
    };

    this.updateCatActive = () => {
      let catActiveCheckbox = 
        this.root.querySelector('#filter-category-status:checked');
      if(!utils.isNullOrUndefined(catActiveCheckbox)) {
        this.currentCatEdit.active = true;
      } else {
        this.currentCatEdit.active = false;
      }
    };

    this.updateTagActive = () => {
      this.currentTagEdit.active = !this.currentTagEdit.active;
    };

    this.chooseCategory = (e) => {
      this.curCatId = e.item.id;
      this.editCategoryUp = true;
      this.editTagUp = false;

      this.currentCatEdit = {
        name: e.item.name,
        type: e.item.type,
        order: e.item.order,
        active: e.item.active
      };

      app.chooseCategory(e.item.id).then(() => {
        this.curTags = app.curTags;
        this.update();
      });
    };

    this.chooseTag = (e) => {
      this.curTagId = e.item.id;
      this.editCategoryUp = false;
      this.editTagUp = true;

      this.currentTagEdit = {
        name: e.item.name,
        type: e.item.type,
        order: e.item.order,
        active: e.item.active,
        text: e.item.text
      };
    };

    this.orderChange = (thisItem, catOrTag, direction) => {
      let thisItemOrder = thisItem.order;
      let swapItem;
      let swapItemOrder;

      let arrayToSearch;
      if(catOrTag == 'cat') {
        arrayToSearch = this.filters;
      } else if (catOrTag == 'tag') {
        arrayToSearch = this.curTags;
      }

      for(let i = 0; i < arrayToSearch.length; i++) {
        if(arrayToSearch[i].id != thisItem.id) {
          if(direction == 'up') {
            // find the lowest order that is still above thisItemOrder
            if(arrayToSearch[i].order > thisItem.order &&
               (utils.isNullOrUndefined(swapItemOrder) ||
                arrayToSearch[i].order < swapItemOrder) ) {
              swapItem = arrayToSearch[i];
              swapItemOrder = arrayToSearch[i].order;
            }
          } else if(direction == 'down') {
            // find the highest order that is still above thisItemOrder
            if(arrayToSearch[i].order < thisItem.order &&
               (utils.isNullOrUndefined(swapItemOrder) ||
                arrayToSearch[i].order > swapItemOrder) ) {
              swapItem = arrayToSearch[i];
              swapItemOrder = arrayToSearch[i].order;
            }
          }
        }
      }

      if(!utils.isNullOrUndefined(swapItem)) {
        thisItem.order = swapItemOrder;
        swapItem.order = thisItemOrder;
        if(catOrTag == 'cat') {
          app.saveCategory(thisItem, thisItem.id);
          app.saveCategory(swapItem, swapItem.id);
        } else if(catOrTag == 'tag') {
          app.saveTag(thisItem, this.curCatId, thisItem.id);
          app.saveTag(swapItem, this.curCatId, swapItem.id);
        }
      }
    }

    this.orderDownCat = (e) => {
      this.orderChange(e.item, 'cat', 'down');
    }

    this.orderUpCat = (e) => {
      this.orderChange(e.item, 'cat', 'up');
    }

    this.orderDownTag = (e) => {
      this.orderChange(e.item, 'tag', 'down');
    }

    this.orderUpTag = (e) => {
      this.orderChange(e.item, 'tag', 'up');
    }

    this.saveCategory = () => {
      app.saveCategory(this.currentCatEdit, this.curCatId);
    };

    this.saveTag = () => {
      app.saveTag(this.currentTagEdit, this.curCatId, this.curTagId);
    };

    this.tagOrCatSave = (type) => {
      if(type == 'cat') {
        app.getAll();
      } else if(!utils.isNullOrUndefined(this.curCatId)) {
        app.chooseCategory(this.curCatId);
      }
    };

    this.tagOrCatUpdate = (type) => {
      if(type == 'cat') {
        this.filters = app.filters;
      } else if(!utils.isNullOrUndefined(this.curCatId)) {
        this.curTags = app.curTags;
      }
      this.update();
    }

    this.on('mount', () => {
      app.on('tagOrCatSave', this.tagOrCatSave);
      app.on('tagOrCatUpdate', this.tagOrCatUpdate);
    });
    this.on('unmount', () => {
      app.off('tagOrCatSave', this.tagOrCatSave);
      app.off('tagOrCatUpdate', this.tagOrCatUpdate);
    });
  </script>
</filters>