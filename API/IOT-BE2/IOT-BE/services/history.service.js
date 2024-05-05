const db = require("../database");

module.exports.getAllHistory = async (obj) => {
  let sqlParams = [];
  let sqlCondition = "";
  // Lấy tổng số lượng bản ghi
  const totalCountSql = `SELECT COUNT(*) as totalCount FROM iot_exam.history WHERE 1=1 ${sqlCondition}`;
  const [totalCountResult] = await db.query(totalCountSql, sqlParams);
  const totalCount = totalCountResult[0].totalCount;
  // Lấy dữ liệu
  const sql = `SELECT * FROM iot_exam.history WHERE 1=1 ${sqlCondition} LIMIT ? OFFSET ?`;
  const [data] = await db.query(sql, [
    ...sqlParams,
    obj.pageSize,
    (obj.page - 1) * obj.pageSize,
  ]);
  console.log(sqlParams);

  return { data, totalCount };
};

module.exports.AddAHistory = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "INSERT INTO iot_exam.history (device, action, createdDate) VALUES (?, ?, NOW())",
    [obj.device, obj.action]
  );
  return affectedRows;
};

module.exports.getHistoryById = async (id) => {
  const [[record]] = await db.query(
    "SELECT * FROM iot_exam.history WHERE id = ?",
    [id]
  );
  return record;
};

