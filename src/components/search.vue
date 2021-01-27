<template>
  <div>
    <banner/>
    <searchbar @search-query="store_query" :query="query" @results-accounts="populate_accounts" @results-stats="populate_stats"/>
    <div class="results-container">
      <div class="search-header">
        <searchstats v-bind:stats="stats"/>
        <searchbuttons :query="query" :download_button_title="download_progress" :unique_count="stats.unique_count" @query-stats="query_stats" @full-copy="full_copy" @results-download="results_download" v-if="stats"/>
      </div>
      <div class="search-results">
        <searchresults v-bind:accounts="accounts" :skip_rows="skip_rows"/>
      </div>
    </div>
  </div>
</template>


<script>

  import banner from './banner.vue'
  import searchbar from './searchbar.vue'
  import searchstats from './searchstats.vue'
  import fileDownload from 'js-file-download'
  import searchbuttons from './searchbuttons.vue'
  import searchresults from './searchresults.vue'
  import { human_filesize } from '@/lib/util.js'

  export default {
    name: 'search',
    data() {
      return {
        accounts: [],
        skip_rows: new Set(),
        stats: '',
        query: '',
        download_progress: 'Download All',
      }
    },
    components: {
      banner,
      searchbar,
      searchstats,
      searchbuttons,
      searchresults
    },
    mounted() {
      var access_token = window.localStorage.getItem('access_token')
      console.log(access_token)
      if (!access_token) {
        window.location.href = '/login'
      }
    },
    methods: {
      full_copy() {
        var rows = []
        var table = document.getElementById("results-accounts")
        for (let i in table.rows) {
          let row = table.rows[i]
          let row_text = []
          for (let j in row.cells) {
            row_text.push(row.cells[j].innerText)
          }
          rows.push(row_text.join('\t'))
        }
        this.copy(rows.join('\n'))
      },
      store_query(query) {
        this.query = query;
      },
      results_download() {

        // abort if the download already started
        if (this.download_progress != 'Download All') {
          return
        }

        var url = '/export_csv/' + encodeURIComponent(this.query)

        // if GUI and API are hosted on the same server
        /*if (process.env.VUE_APP_API_URL.toLowerCase().startsWith(window.location.origin.toLowerCase())) {
          console.log('same')
          window.open(url, '_blank');
        } else {*/
        this.axios(
          url, 
          {
            method: 'get',
            responseType: 'blob',
            onDownloadProgress: (e) => {
              this.download_progress = 'Downloaded ' + human_filesize(e.loaded)
            }
          }
        ).then(res => {
          this.download_progress = 'Download All'
          console.log(res)
          var date = (new Date()).toISOString().substring(0, 10)
          fileDownload(res.data, `${date}_credshed_${this.query}.csv`)
        })
      },
      populate_accounts(accounts) {
        ['e', 'u', 'p', 'h', 'm'].forEach(key_name => {
          if (! accounts.some(a => a[key_name].length)) {
            this.skip_rows.add(key_name)
          }
        })
        this.accounts = accounts
      },
      populate_stats(stats) {
        this.stats = stats
      }
    }
  }

</script>


<style scoped>

  div.results-container {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }

  div.search-header {
    padding-right: 1em;
    padding-left: 1em;
    display: flex;
    max-width: 100vw;
  }

  div.search-results {
    padding-right: 1em;
    padding-left: 1em;
  }

</style>
