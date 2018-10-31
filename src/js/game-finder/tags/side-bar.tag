<side-bar>

<nav class="sidebar-nav sl-sidebar-nav">
    <ul class="nav">
     <!--     <li class="nav-item">
            <a class="nav-link" href="index.html">
                <i class="nav-icon icon-speedometer"></i> Dashboard
                <span class="badge badge-primary">NEW</span>
            </a>
        </li>  -->
        <li class="nav-title">
            <i class="fa fa-filter text-primary pr-3"></i>Filters
        </li>

        <li class="nav-item nav-dropdown sl-filter-group open">
            <a class="nav-link nav-dropdown-toggle sl-filter-group-dropdown pl-4">
                <i class="fa fa-list text-primary pr-3"></i>Categories
            </a>
            <ul class="nav-dropdown-items sl-bg-darker">
                <li class="nav-item" each = { category in filters.categories }>
                    <div onclick={ categoryFilterClick } class="sl-filter-group-item {category.applied ? 'filter-applied' : 'filter-excluded'}">
                       <small class=""> {category.description} ({category.count})</small>
                    </div>
                </li>
            </ul>
        </li>

        <li class="nav-item nav-dropdown sl-filter-group open">
            <a class="nav-link nav-dropdown-toggle sl-filter-group-dropdown pl-4">
                <i class="fas fa-theater-masks text-primary pr-3"></i>Genres
            </a>
            <ul class="nav-dropdown-items sl-bg-darker">
                <li class="nav-item" each = { genre in filters.genres }>
                    <div onclick={ genreFilterClick } class="sl-filter-group-item {genre.applied ? 'filter-applied' : 'filter-excluded'}">
                        <small>{genre.description} ({genre.count})</small>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</nav>

<style>

</style>

<!--  <button class="sidebar-minimizer brand-minimizer" type="button"></button>
  -->
<script>
    this.app = this.opts.app;
    this.filters = this.app.filters;

    this.categoryFilterClick = (e) => {
        e.item.category.applied = !e.item.category.applied;
        this.app.trigger('filtersUpdated');
        this.update();
    }

    this.on('mount', () => {
        console.log(this.filters);
    });
</script>

</side-bar>