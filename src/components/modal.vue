<template>

    <div v-if="show_modal" class="modal show" style="display:block" id="modal">
      <div class="modal-dialog modal-dialog-centered" :class="'modal-' + size">
        <div class="modal-content">

          <div class="modal-header">
              <h5 class="modal-title"><slot name="title">Modal</slot></h5>
              <button type="button" class="close" aria-label="Close" @click="hide">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-success modal-default-button" @click="hide">
                {{ button }}
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
    <div v-if="show_modal" class="modal-backdrop" id="modal-backdrop" @click="hide"></div>


</template>

<script>

  export default {
    name: 'modal',
    data() {
      return {
        size: 'lg',
        show_modal: false
      }
    },
    props: {
      button: {
        default: 'OK'
      }
    },
    methods: {
      show() {
        this.show_modal = true
        //document.body.classList.add('disable-scroll')
      },
      hide() {
        //document.body.classList.remove('disable-scroll')
        this.show_modal = false
      }
    },
    mounted() {
      // Get the modal
      var backdrop = document.getElementById('modal-backdrop');

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == backdrop) {
          this.hide()
        }
      }
    }
  }

</script>


<style scoped>

  .modal-backdrop {
    background-color: rgba(0,0,0,.5);
  }

  .modal-body {
    max-height: 70vh;
    overflow: scroll;
    background-color: black;
  }

  /* extra-large modal */
  @media (min-width: 768px) {
    .modal-xxl {
      width: 90%;
      height: 90%;
      max-width:1200px;
    }

    .modal-xxl>.modal-content {
      height: 100%;
    }
  }

  .modal-xl {
    width: 90vh;
  }

</style>