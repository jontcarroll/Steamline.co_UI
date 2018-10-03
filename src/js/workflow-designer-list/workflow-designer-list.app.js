class WorkflowDesignLists extends Authenticated {
    constructor(apiPaths) {
        super();
        this.baseUrl = apiPaths.api;
        riot.observable(this);
        this.workflowDesigns = [];
        this.availableWorkflows = [];
        this.workflowMappingRows = [];

        riot.mount('current-workflow', { app: this });
    }

    newWorkflow() {
        window.location = '/workflows/designer';
    }

    editWorkflow(id) {
        window.location = '/workflows/' + id;
    }

    saveMapping(mapping) {
        var payload = {
            id: mapping.id,
            handle: mapping.handle,
            workflowGraphId: mapping.workflowGraphId
        };
        if (mapping.id) {
            this.authReq({
                url: `${this.baseUrl}/workflows/mappings/${mapping.id}`,
                method: 'put',
                data: payload
            }).then(resp => {
                this.trigger('alert', { type: 'success', message: 'Mapping updated' });
            });
        } else {
            this.authReq({
                url: `${this.baseUrl}/workflows/mappings/`,
                method: 'post',
                data: payload
            }).then(resp => {
                this.trigger('alert', { type: 'success', message: 'Mapping updated' });
            });
        }
    }

    getMappings(page, size) {
        return this.authReq({
            method: 'get',
            url: `${this.baseUrl}/workflows/mappings`,
            params: {
                pageNum: page,
                pageSize: size
            }
        }).then(resp => {
            if (resp.status == 200) {
                this.workflowMappingRows = resp.data.records;
                this.trigger('mappingsLoaded', this.workflowMappingRows);
            }
        });
    }

    deleteMapping(id) {
        return this.authReq({
            method: 'delete',
            url: `${this.baseUrl}/workflows/mappings/${id}`
        }).then(resp => {
            if (resp.status == 200) {
                this.trigger('alert', { type: 'success', message: 'Mapping deleted' });
            }
        });
    }

    getAvailableWorkflows(page, size) {
        return this.authReq({
            method: 'get',
            url: `${this.baseUrl}/workflows/available`,
            params: {
                pageNum: page,
                pageSize: size
            }
        }).then(resp => {
            if (resp.status == 200) {
                this.availableWorkflows = resp.data.records;
                this.trigger('updateAvailableWorkflows', this.availableWorkflows);
            }
        });
    }

    getAll(page, size) {
        return this.authReq({
            method: 'get',
            url: `${this.baseUrl}/designer/workflows`,
            params: {
                pageNum: page,
                pageSize: size
            }
        }).then(resp => {
            if (resp.status == 200) {
                this.workflowDesigns = resp.data.records;
                this.trigger('updateList', this.workflowDesigns);
            }
        });
    }

    delete(id) {
        return this.authReq({
            method: 'delete',
            url: `${this.baseUrl}/designer/workflows/${id}`,
        }).then(resp => {
            if (resp.status == 204) {
                var index = this.workflowDesigns.findIndex(p => p.id == id);
                this.workflowDesigns.splice(index, 1);
                this.trigger('updateList', this.workflowDesigns);
            }
            else {
                // bad shit
            }
        });
    }
}