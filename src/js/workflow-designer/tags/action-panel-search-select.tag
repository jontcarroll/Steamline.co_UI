<action-panel-search-select>
        <label for="action-edge" class="label">Connects to:</label>
        <div class="field-wrap">
          <i class="custom-select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
              <path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path>
            </svg>
          </i>
          <input class="field field-dark-bg" placeholder="{selected}"  oninput={filterNodes} onfocus={showDropDown} onblur={blurfunc} value={selected}>
          <div class="search-select-wrapper">
          <ul class="search-select-ul" show={selections.isvisible}>
            <li each={node in displayedNodes} onclick={updateUserActionEdge}>
                
                {node.name} <span class="list-id" >{node.id}</span>
                
            </li>
          </ul>
          </div>
        </div>

      <style>
        .search-select-wrapper {
            position: relative;
        }
        .search-select-ul {
            position: absolute;
            border-radius: 3px;
            width: 200%;
            left:-100%;
            list-style: none;
            padding: 4px;
            top:4px;
            background-color: #fff;
            color: #343434;
            z-index: 100;
            max-height: 300px;
            overflow:scroll;
        }
        .search-select-ul li {
            list-style: none;
            border-bottom: 1px solid #343434;
            padding: 4px 12px 4px 4px;
            cursor: pointer;
            position:relative;
        }
        .search-select-ul li:last {
            border-bottom: none;
        }
        .search-select-ul li:hover {
            background-color: #4fc3f7;
            color: #fff;
        }
        .list-id {
            position: absolute;
            font-size: 9px;
            right: 4px;
            bottom: 4px;
        }
      </style>
      <script>
      //todo: tab order and keyboard interaction
      let _this = this;
      this.app = this.opts.app;
      this.otherNodes = this.opts.othernodes;
      this.userAction = this.opts.useraction;
      this.nodeId = this.opts.nodeid;

      this.selected = 'Select Node'
      this.displayedNodes = this.otherNodes;
      this.selections = {
          isvisible: false
      }

      this.blurfunc = () => {
          this.hideDropDown();
      }
      this.showDropDown = () => {
          this.selections.isvisible = true;
      }
      this.hideDropDown = () =>{
          //dirty: use timeout 
          setTimeout(function(){
                        _this.selections.isvisible = false;
                        _this.update();
          }, 200);
      };
      this.selectedEdge = () => {
          this.otherNodes.filter((item)=>{
              if(parseFloat(item.id) == parseFloat(this.userAction.edge)) {
                  this.selected = item.name;
              }
          })
      }
      this.filterNodes = (e) => {
          this.selections.isvisible = true;
          let result = this.otherNodes.filter((el)=>{
              let name = el.name;
             return name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
          });
          this.displayedNodes = result;
      }
      this.updateUserActionEdge = (e) => {
        this.hideDropDown();
        this.preventUpdate = true;
        const userActionId = this.userAction.id;
        const newEdge = e.item.node.id;
        this.app.updateUserActionEdge(newEdge, this.userAction.id, this.nodeId);
        this.selections.isvisible = false;
        this.selectedEdge();
      };

      this.selectedEdge();

      </script>
</action-panel-search-select>