<template>
  <b-modal :id="id" :title="title" size="lg">
    <div class="row">
      <div class="col">
        <b-form-group label="License number" label-for="input-license-number">
          <b-form-input id="input-license-number" v-model="licenseNumber" placeholder="Format ABC-123 or ABC123" required/>
        </b-form-group>
        <b-form-group label="Car type" label-for="input-car-type">
          <b-form-select id="input-car-type" v-model="carType" :options="carTypes" placeholder="Select a car type" required/>
        </b-form-group>
        <b-form-group label="Cm3" label-for="input-cm3">
          <b-form-input id="input-cm3" v-model="cm3" required/>
        </b-form-group>
      </div>  
      <div class="col">
        <b-form-group label="Owner" label-for="input-owner">
          <b-form-select id="input-owner" v-model="owner" :options="users" placeholder="Select the car's owner"/>
        </b-form-group>
        <b-form-group label="Year" label-for="input-year">
          <b-form-input id="input-year" v-model="year" required/>
        </b-form-group>
        <b-form-group label="Fuel type" label-for="input-fuel-type">
          <b-form-select id="input-fuel-type" v-model="fuelType" :options="fuelTypes" required/>
        </b-form-group>
      </div>
    </div>
    <template #modal-footer>
      <button class="btn btn-primary" @click="ok()">{{ okButtonCaption }}</button>
      <button class="btn btn-secondary" @click="cancel()">Cancel</button>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'CarModal',
  data: () => ({
    licenseNumber: null,
    carType: null,
    cm3: 0,
    owner: null,
    year: null,
    fuelType: null
  }),
  props: {
    id: { type: String, required: true },
    selectedCar: { type: Object, default: null },
  },
  computed: {
    ...mapState(['users', 'fuelTypes', 'carTypes']),
    title() {
      return this.selectedCar ? "Edit car" : "Add a new car";
    },
    okButtonCaption() {
      return this.selectedCar ? "Save" : "Add";
    }
  },
  methods: {
    ok() {
      this.$bvModal.hide(this.id);
    },
    cancel() {
      this.$bvModal.hide(this.id);
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
