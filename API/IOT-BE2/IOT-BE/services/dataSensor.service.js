const db = require("../database");

module.exports.getAllDataSensor = async (obj) => {
  let sqlParams = [];
  let sqlCondition = "";
  //search
  if (obj.type !== undefined && obj.type !== null && obj.type !== "all") {
    sqlCondition += ` AND ${obj.type} = ?`;
    sqlParams.push(obj.search);
  }
  // Lấy tổng số lượng bản ghi
  const totalCountSql = `SELECT COUNT(*) as totalCount FROM iot_exam.datasensors WHERE 1=1 ${sqlCondition}`;
  const [totalCountResult] = await db.query(totalCountSql, sqlParams);
  const totalCount = totalCountResult[0].totalCount;
  // Lấy dữ liệu
  const sql = `SELECT * FROM iot_exam.datasensors WHERE 1=1 ${sqlCondition} LIMIT ? OFFSET ?`;
  const [data] = await db.query(sql, [
    ...sqlParams,
    obj.pageSize,
    (obj.page - 1) * obj.pageSize,
  ]);
  console.log(sqlParams);
  console.log(sql);

  return { data, totalCount };
};

module.exports.sortDataSensorHighToLow = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = `SELECT * FROM iot_exam.datasensors ORDER BY ${obj.fieldName} DESC LIMIT ? OFFSET ?`;
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.sortDataSensorLowToHigh = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql = `SELECT * FROM iot_exam.datasensors ORDER BY ${obj.fieldName} ASC LIMIT ? OFFSET ?`;
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getAllDataSensorByCurrentDate = async (obj) => {
  const offset = (obj.page - 1) * obj.pageSize;
  const sql =
    "SELECT * FROM iot_exam.datasensors WHERE DATE(createdDate) = CURDATE() LIMIT ? OFFSET ?";
  const [records] = await db.query(sql, [obj.pageSize, offset]);
  return records;
};

module.exports.getDataSensorById = async (id) => {
  const [[record]] = await db.query(
    "SELECT * FROM iot_exam.datasensors WHERE id = ?",
    [id]
  );
  return record;
};

module.exports.AddADataSensor = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "INSERT INTO iot_exam.datasensors (temperature, humidity, light, createdDate) VALUES (?, ?, ?, NOW())",
    [obj.temp, obj.hum, obj.light]
  );
  return affectedRows;
};
