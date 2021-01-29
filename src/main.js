import axios from 'axios'
import { createApp } from 'vue'
import router from './lib/router.js'
import credshed from './credshed.vue'
import { findBestMatch } from 'string-similarity'


const app = createApp(credshed)

app.mixin({
  methods: {

    is_email(s) {
      var email_regex = /^[\w][\w.+-]{0,100}@[\w][\w.-]{0,100}\.[A-Z]{2,8}$/i
      var results = email_regex.exec(s)
      if (results) {
        return true
      } else {
        return false
      }
    },

    is_domain(s) {
      var domain_regex = /^[\w.]*\.[\w]{2,8}$/i
      var results = domain_regex.exec(s)
      if (results) {
        return true
      } else {
        return false
      }
    },

    axios(endpoint, config) {
      var access_token = window.localStorage.getItem('access_token')
      if ((!access_token) && window.location.pathname != '/login') {
        window.location.href = `/login?url=${window.location.href}`
      }
      var def_config = {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }
      var new_config = Object.assign({}, def_config, config)
      endpoint = `${process.env.VUE_APP_API_URL}${endpoint}`
      return axios(endpoint, new_config).catch(error => {
        if (window.location.pathname == '/login') {
          throw(error)
        } else if (401 <= error.response['status'] && error.response['status'] < 500) {
          window.location.href = `/login?url=${window.location.href}`
        }
      })
    },

    hibp_best_match(query) {
      query = ('' + query).toLowerCase().trim()
      return new Promise(
        (resolve) => {
          this.hibp().then(hibp_db => {
            var breach_strings = {}
            hibp_db.map(breach => {
              var name = ('' + breach.Name).toLowerCase().trim()
              var domain = ('' + breach.Domain).toLowerCase().trim()
              var title = ('' + breach.Title).toLowerCase().trim()
              var breach_attrs = [name, domain]
              if (title != name) {
                breach_attrs.push(title)
              }
              breach_strings[breach_attrs.join(' ')] = breach
            })

            var best_match = findBestMatch(query, Object.keys(breach_strings))['bestMatch']
            var target = best_match['target']
            breach_strings[target]['matchRating'] = best_match['rating']
            resolve(breach_strings[target])
          })
        }
      )
    },

    hibp() {
      return new Promise(
        function (resolve, reject) {
          var hibp_db = window.localStorage.getItem('hibp')
          if (hibp_db) {
            resolve(JSON.parse(hibp_db))
          } else {
            axios(
              'https://haveibeenpwned.com/api/v2/breaches',
              {
                method: 'get'
              }
            ).then(response => {
              hibp_db = JSON.stringify(response.data)
              window.localStorage.setItem('hibp', hibp_db)
              resolve(JSON.parse(hibp_db))
            }).catch(error => {
              reject(error)
            })
          }
        }
      )
    },

    urlparams() {
      return new URLSearchParams(window.location.search)
    },

    copy(text) {

      if (document.queryCommandSupported('copy') === true) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.log('Unable to copy');
        }
        document.body.removeChild(textarea);

      } else {
        // Fallback if browser doesn't support .execCommand('copy')
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
      }
    }
  }
})

//const credshed_app = app.component('credshed', credshed)
//app.config.globalProperties.$hostname = 
app.use(router).mount('#credshed')