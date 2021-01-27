<template>

  <div class="hibp-toggle" @click="hibp_show=!hibp_show">';--have i been pwned</div>
  <div v-if="hibp_show" class="hibp">
    <img class="hibp-logo" v-if="data.LogoPath" :src="data.LogoPath"/>
    <span class="hibp-title">{{ Math.round(data.matchRating*100) }}% Match: <span class="hibp-bold">{{ data.Name }}</span><span v-if="data.Domain"> ({{ data.Domain }})</span></span>
    <div>
      <a href="https://haveibeenpwned.com/PwnedWebsites">Complete List of Breaches</a>
    </div>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>

</template>

<script>

  export default {
    name: 'hibp',
    data() {
      return {
        hibp_show: false
      }
    },
    props: {
      data: {
        default: {}
      }
    }
  }

</script>


<style scoped>

  div.hibp-toggle {
    margin: 1em;
    background-color: var(--blue);
    padding: .5em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 2em;
    color: black;
    font-weight: bold;
    font-size: 1.75em;
    display: inline-block;
    cursor: pointer;
    font-family: monospace;
  }

  div.hibp-toggle:hover {
    color: var(--blue);
    background-color: white;
  }

  img.hibp-logo {
    width: 3em;
  }

  div.hibp {
    /*width: 10em;*/
  }

  span.hibp-title {
    margin-left: .5em;
    font-size: 2em;
  }

  span.hibp-bold {
    font-weight: bold;
    color: var(--blue);
  }

</style>