class WorkflowDesigner extends Authenticated {
  constructor(apiPaths, workflowId) {
    super();
    this.baseUrl = apiPaths.api;
    this.filterCatUrl = `${this.baseUrl}/tag/categories`;

    // if it's an empty string force to null
    if (workflowId === '') {
      workflowId = null;
    }

    this.workflowId = workflowId;
    riot.observable(this);

    this.cache = {
      'formVersions': {
        // formId: [ ... versions ... ]
        // 12    : []
      },
      'formSections': {
        // formVersionId: [ ... sections ...]
        // 4            : []
      },
      'formSectionControls': {
        // formSectionControlId: [ ... controls ...]
        // 45                  : []
      }
    };

    this.ruleOperators = {
      EQUALS: 0,
      NOT_EQUALS: 1
    };
    this.ruleOperators.DEFAULT = this.ruleOperators.EQUALS;

    this.name = '';
    this.nodes = {}; // Holds node graph
    this.nextId = 0; // id generator, simple incrementing int
    this.projectName = {
      formNodeId: null,
      controlId: null
    };

    this.nodeTypes = ['action', 'form', 'rule', 'end'];
    this.statuses = [];

    this.publishedForms = null; // Used to drive form nodes
    this.startEdge = null;
    this.isDraft = null;

    let startNode = this.buildNode('start', 'Start', [0, 0]);

    this.state = {
      boardWidth: 100,
      boardHeight: 100,
      gridSquareSize: 64,
      startCoords: [0, 0],
      startNode: startNode
    };


    //thanks to: 
    //https://github.com/sterlingwes/RandomColor
    //^^ awesome
    //todo: build the randos array and serve static so it doesn't have to put the burdon on the client every time
    //^^Tou: Oh hi! Unminifying and adding semi-colons so that linters can stop screaming at me
    var rcolor = function(r) {
      function t(e) {
        if (n[e]) return n[e].exports;
        var o = n[e] = {
          i: e,
          l: !1,
          exports: {}
        };
        return r[e].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
      }
      var n = {};
      return t.m = r, t.c = n, t.i = function(r) {
          return r;
      }, t.d = function(r, n, e) {
          t.o(r, n) || Object.defineProperty(r, n, {
            configurable: !1,
            enumerable: !0,
            get: e
          });
      }, t.n = function(r) {
          var n = r && r.__esModule ? function() {
            return r.default;
          } : function() {
            return r;
          };
          return t.d(n, "a", n), n;
      }, t.o = function(r, t) {
        return Object.prototype.hasOwnProperty.call(r, t);
      }, t.p = "", t(t.s = 3);
    }([function(r, t, n) {
      "use strict";
      r.exports = function(r, t, n) {
        var e = Math.floor(6 * r),
            o = 6 * r - e,
            u = n * (1 - t),
            a = n * (1 - o * t),
            c = n * (1 - (1 - o) * t),
            i = 255,
            f = 255,
            s = 255;
        switch (e) {
          case 0:
            i = n, f = c, s = u;
            break;
          case 1:
            i = a, f = n, s = u;
            break;
          case 2:
            i = u, f = n, s = c;
            break;
          case 3:
            i = u, f = a, s = n;
            break;
          case 4:
            i = c, f = u, s = n;
            break;
          case 5:
            i = n, f = u, s = a;
        }
        return [Math.floor(255 * i), Math.floor(255 * f), Math.floor(255 * s)];
      };
    }, function(r, t, n) {
      "use strict";
      var e = n(2);
      r.exports = function(r) {
        var t = r.map(function(r) {
          return e(r.toString(16));
        }).join("");
        return "#" + t;
      };
    }, function(r, t, n) {
      "use strict";
      var e = 2;
      r.exports = function(r) {
        return r.length > e ? r : new Array(e - r.length + 1).join("0") + r;
      };
    }, function(r, t, n) {
      "use strict";
  
      function e() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = r.hue,
            n = r.saturation,
            e = r.value;
        return t || (t = Math.random()), t += c, t %= 1, "number" != typeof n && (n = .5), "number" != typeof e && (e = .95), u(t, n, e);
      }
  
      function o(r, t) {
        var n = e(r, t);
        return a(n);
      }
      var u = n(0),
          a = n(1),
          c = .618033988749895;
      r.exports = o;
    }]);


    //our colors for strokes
    // let randos = [];

    //generates all the colors
    this.randoColor = (number, arr) => {
      let mrand = Math.random();
      var colorAmount = number;
      var goldenRatio = .618033988749895;
      var hrand;
      var diff = .6/colorAmount;
      var s;
      var v;
      var result;
      for(var i=0; i<colorAmount; i++){
        s += diff;
        hrand = ( mrand + (i*goldenRatio));

        switch(i%3){
          case 0:
          v = .45;
          s = .7;
         break;
        case 1: 
          v = .72811529494;
          s = .45;
          break;
        case 2:
          v = .97082039325;
          s = .80;
          break;
        default:
          v = 1;
          s = 1;
         break;
        }
        result = rcolor({
          hue: hrand % 1,
          saturation: s,
          value: v
        });
        arr.push(result);
      }
    };

    //apply colors when called
    this.selectedColorIndex = 0;
    this.selectedStroke = (id) => {
      let stroke;
      if(this.selectedColorIndex >= this.state.colors.length){
        this.selectedColorIndex = 0;
      };
      stroke = this.state.colors[this.selectedColorIndex];
      this.selectedColorIndex++;
      return stroke;
    };
    
    this.strokeIncrement = 0;

    this.lineIncrement = 0;

    this.edgeSize = 8;

    let lanesArray = [0, 0, 0, 0, 0];

    this.gridCoords = [];
    for (let i = 0; i < this.state.boardWidth; i++) {
      for (let j = 0; j < this.state.boardHeight; j++) {
        let newCoord = { x: i, y: j, xLine: lanesArray, yLine: lanesArray };
        this.gridCoords.push(newCoord);
      };
    };

    this.filters = null;
    this.settings = {};

