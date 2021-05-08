const TABLE_NAME = "fuel-types";

async function FuelTypeDao({ cloudant }) {
  try {
    await cloudant.db.create(TABLE_NAME);
  } catch (err) {}

  async function addFuelType({ name }) {
    await cloudant.use(TABLE_NAME).insert({ _id: name });
  }

  async function getFuelTypes() {
    const { rows } = await cloudant
      .use(TABLE_NAME)
      .list({ include_docs: true });
    return rows.map((row) => ({
      name: row.doc._id,
    }));
  }

  return {
    addFuelType,
    getFuelTypes,
  };
}

module.exports = FuelTypeDao;
