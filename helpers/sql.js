const { BadRequestError } = require("../expressError");

/**
 * Generates a SQL query for updating object properties.
 * 
 * This function takes an object containing data to update and a mapping from
 * JavaScript-style camelCase variables to SQL-style snake_case columns. It generates
 * part of an SQL update query to set new values for specified columns. This is particularly
 * useful for PATCH requests where only a subset of a resource's data may be updated.
 *
 * @param {Object} dataToUpdate - An object where the keys represent the fields to update
 * and the values represent the new values for those fields.
 * 
 * @param {Object} jsToSql - An object mapping JavaScript camelCase field names to
 * SQL snake_case column names.
 * 
 * @returns {Object} An object containing two properties: `setCols` (a string with the
 * SQL query part setting the new values for the specified columns) and `values` (an array
 * of the new values in the order they appear in the `setCols` string).
 * 
 * @example {firstName: 'Test', age: 39} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Test', 39] }
 * 
 * @throws {BadRequestError} If `dataToUpdate` is empty, indicating that there's no data to update.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Test', age: 39} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
