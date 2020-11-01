/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("task", {
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
        staff_id: {
            type: "uuid",
            notNull: true,
            references: "staff(id)",
          },
        name: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        description: {
          type: "VARCHAR(100)",
          notNull: true,
        },
        asignedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
      });
      pgm.sql(`
    INSERT INTO task (company_id,staff_id, name, description)
    VALUES ('1e0466f2-ca16-4923-926d-522c26f84cef','27be4f65-ca31-4f95-a11c-9d5db900876e', 'build a 6feet room divider', 'the width should be 3feet and color brown.should be ready by tomorrow')
    `);
};

exports.down = pgm => {
    pgm.dropTable('task');
};
