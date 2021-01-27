<template>
  <td @click="$emit('account-stats', account)">
    <div class="alen">{{ account.s.length }}</div>
  </td>
  <th class="" v-if="! skip_rows.has('e')">{{ account.e }}</th>
  <td class="s" v-if="! skip_rows.has('u')">{{ account.u }}</td>
  <td class="s" v-if="! skip_rows.has('p')">{{ account.p }}</td>
  <td v-if="! skip_rows.has('h')">{{ account.h.join('\n') }}</td>
  <td v-if="! skip_rows.has('m')">{{ account.m }}</td>
</template>


<script>

  export default {
    name: 'account',
    props: [
      'account',
      'skip_rows'
    ],
    emits: [
      'account-stats'
    ]
  }

</script>


<style>

  td > div.alen {
    background-color: rgba(255,255,255,.9);
    border-radius: .2em;
    color: black;
    text-align: center;
    padding-left: .3em;
    padding-right: .3em;
    padding-top: .2em;
    line-break: auto;
    word-break: keep-all;
  }

  td > div.alen:hover {
    background-color: var(--green);
    color: black;
    cursor: pointer;
  }

  td {
    max-width: 20em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
  }

</style>