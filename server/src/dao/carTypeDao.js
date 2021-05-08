async function CarTypeDao({ cloudant }) {
  try {
    await cloudant.db.create("car-types");
  } catch (err) {}

  async function addCarType({ name }) {
    await cloudant.use("car-types").insert({ _id: name });
  }

  async function getCarTypes() {
    const { rows } = await cloudant
      .use("car-types")
      .list({ include_docs: true });
    return rows.map((row) => ({
      name: row.doc._id,
    }));
  }

  return {
    addCarType,
    getCarTypes,
  };
}

module.exports = CarTypeDao;
