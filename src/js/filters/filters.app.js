class Filters extends Authenticated {
  constructor(apiPaths) {
    super();
    this.baseUrl = `${apiPaths.api}/tag/categories`;

    // this.curMaxOrder
    
    riot.observable(this);

    this.sortDescOrder = (a, b) => {
      if (a.order > b.order) {
        return -1;
      }

      if (a.order < b.order) {
        return 1;
      }

      return 0;
    };

    this.sortAscOrder = (a, b) => {
      if (a.order < b.order) {
        return -1;
      }

      if (a.order > b.order) {
        return 1;
      }

      return 0;
    };

    this.getAll(0, 100).then(() => {
      riot.mount('filters', { app: this });
    });
  }

  getAll(page, size) {
    const config = api.helpers.page(page, size, {
      url: this.baseUrl,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      data.records.sort(this.sortAscOrder);
      this.filters = data.records;
      this.trigger('tagOrCatUpdate', 'cat');
    });
  }

  getNextOrderNumCat() {
    if (this.filters.length == 0) {
      return 0;
    }
    console.log(this.filters.sort(this.sortDescOrder));
    const next = this.filters.sort(this.sortDescOrder)[0].order + 1;
    console.log(next);
    return next;
  }

  getNextOrderNumTag(catId) {
    if (utils.isNullOrUndefined(this.curTags) || this.curTags.length == 0) {
      return 0;
    }
    const next = this.curTags.sort(this.sortDesc)[0].order + 1; 
    return next;
  }

  chooseCategory(catId) {
    // get the tags for the category
    const config = api.helpers.page(0, 100, {
      url: `${this.baseUrl}/${catId}/tags`,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.curTags = data.records;
      this.trigger('tagOrCatUpdate', 'tag');
    });
  }

  saveTag(payload, catId, tagId) {
    if (utils.isNullOrUndefined(tagId)) {
      this.authReq({
        url: `${this.baseUrl}/${catId}/tags`,
        method: 'post',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Category created' });
        this.trigger('tagOrCatSave', 'tag');
      });
    } else {
      this.authReq({
        url: `${this.baseUrl}/${catId}/tags/${tagId}`,
        method: 'put',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Category updated' });
        this.trigger('tagOrCatSave', 'tag');
      });
    }
  }

  saveCategory(payload, catId) {
    if (utils.isNullOrUndefined(catId)) {
      this.authReq({
        url: `${this.baseUrl}`,
        method: 'post',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Category created' });
        this.trigger('tagOrCatSave', 'cat');
      });
    } else {
      this.authReq({
        url: `${this.baseUrl}/${catId}`,
        method: 'put',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Category updated' });
        this.trigger('tagOrCatSave', 'cat');
      });
    }
  }
}