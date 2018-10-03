class EmailTemplates extends Authenticated {
  constructor(apiPaths) {
    super();
    this.baseUrl = `${apiPaths.api}/email`;

    // this.curMaxOrder

    riot.observable(this);

    this.sortDesc = (a, b) => {
      if (a > b) {
        return -1;
      }

      if (a < b) {
        return 1;
      }

      return 0;
    };

    this.getAll(0, 100).then(() => {
      riot.mount('email-templates', { app: this });
    });
  }

  getAll(page, size) {
    const config = api.helpers.page(page, size, {
      url: this.baseUrl + '/events',
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.emailEvents = data.records;
      console.log(this.emailEvents);
    });
  }



  chooseEvent(eventId) {
    const config = api.helpers.page(0, 100, {
      url: `${this.baseUrl}/events/${eventId}/templates`,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.curTemplates = data.records;
    });
  }

  saveTemplate(payload, curTemplateId) {
    if (utils.isNullOrUndefined(curTemplateId)) {
      this.authReq({
        url: `${this.baseUrl}/templates`,
        method: 'post',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Template created' });
      });
    } else {
      this.authReq({
        url: `${this.baseUrl}/templates/${curTemplateId}`,
        method: 'put',
        data: payload
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Template saved' });
      });
    }
  }

  saveEvent(payload, eventId) {
    this.authReq({
      url: `${this.baseUrl}/events/${eventId}`,
      method: 'put',
      data: payload
    }).then(resp => {
      this.trigger('alert', { type: 'success', message: 'Event Saved' });
    });
  }

  deleteTemplate(templateId) {
    this.authReq({
      url: `${this.baseUrl}/templates/${templateId}`,
      method: 'delete',
      data: null
    }).then(resp => {
      this.trigger('alert', { type: 'success', message: 'Template deleted' });
      reload();
    }).catch(err => {
      const resp = err.response;
      if (utils.isNullOrUndefined(resp)) {
        console.log(resp);
        this.trigger('alert', { type: 'error', message: 'Failed to delete template.' });
      }
      else {
        console.log(resp);
        for(let i = 0; i < resp.data.errors.length; i++) {
          this.trigger('alert', { type: 'error', message: resp.data.errors[i]});
        }
      }
    });
  }

  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}