import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("users", (table) => {
    table.increments("id", { primaryKey: true })
    table.string("first_name", 255).notNullable();
    table.string("last_name",  255).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("users");
}
