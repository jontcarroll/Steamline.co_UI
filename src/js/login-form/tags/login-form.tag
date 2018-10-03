<login-form>

<h1>Login</h1>

  </div>

  <script type="es6">
    const app = this.opts.app;
    this.app = app;
    this.errors = [];

    this.on('mount', () => {
      app.on('loginError', this.loginError);
    });

    this.on('unmount', () => {
      app.off('loginError', this.loginError);
    });
  </script>
</login-form>