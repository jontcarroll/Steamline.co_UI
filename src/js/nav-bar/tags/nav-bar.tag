<nav-bar>

<header class="app-header navbar sl-bg-dark">
      <button class="d-lg-none mr-auto tcon tcon-menu--arrow tcon-menu--arrowleft" aria-label="toggle menu" onclick={toggleSidebarSm}>
        <span class="tcon-menu__lines" aria-hidden="true"></span>
          <span class="tcon-visuallyhidden">toggle menu</span>
      </button>
      <a class="navbar-brand" href="#">
        <img class="navbar-brand-full" src="img/brand/logo.png" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </a>
<!--        <button class="navbar-toggler sidebar-toggler d-md-down-none sl-no-outline" type="button" data-toggle="sidebar-lg-show">
      
      </button>  -->
   <!--       <button type="button" class="d-md-down-none tcon tcon-menu--arrow tcon-menu--arrowleft" aria-label="toggle menu" onclick={toggleSidebarLg}>
          <span class="tcon-menu__lines" aria-hidden="true"></span>
          <span class="tcon-visuallyhidden">toggle menu</span>
        </button>  -->
<!--        <ul class="nav navbar-nav d-md-down-none">
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Dashboard</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Users</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Settings</a>
        </li>
      </ul>  -->
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item d-md-down-none">
          <a class="nav-link" href="#">
            <i class="icon-bell"></i>
            <span class="badge badge-pill badge-danger">5</span>
          </a>
        </li>
        <li class="nav-item d-md-down-none" onclick={logout}>
          <a class="nav-link" href="#">
            <i class="icon-list"></i>
          </a>
        </li>
  <!--        <li class="nav-item d-md-down-none">
          <a class="nav-link" href="#">
            <i class="icon-location-pin"></i>
          </a>
        </li>  -->
       <!--   <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <img class="img-avatar" src="img/avatars/6.jpg" alt="admin@bootstrapmaster.com">
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdown-header text-center">
              <strong>Account</strong>
            </div>
            <a class="dropdown-item" href="#">
              <i class="fa fa-bell-o"></i> Updates
              <span class="badge badge-info">42</span>
            </a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-envelope-o"></i> Messages
              <span class="badge badge-success">42</span>
            </a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-tasks"></i> Tasks
              <span class="badge badge-danger">42</span>
            </a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-comments"></i> Comments
              <span class="badge badge-warning">42</span>
            </a>
            <div class="dropdown-header text-center">
              <strong>Settings</strong>
            </div>
            <a class="dropdown-item" href="#">
              <i class="fa fa-user"></i> Profile</a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-wrench"></i> Settings</a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-usd"></i> Payments
              <span class="badge badge-secondary">42</span>
            </a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-file"></i> Projects
              <span class="badge badge-primary">42</span>
            </a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">
              <i class="fa fa-shield"></i> Lock Account</a>
            <a class="dropdown-item" href="#">
              <i class="fa fa-lock"></i> Logout</a>
          </div>
        </li>  -->
      </ul>
    </header>


  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">
    this.app = this.opts.app;
    this.showSidebarLg = false;
    this.showSidebarSm = false;

    this.logout = (e) => {
      console.log(this.opts);
      e.preventDefault(); 
      this.app.logOut();
    };

    this.toggleSidebarSm = (e) => {
      if (!this.showSidebarSm) {
        document.body.classList.add('sidebar-show');
        this.showSidebarSm = true;
      } else {
        document.body.classList.remove('sidebar-show');
        this.showSidebarSm = false;
      }
    }
    this.toggleSidebarLg = (e) => {
      if (!this.showSidebarLg) {
        document.body.classList.add('sidebar-lg-show');
        this.showSidebarLg = true;
      } else {
        document.body.classList.remove('sidebar-lg-show');
        this.showSidebarLg = false;
      }
    }

    this.on('mount', () => {
      transformicons.add('.tcon');
    });

    this.on('unmount', () => {

    });
  </script>
</nav-bar>