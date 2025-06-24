const pool = require('../db');

// ✅ Create EV Entry (existing code)
exports.createEVEntry = async (req, res) => {
  const {
    VUID, U_ID, Category, Manufacturers, Model, Purchase_Year,
    Energy_Consumed, Primary_Charging_Type, Range,
    Grid_Emission_Factor, Top_Speed, Charging_Time, Motor_Power
  } = req.body;

  try {
    // Insert new EV
    const result = await pool.query(
      `INSERT INTO EV_Master_Data (
        VUID, U_ID, Category, Manufacturers, Model, Purchase_Year,
        Energy_Consumed, Primary_Charging_Type, Range,
        Grid_Emission_Factor, Top_Speed, Charging_Time, Motor_Power
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        VUID, U_ID, Category, Manufacturers, Model, Purchase_Year,
        Energy_Consumed, Primary_Charging_Type, Range,
        Grid_Emission_Factor, Top_Speed, Charging_Time, Motor_Power
      ]
    );

    const savedEV = result.rows[0];

    // Get total count for this user
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM EV_Master_Data WHERE U_ID = $1`,
      [U_ID]
    );
    const evCount = parseInt(countResult.rows[0].count, 10);

    res.status(201).json({ status: 'success', data: savedEV, evCount });
  } catch (error) {
    console.error('Insert EV Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to insert EV data' });
  }
};

// ✅ NEW: Get all EVs and count for a user
exports.getEVsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM EV_Master_Data WHERE U_ID = $1`,
      [userId]
    );

    const count = result.rowCount;

    res.status(200).json({
      status: 'success',
      data: result.rows,
      count: count
    });
  } catch (error) {
    console.error('Fetch EVs by user error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch EV data' });
  }
};
