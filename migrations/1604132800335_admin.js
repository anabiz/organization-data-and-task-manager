/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("admin", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
        },
        email: {
            type: "VARCHAR(100)",
            notNull: true,
            unique: true,
        },
        password: {
            type: "VARCHAR(150)",
            notNull: true,
        },
        first_name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        last_name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        role: {
            type: "VARCHAR(6)",
            notNull: true,
        },
        reset_password_token: {
            type: "VARCHAR(500)",
        },
        refresh_token: {
            type: "VARCHAR(500)",
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.sql(`
    INSERT INTO admin (email, last_name, first_name, password, role)
    VALUES ('anabizconcept9@gmail.com', 'Anthony','Iwuji','myadmin','admin')
    `);
};

exports.down = pgm => {
    pgm.dropTable("admin");
};
