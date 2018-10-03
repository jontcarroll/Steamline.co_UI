class FormDesignerList extends Authenticated {
    constructor(apiPaths) {
        super();
        this.baseUrl = apiPaths.api + '/designer/forms';
        riot.observable(this);
        this.formDesigns = [];

        riot.mount('form-index', { app: this });
    }

    newForm() {
        window.location = '/formdesigner/new';
    }

    editForm(id) {
        window.location = '/formdesigner/' + id;
    }

    getAll(page, size) {
        this.authReq({
            method: 'get',
            url: this.baseUrl,
            params: {
                pageNum: page,
                pageSize: size
            }
        }).then(resp => {
            if (resp.status == 200) {
                this.formDesigns = resp.data.records;
                this.trigger('updateList', this.formDesigns);
            }
        });
    }

    delete(id) {
        this.authReq({
            method: 'delete',
            url: this.baseUrl + '/' + id,
        }).then(resp => {
            if (resp.status == 204) {
                var index = this.formDesigns.findIndex(p => p.id == id);
                this.formDesigns.splice(index, 1);
                this.trigger('updateList', this.formDesigns);
            }
            else {
                // bad shit
            }
        }); 
    }
}