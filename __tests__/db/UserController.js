//create mock sql database here to test login/register
const db = require('./mockModel');

async function getUsersController(req, res) {
  try {
    const users = await db.query('SELECT * FROM users;');
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function registerUserController(req, res) {
  try {
    const { email, username, password, firstName, lastName } = req.body.userInfo;
    await db.query(`INSERT INTO users (email, username, password, firstName, lastName)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;)`, [email, username, password, firstName, lastName])
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

async function loginUserController (req, res) {

  const { email, password } = req.body.userInfo;

  try {

    const query = `
      SELECT roles, password, email, username 
      FROM users 
      WHERE email = $1;
    `

    const result = await db.query(query, [email]);

    if (result.rows.length > 0) {
      const userPw = result.rows[0].password;

      if (userPw !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = result.rows[0].username + 1;

      const userInfo = {
        email: result.rows[0].email,
        username: result.rows[0].username,
        roles: result.rows[0].roles
      };

      return res.status(200).json({ userInfo, token });
    }
  } catch (err) {
    console.error('Error logging user in:', err);
    res.status(500).json({ error: 'Failed to login user' });
  }
}

module.exports = { getUsersController, registerUserController, loginUserController };