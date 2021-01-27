<template>

  <br>
  <h5>{{ label }}</h5>
  <div class="piechart-limit">
    <span class="limit-label">Limit: {{ limit }}</span>
    <input type="range" min="0" max="100" step="1" v-model="limit">
  </div>
  <canvas class="credshed-piechart" :id="uuid" :height="height" :width="width" @click="show"></canvas>
</template>

<script>

  import { debounce } from 'lodash'
  import { v4 as uuidv4 } from 'uuid'
  import { show_pie } from '../lib/chart.js'

  export default {
    name: 'piechart',
    beforeCreate() {
      this.uuid = uuidv4();
    },
    data() {
      return {
        limit: 20,
        chart: null
      }
    },
    props: {
      label: {
        default: 'Chart Title'
      },
      data: {
        default: {}
      },
      height: {
        default: 500
      },
      width: {
        default: 1000
      }
    },
    methods: {
      debounced_show: debounce(function() {
        this.show()
      }, 750),
      show() {
        if (this.chart != null) {
          this.chart.destroy()
        }
        this.chart = show_pie(
          '',
          this.data,
          this.limit,
          this.uuid
        )
      }
    },
    watch: {
      data: function() {
        this.show()
      },
      limit: function() {
        this.debounced_show()
      }
    }
  }

</script>

<style>

  canvas.credshed-piechart {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  span.limit-label {
    display: inline-block;
    padding: .5em;
    font-weight: bold;
  }

</style>