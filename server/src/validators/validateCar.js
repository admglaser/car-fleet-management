function validateCar(
  { licenseNumber, owner, carType, year, cm3, fuelType },
  users,
  carTypes,
  fuelTypes
) {
  if (!licenseNumber) {
    throw new Error("License number is missing!");
  }
  if (!/^([A-Z]{3}[-]{0,1}[1-9]{3})$/.test(licenseNumber)) {
    throw new Error("License number has invalid format!");
  }
  if (owner) {
    const { id, firstName, lastName } = owner;
    if (!id || !firstName || !lastName) {
      throw new Error("Owner id, firstName or lastName is missing!");
    }
    if (
      !users.find(
        (user) =>
          user.id === owner.id &&
          user.firstName === owner.firstName &&
          user.lastName === owner.lastName
      )
    ) {
      throw new Error("Unknown owner!");
    }
  }
  if (carType && !carTypes.find((ct) => ct.name === carType)) {
    throw new Error("Unknown car type!");
  }
  if (year && typeof year !== "number") {
    throw new Error("Year must be a number");
  }
  if (cm3 && typeof cm3 !== "number") {
    throw new Error("Cm3 must be a number");
  }
  if (fuelType && !fuelTypes.find((ft) => ft.name === fuelType)) {
    throw new Error("Unknown fuel type!");
  }
}

module.exports = validateCar;
