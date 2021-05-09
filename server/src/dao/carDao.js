const TABLE_NAME = "cars";

async function CarDao({ cloudant }) {
  try {
    await cloudant.db.create(TABLE_NAME);
  } catch (err) {}

  function addCar({ licenseNumber, owner, carType, year, cm3, fuelType }) {
    return cloudant.use(TABLE_NAME).insert({
      licenseNumber,
      owner: owner
        ? {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
          }
        : null,
      carType,
      year,
      cm3,
      fuelType,
    });
  }

  async function updateCar({
    id,
    licenseNumber,
    owner,
    carType,
    year,
    cm3,
    fuelType,
  }) {
    const existingCar = await cloudant.use(TABLE_NAME).get(id);
    return cloudant.use(TABLE_NAME).insert({
      _id: id,
      _rev: existingCar._rev,
      licenseNumber,
      owner: owner
        ? {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
          }
        : null,
      carType,
      year,
      cm3,
      fuelType,
    });
  }

  async function getCars() {
    const { rows } = await cloudant
      .use(TABLE_NAME)
      .list({ include_docs: true });
    return rows.map((row) => ({
      id: row.doc._id,
      licenseNumber: row.doc.licenseNumber,
      owner: row.doc.owner,
      carType: row.doc.carType,
      year: row.doc.year,
      cm3: row.doc.cm3,
      fuelType: row.doc.fuelType,
    }));
  }

  return {
    addCar,
    getCars,
    updateCar,
  };
}

module.exports = CarDao;
