exports.up = function(knex) {
    return knex.schema.alterTable("monitor", (table) => {
        // Add unit column with default "ms"
        table.string("unit", 20).notNullable().defaultTo("ms");
    }).then(() => {
        return knex.schema.alterTable("heartbeat", (table) => {
            // Add unit to heartbeat to preserve per‑check context
            table.string("unit", 20).notNullable().defaultTo("ms");
        });
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable("heartbeat", (table) => {
        table.dropColumn("unit");
    }).then(() => {
        return knex.schema.alterTable("monitor", (table) => {
            table.dropColumn("unit");
        });
    });
};
