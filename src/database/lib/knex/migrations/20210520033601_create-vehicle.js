
exports.up = function(knex) {
  return knex.schema.createTable("vehicle", tbl => {
      tbl.text("id", 250).unique().notNullable();
      tbl.text("renavam", 250).unique().notNullable();
      tbl.text("chassi", 20).unique().notNullable();
      tbl.text("placa", 7).unique().notNullable();
      tbl.text("marca", 150).notNullable();
      tbl.text("modelo", 150).notNullable();
      tbl.integer("ano", 4).notNullable();
  })
};

exports.down = function(knex) {
  
};
