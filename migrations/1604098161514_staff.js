/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("staff", {
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
        first_name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        last_name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        password: {
            type: "VARCHAR(150)",
            notNull: true,
        },
        reset_password_token: {
            type: "VARCHAR(500)",
        },
        refresh_token: {
            type: "VARCHAR(500)",
        },
      
        address: {
            type: "VARCHAR(100)",
        },
        email: {
            type: "VARCHAR(100)",
            notNull: true,
            unique: true,
        },
        last_seen: {
            type: "TIMESTAMP",
            default: pgm.func("current_timestamp"),
        },
        email_verified: {
            type: "bool",
            default: false,
        },
        email_verified_token: {
            type: "VARCHAR(500)",
        },
        image_link: {
            type: "VARCHAR(500)",
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.sql(`
       INSERT INTO staff (id, company_id, last_name, first_name, password, email)
       VALUES ('27be4f65-ca31-4f95-a11c-9d5db900876e', '1e0466f2-ca16-4923-926d-522c26f84cef', 'Iwuji', 'Anthony', '1111', 'anabiz@gmail.com')
       `);
};

exports.down = pgm => {
    pgm.dropTable('staff');
};

