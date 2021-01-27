<template>
  <div class=search-buttons>
    <button @click="$emit('results-download')" class="btn btn-light">
      <i class="text-success fas fa-download"></i>
      {{ download_button_title }}
    </button>
    <!--<button @click="show_querystats" class="btn btn-light">
      <i class="text-success fas fa-chart-pie"></i>
      Query Stats
    </button>-->
    <button @click="$emit('full-copy')" class="btn btn-light">
      <i class="text-success fas fa-clipboard"></i>
      Copy {{ unique_count }} Records
    </button>
    <iframe id="download_iframe" style="display:none;"></iframe>
  </div>
</template>

<script>

  export default {
    name: 'searchbuttons',
    props: {
      download_button_title: {
        default: 'Download All'
      },
      unique_count: {
        default: 0
      },
      query: {
        default: ''
      }
    },
    methods: {
      show_querystats() {
        window.open(`/query/${this.query}`, '_blank')
        if (this.query) {
          this.axios(
            '/search_stats/' + this.query,
            {
              method: 'get'
            }
          )
          .then(response => {
            this.querystats = response['data']['report']
            this.$refs.modal.show()
          })
        }
      }
    }
  }

</script>

<style scoped>

  i {
    margin-right: .3em;
  }

  button {
    font-size: 1.2em;
    margin: .5em;
    font-weight: bold;
    color: var(--dark);
  }

</style>