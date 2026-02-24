exports.up = function (knex) {
    return knex.schema
        .alterTable("monitor", (table) => {
            table.integer("min_beats_before_notify").notNullable().defaultTo(0);
            table.boolean("suppress_warning_notify").notNullable().defaultTo(false);
        })
        .then(() =>
            knex.schema.alterTable("heartbeat", (table) => {
                table.integer("consecutive_count").notNullable().defaultTo(1);
            })
        );
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("heartbeat", (table) => {
            table.dropColumn("consecutive_count");
        })
        .then(() =>
            knex.schema.alterTable("monitor", (table) => {
                table.dropColumn("min_beats_before_notify");
                table.dropColumn("suppress_warning_notify");
            })
        );
};