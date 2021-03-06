const TABLE_NAME = "users";

async function UserDao({ cloudant }) {
  try {
    await cloudant.db.create(TABLE_NAME);
  } catch (err) {}

  async function addUser({ id, email, firstName, lastName }) {
    await cloudant
      .use(TABLE_NAME)
      .insert({ _id: id, email, firstName, lastName, admin: false });
  }

  async function findUser({ id }) {
    const { docs } = await cloudant
      .use(TABLE_NAME)
      .find({ selector: { _id: id } });
    if (docs.length) {
      const { email, firstName, lastName, admin } = docs[0];
      return { id, email, firstName, lastName, admin };
    }
    return null;
  }

  async function getUsers() {
    const { rows } = await cloudant
      .use(TABLE_NAME)
      .list({ include_docs: true });
    return rows.map((row) => ({
      id: row.doc._id,
      email: row.doc.email,
      firstName: row.doc.firstName,
      lastName: row.doc.lastName,
      admin: row.doc.admin,
    }));
  }

  return {
    addUser,
    findUser,
    getUsers,
  };
}

module.exports = UserDao;
