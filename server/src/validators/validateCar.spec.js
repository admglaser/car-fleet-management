const validateCar = require("./validateCar");

describe("validateCar", () => {
  let users = [];
  let carTypes = [];
  let fuelTypes = [];

  it("throws error when license number is missing", () => {
    expect(() => {
      validateCar({}, users, carTypes, fuelTypes);
    }).toThrow("License number is missing!");
  });

  it("throws error when license number has invalid format", () => {
    validateCar({ licenseNumber: "ABC-123" });
    validateCar({ licenseNumber: "ABC123" });

    expect(() => {
      validateCar(
        { licenseNumber: "someLicenseNumber" },
        users,
        carTypes,
        fuelTypes
      );
    }).toThrow();
  });

  it("throws error when owner is present, but id, firstName or lastName is missing", () => {
    expect(() => {
      const car = { licenseNumber: "ABC-123", owner: { id: "123" } };
      validateCar(car, users, carTypes, fuelTypes);
    }).toThrow("Owner id, firstName or lastName is missing!");
  });

  it("throws error when owner is unknown", () => {
    users = [
      { id: "1", firstName: "firstName1", lastName: "lastName1" },
      { id: "2", firstName: "firstName2", lastName: "lastName2" },
    ];

    const car = {
      licenseNumber: "ABC-123",
      owner: { id: "2", firstName: "firstName2", lastName: "lastName2" },
    };
    validateCar(car, users, carTypes, fuelTypes);

    expect(() => {
      const car = {
        licenseNumber: "ABC-123",
        owner: { id: "3", firstName: "firstName3", lastName: "lastName3" },
      };
      validateCar(car, users, carTypes, fuelTypes);
    }).toThrow("Unknown owner!");
  });

  it("throws error when carType is unknown", () => {
    carTypes = ["Fiat", "Porsche"];

    const car = {
      licenseNumber: "ABC-123",
      carType: "Fiat",
    };
    validateCar(car, users, carTypes, fuelTypes);

    expect(() => {
      const car = {
        licenseNumber: "ABC-123",
        carType: "BMW",
      };
      validateCar(car, users, carTypes, fuelTypes);
    }).toThrow("Unknown car type!");
  });

  it("throws error when year is not a number", () => {
    validateCar({ licenseNumber: "ABC-123", year: 1950 });

    expect(() => {
      validateCar({ licenseNumber: "ABC-123", year: "1950" });
    }).toThrow("Year must be a number");
  });

  it("throws error when cm3 is not a number", () => {
    validateCar({ licenseNumber: "ABC-123", cm3: 1500 });

    expect(() => {
      validateCar({ licenseNumber: "ABC-123", cm3: "1500" });
    }).toThrow("Cm3 must be a number");
  });

  it("throws error when fuelType is unknown", () => {
    fuelTypes = ["Gasoline"];

    const car = {
      licenseNumber: "ABC-123",
      fuelType: "Gasoline",
    };
    validateCar(car, users, carTypes, fuelTypes);

    expect(() => {
      const car = {
        licenseNumber: "ABC-123",
        fuelType: "Diesel",
      };
      validateCar(car, users, carTypes, fuelTypes);
    }).toThrow("Unknown fuel type!");
  });

  it("accepts a valid car", () => {
    users = [
      { id: "1", firstName: "firstName1", lastName: "lastName1" },
      { id: "2", firstName: "firstName2", lastName: "lastName2" },
    ];
    carTypes = ["Fiat", "Porsche"];
    fuelTypes = ["Gasoline"];

    const car = {
      licenseNumber: "ABC-123",
      owner: { id: "2", firstName: "firstName2", lastName: "lastName2" },
      carType: "Fiat",
      year: 1950,
      cm3: 1500,
      fuelType: "Gasoline",
    };
    validateCar(car, users, carTypes, fuelTypes);
  });
});
