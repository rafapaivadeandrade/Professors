exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("lastName").notNullable();
    table.string("avatar").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("passwordResetToken");
    table.timestamp("passwordResetExpires");
    table.string("whatsapp");
    table.string("bio");
    table
      .timestamp("created_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
