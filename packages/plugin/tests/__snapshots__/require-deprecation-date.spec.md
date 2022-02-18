// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "22/08/2021")
        |        ^^^ "Old" сan be removed
`;

exports[` 2`] = `
⚙️ Options

    {
      "argumentName": "untilDate"
    }

❌ Error

    > 1 | scalar Old @deprecated(untilDate: "22/08/2021")
        |        ^^^ "Old" сan be removed
`;

exports[` 3`] = `
❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "bad")
        |                                      ^^^^^ Deletion date must be in format "DD/MM/YYYY"
`;

exports[` 4`] = `
❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "32/08/2021")
        |                                      ^^^^^^^^^^^^ Invalid "32/08/2021" deletion date
`;

exports[` 5`] = `
❌ Error

    > 1 | type Old { oldField: ID @deprecated }
        |                          ^^^^^^^^^^ Directive "@deprecated" must have a deletion date
`;
