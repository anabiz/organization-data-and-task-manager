/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("products", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
        },
        company_id: {
            type: "uuid",
            notNull: true,
            references: "company(id)",
        },
        name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        description: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.sql(`
    INSERT INTO products (id, company_id, name, description)
    VALUES ('aa229ca4-e54e-4bfb-bc7c-cfbbd1014db1','1e0466f2-ca16-4923-926d-522c26f84cef', 'room divider', 'very nice divider furniture')
    `);
};

exports.down = pgm => {
    pgm.dropTable('products');
};
