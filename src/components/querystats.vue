<template>
  <div id="query-stats">
    <piechart :height="2000" :width="500" :data="stats" :label="`Top Leaks for ${$route.params.query}`" />
  </div>
</template>

<script>

  import piechart from './piechart.vue'

  export default {
    name: 'querystats',
    data() {
      return {
        stats: {}
      }
    },
    components: {
      piechart,
    },
    mounted() {
      this.show_querystats()
    },
    methods: {
      show_querystats() {
        this
        console.log(this.$route.params.query)
        if (this.$route.params.query) {
          this.axios(
            '/search_stats/' + this.$route.params.query,
            {
              method: 'get'
            }
          )
          .then(response => {
            this.stats = response['data']['report']
          })
        }
      }
    }
  }

</script>

<style scoped>

  h3 {
    padding-left: 2em;
    padding-right: 2em;
    line-break: anywhere;
  }

</style>