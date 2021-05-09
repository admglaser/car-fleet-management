<template>
  <div>
    <NavBar/>
    <div class="container">
      <button v-if="admin" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#carModal" @click="addNewCar">Add new Car</button>
      <table v-if="admin" class="table table-sm table-striped">
        <thead>
          <tr>
            <th>License number</th>
            <th>Owner</th>
            <th>Car type</th>
            <th>Year</th>
            <th>Cm3</th>
            <th>Fuel type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in sortedCars" :key="car.id">
            <td>{{ car.licenseNumber }}</td>
            <td>{{ car.owner ? car.owner.text : "" }}</td>
            <td>{{ car.carType }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.cm3 }}</td>
            <td>{{ car.fuelType }}</td>
            <td><button class="btn btn-primary" @click="editCar(car)">Edit</button></td>
          </tr>
        </tbody>
      </table>
      <table v-if="!admin" class="table table-sm table-striped">
        <thead>
          <tr>
            <th>License number</th>
            <th>Car type</th>
            <th>Year</th>
            <th>Cm3</th>
            <th>Fuel type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in sortedCars" :key="car.id">
            <td>{{ car.licenseNumber }}</td>
            <td>{{ car.carType }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.cm3 }}</td>
            <td>{{ car.fuelType }}</td>
            <td><button class="btn btn-primary">Claim</button></td>
          </tr>
        </tbody>
      </table>
      <CarModal id="carModal" :selectedCar="selectedCar"/>
    </div>
  </div>
</template>

<script>
import CarModal from "@/components/CarModal.vue";
import NavBar from "@/components/NavBar.vue"
import { mapState, mapActions } from "vuex"

export default {
  data: () => ({
    selectedCar: null
  }),
  components: {
    CarModal, NavBar
  },
  computed: {
    ...mapState(['admin', 'cars']),
    sortedCars() {
      return this.cars.slice().sort((c1, c2) => (c1.licenseNumber.localeCompare(c2.licenseNumber)));
    }
  },
  mounted() {
    this.loadCars();
    this.loadCarTypes();
    this.loadFuelTypes();
    this.loadUsers();
  },
  methods: {
    ...mapActions(['loadCars', 'loadCarTypes', 'loadFuelTypes', 'loadUsers']),
    editCar(car) {
      this.selectedCar = car;
      this.$bvModal.show("carModal");
    },
    addNewCar() {
      this.selectedCar = null;
      this.$bvModal.show("carModal");
    },
    ownerOf(car) {
      return car.owner ? car.owner.firstName + " " + car.owner.lastName : "";
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2rem;
}
.table {
  margin-top: 1rem;
}
</style>