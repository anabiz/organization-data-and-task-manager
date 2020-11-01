/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('company', {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
        },
        company_name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        image_link: {
            type: "VARCHAR(500)",
        },
        description: {
            type: 'text',
            notNull: true
        },
        email: {
            type: "VARCHAR(100)",
            notNull: true,
            unique: true,
        },
        ceo: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        country: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        address: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        email_verified: {
            type: "bool",
            default: false,
        },
        email_verified_token: {
            type: "VARCHAR(500)",
        },
        market_value: {
            type: 'integer',
            notNull: true,
        },
        password: {
            type: "VARCHAR(100)",
            notNull: true,
        },
    })
    pgm.sql(`
    INSERT INTO company (id, company_name, description, ceo, country, email, address, market_value, password)
    VALUES ('1e0466f2-ca16-4923-926d-522c26f84cef', 'julius furniture', 'we deal on all kinds of furniture', 'Anthony', 'Brazil', 'anabizfurniture@gmail.com', 'No 234 julius road', 89, '0000')
    `);
};

exports.down = pgm => {
    pgm.dropTable('company');
};
