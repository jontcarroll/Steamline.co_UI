<action-line class="action-line {btop: highlighted}">
  <svg if={ !utils.isNullOrUndefined(actionObj) } style="overflow: visible;"
  class="action-line-svg {special: !visible }"
  riot-viewBox={ viewbox }
  xmlns="http://www.w3.org/2000/svg">
    <path fill="none" class="action-line {actionthick: highlighted }" stroke={ stroke }
      d={ linePath } stroke-dasharray={strokeType} stroke-linejoin="round" />
    <circle class="circ"  riot-cx={circleX} riot-cy={circleY} r=4 fill={ stroke } />
    <rect class="rect"  riot-x={rectX} riot-y={rectY} width=6 height=6 fill={ stroke } />
  </svg>
  <style>
    .special {
      opacity: 1;
      transition: all .2s;
    }
    .special path {
      stroke: #d0d0d0;
    }
    .special .rect {
      fill: #d0d0d0;
    }
    .special .circ {
      fill: #d0d0d0;
    }
    .action-line {
      transition: all .2s;
      pointer-events: none;
    }
    .action-line.actionthick {
      stroke-width: 4px;
    } 
  </style>
  <!-- <script type="es6"> -->

  <script>
    //note: https://github.com/riot/riot/issues/853 for why we prefix x={rectX}
    const app = this.opts.app;
    this.app = app;
    this.actionObj = this.opts.actionobj;
    this.node = this.actionObj.node;
    this.edge = this.actionObj.edge;
    this.edgeNode = app.nodes[this.edge];

    const edgeSize = app.edgeSize;
    this.coords = this.node.state.coords;
    this.curPosition = [this.coords[0], this.coords[1]];

    this.rectX = 0;
    this.rectY = 0;

    let cX = 0;
    let cY = 0;
    let rX = 0;
    let rY = 0;

    if(window.swimLanes == null || window.swimLanes == undefined){
        window.swimLanes = {
            amount: (64 - 4)/2,
            used: 6, //buffer for edges,
            row: [],
            col: []
          }
    }
    this.visible = false;
    this.highlighted = false;
    this.isVisible = () => {
     let returnValue = 0;
      if(app.lineStates.activeTile == this.node.id) {
        //keep the lights on
        this.highlighted = true;
        returnValue  = true;
      } else if(app.lineStates.hideAll == true ){
        returnValue  = false;
        this.highlighted = false;
      } else {
        returnValue  = true;
        this.highlighted = false;
     }
      this.visible = returnValue;
      this.update();
    }
    this.isVisible();

    this.drawLineAlt = () => {
            this.curPosition = [this.coords[0], this.coords[1]];
            let eNodeCoords = [this.edgeNode.state.coords[0], this.edgeNode.state.coords[1]];
            let colDiff = this.edgeNode.state.coords[0] - this.coords[0];
            let rowDiff = this.edgeNode.state.coords[1] - this.coords[1];
            let rowLaneStart;
            let rowLaneEnd;
            let colLaneStart;
            let colLaneEnd;


            //pick a lane (offset)
            //set logic for row swimlanes;
            if(window.swimLanes.row[this.curPosition[1]] == undefined || window.swimLanes.row[this.curPosition[1]] > window.swimLanes.amount) {
              window.swimLanes.row[this.curPosition[1]] = 6;
            } else {
              window.swimLanes.row[this.curPosition[1]] = window.swimLanes.row[this.curPosition[1]] + 4;
            }

            //set logic for col swimlanes;
            let setLanesRow = (rowIndex)=>{

              //row
              if(window.swimLanes.row[rowIndex] == undefined || window.swimLanes.row[rowIndex] > window.swimLanes.amount) {
                window.swimLanes.row[rowIndex] = 6;
                
              } else {
                window.swimLanes.row[rowIndex] = window.swimLanes.row[rowIndex] + 4;
              }
            }

            let setLanesCol = (colIndex) => {
              //column
              if(window.swimLanes.col[colIndex] == undefined || window.swimLanes.col[colIndex] > window.swimLanes.amount) {
                window.swimLanes.col[colIndex] = 6;
                
              } else {
                window.swimLanes.col[colIndex] = window.swimLanes.col[colIndex] + 4;
              }
            }


            let lineIs = 'right'; //above, aboveRight, aboveLeft, left, belowLeft, belowRight;

            //use left/right side of square
            let squareSize = 64;

            if(rowDiff == 0 && colDiff < 0){
                //'left';


                setLanesRow(this.curPosition[1])
                rowLaneStart = window.swimLanes.row[this.curPosition[1]]; 

                this.linePath = 'M'+(this.curPosition[0]*squareSize) + ' '+ (this.curPosition[1]*squareSize + rowLaneStart) + ' h ' + ((colDiff+1) * squareSize);
                this.circleX = this.curPosition[0]*squareSize;
                this.circleY = (this.curPosition[1]*squareSize) + rowLaneStart;
                this.rectX = eNodeCoords[0]*squareSize + squareSize;
                this.rectY = eNodeCoords[1]*squareSize + rowLaneStart - 3;

            } else if(rowDiff == 0 && colDiff > 0){
                //'right';
                setLanesRow(this.curPosition[1])
                rowLaneStart = window.swimLanes.row[this.curPosition[1]]; 

                this.linePath = 'M'+(this.curPosition[0]*squareSize + squareSize) + ' '+ (this.curPosition[1]*squareSize + rowLaneStart) + ' h ' + (((colDiff-1) * squareSize));
                this.circleX = (this.curPosition[0]*squareSize + squareSize);
                this.circleY = (this.curPosition[1]*squareSize) + rowLaneStart;
                this.rectX = eNodeCoords[0]*squareSize - 4;
                this.rectY = eNodeCoords[1]*squareSize + rowLaneStart - 3;
            
            } else if (rowDiff > 0 && colDiff == 0) {
                //'below';

                setLanesCol(this.curPosition[0])
                colLaneStart = window.swimLanes.col[this.curPosition[0]]; 

                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize + squareSize) + ' v ' + ((rowDiff-1) * squareSize);
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize + squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize + colLaneStart -3;
                this.rectY = eNodeCoords[1]*squareSize - 4;

            } else if (rowDiff < 0 && colDiff == 0) {
               //'above';

                setLanesCol(this.curPosition[0])
                colLaneStart = window.swimLanes.col[this.curPosition[0]]; 

                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize) + ' v ' + ((rowDiff+1) * squareSize);
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize + colLaneStart -3;
                this.rectY = eNodeCoords[1]*squareSize +squareSize;


            } else if (rowDiff > 0 && colDiff < 0 ) {
                //'belowLeft';
                //set column from start
                setLanesCol(this.curPosition[0]);
                //set row from edge/end
                setLanesRow(eNodeCoords[1]);
                colLaneStart = window.swimLanes.col[this.curPosition[0]];
                rowLaneEnd = window.swimLanes.row[eNodeCoords[1]];


                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize + squareSize) + ' v ' + ((rowDiff * squareSize) - rowLaneEnd) + ' h ' + (colDiff * squareSize - (colLaneStart - squareSize))  ;
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize + squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize + squareSize;
                this.rectY = eNodeCoords[1]*squareSize + squareSize - rowLaneEnd - 3;

            } else if (rowDiff > 0 && colDiff > 0 ) {
                //'belowRight';

                //set column from start
                setLanesCol(this.curPosition[0]);
                //set row from edge/end
                setLanesRow(eNodeCoords[1]);
                colLaneStart = window.swimLanes.col[this.curPosition[0]];
                rowLaneEnd = window.swimLanes.row[eNodeCoords[1]];

                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize + squareSize) + ' v ' + ((rowDiff * squareSize) - rowLaneEnd) + ' h ' + (colDiff * squareSize - colLaneStart);
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize + squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize -4;
                this.rectY = eNodeCoords[1]*squareSize + squareSize - rowLaneEnd - 3;

            } else if (rowDiff < 0 && colDiff < 0) {
                //above left

                //set column from start
                setLanesCol(this.curPosition[0]);
                //set row from edge/end
                setLanesRow(eNodeCoords[1]);
                colLaneStart = window.swimLanes.col[this.curPosition[0]];
                rowLaneEnd = window.swimLanes.row[eNodeCoords[1]];

                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize) + ' v ' + ((rowDiff) * squareSize + rowLaneEnd) + ' h '  + ((colDiff * squareSize) + squareSize - colLaneStart);;
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize +squareSize;
                this.rectY = eNodeCoords[1]*squareSize + rowLaneEnd -3;
                
                } else if (rowDiff < 0 && colDiff > 0) {
                //above right

                //set column from start
                setLanesCol(this.curPosition[0]);
                //set row from edge/end
                setLanesRow(eNodeCoords[1]);
                colLaneStart = window.swimLanes.col[this.curPosition[0]];
                rowLaneEnd = window.swimLanes.row[eNodeCoords[1]];

                this.linePath = 'M'+(this.curPosition[0]*squareSize + colLaneStart)  + ' ' + (this.curPosition[1]*squareSize) + ' v ' + ((rowDiff) * squareSize + rowLaneEnd) + ' h '  + (colDiff * squareSize - colLaneStart);;
                this.circleX = (this.curPosition[0]*squareSize) + colLaneStart;
                this.circleY = (this.curPosition[1]*squareSize) ;
                this.rectX = eNodeCoords[0]*squareSize -4;
                this.rectY = eNodeCoords[1]*squareSize + rowLaneEnd -3;
            }

            //each tile gets a stroke style
            let strokeTypes = {
              form: '',
              rule: '2 1',
              action: '4 1',
              end: ''
            };

            this.strokeType = strokeTypes[this.edgeNode.type];

            if(this.edgeNode.type == 'end') {
              this.stroke = '#b0b8ba';
            } else {
              this.stroke = this.node.state.selectedStroke;
            }

    }


    if(!utils.isNullOrUndefined(this.edgeNode)) {
        this.drawLineAlt();
    }

    this.nodesUpdated = () => {
      if(!utils.isNullOrUndefined(this.edgeNode)) {
        this.drawLineAlt();      
      }
      this.update();
    }

    this.on('mount', () => {
      app.on('nodeUpdated', this.nodesUpdated);
      app.on('nodeInteraction', this.isVisible);
    });

    this.on('unmount', () => {
      app.off('nodesUpdated', this.nodesUpdated);
      app.off('nodeInteraction', this.isVisible);
    });
  </script>
</action-line>