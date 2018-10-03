<workflow-tile-label draggable=true onmousemove={mousemove} dragstart={ondragstart} onmousedown="{mousedown}" class="tag-icon" style="top: {label.offsetY}px; left: {label.offsetX}px; position:absolute; padding-top:9px;padding-bottom:9px;padding-left:16px; cursor:move;">
<div style="cursor:auto" contenteditable oninput={contentEdit}> {label.title} </div>
<svg style="cursor: pointer" onclick={removeLabel} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 7.4L1.6 0 0 1.6 7.4 9 0 16.4 1.6 18 9 10.6l7.4 7.4 1.6-1.6L10.6 9 18 1.6 16.4 0 9 7.4z"></path></svg>
<style>

</style>
<script>
    this.app = this.opts.app;
    this.label = this.opts.label;   
    if(this.label.title == undefined) {
      this.label['title'] = 'Click to edit';
    }
    this.removeLabel = ()=>{
      let id = this.label.id;
      console.log(id, this);
      delete this.app.state.tileLabels[id];
      this.root.remove(); //instead of triggering update and having everything rerender;
    }
    this.mousemove = (e)=>{
      e.preventDefault();
      e.preventUpdate = false;
    }
    this.contentEdit = (e)=>{
      e.preventUpdate = true;
      let newTitle = e.target.innerText;
        this.app.state.tileLabels[this.label.id].title = newTitle;
    }
    this.ondragstart = (e)=>{
      let mouseOffset = {
        x: e.clientX - e.target.getBoundingClientRect().x,
        y: e.clientY - e.target.getBoundingClientRect().y
      }
      e.dataTransfer.effectAllowed = 'move';
      var encoded = JSON.stringify({objectId: this.label.id, type: 'move', mouseOffset: mouseOffset});
      e.dataTransfer.setData("text/plain", encoded);
    }
    /* mount events */ 
    this.on('mount', () => {
      this.app.on('nodeUpdated', ()=>{
        //  console.log('label updated', this.app.state);
      });
    });

    this.on('unmount', () => {
      this.app.on('nodeUpdated', ()=>{});
    });

</script>
</workflow-tile-label>