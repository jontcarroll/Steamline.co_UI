<game-list>


<div class="row">
    <div class="col-sm-12" each={ app.games }>
        <div class="card sl-card text-white sl-bg-dark mt-4 mb-0">
        
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-md-2 sl-card-img" style="background-image: url('{header_image} no-repeat;')">
                        <div class="sl-card-img"></div>
                    </div>
                    <div class="col-md-10">
                        <div class="text-value">{ name }</div>
                        <small>{ short_description }</small>
                    </div>
                </div>
                <div class="sl-card-platforms">
                    <i if = {platforms.windows} class="fab fa-windows platform-icon"></i>
                    <i if = {platforms.mac}  class="fab fa-linux platform-icon"></i>
                    <i if = {platforms.linux}  class="fab fa-apple platform-icon"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /.row-->

<style>

</style>
<script>
this.app = this.opts.app;

this.filtersUpdated = (e) => {
    this.app.scoreGames();
    this.update();
}

this.on('mount', () => {
    this.app.on('filtersUpdated', this.filtersUpdated)
});
this.on('unmount', () => {
    this.app.off('filtersUpdated', this.filtersUpdated)
});

</script>




</game-list>