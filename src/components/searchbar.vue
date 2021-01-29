<template>
  <div class='search-bar justify-content-center'>
    <form id='search-form' class='card card-sm m-4'>
      <div class='card-body row no-gutters align-items-center'>
        <div class='col p-2'>
          <input id='search-input' autocomplete="off" v-model="query" class='form-control form-control-lg form-control-borderless' name='query' type='search' placeholder='email or domain' onfocus='this.selectionStart = this.selectionEnd = this.value.length' autofocus>
        </div>
        <div class='col-auto p-2'>
          <button id='credshed-search' @click="search" type='button' class='btn btn-lg btn-success'>Search</button>
        </div>
      </div>
    </form>
    <div v-if="invalid_query" class="invalid-query">
      Invalid query.
    </div>
  </div>
</template>


<script>

  export default {
    name: 'searchbar',
    data() {
      return {
        query: '',
        invalid_query: false
      }
    },
    methods: {
      search(e) {
        e.preventDefault()
        if (!(this.is_email(this.query) || this.is_domain(this.query))) {
          this.invalid_query = true
          return
        } else {
          this.invalid_query = false
        }
        this.axios(
          `/search`,
          {
            data: {
              query: this.query
            }
          })
          .then(response => {
            this.$emit('search-query', this.query)
            this.$emit('results-accounts', response['data']['accounts'])
            this.$emit('results-stats', response['data']['stats'])
          })
      }
    },
    mounted() {
      document.getElementById('search-input').addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
          e.preventDefault();
          document.getElementById('credshed-search').click();
        }
      })
    }
  }


</script>


<style scoped>

  div.search-bar {
    max-width: 50em;
    margin-left: auto;
    margin-right: auto;
  }

  input, button {
    font-size: 1.5em;
  }

  input {
    margin: 1em;
  }

  button#credshed-search {
    margin-right: 1em;
  }

  div.invalid-query {
    font-size: 1.5em;
    color: var(--red);
  }

</style>