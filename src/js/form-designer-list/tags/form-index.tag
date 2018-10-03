<form-index>

  <header class="opening  row">
    <div class="opening__body">
      <h2 class="opening__title h2">Available Forms</h2>
    </div>
    <div class="opening__controls">
      <ul class="opening__list  inline-list">
        <li class="opening__item">
          <div class="field-wrap">
            <label for="search-1" class="search-label block-label"><span class="visuallyhidden">Search</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><title>Search</title><path d="M12.9 11.3h-.8l-.3-.3c1-1.2 1.6-2.8 1.6-4.4 0-3.7-3-6.7-6.7-6.7S0 3 0 6.7s3 6.7 6.7 6.7c1.7 0 3.2-.6 4.4-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5.1-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></label>
            <input name="search-1" id="search-1" type="search" class="search-field field-pill" placeholder="Search Forms">
          </div>
        </li>
        <li class="opening__item">
          <button class="btn  btn-dark" onclick={ newForm }>New Form</button>
        </li>
      </ul>
    </div>
  </header>

  <div class="row">
    <div class="col">
      
      <p><strong>{forms.length} Forms</p></strong>

      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th">Name</div>
            <div class="th">Version</div>
            <div class="th">Draft</div>
            <div class="th">Created</div>
            <div class="th">Modified</div>
            <div class="th"></div>
          </div>
        </div>
        <div class="tbody">
          <div class="tr" each={ forms }>
            <div class="td" data-title="Name">
              <h5 class="h5">{ name }</h5>
            </div>
            <div class="td" data-title="Version">
              <p>{ currentVersion }</p>
            </div>
            <div class="td" data-title="Draft">
              <p if={ isDraft }>Draft</p>
            </div>
            <div class="td" data-title="Created">
              <p>12/12/18</p>
            </div>
            <div class="td" data-title="Modified">
              <p>12/12/18</p>
            </div>
            <div class="td" data-title="Actions">
              <button class="icon" onclick={ edit }><span class="visuallyhidden">Edit</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M13.3 0L1.6 11.6 0 18l6.4-1.8L18 4.7 13.3 0zm-8 14.7l-3 1 1-3 8-7.9 2 2-8 7.9zm7-10.9l1.4-1.4 2 2-1.4 1.4-2-2z"/></svg></button>
              <button class="icon" onclick={ delete }><span class="visuallyhidden">Delete</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" width="15" height="18"><path d="M1.1 16c0 1.1 1 2 2.1 2h8.6c1.2 0 2.1-.9 2.1-2V4H1.1v12zM15 1h-3.8l-1.1-1H4.8l-1 1H0v2h15V1z"></path></svg></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- <div class="form-designer">
    <div class="header">
      <h2 style="float: left">Available Forms</h2>
      <button style="float: right" onclick={ newForm }>New Form</button>
      <div style="clear: both" />
    </div>
    <ul>
      <li each={ forms }>
        <span style="">{ name }</span>

        <span style="margin-left: 20px; margin-right: 10px">V{ currentVersion }</span>
        <span if={ isDraft }>(Draft)</span>
        <div style="float: right">
          <button onclick={ edit }>Edit</button>
          <button onclick={ delete }>Delete</button>
        </div>
        <div style="clear: both" />
      </li>
    </ul>
  </div> -->

<!-- <script type="es6"> -->
  <script>
    const app = opts.app;

    this.updateList = (list) => {
      this.forms = list;
      this.update();
    };

    this.newForm = () => {
      app.newForm();
    };

    this.edit = (e) => {
      app.editForm(e.item.id);
    };

    this.delete = (e) => {
      let id = e.item.id;
      app.delete(id);
    };

    this.on('mount', () => {
      app.on('updateList', this.updateList);

      app.getAll(0, 1000);
    });

    this.on('unmount', () => {
      app.off('updateList', this.updateList);
    });
  </script>
</form-index>