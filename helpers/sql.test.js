// Import the sqlForPartialUpdate function.
const { sqlForPartialUpdate } = require("./sql");

// Test for sqlForPartialUpdate.
describe("sqlForPartialUpdate", function () {
  
  // Test for updating a single item.
  test("works: 1 item", function () {

    // Call the function with one field to update and its mapping.
    const result = sqlForPartialUpdate(

        { f1: "v1" }, // Data: one field to update.
        { f1: "f1", fF2: "f2" }); // Mapping: field to column.
    
    // Verify the function returns the correct SQL part and values.
    expect(result).toEqual({
    
      setCols: "\"f1\"=$1", // SQL for one column update.
      values: ["v1"], // Value for the update.
    });
  });

  // Test for updating two items.
  test("works: 2 items", function () {
    
    // Call the function with two fields to update and their mapping.
    const result = sqlForPartialUpdate(
    
      { f1: "v1", jsF2: "v2" }, // Data: two fields to update.
        { jsF2: "f2" }); // Mapping: one field to column mapping.
    
    // Verify the function returns the correct SQL part and values for both updates.
    expect(result).toEqual({
    
      setCols: "\"f1\"=$1, \"f2\"=$2", // SQL for two column updates.
      values: ["v1", "v2"], // Values for the updates.
    });
  });
});

