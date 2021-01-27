<template>
  <div class='stats-container'>
    <p>
      <pre v-if="stats">
<span v-if="stats.unique_count == 1000" class='result-max'>Showing first 1000 results</span>
<span :class="{
    'result-max': stats.unique_count == 1000,
    'result-success': stats.total_count > 0,
    'result-failure': stats.total_count == 0,
  }">{{ stats.total_count.toLocaleString() }} results ({{ stats.unique_count.toLocaleString() }} unique)</span>
Searched {{ stats.sources_searched.toLocaleString() }} sources
Searched {{ stats.accounts_searched.toLocaleString() }} accounts
Query took {{ stats.elapsed }} seconds
      </pre>
    </p>
  </div>
</template>


<script>

  export default {
    name: 'searchstats',
    props: [
      'stats'
    ]
  }

</script>


<style scoped>

  div.stats-container {
    display: flex;
    text-align: left;
    margin-right: auto;
  }

  pre {
    margin: 0px;
  }

  span.result-success {
    color: var(--green);
  }

  span.result-failure {
    color: var(--red);
  }

  span.result-max {
    color: var(--orange);
  }

</style>