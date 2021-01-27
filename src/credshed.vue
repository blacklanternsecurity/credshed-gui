<template>
  <router-view />
</template>


<script>

// import search from './components/search.vue'

export default {
  name: 'credshed',
}

</script>


<style>

  body {
    color: #aaa;
    background-color: black;
  }

  #credshed {
    text-align: center;
    margin-top: 60px;
  }

  table.credshed-table {
    text-align: left;
  }

  /*table.credshed-table tr, table.credshed-table th {
    cursor: pointer;
  }*/

  table.credshed-table tr:hover {
    background-color: rgba(255,255,255,.2) !important;
  }
  
  table.credshed-table td:hover, table.credshed-table th:hover {
    background-color: rgba(255,255,255,.8) !important;
    color: black !important;
  }

  table.credshed-table tr:nth-child(even) {
    background-color: rgba(255,255,255,.1);
  }

  .green {
    color: var(--green);
  }

</style>
