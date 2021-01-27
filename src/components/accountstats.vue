<template>

  <table class="credshed-table account-stats">
    <span class="loading-message" v-if="sources.length <= 0">Loading...</span>
    <tr :id="source._id" :key="source._id" v-for="source in sources" @click="open_source($event, source)">
      <td><a :href="`/source/${source.source_id}`"><i class="green fas fa-angle-double-right"></i> {{ source.name }}</a></td>
    </tr>
  </table>
  
</template>


<script>

  export default {
    name: 'accountstats',
    props: [
      'account',
      'sources'
    ]
  }

</script>


<style scoped>

  table.account-stats {
    width: 100%;
    overflow-x: scroll;
  }

  table.account-stats td {
    padding: .5em;
    margin: .5em;
  }

  table.account-stats td a {
    color: white;
    padding: 1em;
    margin: 1em;
    line-break: anywhere;
  }

  table.account-stats td a:hover {
    text-decoration: none;
    color: black;
  }

  span.loading-message {
    font-size: 2em;
  }

</style>
