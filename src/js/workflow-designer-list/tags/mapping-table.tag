<mapping-table>
  <virtual if={ rows.length> 0}>
    <div class="table">

      <div class="thead">
        <div class="tr">
          <div class="th">Handle</div>
          <div class="th">Workflow</div>
          <div class="th"></div>
        </div>
      </div>
      <div class="tbody">
        <div each={row, i in rows } class="tr">
          <div class="td" data-title="Handle">
            <div class="field-wrap">
              <input name="map-handle" id="map-handle" class="field field-dark-bg" placeholder="Enter a handle" value={ row.handle } disabled={ !row.isDraft } onchange={ updateRowHandle }>
            </div>
          </div>
          <div class="td" data-title="Workflow">
            <div class="field-wrap">
              <select name="map-workflow" id="map-workflow" class="field field-dark-bg" disabled={ !row.isDraft } onchange= { updateRowWorkflowId }>
                <option value="null">Select Workflow</option>
                <option each={ availableWorkflows } value={ id } selected={ row.workflowGraphId===id }>
                  { name + ' V' + versionNumber }
                </option>
              </select>
            </div>
          </div>
          <div style="width:14%" class="td" data-title="Actions">
            <button if={row.isDraft} class="btn btn-smaller" onclick={ saveRow }>Save</button>
            <button if={!row.isDraft} class="icon" onclick= { editRow }>
              <span class="visuallyhidden">Edit</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                <path d="M13.3 0L1.6 11.6 0 18l6.4-1.8L18 4.7 13.3 0zm-8 14.7l-3 1 1-3 8-7.9 2 2-8 7.9zm7-10.9l1.4-1.4 2 2-1.4 1.4-2-2z"
                />
              </svg>
            </button>
            <button class="icon" onclick={ deleteRow }>
              <span class="visuallyhidden">Delete</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" width="15" height="18">
                <path d="M1.1 16c0 1.1 1 2 2.1 2h8.6c1.2 0 2.1-.9 2.1-2V4H1.1v12zM15 1h-3.8l-1.1-1H4.8l-1 1H0v2h15V1z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </virtual>

  <button class="btn btn-icon btn-dark btn-square" onclick={addRow}>
    <i class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
        <path d="M9 9H0v2h9v9h2v-9h9V9h-9V0H9v9z"></path>
      </svg>
    </i>
  </button>
  </div>

  <script type="es6">
    const app = this.opts.app;
    this.availableWorkflows = [];
    this.mappings = [];
    this.rows = [];

    this.addRow = () => {
      this.rows.push({id:null, handle: null, workflowGraphId: null, isDraft: true});
      this.update();
    }
    
    this.updateRowHandle = (e) => {
      var item = e.item;
      var value = e.target.value;
      this.rows[item.i].handle = value;
    }
    this.updateRowWorkflowId = (e) => {
      var item = e.item;
      var value = e.target.value;
      this.rows[item.i].workflowGraphId = value;
    }

    this.saveRow = (e) => {
      var item = e.item;
      var row = this.rows[item.i];
      if (row.handle && row.workflowGraphId) {
        row.isDraft = false;
        app.saveMapping(row);
      }
      this.update();
    }

    this.deleteRow = (e) => {
      var item = e.item;
      var row = this.rows[item.i];
      this.rows.splice(item.i, 1);
      if (row.id) {
        app.deleteMapping(row.id);
      }
      this.update();
    }

    this.editRow = (e) => {
      var item = e.item;
      this.rows[item.i].isDraft = true;
      this.update();
    }

    this.updateWorkflows = (workflows) => {
      this.availableWorkflows = workflows;
      this.update();
    }

    this.updateMappings = (mappings) => {
      this.rows = mappings;
      this.update();
    }

    this.on('mount', () => {
      app.getMappings(0, 100);
      app.getAvailableWorkflows(0,100);
      app.on('updateAvailableWorkflows', this.updateWorkflows);
      app.on('mappingsLoaded', this.updateMappings)
    });

    this.on('unmount', () => {
      app.off('updateAvailableWorkflows', this.updateWorkflows);
      app.off('mappingsLoaded', this.updateMappings)
    });

    </script>

</mapping-table>