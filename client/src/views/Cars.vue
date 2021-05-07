<template>
  <div>
    <NavBar/>
    <div class="container">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#carModal" @click="addNewCar">Add new Car</button>
      <table class="table table-sm table-striped">
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
          <tr v-for="car in cars" :key="car.id">
            <td>{{ car.licenseNumber }}</td>
            <td>{{ car.owner }}</td>
            <td>{{ car.carType }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.cm3 }}</td>
            <td>{{ car.fuelType }}</td>
            <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#carModal" @click="editCar(car)">Edit</button></td>
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
import { mapState, mapMutations } from "vuex"

export default {
  data: () => ({
    selectedCar: null
  }),
  components: {
    CarModal, NavBar
  },
  computed: {
    ...mapState(['cars'])
  },
  mounted() {
  const cars = [
      {
        id: "1",
        licenseNumber: "ABC - 123",
        owner: null,
        carType: "Audi",
        year: 2018,
        cm3: 1900,
        fuelType: "Gasoline"
      },
      {
        id: "2",
        licenseNumber: "ABC - 321",
        owner: null,
        carType: "Audi",
        year: 2017,
        cm3: 1800,
        fuelType: "Gasoline"
      },
      {
        id: "3",
        licenseNumber: "ABC - 231",
        owner: null,
        carType: "BMW",
        year: 2019,
        cm3: 1600,
        fuelType: "Diesel"
      },
      {
        id: "4",
        licenseNumber: "ABC - 456",
        owner: null,
        carType: "BMW",
        year: 2019,
        cm3: 1600,
        fuelType: "Diesel"
      },
      {
        id: "5",
        licenseNumber: "ABC - 789",
        owner: null,
        carType: "Fiat",
        year: 2010,
        cm3: 1200,
        fuelType: "Gasoline"
      },
      {
        id: "6",
        licenseNumber: "ABC - 654",
        owner: null,
        carType: "Fiat",
        year: 2013,
        cm3: 1100,
        fuelType: "Diesel"
      },
      {
        id: "7",
        licenseNumber: "ABC - 987",
        owner: null,
        carType: "Porsche",
        year: 2016,
        cm3: 3000,
        fuelType: "Gasoline"
      },
    ];
    this.setCars(cars);
  },
  methods: {
    ...mapMutations(['setCars']),
    editCar(car) {
      this.selectedCar = car;
      this.$bvModal.show("carModal");
    },
    addNewCar() {
      this.selectedCar = null;
      this.$bvModal.show("carModal");
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