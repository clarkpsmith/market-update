const { BadRequestError } = require("../expressError");

/*pass in a data object to be updated for dataToUpdate
 jsToSql is an already set object depending on its use that contains the sql naming conventions keynames and the corresponding javascript camelcase conventions and keynames
*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', email: 'aliya@gmail.com'} => ['"first_name"=$1', '"email"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
