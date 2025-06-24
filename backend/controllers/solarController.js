const pool = require('../db');

// ✅ Create Solar Panel Entry
exports.createSolarEntry = async (req, res) => {
  const {
    SUID, U_ID, Installed_Capacity, Installation_Date,
    Energy_Generation_Value, Energy_Generation,
    Grid_Emission_Factor, Inverter_Type, Panel_Efficiency
  } = req.body;

  // ✅ Validate all required fields
  const requiredFields = {
    SUID,
    U_ID,
    Installed_Capacity,
    Installation_Date,
    Energy_Generation_Value,
    Energy_Generation,
    Grid_Emission_Factor,
    Inverter_Type,
    Panel_Efficiency
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return res.status(400).json({
        status: 'error',
        message: `Missing or empty required field: ${key}`
      });
    }
  }

  try {
    // ✅ Insert new solar panel
    const result = await pool.query(
      `INSERT INTO Solar_Panel_Master_Data (
        SUID, U_ID, Installed_Capacity, Installation_Date,
        Energy_Generation_Value, Energy_Generation,
        Grid_Emission_Factor, Inverter_Type, Panel_Efficiency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        SUID, U_ID, Installed_Capacity, Installation_Date,
        Energy_Generation_Value, Energy_Generation,
        Grid_Emission_Factor, Inverter_Type, Panel_Efficiency
      ]
    );

    const savedSolar = result.rows[0];

    // ✅ Count total for user
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM Solar_Panel_Master_Data WHERE U_ID = $1`,
      [U_ID]
    );

    const solarCount = parseInt(countResult.rows[0].count, 10);

    res.status(201).json({
      status: 'success',
      data: savedSolar,
      solarCount
    });
  } catch (error) {
    console.error('Insert Solar Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to insert solar panel data',
      error: error.message
    });
  }
};

// ✅ Fetch Solar Panels and Count for User
exports.getSolarPanelsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM Solar_Panel_Master_Data WHERE U_ID = $1`,
      [userId]
    );

    const count = result.rowCount;

    res.status(200).json({
      status: 'success',
      data: result.rows,
      count
    });

    console.log('Payload received in backend:', req.body);
  } catch (error) {
    console.error('Fetch Solar Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch solar panel data'
    });
  }
};
