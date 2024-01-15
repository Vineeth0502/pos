const mysql = require('mysql2'); // Import mysql2
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Vineeth',
  database: 'duroflex',
});

// Ensure the pool supports promises
const promisePool = pool.promise();

async function getMattresses() {
  try {
    const [rows] = await promisePool.query('SELECT * FROM mattresses');
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching mattresses:', error);
    throw error;
  }
}

async function getMattressById(mattressId) {
    try {
        const [rows] = await promisePool.query(`
        SELECT v.variation_id, v.mattress_id, v.type, v.size, v.dimension, v.height, v.stock, v.price AS variation_price,
               m.name AS mattress_name, m.description AS mattress_description, m.price AS mattress_price
        FROM variations v
        JOIN mattresses m ON v.mattress_id = m.mattress_id
        WHERE v.mattress_id = ?;
    `, [mattressId]);

      console.log(rows);
      return rows[0]; // Assuming the ID is unique, so we return the first result
    } catch (error) {
      console.error('Error fetching mattress details by ID:', error);
      throw error;
    }
  }
  
  module.exports = {
    getMattresses,
    getMattressById,
    // Other functions...
  };