    this.loadPublishedForms();

    /*
    drawer status
      0: closed 
      1: open
    */
    this.drawerStatus = 0;

    //manage line visual states
    this.lineStates = {
      hideAll: false,
      activeTile: null,
      edgeTiles: null
    };
  }

  /** General functions **/
  drawerStatusUpdate(value){
    this.drawerStatus = value;
    this.trigger('drawerStatusUpdate', value);
  }
  getDrawerStatus(){
    return this.drawerStatus;
  }

  getNextId() {
    // NOTE: If you have quesetions about what ++ is doing please ask
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment_()
    return (this.nextId++).toString();
  }

  getGridCoordObj(x, y) {
    for (let i = 0; i < this.gridCoords.length; i++) {
      let xCheck = this.gridCoords[i].x;
      let yCheck = this.gridCoords[i].y;
      if (xCheck == x && yCheck == y) {
        return this.gridCoords[i];
      }
    }
    return null;
  }

  resetGridCoordObj() {
    this.gridCoords = [];
    for (let i = 0; i < this.state.boardWidth; i++) {
      for (let j = 0; j < this.state.boardHeight; j++) {
        let newCoord = { x: i, y: j, xLine: 0, yLine: 0 };
        this.gridCoords.push(newCoord);
      };
    };
  }

  updateShareFilterFrom(from) {
    if (utils.isNullOrUndefined(this.settings)) {
      this.settings = {};
    }

    this.settings.shareProjectUserFilter = {};
    this.settings.shareProjectUserFilter.from = from;
    console.log(this.settings.shareProjectUserFilter);
  }

  updateShareFilterTagCat(tagCat) {
    this.settings.shareProjectUserFilter.nodeId = null;
    this.settings.shareProjectUserFilter.controlId = null;
    this.settings.shareProjectUserFilter.tagCategoryId = parseInt(tagCat);
    console.log(this.settings.shareProjectUserFilter);
  }

  updateShareFilterFormNodeControl(controlId) {
    this.settings.shareProjectUserFilter.tagCategoryId = null;
    this.settings.shareProjectUserFilter.controlId = parseInt(controlId);
    console.log(this.settings.shareProjectUserFilter);
  }

  updateShareFilterFormNode(formNodeId) {
    this.settings.shareProjectUserFilter.tagCategoryId = null;

    let formSectionId = null;
    const formNode = this.nodes[formNodeId];

    if (utils.isNullOrUndefined(formNode)) {
      this.settings.shareProjectUserFilter.controlId = null;
      this.settings.shareProjectUserFilter.nodeId = null;
      this.trigger('shareFilterControlsUpdate', {
        controls: null
      });
      return;
    }
    else {
      formSectionId = formNode.formSectionId;
      this.settings.shareProjectUserFilter.nodeId = formNodeId;
    }

    console.log(this.settings.shareProjectUserFilter);

    if (utils.isNullOrUndefined(formSectionId)) {
      this.trigger('shareFilterControlsUpdate', {
        controls: null
      });
      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formSectionControls[formSectionId])) {
      this.trigger('shareFilterControlsUpdate', {
        controls: this.cache.formSectionControls[formSectionId]
      });
    }
    else {
      const promise = this.buildFormSectionControlsPromise(formSectionId);

      promise.then(controls => {
        this.trigger('shareFilterControlsUpdate', {
          controls: controls
        });
      });
    }
  }


  updateProjectNameFormNode(nodeId) {
    this.projectName.formNodeId = nodeId;
    this.projectName.controlId = null;

    this.trigger('projectNameUpdated', this.projectName);

    const formNode = this.nodes[nodeId];
    if (utils.isNullOrUndefined(formNode)) {
      this.trigger('projectNameControlsUpdated', {
        controls: null
      });
      return;
    }

    const formSectionId = formNode.formSectionId;

    if (utils.isNullOrUndefined(formSectionId)) {
      this.trigger('projectNameControlsUpdated', {
        controls: null
      });
      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formSectionControls[formSectionId])) {
      this.trigger('projectNameControlsUpdated', {
        controls: this.cache.formSectionControls[formSectionId]
      });
    }
    else {
      const promise = this.buildFormSectionControlsPromise(formSectionId);

      promise.then(controls => {
        this.trigger('projectNameControlsUpdated', {
          controls: controls
        });
      });
    }
  }

  updateProjectNameControlId(controlId) {
    this.projectName.controlId = parseInt(controlId);
  }

  updateCancelStatusId(statusId) {
    this.cancelStatusId = statusId;
  }
  updateArchiveStatusId(statusId) {
    this.archiveStatusId = statusId;
  }

  buildNode(type, name, coords) {
    if (utils.isNullOrUndefined(coords)) {
      coords = [0, 0];
    }
    const nodeId = this.getNextId();
    const node = {
      id: nodeId,
      name: name || `${type}-${nodeId}`,
      type: type,
      track: true,
      // used to store client specific state
      // is not used by server but stored with node
      state: {
        coords: coords
      }
    };

    switch (type) {
      case 'action':
        node.userActions = [];
        node.filter = {
          "includeRequestor": false,
        };
        node.state.nextFilterSeq = 0;
        node.state.filters = [];
        break;
      case 'form':
        node.formSectionId = null;
        node.userActions = [];
        node.filter = {
          "includeRequestor": false,
        };
        node.state.nextFilterSeq = 0;
        node.state.filters = [];
        break;
      case 'rule':
        node.state.nextSequenceNumber = 0;
        const rule = this.buildRule(node.state.nextSequenceNumber++);
        node.rules = [rule];
        break;
      case 'end':
        // nothing to do
        break;
      case 'start':
        // nothing to do
        break;
      default:
        // get out of function.
        console.log(`${type} is not recognized`);
        return;
    }

    return node;
  }

  addNode(type, name, coords) {
    const node = this.buildNode(type, name, coords);
    // node.id is the key in nodes
    this.nodes[node.id] = node;

    // let an observers know that nodes changed
    this.trigger('nodesUpdated', this.nodes);
  }

  // Gets a list of other nodes in the graph
  // excluding the id passed in
  getOtherNodes(nodeIdToExclude) {
    const otherNodes = Object.values(this.nodes).filter(p => p.id !== nodeIdToExclude);

    return otherNodes;
  }

  /** Node specific functions **/

  getStatuses(catId) {
    const config = {
      url: `${this.baseUrl}/designer/workflows/statuses`,
      method: 'get'
    };

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.statuses = data;
      this.trigger('statusesLoaded');
    });
  }

  updateNodeName(name, nodeId) {
    const node = this.nodes[nodeId];

    node.name = name;
    this.trigger('nodesUpdated', this.nodes);
  }

  updateNodeTrack(track, nodeId) {
    const node = this.nodes[nodeId];

    node.track = track;
    this.trigger('nodesUpdated', this.nodes);
  }

  updateNodeStatus(statusId, nodeId) {
    const node = this.nodes[nodeId];

    node.statusId = statusId;
  }

  updateAdvanceTileTemplate(templateId, nodeId) {
    const node = this.nodes[nodeId];
    if (!isNaN(templateId)) {
      node.emailTemplateId = templateId;
    } else {
      delete node["emailTemplateId"];
    }
  }

  // State will be stored with node on server
  // it is client specific and can be anything
  // caller is responsible for maintaining it
  updateNodeState(state, nodeId) {
    const node = this.nodes[nodeId];

    node.state = state;

    this.trigger('nodeUpdated', node);
  }

  moveNode(nodeId, newCoords, isStart) {
    let node = this.state.startNode;
    if (!isStart) {
      node = this.nodes[nodeId];
      node.state.coords = newCoords;
    } else {
      this.state.startCoords = newCoords;
      this.state.startNode.state.coords = newCoords;
    }
    this.trigger('nodeUpdated', node);
  }

  updateNodeInteraction(){
    this.trigger('nodeInteraction');
  }
  removeNode(nodeId) {
    // check if any other node is using this node, 
    // OR a form referenced by this node.
    const node = this.nodes[nodeId];

    for (let nodeIndex in this.nodes) {
      let curNode = this.nodes[nodeIndex];
      // console.log('curNode: ', curNode);

      // reset edge if it's going to be deleted.
      for (let userActionIndex in curNode.userActions) {
        if (curNode.userActions[userActionIndex].edge == nodeId) {
          curNode.userActions[userActionIndex].edge = null;
        }
      }

      if (node.type === 'form' && curNode.type === 'rule') {
        // the rule may reference the (now deleted) form.
        if (curNode.elseEdge == nodeId) {
          curNode.elseEdge = null;
        }
        // look through all the node's rules
        for (let k = 0; k < curNode.rules.length; k++) {
          let curRule = curNode.rules[k];
          for (let l = 0; l < curRule.conditions.length; l++) {
            let curCond = curRule.conditions[l];
            if (curCond.nodeId == nodeId) {
              curRule.conditions[l] = this.buildInitialRuleCondition();
            }
          }
        }
      }
    }
    delete this.nodes[nodeId];
    this.trigger('drawerClose', nodeId);
    this.trigger('nodesUpdated', this.nodes);
  }

  getNodeEdges(nodeId) {
    // find all the edges of the node based on the type
    let node = this.nodes[nodeId];
    const type = node.type;
    let edges = [];

    switch (type) {
      case 'action':
      case 'form':
        edges = node.userActions.map(p => p.edge);
        break;
      case 'rule':
        // node.state.nextSequenceNumber = 0;
        // const rule = this.buildRule(node.state.nextSequenceNumber++);
        // node.rules = [rule]; 
        edges = node.rules.map(p => p.edge);
        edges.push(node.elseEdge);
        break;
      case 'end':
        // nothing to do
        break;
      case 'start':
        edges.push(this.startEdge);
        break;
      default:
        // get out of function.
        console.log(`${type} is not recognized`);
        return;
    }

    return edges;
  }

  // NodeId can be null if 'edit' is clicked or 'start'
  openDrawer(nodeId, isStart) {
    //WIP: set promise here to move stuff over from loadCache?
    const calls = [];
    var node = this.nodes[nodeId.nodeId];
    // console.log('the node!', nodeId, node);

    //tommy says this is needed but not needed – make up your mind tommy! ;)
    calls.push(this.buildCategoryPromise());
    calls.push(this.buildStatusPromise());
    calls.push(this.buildAdvanceActionEmailTemplatesPromise());


    if (!utils.isNullOrUndefined(this.projectName.formNodeId)) {
      if (!utils.isNullOrUndefined(node) &&
      !utils.isNullOrUndefined(node.formSectionId) &&
      !utils.isNullOrUndefined(this.projectName.controlId)) {
      calls.push(this.buildFormSectionControlsPromise(node.formSectionId));
      }
    }

    // Drawer may be opened by more than just a node. 
    if (!utils.isNullOrUndefined(node)) {
      if(node.type === 'form'){
        if (!utils.isNullOrUndefined(node.state.formId)) {
          calls.push(this.buildFormVersionsPromise(node.state.formId));
        }
    
        if (!utils.isNullOrUndefined(node.state.formVersionId)) {
          calls.push(this.buildFormSectionsPromise(node.state.formVersionId));
        }
      }

      if(node.type === 'rule') {
        for (let j = 0; j < node.rules.length; j++) {
          const rule = node.rules[j];

          for (let k = 0; k < rule.conditions.length; k++) {
            const condition = rule.conditions[k];

            if (!utils.isNullOrUndefined(condition.nodeId)) {

              const formNode = this.nodes[condition.nodeId];
                calls.push(this.buildFormSectionControlsPromise(formNode.formSectionId));
            }
          }
        }
      }
    }

    //run the promises and then open drawer
    Promise.all(calls).then(() => {
        this.trigger('drawerOpen', nodeId, isStart);
      }).catch((e) => {
        console.log("One or more network calls failed");
        console.log(e);
      });
  }

  removeTileStroke(){
    this.trigger('removeTileStroke');
  }
  /** Tile functions (for tile placement on the board) **/

  distance(x, y, grid) {
    grid[y][x].d = 0;
    for (let yy = 0; yy < this.state.boardHeight; ++yy) {
      for (let xx = 0; xx < this.state.boardWidth; ++xx) {
        const deltaX = Math.abs(xx - x);
        const deltaY = Math.abs(yy - y);
        let dist = 0;
        dist = deltaX + deltaY;
        dist = Math.abs(dist);
        grid[yy][xx].d = dist;
      }
    }
  }

  flatAndSort(g) {
    let flat = [];
    for (let y = 0; y < this.state.boardHeight; ++y) {
      flat = flat.concat(g[y]);
    }
    flat.sort((a, b) => a.d - b.d);
    return flat;
  }

  getFirstValidTile(tileArray, tileGrid) {
    return tileArray.find(tile => {
      const x = tile.x;
      const y = tile.y;
      if (!tile.empty) {
        return false;
      }
      const deltas = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1]
      ];
      for (const dts of deltas) {
        const xx = x + dts[0];
        const yy = y + dts[1];
        if (xx < 0 || yy < 0 || xx >= this.state.boardWidth
          || yy >= this.state.boardHeight) {
          // outside of the grid
          continue;
        }
        if (!tileGrid[yy][xx].empty) {
          return false;
        }
      }
      return true;
    });
  }

  createGrid() {
    let grid = [];
    for (let y = 0; y < this.state.boardHeight; ++y) {
      const row = [];
      for (let x = 0; x < this.state.boardWidth; ++x) {
        row.push({
          x: x,
          y: y,
          d: 0,
          empty: true
        });
      }
      grid.push(row);
    }

    return grid;
  }

  lookForOpenTile(x, y, draggedTile) {
    let grid = this.createGrid();

    for (const key in this.nodes) {
      const node = this.nodes[key];
      if (node != draggedTile) {
        // every tile and all adjacent spaces are taken 
        let nodeX = node.state.coords[0];
        let nodeY = node.state.coords[1];
        grid[nodeY][nodeX].empty = false;
      }
    }
    grid[this.state.startCoords[0]][this.state.startCoords[1]].empty = false;

    this.distance(x, y, grid);
    let flat = this.flatAndSort(grid);
    return this.getFirstValidTile(flat, grid);
  }

  setPotentialTarget(coords) {
    // highlight the board position where the tile will land
    // if the user lets go.
    this.trigger('potentialTargetUpdate', coords);
  }
  setCurrentHover(coords) {
    // highlight the board position where the user is hovering
    // (the class only styles it if it isn't the potential target)
    this.trigger('currentHoverUpdate', coords);
  }
  tileMoveDone() {
    this.trigger('tileMoveDone');
  }

  getNextLineIncrement() {
    let toReturn = this.lineIncrement;
    this.lineIncrement++;
    if (this.lineIncrement > this.state.gridSquareSize / this.edgeSize) {
      this.lineIncrement = 0;
    }
    return toReturn;
  }

  getNextStrokeColor() {
    let toReturn = this.strokes[this.strokeIncrement];
    this.strokeIncrement++;
    if (this.strokeIncrement >= this.strokes.length) {
      this.strokeIncrement = 0;
    }
    return toReturn;
  }




  /** Action functions (this applies to both action nodes and form nodes) **/

  addUserAction(rank, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't add user action. ${nodeId} is not a form or action node`);
      return;
    }

    const id = this.getNextId();
    node.userActions.push({
      id: id,
      rank: rank,
      name: '',
      type: "advance_any",
      withComment: false,
      track: false,
      validate: false,
      tagPeopleAdvance: false
    });

    this.trigger('nodeUpdated', node);
  }

  removeUserAction(userActionid, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't add remove user action. ${nodeId} is not a form or action node`);
      return;
    }

    const userActionInex = node.userActions.findIndex(p => p.id == userActionid);

    node.userActions.splice(userActionInex, 1);

    this.trigger('nodeUpdated', node);
  }

  updateUserActionEdge(connectTo, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    userAction.edge = connectTo;
    console.log(node);
    this.trigger('nodeUpdated', node);
  }

  updateUserActionType(actionType, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    userAction.type = actionType;

    if (userAction.type === 'tag_people') {
      userAction.adhocFilter = {};
      userAction.adhocUsers = {};
    } else {
      delete userAction['adhocFilter'];
      delete userAction['adhocUsers'];
    }

    this.trigger('nodeUpdated', node);
  }

  updateUserActionTagPeopleAdvance(tagPeopleAdvance, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (!tagPeopleAdvance) {
      delete userAction["edge"];
    }
    userAction.tagPeopleAdvance = tagPeopleAdvance;

    this.trigger('nodeUpdated', node);
  }

  updateUserActionTrack(track, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (!track) {
      delete userAction["trackText"];
    }

    userAction.track = track;

    this.trigger('nodeUpdated', node);
  }

  updateActionUserFilterFrom(from, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (utils.isNullOrUndefined(userAction.adhocUsers)) {
      userAction.adhocUsers = {};
    }

    const adhocUsers = userAction.adhocUsers;

    adhocUsers.from = from;
    if (adhocUsers.from === 'field') {
      adhocUsers.tagCategoryId = null;
    } else {
      adhocUsers.nodeId = null;
      adhocUsers.controlId = null;
    }

    console.log(userAction);
  }

  updateActionUserFilterTagCat(tagCat, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (utils.isNullOrUndefined(userAction.adhocUsers)) {
      userAction.adhocUsers = {};
    }

    const adhocUsers = userAction.adhocUsers;

    adhocUsers.tagCategoryId = parseInt(tagCat);

    console.log(userAction);
  }

  updateActionUserFilterFormNodeControl(controlId, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (utils.isNullOrUndefined(userAction.adhocUsers)) {
      userAction.adhocUsers = {};
    }

    const adhocUsers = userAction.adhocUsers;
    console.log(userAction);

    adhocUsers.controlId = parseInt(controlId);
  }

  updateActionUserFilterFormNode(formNodeId, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (utils.isNullOrUndefined(userAction.adhocUsers)) {
      userAction.adhocUsers = {};
    }

    const adhocUsers = userAction.adhocUsers;

    let formSectionId = null;
    const formNode = this.nodes[formNodeId];


    if (utils.isNullOrUndefined(formNode)) {
      adhocUsers.controlId = null;
      adhocUsers.nodeId = null;
      this.trigger('adhocUserFilterControlsUpdate', {
        actionId: userActionId,
        controls: null
      });
      return;
    }
    else {
      formSectionId = formNode.formSectionId;
      adhocUsers.nodeId = formNodeId;
    }

    console.log(userAction);

    if (utils.isNullOrUndefined(formSectionId)) {
      this.trigger('adhocUserFilterControlsUpdate', {
        actionId: userActionId,
        controls: null
      });
      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formSectionControls[formSectionId])) {
      this.trigger('adhocUserFilterControlsUpdate', {
        actionId: userActionId,
        controls: this.cache.formSectionControls[formSectionId]
      });
    }
    else {
      const promise = this.buildFormSectionControlsPromise(formSectionId);

      promise.then(controls => {
        this.trigger('adhocUserFilterControlsUpdate', {
          actionId: userActionId,
          controls: controls
        });
      });
    }

    this.trigger('nodeUpdated', node);
  }

  updateUserActionTrackText(trackText, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);

    if (utils.isNullOrUndefined(trackText) || trackText === '') {
      delete userAction["trackText"];
    } else {
      userAction.trackingText = trackText;
    }

    this.trigger('nodeUpdated', node);
  }

  updateUserActionValidate(validate, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    userAction.validate = validate;

    this.trigger('nodeUpdated', node);
  }

  updateUserActionRequireComment(requireComment, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    userAction.withComment = requireComment;

    this.trigger('nodeUpdated', node);
  }

  updateUserActionCategory(catId, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    userAction.category = catId;

    this.trigger('nodeUpdated', node);
  }

  addUserActionTag(tagId, tagName, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);

    if (!userAction.tags) userAction.tags = [];
    if (!userAction.tags.some(x => x.id === tagId)) {
      userAction.tags.push({id: tagId, name: tagName, actionId: userActionId});
    }

    if (utils.isNullOrUndefined(userAction.adhocFilter)) {
      userAction.adhocFilter = {};
    }

    const filter = userAction.adhocFilter;

    if (utils.isNullOrUndefined(filter.preAppliedTags)) {
      filter.preAppliedTags = [];
    }

    if (!filter.preAppliedTags.some(id => id === tagId)) {
      filter.preAppliedTags.push(tagId);
    }

    console.log(userAction);

    this.trigger('nodeUpdated', node);
  }

  removeUserActionTag(tagId, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);
    if (!userAction.tags) userAction.tags = [];
    let tagIndex = userAction.tags.findIndex(x => x.id === tagId);
    if (tagIndex !== -1) {
      userAction.tags.splice(tagIndex, 1);
    }

    if (utils.isNullOrUndefined(userAction.adhocFilter)) {
      userAction.adhocFilter = {};
    }

    const filter = userAction.adhocFilter;
    if (!utils.isNullOrUndefined(filter.preAppliedTags)) {
      tagIndex = filter.preAppliedTags.findIndex(id => id === tagId);
      if (tagIndex !== -1) {
        filter.preAppliedTags.splice(tagIndex, 1);
      }
    }

    console.log(userAction);

    this.trigger('nodeUpdated', node);
  }

  updateUserActionName(name, userActionid, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionid);
    userAction.name = name;

    this.trigger('nodeUpdated', node);
  }

  updateUserActionRoleCategory(catId, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'form' && node.type !== 'action') {
      console.log(`Can't update user action edge. ${nodeId} is not a form or action node`);
      return;
    }

    const userAction = node.userActions.find(p => p.id === userActionId);

    if (utils.isNullOrUndefined(userAction.adhocFilter)) {
      userAction.adhocFilter = {};
    }

    userAction.adhocFilter.tagCategoryId = parseInt(catId);
    console.log(userAction);

    this.trigger('nodeUpdated', node);
  }

  addUserActionTrigger(userActionId, nodeId) {
    const node = this.nodes[nodeId];

    const userAction = node.userActions.find(x => x.id == userActionId);
    if (!userAction.triggers) {
      userAction.triggers = [];
    }
    userAction.triggers.push({id: this.getNextId(), name: null, userActionId: userActionId});

    this.trigger('nodeUpdated', node);
  }

  removeUserActionTrigger(id, userActionId, nodeId) {
    const node = this.nodes[nodeId];

    const userAction = node.userActions.find(x => x.id == userActionId);
    var index = userAction.triggers.findIndex(x => x.id === id);
    if (index > -1) {
      userAction.triggers.splice(index, 1);
    }
    this.trigger('nodeUpdated', node);
  }

  updateUserActionTriggerValue(id, userActionId, nodeId, value) {
    const node = this.nodes[nodeId];

    const userAction = node.userActions.find(x => x.id == userActionId);
    const trigger = userAction.triggers.find(x => x.id == id);
    trigger.value = value;

    this.trigger('nodeUpdated', node);
  }

  updateFormSectionId(formSectionId, nodeId) {
    const node = this.nodes[nodeId];

    node.formSectionId = formSectionId;
    this.trigger('nodesUpdated', this.nodes);
  }

  loadFormVersions(formId, nodeId) {
    if (utils.isNullOrUndefined(formId)) {
      this.trigger('formVersionsUpdated', {
        nodeId: nodeId,
        formVersions: null
      });

      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formVersions[formId])) {
      this.trigger('formVersionsUpdated', {
        nodeId: nodeId,
        formVersions: this.cache.formVersions[formId]
      });
    } else {
      const promise = this.buildFormVersionsPromise(formId);

      promise.then(formVersions => {
        this.trigger('formVersionsUpdated', {
          nodeId: nodeId,
          formVersions: formVersions
        });
      });
    }
  }

  loadFormSections(formVersionId, nodeId) {
    if (utils.isNullOrUndefined(formVersionId)) {
      this.trigger('formSectionsUpdated', {
        nodeId: nodeId,
        formSections: null
      });

      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formSections[formVersionId])) {
      this.trigger('formSectionsUpdated', {
        nodeId: nodeId,
        formSections: this.cache.formSections[formVersionId]
      });
    } else {
      const promise = this.buildFormSectionsPromise(formVersionId);

      promise.then(formSections => {
        this.trigger('formSectionsUpdated', {
          nodeId: nodeId,
          formSections: formSections
        });
      });
    }
  }

  /** Rule node functions  **/

  getFormNodes() {
    // filter out any node that is not a form
    const formNodes = Object.values(this.nodes).filter(p => p.type === 'form');

    return formNodes;
  }

  buildRule(sequence) {
    const initialCondition = this.buildInitialRuleCondition();

    const rule = {
      id: this.getNextId(),
      sequence: sequence,
      conditions: [initialCondition]
    };

    return rule;
  }

  addRule(nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't add rule. ${nodeId} is not a rule node`);
      return;
    }

    const initialCondition = this.buildInitialRuleCondition();
    const rule = this.buildRule(node.state.nextSequenceNumber++);

    node.rules.push(rule);
    this.trigger('nodeUpdated', node);
  }

  updateRuleEdge(connectTo, ruleId, nodeId) {
    if (utils.isNullOrUndefined(this.nodes[connectTo])) {
      console.log(`Can't update rule edge, the node id ${connectTo} to connect to doesn't exist in node graph`);
      return;
    }

    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule edge. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);

    rule.edge = connectTo;
    this.trigger('nodeUpdated', node);
  }

  updateElseEdge(connectTo, nodeId) {
    if (utils.isNullOrUndefined(this.nodes[connectTo])) {
      console.log(`Can't update rule node's else edge, the node id ${connectTo} to connect to doesn't exist in node graph`);
      return;
    }

    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule node's else edge. ${nodeId} is not a rule node`);
      return;
    }

    node.elseEdge = connectTo;
    this.trigger('nodeUpdated', node);
  }

  buildInitialRuleCondition(sequence) {
    return {
      id: this.getNextId(),
      controlId: null,
      // this is the formNodeId the section comes from
      nodeId: null,
      // value the condition should match on
      // this is the id of the value, these are pre populated values
      expectedValueId: null,
      operator: this.ruleOperators.DEFAULT
    };
  }

  addRuleCondition(ruleId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't add rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);
    const condition = this.buildInitialRuleCondition();

    rule.conditions.push(condition);

    this.trigger('nodeUpdated', node);
  }

  removeRuleCondition(ruleId, nodeId, conditionId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't add rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);

    const conditionIndex = rule.conditions.findIndex(p => p.id === conditionId);

    rule.conditions.splice(conditionIndex, 1);

    this.trigger('nodeUpdated', node);
  }


  updateRuleConditionFormNode(formNodeId, conditionId, ruleId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);
    let condIndex = rule.conditions.findIndex(p => p.id === conditionId);

    let formSectionId = null;
    if (utils.isNullOrUndefined(this.nodes[formNodeId])) {
      console.log(`Can't set conditions nodeId. ${formNodeId} doesn't exist in the node graph`);

      // reset condition
      rule.conditions[condIndex] = this.buildInitialRuleCondition();
      // Everything depends on the node
    } else {
      const formNode = this.nodes[formNodeId];
      formSectionId = formNode.formSectionId;
      rule.conditions[condIndex].nodeId = formNodeId;
    }

    this.trigger('nodeUpdated', node);
    this.loadFormSectionControls(formSectionId, conditionId, ruleId, nodeId);
  }

  

  updateRuleConditionFormControl(formCtrl, conditionId, ruleId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);
    const cond = rule.conditions.find(p => p.id === conditionId);

    let values = null;
    if (utils.isNullOrUndefined(formCtrl)) {
      cond.controlId = null;
    }
    else {
      cond.controlId = parseInt(formCtrl.id);
      values = formCtrl.choices;
    }

    this.trigger('nodeUpdated', node);
    this.trigger('formControlValuesUpdated', {
      nodeId: nodeId,
      ruleId: ruleId,
      conditionId: conditionId,
      values: values
    });
  }

  updateRuleConditionFormControlValue(formCtrlValueId, conditionId, ruleId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);
    const cond = rule.conditions.find(p => p.id === conditionId);

    if (utils.isNullOrUndefined(formCtrlValueId)) {
      console.log('Form Control id is null');
      cond.expectedValueId = null;
    }
    else {
      cond.expectedValueId = parseInt(formCtrlValueId);
    }

    this.trigger('nodeUpdated', node);
  }

  updateRuleConditionOperator(operatorValue, conditionId, ruleId, nodeId) {
    const node = this.nodes[nodeId];

    if (node.type !== 'rule') {
      console.log(`Can't update rule condition. ${nodeId} is not a rule node`);
      return;
    }

    const rule = node.rules.find(p => p.id === ruleId);
    const cond = rule.conditions.find(p => p.id === conditionId);

    const operator = parseInt(operatorValue);
    if (operator !== this.ruleOperators.EQUALS &&
      operator !== this.ruleOperators.NOT_EQUALS) {
      console.log(`Can't set operator value ${operator} is not valid`);
    } else {
      cond.operator = operator;
    }

    this.trigger('nodeUpdated', node);
  }

  loadFormSectionControls(formSectionId, conditionId, ruleId, nodeId) {
    if (utils.isNullOrUndefined(formSectionId)) {
      this.trigger('formSectionControlsUpdated', {
        nodeId: nodeId,
        conditionId: conditionId,
        ruleId: ruleId,
        controls: null
      });
      return;
    }

    if (!utils.isNullOrUndefined(this.cache.formSectionControls[formSectionId])) {
      this.trigger('formSectionControlsUpdated', {
        nodeId: nodeId,
        conditionId: conditionId,
        ruleId: ruleId,
        nodeId: nodeId,
        controls: this.cache.formSectionControls[formSectionId]
      });
    }
    else {
      const promise = this.buildFormSectionControlsPromise(formSectionId);

      promise.then(controls => {
        this.trigger('formSectionControlsUpdated', {
          nodeId: nodeId,
          conditionId: conditionId,
          ruleId: ruleId,
          controls: controls
        });
      });
    }
  }

  /** Action Category Specific Functions **/
  getTagsByCatId(page, size, catId, actionId) {
    const config = api.helpers.page(page, size, {
      url: this.filterCatUrl + '/' + catId + '/tags',
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.trigger('categoryTagsLoaded', {id: actionId, data: data.records});
    });
  }

  buildCategoryPromise() {
    if(!utils.isNullOrUndefined(this.cache.categories)){
      return null;
    }

    const config = api.helpers.page(0, 100, {
      url: this.filterCatUrl,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.cache.categories = resp.data.records;
      return resp;
    });
  }

  buildStatusPromise() {
    if(!utils.isNullOrUndefined(this.cache.statuses)){
      return null;
    }

    const config = {
      url: `${this.baseUrl}/designer/workflows/statuses`,
      method: 'get'
    };

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.cache.statuses = data;
      return resp;
    });
  }

  buildAdvanceActionEmailTemplatesPromise() {
    if(!utils.isNullOrUndefined(this.cache.advanceTileTemplates)){
      return null;
    }
    const advanceTileEventCode = 3;
    const config = api.helpers.page(0, 100, {
      url: `${this.baseUrl}/email/events/codes/${advanceTileEventCode}/templates`,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.cache.advanceTileTemplates = data.records;
    });
  }

  /** Filter specific funcitons **/
  getAllCats(page, size) { //USE CACHE!!??!!
    if (utils.isNullOrUndefined(this.filters)) {
      const config = api.helpers.page(page, size, {
        url: this.filterCatUrl,
        method: 'get'
      });

      return this.authReq(config).then(resp => {
        const data = resp.data;
        this.filters = data.records;
        this.trigger('filtersLoaded');
      });
    }
  }

  chooseCategory(catId, cloudIndex) {
    // get the tags for the category
    const config = api.helpers.page(0, 100, {
      url: `${this.filterCatUrl}/${catId}/tags`,
      method: 'get'
    });

    return this.authReq(config).then(resp => {
      const data = resp.data;
      this.curTags = data.records;
      this.trigger('tagsLoaded', cloudIndex);
    });
  }

  addTag(nodeId, cloudIndex, tagItem) {
    console.log(tagItem.name);
    const node = this.nodes[nodeId];
    node.filter.filters[cloudIndex].tags.push(tagItem.id);
    node.state.filters[cloudIndex].tags.push(tagItem);
  }

  removeTag(nodeId, cloudIndex, idCheck) {
    const node = this.nodes[nodeId];
    let cloud = node.filter.filters[cloudIndex].tags;
    let stateCloud = node.state.filters[cloudIndex].tags;
    for (let i = 0; i < cloud.length; i++) {
      if (cloud[i] == idCheck) {
        cloud.splice(i, 1);
      }
    }
    for (let i = 0; i < stateCloud.length; i++) {
      if (stateCloud[i].id == idCheck) {
        stateCloud.splice(i, 1);
      }
    }
  }

  addFilterCloud(nodeId) {
    const node = this.nodes[nodeId];
    let filterCloudObj = {
      sequence: node.state.nextFilterSeq,
      tags: []
    };
    let filterStateCloudObj = {
      sequence: node.state.nextFilterSeq,
      tags: []
    };
    node.state.filters.push(filterStateCloudObj);

    if (utils.isNullOrUndefined(node.filter.filters)) {
      node.filter.filters = [];
    }

    node.filter.filters.push(filterCloudObj);
    node.state.nextFilterSeq++;
  }

  removeFilterCloud(nodeId, cloudIndex) {
    const node = this.nodes[nodeId];
    let clouds = node.filter.filters;
    let stateClouds = node.state.filters;


    clouds.splice(cloudIndex, 1);
    stateClouds.splice(cloudIndex, 1);

    if (clouds.length == 0) {
      delete node.filter["filters"];
    }

    this.trigger('cloudRemoved');
  }

  includeRequestorUpdate(nodeId, newBool) {
    const node = this.nodes[nodeId];
    node.filter.includeRequestor = newBool;
  }

  /** Workflow specific functions **/

  buildFormVersionsPromise(formId) {
    //check the cache 
    if(!utils.isNullOrUndefined(this.cache.formVersions[formId])){
      return null;
    }   

    const axiosRequest = api.helpers.page(0, 100, {
      method: 'get',
      url: `${this.baseUrl}/published/forms/${formId}/versions`
    });

 
    return this.authReq(axiosRequest).then((resp) => {
      this.cache.formVersions[formId] = resp.data.records;
      return resp.data.records;
    }).catch(api.helpers.logErrorObject);
  }

  buildFormSectionsPromise(formVersionId) {
    //check the cache 
    if(!utils.isNullOrUndefined(this.cache.formSections[formVersionId])){
      return null;
    }

    return this.authReq({
      method: 'get',
      url: `${this.baseUrl}/published/forms/${formVersionId}/sections`
    }).then(resp => {
      this.cache.formSections[formVersionId] = resp.data;
      return resp.data;
    }).catch(api.helpers.logErrorObject);
  }

  buildFormSectionControlsPromise(formSectionId) {
    //check the cache 
    if(!utils.isNullOrUndefined(this.cache.formSectionControls[formSectionId])){
      return null;
    }
    return this.authReq({
      method: 'get',
      url: `${this.baseUrl}/published/forms/sections/${formSectionId}/controls`
    }).then(resp => {
      this.cache.formSectionControls[formSectionId] = resp.data;
      return resp.data;
    }).catch(api.helpers.logErrorObject);
  }

  loadPublishedForms() {
    const axiosRequest = api.helpers.page(0, 1000, {
      method: 'get',
      url: `${this.baseUrl}/published/forms`
    });

    this.authReq(axiosRequest).then(resp => {
      // paged response
      this.publishedForms = resp.data.records;
      this.loadModel();
    });
  }

  updateStartEdge(connectTo) {
    if (utils.isNullOrUndefined(this.nodes[connectTo])) {
      console.log(`Can't update workflow's start edge, the node id ${connectTo} to connect to doesn't exist in node graph`);
      return;
    }

    this.startEdge = connectTo;
  }

  updateName(name) {
    this.name = name;
  }


  revertWorkflow() {
    this.authReq({
      method: 'delete',
      url: `${this.baseUrl}/designer/workflows/${this.workflowId}/draft`
    }).then(response => {
      this.loadModel();
    }).catch(api.helpers.logErrorObject);
  }

  publishWorkflowDesign() {
    const req = this.authReq({
      method: 'post',
      url: `${this.baseUrl}/designer/workflows/${this.workflowId}/publish`
    }).then(response => {
      console.log('published workflow');
      this.isDraft = false;
      this.trigger('nodesUpdated', this.nodes);
      this.trigger('alert', { type: 'success', message: 'Workflow Published!' });
    });

    req.catch(resp => {
      this.trigger('alert', { type: 'error', message: 'Workflow failed to publish see console for me details' });
    });
    req.catch(api.helpers.logErrorObject);
  }

  saveWorkflowDesign() {
    const model = {
      nodes: this.nodes,
      nextId: this.nextId,
      projectName: this.projectName,
      start: this.startEdge,
      state: this.state,
      cancelStatusId: this.cancelStatusId,
      archiveStatusId: this.archiveStatusId,
      settings: this.settings
    };

    const requestModel = {
      name: this.name,
      model: JSON.stringify(model)
    };

    if (utils.isNullOrUndefined(this.workflowId)) {
      this.authReq({
        method: 'post',
        url: `${this.baseUrl}/designer/workflows`,
        data: requestModel
      }).then(resp => {
        this.workflowId = resp.data;
        window.history.pushState(null, null, '/workflows/designer/' + resp.data);
        this.trigger('alert', { type: 'success', message: 'Workflow Saved!' });
        this.isDraft = true;
        this.trigger('nodesUpdated', this.nodes);
      }).catch(api.helpers.logErrorObject);
    }
    else {
      this.authReq({
        method: 'put',
        url: `${this.baseUrl}/designer/workflows/${this.workflowId}`,
        data: requestModel
      }).then(resp => {
        this.trigger('alert', { type: 'success', message: 'Workflow Saved!' });
        this.isDraft = true;
        this.trigger('nodesUpdated', this.nodes);
      }).catch(api.helpers.logErrorObject);
    }
  }

  loadModel() {
    if (this.workflowId) {
      this.authReq({
        method: 'get',
        url: `${this.baseUrl}/designer/workflows/${this.workflowId}`
      }).then(resp => {
        const wfDesign = resp.data;
        const model = JSON.parse(wfDesign.model);

        this.name = wfDesign.name;
        this.nodes = model.nodes;
        this.nextId = model.nextId;
        this.projectName = model.projectName;
        this.startEdge = model.start;
        this.cancelStatusId = model.cancelStatusId;
        this.archiveStatusId = model.archiveStatusId;
        this.state = model.state;
        this.settings = model.settings;

        if (!this.state.updatedTagPeople) {
          for (let k of Object.keys(this.nodes)) {
            const n = this.nodes[k];
            if (n.type === 'form' || n.type === 'action') {
              for (let a of n.userActions) {
                if (a.type === 'tag_people') {
                  if (utils.isNullOrUndefined(a.tagPeopleAdvance)) {
                    a.tagPeopleAdvance = false;
                  }
                }
              }
            }
          }
          this.state.updatedTagPeople = true;
        }

        // TODO: this code shouldn't be necessary once we make a
        // more dynamic grid size.
        if(this.state.boardHeight < 100) {
          this.state.boardHeight = 100;
        }
        if(this.state.boardWidth < 100) {
          this.state.boardWidth = 100;
        }

        //colors for old boys - just incase they are older than this code
        //todo – this can be removed at some point in a fresh install
        if(this.state.colors == undefined){
          this.state['colors'] = [];
          //colors here
          this.randoColor(100, this.state.colors);
          console.log(this.state.colors);  
        }

        if (utils.isNullOrUndefined(this.state.startCoords)) {
          this.state.startCoords = [0, 0];
          this.state.startNode = this.buildNode('start', 'Start',
            [this.state.startCoords[0], this.state.startCoords[1]]);
        }

        this.isDraft = wfDesign.isDraft;

        //  this.loadCache();
        this.mount(); //do we need loadCache()?
      }).catch(api.helpers.logErrorObject);
    }
    else {
      // Seed workflow with an 'End' node by default;
      const endNode = this.buildNode('end', null, [2, 2]);
      this.nodes[endNode.id] = endNode;
      // and give it a faux start node as well!
      this.state.startCoords = [0, 0];
      this.state.startNode = this.buildNode('start', 'Start',
        [this.state.startCoords[0], this.state.startCoords[1]]);

      //colors for lines here
      this.state['colors'] = [];
      this.randoColor(100, this.state.colors);

      this.loadInitCache();
    }
  }

  loadInitCache() {
    const calls = [];

    calls.push(this.buildCategoryPromise());
    calls.push(this.buildStatusPromise());

    Promise.all(calls).then(() => {
      this.mount();
    }).catch(() => {
      console.log("One or more network calls failed");
    });

    this.mount();
  }

  mount() {
    riot.mount('workflow-designer', { app: this });
    // riot.mount('workflow-designer--board', { app: this });
    // riot.mount('workflow-designer--tiles', { app: this });
  }
}
