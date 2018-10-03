<workflow-filter-select>
  <div class="filters">
    <div class="form">
      <div>
        <div class="field-wrap custom-select-wrap">
          <i class="custom-select-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
          <select
            name="select-a-filter"
            id="select-a-filter"
            class="field"
            onchange={ chooseCategory }>
            <option value="null">Select a filter</option>
            <option 
              each={ filterCats }
              value={ id }
              selected={ curChosenCat.id === id}>
                { name }
            </option>
          </select>
        </div>
      </div>
    </div>
    <ul class="filter__list">
      <li each={ curTags } class="filter__item"
        onClick={ addTag }>{ name } <i class="filter__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
      </li>
    </ul>
  </div>
  <div class="tags">
    <button each={ cloudTags } onClick={ removeTag }
      class="tag-icon">{ name } <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 7.4L1.6 0 0 1.6 7.4 9 0 16.4 1.6 18 9 10.6l7.4 7.4 1.6-1.6L10.6 9 18 1.6 16.4 0 9 7.4z"></path></svg>
    </button>
  </div>
  <button class="btn btn-grey btn-small" onClick={ removeCloud }>Remove Tag Cloud</button>

  <script>
    const app = this.opts.app;
    this.app = app;
    this.node = this.opts.node;
    this.filterCloudIndex = this.opts.filtercloudindex;
    this.filterCats = app.filters;

    this.stateFiltersObj = this.node.state.filters;
    this.cloudTags = this.stateFiltersObj[this.filterCloudIndex].tags;

    this.curChosenCat = {id: null};


    this.getAllCats = () => {
      app.getAllCats(0, 100);
    }

    this.filtersLoaded = () => {
      this.filterCats = app.filters;
      this.update();
    }

    this.chooseCategory = (e) => {
      this.curChosenCat = e.target.value;
      app.chooseCategory(this.curChosenCat, this.filterCloudIndex);
    }

    this.tagsLoaded = (cloudIndex) => {
      if(this.filterCloudIndex == cloudIndex) {
        this.curTags = app.curTags;
        this.update();
      }
    }

    this.addTag = (e) => {
      let idCheck = e.item.id;
      for(let i = 0; i < this.cloudTags.length; i++) {
        if(this.cloudTags[i].id == idCheck) {
          // don't add a duplicate tag.
          return;
        }
      }
      app.addTag(this.node.id, this.filterCloudIndex, e.item);
      this.update();
    }

    this.removeTag = (e) => {
      let idCheck = e.item.id;
      app.removeTag(this.node.id, this.filterCloudIndex, idCheck);
      this.update();
    }

    this.removeCloud = () => {
      app.removeFilterCloud(this.node.id, this.filterCloudIndex);
    }

    this.on('mount', () => {
      this.getAllCats();
      app.on('filtersLoaded', this.filtersLoaded);
      app.on('tagsLoaded', this.tagsLoaded);
    });
    this.on('unmount', () => {
      app.off('filtersLoaded', this.filtersLoaded);
      app.off('tagsLoaded', this.tagsLoaded);
    });
  </script>
</workflow-filter-select>