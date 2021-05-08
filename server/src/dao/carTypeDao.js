const TABLE_NAME = "car-types";

async function CarTypeDao({ cloudant }) {
  try {
    await cloudant.db.create(TABLE_NAME);
  } catch (err) {}

  async function addCarType({ name }) {
    await cloudant.use(TABLE_NAME).insert({ _id: name });
  }

  async function getCarTypes() {
    const { rows } = await cloudant
      .use(TABLE_NAME)
      .list({ include_docs: true });
    return rows.map((row) => row.doc._id);
  }

  return {
    addCarType,
    getCarTypes,
  };
}

module.exports = CarTypeDao;
