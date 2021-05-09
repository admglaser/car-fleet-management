<template>
  <b-modal :id="id" :title="title" size="lg" @show="resetModal">
    <div class="row">
      <div class="col">
        <b-form-group label="License number" label-for="input-license-number">
          <b-form-input id="input-license-number" v-model="licenseNumber" placeholder="Format ABC-123 or ABC123" required/>
        </b-form-group>
        <b-form-group label="Car type" label-for="input-car-type">
          <b-form-select id="input-car-type" v-model="carType" :options="carTypes" placeholder="Select a car type" required/>
        </b-form-group>
        <b-form-group label="Cm3" label-for="input-cm3">
          <b-form-input type="number" id="input-cm3" v-model="cm3" required/>
        </b-form-group>
      </div>  
      <div class="col">
        <b-form-group label="Owner" label-for="input-owner">
          <b-form-select id="input-owner" v-model="owner" :options="userOptions" placeholder="Select the car's owner"/>
        </b-form-group>
        <b-form-group label="Year" label-for="input-year">
          <b-form-input type="number" id="input-year" v-model="year" required/>
        </b-form-group>
        <b-form-group label="Fuel type" label-for="input-fuel-type">
          <b-form-select id="input-fuel-type" v-model="fuelType" :options="fuelTypes" required/>
        </b-form-group>
      </div>
    </div>
    <div v-if="errorMessage"> {{ errorMessage }} </div>
    <template #modal-footer>
     
      <button class="btn btn-primary" @click="save()">
        {{ okButtonCaption }}
        <b-spinner v-if="loading" small></b-spinner>
      </button>
      <button class="btn btn-secondary" @click="hide()">Cancel</button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'CarModal',
  data: () => ({
    licenseNumber: null,
    owner: null,
    carType: null,
    year: null,
    cm3: null,
    fuelType: null,
    errorMessage: null,
    loading: false,
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
    },
    userOptions() {
      return this.users.map(user => ({value: user, text: user.text}));
    }
  },
  methods: {
    ...mapActions(["addCar", "updateCar"]),
    async resetModal() {
      await this.$nextTick();
      this.errorMessage = null;
      if (this.selectedCar) {
        this.licenseNumber = this.selectedCar.licenseNumber;
        this.owner = this.selectedCar.owner ? this.users.find(user => user.id === this.selectedCar.owner.id) : null;
        this.carType = this.selectedCar.carType
        this.year = this.selectedCar.year
        this.cm3 = this.selectedCar.cm3;
        this.fuelType = this.selectedCar.fuelType;
      } else {
        this.licenseNumber = null;
        this.owner = null;
        this.carType = null;
        this.year = null
        this.cm3 = null;
        this.fuelType = null;
      }
    },
    async save() {
      try {
        this.loading = true;
        if (!/^([A-Z]{3}[-]{0,1}[1-9]{3})$/.test(this.licenseNumber)) {
          throw new Error("License number has invalid format!");
        }
        if (this.selectedCar) {
          await this.updateCar({
            id: this.selectedCar.id,
            licenseNumber: this.licenseNumber,  
            owner: this.owner, 
            carType: this.carType,
            year: parseInt(this.year),  
            cm3: parseInt(this.cm3),  
            fuelType: this.fuelType
          })
        } else {
          await this.addCar({ 
            licenseNumber: this.licenseNumber,  
            owner: this.owner, 
            carType: this.carType,
            year: parseInt(this.year),  
            cm3: parseInt(this.cm3),  
            fuelType: this.fuelType
          });
        }
        this.hide();
      } catch (err) {
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
    hide() {
       this.$bvModal.hide(this.id);
    }
  }
}
</script>
