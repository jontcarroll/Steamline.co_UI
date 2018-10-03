<action-start class="action-start
    action-start--{ dir }
    action-start--{ dir }-{ dirNum }
    action-start--{ dir }-{ dirNum }-{ dirIndex }">

  <!-- <script type="es6"> -->
  <script>
    const app = this.opts.app;
    this.app = app;
    this.node = this.opts.node;
    this.coords = this.node.state.coords;

    this.edge = this.opts.edge;
    const index = this.opts.index;
    const total = this.opts.total;

    let dirCheck = index % 3;

    switch (dirCheck) {
      case 0:
        this.dir = 'right';
        break;
      case 1:
        this.dir = 'down';
        break;
      case 2:
        this.dir = 'left';
        break;
      default:
        // get out of function.
        this.dir = '';
        console.log(`direction is not recognized`);
        return;
    }

    this.dirNum = Math.floor(total / 3) + 1;
    this.dirIndex = Math.floor(index / 3) + 1;
    if((total % 3) <= dirCheck) {
        this.dirNum--;
    }

    this.on('mount', () => {
    });

    this.on('unmount', () => {
    });
  </script>
</action-start>