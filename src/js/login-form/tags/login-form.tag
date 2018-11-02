<login-form>


  <div class="container sl-login-form-container centered">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card text-white p-4 sl-bg-dark">
          <div class="card-body">
            <p class="text-muted">Enter your Steam Url:</p>
            <div class="input-prepend input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input ref="urlInput" class="form-control sl-input" id="prependedInput" size="16" type="text">
            </div>
            <small class="help-block">e.g. https://steamcommunity.com/profiles/76561198096325218</small>
            <div class="pt-4">
              <button class="btn btn-primary px-4" type="button" onclick={loginClick}>Login</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="es6">
    this.app = this.opts.app;
    this.errors = [];

    this.loginClick = () => {
      console.log(this.refs.urlInput.value);
      this.app.login(this.refs.urlInput.value);
    }

    this.on('mount', () => {
      this.app.on('loginError', this.loginError);
    });

    this.on('unmount', () => {
      this.app.off('loginError', this.loginError);
    });
  </script>
</login-form>