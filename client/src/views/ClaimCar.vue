<template>
  <div>
    <NavBar/>
    <div class="container">
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
          <tr v-for="car in sortedCars" :key="car.id">
            <td>{{ car.licenseNumber }}</td>
            <td>{{ ownerOf(car) }}</td>
            <td>{{ car.carType }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.cm3 }}</td>
            <td>{{ car.fuelType }}</td>
            <td>
              <button v-if="!claimed(car)" @click="claim(car)" class="btn btn-primary" :disabled="hasClaimed">Claim</button>
              <button v-if="claimed(car)" @click="revoke(car)" class="btn btn-primary">Revoke</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import NavBar from "@/components/NavBar.vue"

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState(['claimableCars', 'userId']),
    sortedCars() {
      return this.claimableCars.slice().sort((c1, c2) => (c1.licenseNumber.localeCompare(c2.licenseNumber)));
    },
    hasClaimed() {
      return this.claimableCars.find(car => car.owner && car.owner.id == this.userId);
    }
  },
  mounted() {
    this.loadClaimableCars();
  },
  methods: {
    ...mapActions(["loadClaimableCars", "claimCar", "revokeCar"]),
    claimed(car) {
      return car.owner && car.owner.id === this.userId;
    },
    ownerOf(car) {
      return car.owner ? car.owner.firstName + " " + car.owner.lastName : "";
    },
    claim(car) {
      this.claimCar(car);
    },
    revoke(car) {
      this.revokeCar(car);
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