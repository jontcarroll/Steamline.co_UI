<game-finder-app>

    <div class="app-body">

        <div class="sidebar sl-bg-dark">

            <side-bar app={ app }>
            </side-bar>

        </div>
        
        <main class="main sl-bg-dark">
            <applied-filters app = { app }>
            </applied-filters>

            <div class="container-fluid sl-bg-darker">
                <div class="animated fadeIn">
                    <game-list app = { app }>
                    </game-list>
                </div>
            </div>
            
        </main>
       
    </div>


        <footer class="app-footer">
            <div>
                <a href="https://coreui.io">CoreUI</a>
                <span>&copy; 2018 creativeLabs.</span>
            </div>
            <div class="ml-auto">
                <span>Powered by</span>
                <a href="https://coreui.io">CoreUI</a>
            </div>
        </footer>

        
    <script type="es6">
        this.app = this.opts.app;
        


    </script>

</game-finder-app>