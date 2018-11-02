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
            <i class="fas fa-sliders-h text-primary pr-3"></i>Preferences
        </li>

        <li class="nav-item nav-dropdown sl-filter-group open pr-3">
            <a class="nav-link nav-dropdown-toggle sl-filter-group-dropdown pl-4">
                <i class="fas fa-theater-masks text-primary pr-3"></i>Genres
            </a>
            <ul class="nav-dropdown-items sl-bg-darker">
                <li class="nav-item" each = { genre in preferences.genres }>
                    <div onclick={ genrePreferenceClick }
                         class="sl-filter-group-item">
                        <button class="btn sl-preference-btn {genre.preference.localPreference === 1 ? 'btn-outline-primary' : 'btn-outline-secondary'}"
                                onclick = { likeGenreClick }>
                         <i class="far fa-thumbs-up sl-thumbs-up p-0 {genre.preference.likes > 0 ? 'text-primary' : ''}"></i>
                         {genre.preference.likes}
                         </button>
                          <button class="btn btn-outline-secondary sl-preference-btn ml-2 mr-2 {genre.preference.localPreference === -1 ? 'btn-outline-danger' : 'btn-outline-secondary'}"
                                  onclick = { dislikeGenreClick }>
                         <i class="far fa-thumbs-down sl-thumbs-down p-0 {genre.preference.dislikes > 0 ? 'text-danger' : ''}"></i>
                         {genre.preference.dislikes}
                         </button>
                        
                        <small>  {genre.description} ({genre.count})</small>
                    </div>
                </li>
            </ul>
        </li>

        <li class="nav-item nav-dropdown sl-filter-group open pr-3">
            <a class="nav-link nav-dropdown-toggle sl-filter-group-dropdown pl-4">
                <i class="fa fa-list text-primary pr-3"></i>Categories
            </a>
            <ul class="nav-dropdown-items sl-bg-darker">
                <li class="nav-item" each = { category in preferences.categories }>
                    <div onclick={ categoryPreferenceClick }
                         class="sl-filter-group-item">
                         <button class="btn btn-outline-primary sl-preference-btn {category.preference.localPreference === 1 ? 'btn-outline-primary' : 'btn-outline-secondary'}"
                                 onclick = { likeCategoryClick }>
                         <i class="far fa-thumbs-up sl-thumbs-up p-0 {category.preference.likes > 0 ? 'text-primary' : ''}"></i>
                         {category.preference.likes}
                         </button>
                          <button class="btn btn-outline-secondary sl-preference-btn ml-2 mr-2 {category.preference.localPreference === -1 ? 'btn-outline-danger' : 'btn-outline-secondary'}"
                                  onclick = { dislikeCategoryClick }>
                         <i class="far fa-thumbs-down sl-thumbs-down p-0 {category.preference.dislikes > 0 ? 'text-danger' : ''}"></i>
                         {category.preference.dislikes}
                         </button>
                        
                        <small class="">  {category.description} ({category.count})</small>
          
                    </div>
                </li>
            </ul>
        </li>
        <li class="nav-title">
            <i class="fa fa-filter text-primary pr-3"></i>Filters
        </li>
    
    </ul>
</nav>

<style>

</style>

<!--  <button class="sidebar-minimizer brand-minimizer" type="button"></button>
  -->
<script>
    this.app = this.opts.app;
    this.preferences = this.app.preferences;

    this.likeCategoryClick = (e) => {
        e.preventDefault();
        let category = e.item.category;
        this.app.likeCategory(category);
        this.update();
    }

    this.dislikeCategoryClick = (e) => {
        e.preventDefault();
        let category = e.item.category;
        this.app.dislikeCategory(category);
        this.update();
    }

    this.likeGenreClick = (e) => {
        e.preventDefault();
        let genre = e.item.genre;
        this.app.likeGenre(genre);
        this.update();
    }

    this.dislikeGenreClick = (e) => {
        e.preventDefault();
        let genre = e.item.genre;
        this.app.dislikeGenre(genre);
        this.update();
    }
    
    this.on('mount', () => {

    });
</script>

</side-bar>