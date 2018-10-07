<game-list>


<div class="row">
    <div class="col-sm-12" each={ games }>
        <div class="card text-white bg-dark">
            <div class="card-body pb-0">
                <div class="btn-group float-right">
                    <button class="btn btn-transparent dropdown-toggle p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-settings"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        Game details or something here idk.
                    </div>
                </div>
                <div class="text-value">{ name }</div>
                <div>{ creator }</div>
            </div>
            <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
                <canvas class="chart" id="card-chart1" height="70"></canvas>
            </div>
        </div>
    </div>
</div>
<!-- /.row-->


<script>
this.app = this.opts.app;

this.games = [
    {
        name: "Rocket League",
        creator: "Psyonix (TM)"
    },
    {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
     {
        name: "Non-RocketLeague Game",
        creator: "booooo"
    },
];

</script>

<style>

</style>


</game-list>