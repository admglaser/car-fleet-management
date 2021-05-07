<template>
  <b-modal :id="id" :title="title" modal-class="modal-fullscreen-md-down">
    <div class="row">
      <div class="col">
        <div>License number</div>
        <div>Car type</div>
        <div>Cm3</div>
      </div>  
      <div class="col">
        <div>Owner</div>
        <div>Year</div>
        <div>Fuel type</div>
      </div>
    </div>
    <template #modal-footer>
      <button class="btn">Ok</button>
      <button class="btn">Cancel</button>
    </template>
  </b-modal>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  name: 'CarModal',
  data: () => ({
  }),
  props: {
    id: { type: String, required: true },
    selectedCar: { type: Object, default: null }
  },
  computed: {
    title() {
      return this.selectedCar ? "Edit car" : "Add a new car";
    },
    okButtonCaption() {
      return this.selectedCar ? "Save" : "Add";
    }
  },
  methods: {
    ok() {
      const modal = new bootstrap.Modal(this.$refs.modal, {});
      modal.hide();
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
