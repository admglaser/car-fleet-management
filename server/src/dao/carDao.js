const TABLE_NAME = "cars";

async function CarDao({ cloudant }) {
  try {
    await cloudant.db.create(TABLE_NAME);
  } catch (err) {}

  function addCar({ licenseNumber, owner, carType, year, cm3, fuelType }) {
    return cloudant
      .use(TABLE_NAME)
      .insert({ licenseNumber, owner, carType, year, cm3, fuelType });
  }

  async function getCars() {
    const { rows } = await cloudant
      .use(TABLE_NAME)
      .list({ include_docs: true });
    return rows.map((row) => ({
      id: row.doc._id,
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
  };
}

module.exports = CarDao;
