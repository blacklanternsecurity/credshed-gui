<template>
  <modal ref="modal">
    <template v-slot:title>
      This cred appears in:
    </template>
    <template v-slot:body>
      <accountstats :account="account" :sources="sources"/>
    </template>
  </modal>
  <table class="credshed-table" id="results-accounts">
    <tr v-if="accounts.length">
      <th class="header"></th>
      <th class="header" v-if="! skip_rows.has('e')">Email</th>
      <th class="header s" v-if="! skip_rows.has('u')">Username</th>
      <th class="header s" v-if="! skip_rows.has('p')">Password</th>
      <th class="header" v-if="! skip_rows.has('h')">Hash</th>
      <th class="header" v-if="! skip_rows.has('m')">Misc</th>
    </tr>
    <tr v-bind:key="account.id" v-for="account in accounts">
      <account @account-stats="account_stats" :account="account" :skip_rows="skip_rows"/>
    </tr>
  </table>
</template>


<script>

  import modal from './modal.vue'
  import account from './account.vue'
  import accountstats from './accountstats.vue'

  export default {
    name: 'searchresults',
    data() {
      return {
        account: {},
        sources: []
      }
    },
    props: [
      'accounts',
      'skip_rows'
    ],
    components: {
      modal,
      account,
      accountstats
    },
    methods: {
      account_stats(account) {
        this.account = account
        this.sources = []
        account.s.forEach(i => {
          this.axios(
            `/source/${i}`,
            {
              method: 'get'
            }
          )
          .then(response =>
            this.sources.push(response['data']['report'])
          )
        })
        this.$refs.modal.show()
      }
    }
  }

</script>


<style scoped>

  th {
    font-size: 1.5em;
  }

</style>

<style>

  table#results-accounts th, table#results-accounts td {
    padding-left: 1rem;
  }

  table#results-accounts td:last-child {
    padding-right: 1rem;
  }

  table#results-accounts th:not(.header), table#results-accounts td:not(.header) {
    max-width: 30em;
    line-break: anywhere;
  }

  table#results-accounts th.s, table#results-accounts td.s {
    max-width: 15em;
  }

</style>