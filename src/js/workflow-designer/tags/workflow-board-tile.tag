<workflow-board-tile class="workflow-board-tile
  x--{ coords[0] } y--{ coords[1] } { potential: hasPotential }
  { current-hover: isCurrentHover }">

  <script>
    this.app = this.opts.app;
    const app = this.app;
    this.coordObj = this.opts.coords;
    this.coords = [this.coordObj.x, this.coordObj.y];
    this.hasPotential = false;
    this.potentialTargetUpdate = (coords) => {
      if(this.coords[0] == coords[0] && this.coords[1] == coords[1]) {
        this.hasPotential = true;
        this.update();
      } else {
        if(this.hasPotential) {
          this.hasPotential = false;
          this.update();
        }
      }
    };

    this.currentHoverUpdate = (coords) => {
      if(this.coords[0] == coords[0] && this.coords[1] == coords[1]) {
        this.isCurrentHover = true;
        this.update();
      } else {
        if(this.isCurrentHover) {
          this.isCurrentHover = false;
          this.update();
        }
      }
    };

    this.tileMoveDone = () => {
      let shouldUpdate = false;
      if(this.hasPotential) {
        this.hasPotential = false;
        shouldUpdate = true;
      }
      if(this.isCurrentHover) {
        this.isCurrentHover = false;
        shouldUpdate = true;
      }
      if(shouldUpdate) {
        this.update();
      }
    }

    this.on('mount', () => {
      app.on('potentialTargetUpdate', this.potentialTargetUpdate);
      app.on('currentHoverUpdate', this.currentHoverUpdate);
      app.on('tileMoveDone', this.tileMoveDone);
    });

    this.on('unmount', () => {
      app.off('potentialTargetUpdate', this.potentialTargetUpdate);
      app.off('currentHoverUpdate', this.currentHoverUpdate);
      app.off('tileMoveDone', this.tileMoveDone);
    });
  </script>
</workflow-board-tile>