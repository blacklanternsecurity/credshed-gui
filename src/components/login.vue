<template>
  <div class="container">
    <banner/>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form id="login-form" method="post" class="form-signin">
              <div class="form-label-group m-4">
                <input @keyup="enter" id="login-username" v-model="username" type="username" autocomplete="username" class="form-control" name="username" placeholder="Username" required autofocus>
              </div>

              <div class="form-label-group m-4">
                <input @keyup="enter" id="login-password" v-model="password" type="password" autocomplete="current-password" class="form-control" name="password" placeholder="Password" required>
              </div>

              <button @click="login" id="login-button" type="button" class="btn btn-lg btn-block btn-outline-success text-uppercase p-2">Log In</button>
              <hr class="my-2">
            </form>
            <div id="login_failed" v-if="login_failed">Login Failed.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import banner from './banner.vue'

  export default {
    name: 'login',
    components: {
      banner,
    },
    data() {
      return {
        username: '',
        password: '',
        login_failed: false,
      }
    },
    methods: {
      enter(e) {
        if (e.keyCode == 13) {
          e.preventDefault()
          this.login()
        }
      },
      login() {
        this.login_failed = false;
        this.axios(
          '/auth',
          {
            data: {
              username: this.username,
              password: this.password
            }
          }
        )
        .then(response => {
          switch (response['status']) {
            case 200:
              window.localStorage.setItem('access_token', response['data']['access_token']);
              var url = this.urlparams().get('url')
              if (url) {
                window.location.href = url;
              } else {
                window.location.href = '/'
              }
              break;
            default:
              this.login_failed = true;
              break;
          }
        }).catch(() => {
          this.login_failed = true;
        })
      }
    }
  }

</script>

<style>

  div#login_failed {
    font-size: 1.2em;
    font-weight: bold;
  }

</style>