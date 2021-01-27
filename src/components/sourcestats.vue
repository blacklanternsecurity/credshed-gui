<template>
  <div id="source-barcharts">
    <h3>{{ source.name }}</h3>
    <hibp :data="hibp_data"/>
    <br>
    <barchart :data="source.top_domains" :label="'Top Domains'" :key_label="'Domain'" :val_label="'Count'" />
    <barchart :data="source.top_password_basewords" :label="'Top Password Base Words'" :key_label="'Base Word'" :val_label="'Count'" />
    <barchart :data="source.top_misc_basewords" :label="'Top Misc Base Words'" :key_label="'Base Word'" :val_label="'Count'" />
    <br>
    <h5>Details</h5>
    <pre>{{ JSON.stringify(abridged_source, null, 2) }}</pre>
  </div>
</template>

<script>

  import hibp from './hibp.vue'
  import barchart from './barchart.vue'

  export default {
    name: 'sourcestats',
    data() {
      return {
        source: {},
        hibp_data: {}
      }
    },
    computed: {
      abridged_source: function() {
        // eslint-disable-next-line no-unused-vars
        var { top_domains, top_password_basewords, top_misc_basewords, ...rest } = this.source
        return rest
      }
    },
    components: {
      hibp,
      barchart,
    },
    mounted() {
      this.get_source().then(data => {
        this.hibp_best_match(data.name).then(r => {
          this.hibp_data = r
        })
      })
    },
    methods: {
      get_source() {
        return new Promise(resolve => {
          this.axios(
            '/source/' + this.$route.params.id,
            {
              method: 'get'
            }
          ).then(response => {
            this.source = response['data']['report']
            resolve(response['data']['report'])
          })
        })
      }
    }
  }

</script>

<style>

  div#source-barcharts > h3 {
    padding-left: 2em;
    padding-right: 2em;
    line-break: anywhere;
  }

  div#source-barcharts pre {
    text-align: left;
    max-width: 75em;
    margin-left: auto;
    margin-right: auto;
  }

</style>