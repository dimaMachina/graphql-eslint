// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`naming-convention > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | type b { test: String }

#### ⚙️ Options

    {
      "types": "PascalCase",
      "FieldDefinition": "PascalCase",
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/2

    > 1 | type b { test: String }
        |      ^ Type "b" should be in PascalCase format

#### 💡 Suggestion: Rename to \`B\`

    1 | type B { test: String }

#### ❌ Error 2/2

    > 1 | type b { test: String }
        |          ^^^^ Field "test" should be in PascalCase format

#### 💡 Suggestion: Rename to \`Test\`

    1 | type b { Test: String }
`;

exports[`naming-convention > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | type __b { test__: String }

#### ⚙️ Options

    {
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/2

    > 1 | type __b { test__: String }
        |      ^^^ Leading underscores are not allowed

#### 💡 Suggestion: Rename to \`b\`

    1 | type b { test__: String }

#### ❌ Error 2/2

    > 1 | type __b { test__: String }
        |            ^^^^^^ Trailing underscores are not allowed

#### 💡 Suggestion: Rename to \`test\`

    1 | type __b { test: String }
`;

exports[`naming-convention > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | scalar BSONDecimal

#### ⚙️ Options

    {
      "ScalarTypeDefinition": "snake_case",
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error

    > 1 | scalar BSONDecimal
        |        ^^^^^^^^^^^ Scalar "BSONDecimal" should be in snake_case format

#### 💡 Suggestion: Rename to \`bson_decimal\`

    1 | scalar bson_decimal
`;

exports[`naming-convention > invalid > Invalid #5 1`] = `
#### ⌨️ Code

      1 | enum B { test }

#### ⚙️ Options

    {
      "EnumTypeDefinition": "camelCase",
      "EnumValueDefinition": "UPPER_CASE",
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/2

    > 1 | enum B { test }
        |      ^ Enumerator "B" should be in camelCase format

#### 💡 Suggestion: Rename to \`b\`

    1 | enum b { test }

#### ❌ Error 2/2

    > 1 | enum B { test }
        |          ^^^^ Enumeration value "test" should be in UPPER_CASE format

#### 💡 Suggestion: Rename to \`TEST\`

    1 | enum B { TEST }
`;

exports[`naming-convention > invalid > Invalid #6 1`] = `
#### ⌨️ Code

      1 | input test { _Value: String }

#### ⚙️ Options

    {
      "types": "PascalCase",
      "InputValueDefinition": "snake_case",
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/3

    > 1 | input test { _Value: String }
        |       ^^^^ Input type "test" should be in PascalCase format

#### 💡 Suggestion: Rename to \`Test\`

    1 | input Test { _Value: String }

#### ❌ Error 2/3

    > 1 | input test { _Value: String }
        |              ^^^^^^ Input property "_Value" should be in snake_case format

#### 💡 Suggestion: Rename to \`_value\`

    1 | input test { _value: String }

#### ❌ Error 3/3

    > 1 | input test { _Value: String }
        |              ^^^^^^ Leading underscores are not allowed

#### 💡 Suggestion: Rename to \`Value\`

    1 | input test { Value: String }
`;

exports[`naming-convention > invalid > Invalid #7 1`] = `
#### ⌨️ Code

      1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }

#### ⚙️ Options

    {
      "ObjectTypeDefinition": {
        "style": "camelCase"
      },
      "FieldDefinition": {
        "style": "camelCase",
        "suffix": "AAA"
      },
      "EnumValueDefinition": {
        "style": "camelCase",
        "suffix": "ENUM"
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |      ^^^^^^^ Type "TypeOne" should be in camelCase format

#### 💡 Suggestion: Rename to \`typeOne\`

    1 | type typeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }

#### ❌ Error 2/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                ^^^^^^ Field "aField" should have "AAA" suffix

#### 💡 Suggestion: Rename to \`aFieldAAA\`

    1 | type TypeOne { aFieldAAA: String } enum Z { VALUE_ONE VALUE_TWO }

#### ❌ Error 3/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                                          ^^^^^^^^^ Enumeration value "VALUE_ONE" should have "ENUM" suffix

#### 💡 Suggestion: Rename to \`VALUE_ONEENUM\`

    1 | type TypeOne { aField: String } enum Z { VALUE_ONEENUM VALUE_TWO }

#### ❌ Error 4/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                                                    ^^^^^^^^^ Enumeration value "VALUE_TWO" should have "ENUM" suffix

#### 💡 Suggestion: Rename to \`VALUE_TWOENUM\`

    1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWOENUM }
`;

exports[`naming-convention > invalid > Invalid #8 1`] = `
#### ⌨️ Code

      1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }

#### ⚙️ Options

    {
      "ObjectTypeDefinition": {
        "style": "PascalCase"
      },
      "FieldDefinition": {
        "style": "camelCase",
        "prefix": "Field"
      },
      "EnumValueDefinition": {
        "style": "UPPER_CASE",
        "prefix": "ENUM"
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |            ^^^^^^ Field "aField" should have "Field" prefix

#### 💡 Suggestion: Rename to \`FieldaField\`

    1 | type One { FieldaField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }

#### ❌ Error 2/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |                                      ^^^^^^^^^^^^^^^^ Enumeration value "A_ENUM_VALUE_ONE" should have "ENUM" prefix

#### 💡 Suggestion: Rename to \`ENUMA_ENUM_VALUE_ONE\`

    1 | type One { aField: String } enum Z { ENUMA_ENUM_VALUE_ONE VALUE_TWO }

#### ❌ Error 3/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |                                                       ^^^^^^^^^ Enumeration value "VALUE_TWO" should have "ENUM" prefix

#### 💡 Suggestion: Rename to \`ENUMVALUE_TWO\`

    1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE ENUMVALUE_TWO }
`;

exports[`naming-convention > invalid > Invalid #9 1`] = `
#### ⌨️ Code

      1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

#### ⚙️ Options

    {
      "ObjectTypeDefinition": {
        "style": "PascalCase",
        "forbiddenPrefixes": [
          "On"
        ]
      },
      "FieldDefinition": {
        "style": "camelCase",
        "forbiddenPrefixes": [
          "foo",
          "bar"
        ],
        "forbiddenSuffixes": [
          "Foo"
        ]
      },
      "FieldDefinition[parent.name.value=Query]": {
        "style": "camelCase",
        "forbiddenPrefixes": [
          "get",
          "query"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |      ^^^ Type "One" should not have "On" prefix

#### 💡 Suggestion: Rename to \`e\`

    1 | type e { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

#### ❌ Error 2/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |            ^^^^^^ Field "getFoo" should not have "Foo" suffix

#### 💡 Suggestion: Rename to \`get\`

    1 | type One { get: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

#### ❌ Error 3/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                            ^^^^ Field "getA" should not have "get" prefix

#### 💡 Suggestion: Rename to \`A\`

    1 | type One { getFoo: String, queryBar: String } type Query { A(id: ID!): String, queryB: String } extend type Query { getC: String }

#### ❌ Error 4/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                                                   ^^^^^^ Field "queryB" should not have "query" prefix

#### 💡 Suggestion: Rename to \`B\`

    1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, B: String } extend type Query { getC: String }

#### ❌ Error 5/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                                                                                        ^^^^ Field "getC" should not have "get" prefix

#### 💡 Suggestion: Rename to \`C\`

    1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { C: String }
`;

exports[`naming-convention > invalid > Invalid #10 1`] = `
#### ⌨️ Code

      1 | query Foo { foo } query getBar { bar }

#### ⚙️ Options

    {
      "OperationDefinition": {
        "style": "camelCase",
        "forbiddenPrefixes": [
          "get"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/2

    > 1 | query Foo { foo } query getBar { bar }
        |       ^^^ Operation "Foo" should be in camelCase format

#### 💡 Suggestion: Rename to \`foo\`

    1 | query foo { foo } query getBar { bar }

#### ❌ Error 2/2

    > 1 | query Foo { foo } query getBar { bar }
        |                         ^^^^^^ Operation "getBar" should not have "get" prefix

#### 💡 Suggestion: Rename to \`Bar\`

    1 | query Foo { foo } query Bar { bar }
`;

exports[`naming-convention > invalid > large graphql file 1`] = `
#### ⌨️ Code

       1 | input _idOperatorsFilterFindManyUserInput {
       2 |   gt: MongoID
       3 |   gte: MongoID
       4 |   lt: MongoID
       5 |   lte: MongoID
       6 |   ne: MongoID
       7 |   in: [MongoID]
       8 |   nin: [MongoID]
       9 | }
       10 |
       11 | input _idOperatorsFilterFindOneUserInput {
       12 |   gt: MongoID
       13 |   gte: MongoID
       14 |   lt: MongoID
       15 |   lte: MongoID
       16 |   ne: MongoID
       17 |   in: [MongoID]
       18 |   nin: [MongoID]
       19 | }
       20 |
       21 | input _idOperatorsFilterRemoveManyUserInput {
       22 |   gt: MongoID
       23 |   gte: MongoID
       24 |   lt: MongoID
       25 |   lte: MongoID
       26 |   ne: MongoID
       27 |   in: [MongoID]
       28 |   nin: [MongoID]
       29 | }
       30 |
       31 | input _idOperatorsFilterRemoveOneUserInput {
       32 |   gt: MongoID
       33 |   gte: MongoID
       34 |   lt: MongoID
       35 |   lte: MongoID
       36 |   ne: MongoID
       37 |   in: [MongoID]
       38 |   nin: [MongoID]
       39 | }
       40 |
       41 | input _idOperatorsFilterUpdateManyUserInput {
       42 |   gt: MongoID
       43 |   gte: MongoID
       44 |   lt: MongoID
       45 |   lte: MongoID
       46 |   ne: MongoID
       47 |   in: [MongoID]
       48 |   nin: [MongoID]
       49 | }
       50 |
       51 | input _idOperatorsFilterUpdateOneUserInput {
       52 |   gt: MongoID
       53 |   gte: MongoID
       54 |   lt: MongoID
       55 |   lte: MongoID
       56 |   ne: MongoID
       57 |   in: [MongoID]
       58 |   nin: [MongoID]
       59 | }
       60 |
       61 | input _idOperatorsFilterUserInput {
       62 |   gt: MongoID
       63 |   gte: MongoID
       64 |   lt: MongoID
       65 |   lte: MongoID
       66 |   ne: MongoID
       67 |   in: [MongoID]
       68 |   nin: [MongoID]
       69 | }
       70 |
       71 | input AgeOperatorsFilterFindManyUserInput {
       72 |   gt: Float
       73 |   gte: Float
       74 |   lt: Float
       75 |   lte: Float
       76 |   ne: Float
       77 |   in: [Float]
       78 |   nin: [Float]
       79 | }
       80 |
       81 | input AgeOperatorsFilterFindOneUserInput {
       82 |   gt: Float
       83 |   gte: Float
       84 |   lt: Float
       85 |   lte: Float
       86 |   ne: Float
       87 |   in: [Float]
       88 |   nin: [Float]
       89 | }
       90 |
       91 | input AgeOperatorsFilterRemoveManyUserInput {
       92 |   gt: Float
       93 |   gte: Float
       94 |   lt: Float
       95 |   lte: Float
       96 |   ne: Float
       97 |   in: [Float]
       98 |   nin: [Float]
       99 | }
       100 |
       101 | input AgeOperatorsFilterRemoveOneUserInput {
       102 |   gt: Float
       103 |   gte: Float
       104 |   lt: Float
       105 |   lte: Float
       106 |   ne: Float
       107 |   in: [Float]
       108 |   nin: [Float]
       109 | }
       110 |
       111 | input AgeOperatorsFilterUpdateManyUserInput {
       112 |   gt: Float
       113 |   gte: Float
       114 |   lt: Float
       115 |   lte: Float
       116 |   ne: Float
       117 |   in: [Float]
       118 |   nin: [Float]
       119 | }
       120 |
       121 | input AgeOperatorsFilterUpdateOneUserInput {
       122 |   gt: Float
       123 |   gte: Float
       124 |   lt: Float
       125 |   lte: Float
       126 |   ne: Float
       127 |   in: [Float]
       128 |   nin: [Float]
       129 | }
       130 |
       131 | input AgeOperatorsFilterUserInput {
       132 |   gt: Float
       133 |   gte: Float
       134 |   lt: Float
       135 |   lte: Float
       136 |   ne: Float
       137 |   in: [Float]
       138 |   nin: [Float]
       139 | }
       140 |
       141 | """
       142 | The \`Decimal\` scalar type uses the IEEE 754 decimal128 decimal-based
       143 | floating-point numbering format. Supports 34 decimal digits of precision, a max
       144 | value of approximately 10^6145, and min value of approximately -10^6145
       145 | """
       146 | scalar BSONDecimal
       147 |
       148 | input CreateManyUserInput {
       149 |   name: String
       150 |   age: Float
       151 |   languages: [UserLanguagesInput]
       152 |   contacts: UserContactsInput
       153 |   gender: EnumUserGender
       154 |   address: UserAddressInput
       155 |
       156 |   """
       157 |   Some dynamic data
       158 |   """
       159 |   someMixed: JSON
       160 |   salaryDecimal: BSONDecimal
       161 | }
       162 |
       163 | type CreateManyUserPayload {
       164 |   """
       165 |   Created document ID
       166 |   """
       167 |   recordIds: [MongoID]!
       168 |
       169 |   """
       170 |   Created documents
       171 |   """
       172 |   records: [User]!
       173 |
       174 |   """
       175 |   Count of all documents created
       176 |   """
       177 |   createCount: Int!
       178 | }
       179 |
       180 | input CreateOneUserInput {
       181 |   name: String
       182 |   age: Float
       183 |   languages: [UserLanguagesInput]
       184 |   contacts: UserContactsInput
       185 |   gender: EnumUserGender
       186 |   address: UserAddressInput
       187 |
       188 |   """
       189 |   Some dynamic data
       190 |   """
       191 |   someMixed: JSON
       192 |   salaryDecimal: BSONDecimal
       193 | }
       194 |
       195 | type CreateOneUserPayload {
       196 |   """
       197 |   Created document ID
       198 |   """
       199 |   recordId: MongoID
       200 |
       201 |   """
       202 |   Created document
       203 |   """
       204 |   record: User
       205 | }
       206 |
       207 | enum EnumUserGender {
       208 |   male
       209 |   female
       210 |   ladyboy
       211 | }
       212 |
       213 | enum EnumUserLanguagesSkill {
       214 |   basic
       215 |   fluent
       216 |   native
       217 | }
       218 |
       219 | input FilterFindManyUserInput {
       220 |   name: String
       221 |   age: Float
       222 |   languages: [UserLanguagesInput]
       223 |   contacts: UserContactsInput
       224 |   gender: EnumUserGender
       225 |   address: UserAddressInput
       226 |
       227 |   """
       228 |   Some dynamic data
       229 |   """
       230 |   someMixed: JSON
       231 |   salaryDecimal: BSONDecimal
       232 |   _id: MongoID
       233 |   _ids: [MongoID]
       234 |
       235 |   """
       236 |   List of *indexed* fields that can be filtered via operators.
       237 |   """
       238 |   _operators: OperatorsFilterFindManyUserInput
       239 |   OR: [FilterFindManyUserInput!]
       240 |   AND: [FilterFindManyUserInput!]
       241 |
       242 |   """
       243 |   Search by distance in meters
       244 |   """
       245 |   geoDistance: GeoDistance
       246 | }
       247 |
       248 | input FilterFindOneUserInput {
       249 |   name: String
       250 |   age: Float
       251 |   languages: [UserLanguagesInput]
       252 |   contacts: UserContactsInput
       253 |   gender: EnumUserGender
       254 |   address: UserAddressInput
       255 |
       256 |   """
       257 |   Some dynamic data
       258 |   """
       259 |   someMixed: JSON
       260 |   salaryDecimal: BSONDecimal
       261 |   _id: MongoID
       262 |   _ids: [MongoID]
       263 |
       264 |   """
       265 |   List of *indexed* fields that can be filtered via operators.
       266 |   """
       267 |   _operators: OperatorsFilterFindOneUserInput
       268 |   OR: [FilterFindOneUserInput!]
       269 |   AND: [FilterFindOneUserInput!]
       270 | }
       271 |
       272 | input FilterRemoveManyUserInput {
       273 |   name: String
       274 |   age: Float
       275 |   languages: [UserLanguagesInput]
       276 |   contacts: UserContactsInput
       277 |   gender: EnumUserGender
       278 |   address: UserAddressInput
       279 |
       280 |   """
       281 |   Some dynamic data
       282 |   """
       283 |   someMixed: JSON
       284 |   salaryDecimal: BSONDecimal
       285 |   _id: MongoID
       286 |   _ids: [MongoID]
       287 |
       288 |   """
       289 |   List of *indexed* fields that can be filtered via operators.
       290 |   """
       291 |   _operators: OperatorsFilterRemoveManyUserInput
       292 |   OR: [FilterRemoveManyUserInput!]
       293 |   AND: [FilterRemoveManyUserInput!]
       294 | }
       295 |
       296 | input FilterRemoveOneUserInput {
       297 |   name: String
       298 |   age: Float
       299 |   languages: [UserLanguagesInput]
       300 |   contacts: UserContactsInput
       301 |   gender: EnumUserGender
       302 |   address: UserAddressInput
       303 |
       304 |   """
       305 |   Some dynamic data
       306 |   """
       307 |   someMixed: JSON
       308 |   salaryDecimal: BSONDecimal
       309 |   _id: MongoID
       310 |   _ids: [MongoID]
       311 |
       312 |   """
       313 |   List of *indexed* fields that can be filtered via operators.
       314 |   """
       315 |   _operators: OperatorsFilterRemoveOneUserInput
       316 |   OR: [FilterRemoveOneUserInput!]
       317 |   AND: [FilterRemoveOneUserInput!]
       318 | }
       319 |
       320 | input FilterUpdateManyUserInput {
       321 |   name: String
       322 |   age: Float
       323 |   languages: [UserLanguagesInput]
       324 |   contacts: UserContactsInput
       325 |   gender: EnumUserGender
       326 |   address: UserAddressInput
       327 |
       328 |   """
       329 |   Some dynamic data
       330 |   """
       331 |   someMixed: JSON
       332 |   salaryDecimal: BSONDecimal
       333 |   _id: MongoID
       334 |   _ids: [MongoID]
       335 |
       336 |   """
       337 |   List of *indexed* fields that can be filtered via operators.
       338 |   """
       339 |   _operators: OperatorsFilterUpdateManyUserInput
       340 |   OR: [FilterUpdateManyUserInput!]
       341 |   AND: [FilterUpdateManyUserInput!]
       342 | }
       343 |
       344 | input FilterUpdateOneUserInput {
       345 |   name: String
       346 |   age: Float
       347 |   languages: [UserLanguagesInput]
       348 |   contacts: UserContactsInput
       349 |   gender: EnumUserGender
       350 |   address: UserAddressInput
       351 |
       352 |   """
       353 |   Some dynamic data
       354 |   """
       355 |   someMixed: JSON
       356 |   salaryDecimal: BSONDecimal
       357 |   _id: MongoID
       358 |   _ids: [MongoID]
       359 |
       360 |   """
       361 |   List of *indexed* fields that can be filtered via operators.
       362 |   """
       363 |   _operators: OperatorsFilterUpdateOneUserInput
       364 |   OR: [FilterUpdateOneUserInput!]
       365 |   AND: [FilterUpdateOneUserInput!]
       366 | }
       367 |
       368 | input FilterUserInput {
       369 |   name: String
       370 |   age: Float
       371 |   languages: [UserLanguagesInput]
       372 |   contacts: UserContactsInput
       373 |   gender: EnumUserGender
       374 |   address: UserAddressInput
       375 |
       376 |   """
       377 |   Some dynamic data
       378 |   """
       379 |   someMixed: JSON
       380 |   salaryDecimal: BSONDecimal
       381 |   _id: MongoID
       382 |   _ids: [MongoID]
       383 |
       384 |   """
       385 |   List of *indexed* fields that can be filtered via operators.
       386 |   """
       387 |   _operators: OperatorsFilterUserInput
       388 |   OR: [FilterUserInput!]
       389 |   AND: [FilterUserInput!]
       390 | }
       391 |
       392 | input GenderOperatorsFilterFindManyUserInput {
       393 |   gt: EnumUserGender
       394 |   gte: EnumUserGender
       395 |   lt: EnumUserGender
       396 |   lte: EnumUserGender
       397 |   ne: EnumUserGender
       398 |   in: [EnumUserGender]
       399 |   nin: [EnumUserGender]
       400 | }
       401 |
       402 | input GenderOperatorsFilterFindOneUserInput {
       403 |   gt: EnumUserGender
       404 |   gte: EnumUserGender
       405 |   lt: EnumUserGender
       406 |   lte: EnumUserGender
       407 |   ne: EnumUserGender
       408 |   in: [EnumUserGender]
       409 |   nin: [EnumUserGender]
       410 | }
       411 |
       412 | input GenderOperatorsFilterRemoveManyUserInput {
       413 |   gt: EnumUserGender
       414 |   gte: EnumUserGender
       415 |   lt: EnumUserGender
       416 |   lte: EnumUserGender
       417 |   ne: EnumUserGender
       418 |   in: [EnumUserGender]
       419 |   nin: [EnumUserGender]
       420 | }
       421 |
       422 | input GenderOperatorsFilterRemoveOneUserInput {
       423 |   gt: EnumUserGender
       424 |   gte: EnumUserGender
       425 |   lt: EnumUserGender
       426 |   lte: EnumUserGender
       427 |   ne: EnumUserGender
       428 |   in: [EnumUserGender]
       429 |   nin: [EnumUserGender]
       430 | }
       431 |
       432 | input GenderOperatorsFilterUpdateManyUserInput {
       433 |   gt: EnumUserGender
       434 |   gte: EnumUserGender
       435 |   lt: EnumUserGender
       436 |   lte: EnumUserGender
       437 |   ne: EnumUserGender
       438 |   in: [EnumUserGender]
       439 |   nin: [EnumUserGender]
       440 | }
       441 |
       442 | input GenderOperatorsFilterUpdateOneUserInput {
       443 |   gt: EnumUserGender
       444 |   gte: EnumUserGender
       445 |   lt: EnumUserGender
       446 |   lte: EnumUserGender
       447 |   ne: EnumUserGender
       448 |   in: [EnumUserGender]
       449 |   nin: [EnumUserGender]
       450 | }
       451 |
       452 | input GenderOperatorsFilterUserInput {
       453 |   gt: EnumUserGender
       454 |   gte: EnumUserGender
       455 |   lt: EnumUserGender
       456 |   lte: EnumUserGender
       457 |   ne: EnumUserGender
       458 |   in: [EnumUserGender]
       459 |   nin: [EnumUserGender]
       460 | }
       461 |
       462 | input GeoDistance {
       463 |   lng: Float!
       464 |   lat: Float!
       465 |   distance: Float!
       466 | }
       467 |
       468 | """
       469 | The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
       470 | """
       471 | scalar JSON
       472 |
       473 | """
       474 | The \`ID\` scalar type represents a unique MongoDB identifier in collection.
       475 | MongoDB by default use 12-byte ObjectId value
       476 | (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB
       477 | also may accepts string or integer as correct values for _id field.
       478 | """
       479 | scalar MongoID
       480 |
       481 | type Mutation {
       482 |   """
       483 |   Create one document with mongoose defaults, setters, hooks and validation
       484 |   """
       485 |   userCreate(record: CreateOneUserInput!): CreateOneUserPayload
       486 |
       487 |   """
       488 |   Creates Many documents with mongoose defaults, setters, hooks and validation
       489 |   """
       490 |   userCreateMany(records: [CreateManyUserInput!]!): CreateManyUserPayload
       491 |   """
       492 |   Update one document: 1) Retrieve one document by findById. 2) Apply updates to
       493 |   mongoose document. 3) Mongoose applies defaults, setters, hooks and
       494 |   validation. 4) And save it.
       495 |   """
       496 |   userUpdateById(record: UpdateByIdUserInput!): UpdateByIdUserPayload
       497 |   """
       498 |   Update one document: 1) Retrieve one document via findOne. 2) Apply updates to
       499 |   mongoose document. 3) Mongoose applies defaults, setters, hooks and
       500 |   validation. 4) And save it.
       501 |   """
       502 |   userUpdateOne(
       503 |     record: UpdateOneUserInput!
       504 |     """
       505 |     Filter by fields
       506 |     """
       507 |     filter: FilterUpdateOneUserInput
       508 |     sort: SortUpdateOneUserInput
       509 |     skip: Int
       510 |   ): UpdateOneUserPayload
       511 |   """
       512 |   Update many documents without returning them: Use Query.update mongoose
       513 |   method. Do not apply mongoose defaults, setters, hooks and validation.
       514 |   """
       515 |   userUpdateMany(
       516 |     record: UpdateManyUserInput!
       517 |     """
       518 |     Filter by fields
       519 |     """
       520 |     filter: FilterUpdateManyUserInput
       521 |     sort: SortUpdateManyUserInput
       522 |     skip: Int
       523 |     limit: Int = 1000
       524 |   ): UpdateManyUserPayload
       525 |   """
       526 |   Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document.
       527 |   """
       528 |   userRemoveById(_id: MongoID!): RemoveByIdUserPayload
       529 |
       530 |   """
       531 |   Remove one document: 1) Remove with hooks via findOneAndRemove. 2) Return removed document.
       532 |   """
       533 |   userRemoveOne(
       534 |     """
       535 |     Filter by fields
       536 |     """
       537 |     filter: FilterRemoveOneUserInput
       538 |     sort: SortRemoveOneUserInput
       539 |   ): RemoveOneUserPayload
       540 |
       541 |   """
       542 |   Remove many documents without returning them: Use Query.remove mongoose
       543 |   method. Do not apply mongoose defaults, setters, hooks and validation.
       544 |   """
       545 |   userRemoveMany(
       546 |     """
       547 |     Filter by fields
       548 |     """
       549 |     filter: FilterRemoveManyUserInput!
       550 |   ): RemoveManyUserPayload
       551 | }
       552 | input NameOperatorsFilterFindManyUserInput {
       553 |   gt: String
       554 |   gte: String
       555 |   lt: String
       556 |   lte: String
       557 |   ne: String
       558 |   in: [String]
       559 |   nin: [String]
       560 | }
       561 | input NameOperatorsFilterFindOneUserInput {
       562 |   gt: String
       563 |   gte: String
       564 |   lt: String
       565 |   lte: String
       566 |   ne: String
       567 |   in: [String]
       568 |   nin: [String]
       569 | }
       570 | input NameOperatorsFilterRemoveManyUserInput {
       571 |   gt: String
       572 |   gte: String
       573 |   lt: String
       574 |   lte: String
       575 |   ne: String
       576 |   in: [String]
       577 |   nin: [String]
       578 | }
       579 | input NameOperatorsFilterRemoveOneUserInput {
       580 |   gt: String
       581 |   gte: String
       582 |   lt: String
       583 |   lte: String
       584 |   ne: String
       585 |   in: [String]
       586 |   nin: [String]
       587 | }
       588 | input NameOperatorsFilterUpdateManyUserInput {
       589 |   gt: String
       590 |   gte: String
       591 |   lt: String
       592 |   lte: String
       593 |   ne: String
       594 |   in: [String]
       595 |   nin: [String]
       596 | }
       597 | input NameOperatorsFilterUpdateOneUserInput {
       598 |   gt: String
       599 |   gte: String
       600 |   lt: String
       601 |   lte: String
       602 |   ne: String
       603 |   in: [String]
       604 |   nin: [String]
       605 | }
       606 | input NameOperatorsFilterUserInput {
       607 |   gt: String
       608 |   gte: String
       609 |   lt: String
       610 |   lte: String
       611 |   ne: String
       612 |   in: [String]
       613 |   nin: [String]
       614 | }
       615 | """
       616 | For performance reason this type contains only *indexed* fields.
       617 | """
       618 | input OperatorsFilterFindManyUserInput {
       619 |   name: NameOperatorsFilterFindManyUserInput
       620 |   age: AgeOperatorsFilterFindManyUserInput
       621 |   gender: GenderOperatorsFilterFindManyUserInput
       622 |   salaryDecimal: SalaryDecimalOperatorsFilterFindManyUserInput
       623 |   _id: _idOperatorsFilterFindManyUserInput
       624 | }
       625 | """
       626 | For performance reason this type contains only *indexed* fields.
       627 | """
       628 | input OperatorsFilterFindOneUserInput {
       629 |   name: NameOperatorsFilterFindOneUserInput
       630 |   age: AgeOperatorsFilterFindOneUserInput
       631 |   gender: GenderOperatorsFilterFindOneUserInput
       632 |   salaryDecimal: SalaryDecimalOperatorsFilterFindOneUserInput
       633 |   _id: _idOperatorsFilterFindOneUserInput
       634 | }
       635 | """
       636 | For performance reason this type contains only *indexed* fields.
       637 | """
       638 | input OperatorsFilterRemoveManyUserInput {
       639 |   name: NameOperatorsFilterRemoveManyUserInput
       640 |   age: AgeOperatorsFilterRemoveManyUserInput
       641 |   gender: GenderOperatorsFilterRemoveManyUserInput
       642 |   salaryDecimal: SalaryDecimalOperatorsFilterRemoveManyUserInput
       643 |   _id: _idOperatorsFilterRemoveManyUserInput
       644 | }
       645 | """
       646 | For performance reason this type contains only *indexed* fields.
       647 | """
       648 | input OperatorsFilterRemoveOneUserInput {
       649 |   name: NameOperatorsFilterRemoveOneUserInput
       650 |   age: AgeOperatorsFilterRemoveOneUserInput
       651 |   gender: GenderOperatorsFilterRemoveOneUserInput
       652 |   salaryDecimal: SalaryDecimalOperatorsFilterRemoveOneUserInput
       653 |   _id: _idOperatorsFilterRemoveOneUserInput
       654 | }
       655 | """
       656 | For performance reason this type contains only *indexed* fields.
       657 | """
       658 | input OperatorsFilterUpdateManyUserInput {
       659 |   name: NameOperatorsFilterUpdateManyUserInput
       660 |   age: AgeOperatorsFilterUpdateManyUserInput
       661 |   gender: GenderOperatorsFilterUpdateManyUserInput
       662 |   salaryDecimal: SalaryDecimalOperatorsFilterUpdateManyUserInput
       663 |   _id: _idOperatorsFilterUpdateManyUserInput
       664 | }
       665 | """
       666 | For performance reason this type contains only *indexed* fields.
       667 | """
       668 | input OperatorsFilterUpdateOneUserInput {
       669 |   name: NameOperatorsFilterUpdateOneUserInput
       670 |   age: AgeOperatorsFilterUpdateOneUserInput
       671 |   gender: GenderOperatorsFilterUpdateOneUserInput
       672 |   salaryDecimal: SalaryDecimalOperatorsFilterUpdateOneUserInput
       673 |   _id: _idOperatorsFilterUpdateOneUserInput
       674 | }
       675 | """
       676 | For performance reason this type contains only *indexed* fields.
       677 | """
       678 | input OperatorsFilterUserInput {
       679 |   name: NameOperatorsFilterUserInput
       680 |   age: AgeOperatorsFilterUserInput
       681 |   gender: GenderOperatorsFilterUserInput
       682 |   salaryDecimal: SalaryDecimalOperatorsFilterUserInput
       683 |   _id: _idOperatorsFilterUserInput
       684 | }
       685 | """
       686 | Information about pagination in a connection.
       687 | """
       688 | type PageInfo {
       689 |   """
       690 |   When paginating forwards, are there more items?
       691 |   """
       692 |   hasNextPage: Boolean!
       693 |   """
       694 |   When paginating backwards, are there more items?
       695 |   """
       696 |   hasPreviousPage: Boolean!
       697 |   """
       698 |   When paginating backwards, the cursor to continue.
       699 |   """
       700 |   startCursor: String
       701 |   """
       702 |   When paginating forwards, the cursor to continue.
       703 |   """
       704 |   endCursor: String
       705 | }
       706 | type PaginationInfo {
       707 |   currentPage: Int!
       708 |   perPage: Int!
       709 |   pageCount: Int
       710 |   itemCount: Int
       711 |   hasNextPage: Boolean
       712 |   hasPreviousPage: Boolean
       713 | }
       714 | type Query {
       715 |   userById(_id: MongoID!): User
       716 |   userByIds(_ids: [MongoID]!, limit: Int = 1000, sort: SortFindByIdsUserInput): [User]
       717 |   userOne(
       718 |     """
       719 |     Filter by fields
       720 |     """
       721 |     filter: FilterFindOneUserInput
       722 |     skip: Int
       723 |     sort: SortFindOneUserInput
       724 |   ): User
       725 |   userMany(
       726 |     """
       727 |     Filter by fields
       728 |     """
       729 |     filter: FilterFindManyUserInput
       730 |     skip: Int
       731 |     limit: Int = 1000
       732 |     sort: SortFindManyUserInput
       733 |   ): [User]
       734 |   userTotal(
       735 |     """
       736 |     Filter by fields
       737 |     """
       738 |     filter: FilterUserInput
       739 |   ): Int
       740 |   userConnection(
       741 |     """
       742 |     Forward pagination argument for returning at most first edges
       743 |     """
       744 |     first: Int
       745 |     """
       746 |     Forward pagination argument for returning at most first edges
       747 |     """
       748 |     after: String
       749 |     """
       750 |     Backward pagination argument for returning at most last edges
       751 |     """
       752 |     last: Int
       753 |     """
       754 |     Backward pagination argument for returning at most last edges
       755 |     """
       756 |     before: String
       757 |     """
       758 |     Filter by fields
       759 |     """
       760 |     filter: FilterFindManyUserInput
       761 |     """
       762 |     Sort argument for data ordering
       763 |     """
       764 |     sort: SortConnectionUserEnum = _ID_DESC
       765 |   ): UserConnection
       766 |   userPagination(
       767 |     """
       768 |     Page number for displaying
       769 |     """
       770 |     page: Int
       771 |     perPage: Int = 20
       772 |     """
       773 |     Filter by fields
       774 |     """
       775 |     filter: FilterFindManyUserInput
       776 |     sort: SortFindManyUserInput
       777 |   ): UserPagination
       778 | }
       779 | type RemoveByIdUserPayload {
       780 |   """
       781 |   Removed document ID
       782 |   """
       783 |   recordId: MongoID
       784 |   """
       785 |   Removed document
       786 |   """
       787 |   record: User
       788 | }
       789 | type RemoveManyUserPayload {
       790 |   """
       791 |   Affected documents number
       792 |   """
       793 |   numAffected: Int
       794 | }
       795 | type RemoveOneUserPayload {
       796 |   """
       797 |   Removed document ID
       798 |   """
       799 |   recordId: MongoID
       800 |   """
       801 |   Removed document
       802 |   """
       803 |   record: User
       804 | }
       805 | input SalaryDecimalOperatorsFilterFindManyUserInput {
       806 |   gt: BSONDecimal
       807 |   gte: BSONDecimal
       808 |   lt: BSONDecimal
       809 |   lte: BSONDecimal
       810 |   ne: BSONDecimal
       811 |   in: [BSONDecimal]
       812 |   nin: [BSONDecimal]
       813 | }
       814 | input SalaryDecimalOperatorsFilterFindOneUserInput {
       815 |   gt: BSONDecimal
       816 |   gte: BSONDecimal
       817 |   lt: BSONDecimal
       818 |   lte: BSONDecimal
       819 |   ne: BSONDecimal
       820 |   in: [BSONDecimal]
       821 |   nin: [BSONDecimal]
       822 | }
       823 | input SalaryDecimalOperatorsFilterRemoveManyUserInput {
       824 |   gt: BSONDecimal
       825 |   gte: BSONDecimal
       826 |   lt: BSONDecimal
       827 |   lte: BSONDecimal
       828 |   ne: BSONDecimal
       829 |   in: [BSONDecimal]
       830 |   nin: [BSONDecimal]
       831 | }
       832 | input SalaryDecimalOperatorsFilterRemoveOneUserInput {
       833 |   gt: BSONDecimal
       834 |   gte: BSONDecimal
       835 |   lt: BSONDecimal
       836 |   lte: BSONDecimal
       837 |   ne: BSONDecimal
       838 |   in: [BSONDecimal]
       839 |   nin: [BSONDecimal]
       840 | }
       841 | input SalaryDecimalOperatorsFilterUpdateManyUserInput {
       842 |   gt: BSONDecimal
       843 |   gte: BSONDecimal
       844 |   lt: BSONDecimal
       845 |   lte: BSONDecimal
       846 |   ne: BSONDecimal
       847 |   in: [BSONDecimal]
       848 |   nin: [BSONDecimal]
       849 | }
       850 | input SalaryDecimalOperatorsFilterUpdateOneUserInput {
       851 |   gt: BSONDecimal
       852 |   gte: BSONDecimal
       853 |   lt: BSONDecimal
       854 |   lte: BSONDecimal
       855 |   ne: BSONDecimal
       856 |   in: [BSONDecimal]
       857 |   nin: [BSONDecimal]
       858 | }
       859 | input SalaryDecimalOperatorsFilterUserInput {
       860 |   gt: BSONDecimal
       861 |   gte: BSONDecimal
       862 |   lt: BSONDecimal
       863 |   lte: BSONDecimal
       864 |   ne: BSONDecimal
       865 |   in: [BSONDecimal]
       866 |   nin: [BSONDecimal]
       867 | }
       868 | enum SortConnectionUserEnum {
       869 |   _ID_DESC
       870 |   _ID_ASC
       871 | }
       872 | enum SortFindByIdsUserInput {
       873 |   _ID_ASC
       874 |   _ID_DESC
       875 |   NAME_ASC
       876 |   NAME_DESC
       877 |   AGE_ASC
       878 |   AGE_DESC
       879 |   SALARYDECIMAL_ASC
       880 |   SALARYDECIMAL_DESC
       881 |   GENDER_ASC
       882 |   GENDER_DESC
       883 |   GENDER__AGE_ASC
       884 |   GENDER__AGE_DESC
       885 | }
       886 | enum SortFindManyUserInput {
       887 |   _ID_ASC
       888 |   _ID_DESC
       889 |   NAME_ASC
       890 |   NAME_DESC
       891 |   AGE_ASC
       892 |   AGE_DESC
       893 |   SALARYDECIMAL_ASC
       894 |   SALARYDECIMAL_DESC
       895 |   GENDER_ASC
       896 |   GENDER_DESC
       897 |   GENDER__AGE_ASC
       898 |   GENDER__AGE_DESC
       899 | }
       900 | enum SortFindOneUserInput {
       901 |   _ID_ASC
       902 |   _ID_DESC
       903 |   NAME_ASC
       904 |   NAME_DESC
       905 |   AGE_ASC
       906 |   AGE_DESC
       907 |   SALARYDECIMAL_ASC
       908 |   SALARYDECIMAL_DESC
       909 |   GENDER_ASC
       910 |   GENDER_DESC
       911 |   GENDER__AGE_ASC
       912 |   GENDER__AGE_DESC
       913 | }
       914 | enum SortRemoveOneUserInput {
       915 |   _ID_ASC
       916 |   _ID_DESC
       917 |   NAME_ASC
       918 |   NAME_DESC
       919 |   AGE_ASC
       920 |   AGE_DESC
       921 |   SALARYDECIMAL_ASC
       922 |   SALARYDECIMAL_DESC
       923 |   GENDER_ASC
       924 |   GENDER_DESC
       925 |   GENDER__AGE_ASC
       926 |   GENDER__AGE_DESC
       927 | }
       928 | enum SortUpdateManyUserInput {
       929 |   _ID_ASC
       930 |   _ID_DESC
       931 |   NAME_ASC
       932 |   NAME_DESC
       933 |   AGE_ASC
       934 |   AGE_DESC
       935 |   SALARYDECIMAL_ASC
       936 |   SALARYDECIMAL_DESC
       937 |   GENDER_ASC
       938 |   GENDER_DESC
       939 |   GENDER__AGE_ASC
       940 |   GENDER__AGE_DESC
       941 | }
       942 | enum SortUpdateOneUserInput {
       943 |   _ID_ASC
       944 |   _ID_DESC
       945 |   NAME_ASC
       946 |   NAME_DESC
       947 |   AGE_ASC
       948 |   AGE_DESC
       949 |   SALARYDECIMAL_ASC
       950 |   SALARYDECIMAL_DESC
       951 |   GENDER_ASC
       952 |   GENDER_DESC
       953 |   GENDER__AGE_ASC
       954 |   GENDER__AGE_DESC
       955 | }
       956 | input UpdateByIdUserInput {
       957 |   name: String
       958 |   age: Float
       959 |   languages: [UserLanguagesInput]
       960 |   contacts: UserContactsInput
       961 |   gender: EnumUserGender
       962 |   address: UserAddressInput
       963 |   """
       964 |   Some dynamic data
       965 |   """
       966 |   someMixed: JSON
       967 |   salaryDecimal: BSONDecimal
       968 |   _id: MongoID!
       969 | }
       970 | type UpdateByIdUserPayload {
       971 |   """
       972 |   Updated document ID
       973 |   """
       974 |   recordId: MongoID
       975 |   """
       976 |   Updated document
       977 |   """
       978 |   record: User
       979 | }
       980 | input UpdateManyUserInput {
       981 |   name: String
       982 |   age: Float
       983 |   languages: [UserLanguagesInput]
       984 |   contacts: UserContactsInput
       985 |   gender: EnumUserGender
       986 |   address: UserAddressInput
       987 |   """
       988 |   Some dynamic data
       989 |   """
       990 |   someMixed: JSON
       991 |   salaryDecimal: BSONDecimal
       992 | }
       993 | type UpdateManyUserPayload {
       994 |   """
       995 |   Affected documents number
       996 |   """
       997 |   numAffected: Int
       998 | }
       999 | input UpdateOneUserInput {
      1000 |   name: String
      1001 |   age: Float
      1002 |   languages: [UserLanguagesInput]
      1003 |   contacts: UserContactsInput
      1004 |   gender: EnumUserGender
      1005 |   address: UserAddressInput
      1006 |   """
      1007 |   Some dynamic data
      1008 |   """
      1009 |   someMixed: JSON
      1010 |   salaryDecimal: BSONDecimal
      1011 | }
      1012 | type UpdateOneUserPayload {
      1013 |   """
      1014 |   Updated document ID
      1015 |   """
      1016 |   recordId: MongoID
      1017 |   """
      1018 |   Updated document
      1019 |   """
      1020 |   record: User
      1021 | }
      1022 | type User {
      1023 |   name: String
      1024 |   age: Float
      1025 |   languages: [UserLanguages]
      1026 |   contacts: UserContacts
      1027 |   gender: EnumUserGender
      1028 |   address: UserAddress
      1029 |   """
      1030 |   Some dynamic data
      1031 |   """
      1032 |   someMixed: JSON
      1033 |   salaryDecimal: BSONDecimal
      1034 |   _id: MongoID!
      1035 |   virtualField(lang: String): String
      1036 | }
      1037 | type UserAddress {
      1038 |   street: String
      1039 |   geo: [Float]
      1040 |   _id: MongoID
      1041 | }
      1042 | input UserAddressInput {
      1043 |   street: String
      1044 |   geo: [Float]
      1045 |   _id: MongoID
      1046 | }
      1047 | """
      1048 | A connection to a list of items.
      1049 | """
      1050 | type UserConnection {
      1051 |   """
      1052 |   Total object count.
      1053 |   """
      1054 |   count: Int!
      1055 |   """
      1056 |   Information to aid in pagination.
      1057 |   """
      1058 |   pageInfo: PageInfo!
      1059 |   """
      1060 |   Information to aid in pagination.
      1061 |   """
      1062 |   edges: [UserEdge!]!
      1063 | }
      1064 | type UserContacts {
      1065 |   email: String
      1066 |   phones: [String]
      1067 | }
      1068 | input UserContactsInput {
      1069 |   email: String
      1070 |   phones: [String]
      1071 | }
      1072 | """
      1073 | An edge in a connection.
      1074 | """
      1075 | type UserEdge {
      1076 |   """
      1077 |   The item at the end of the edge
      1078 |   """
      1079 |   node: User!
      1080 |   """
      1081 |   A cursor for use in pagination
      1082 |   """
      1083 |   cursor: String!
      1084 | }
      1085 | type UserLanguages {
      1086 |   language: String
      1087 |   skill: EnumUserLanguagesSkill
      1088 | }
      1089 | input UserLanguagesInput {
      1090 |   language: String
      1091 |   skill: EnumUserLanguagesSkill
      1092 | }
      1093 | """
      1094 | List of items with pagination.
      1095 | """
      1096 | type UserPagination {
      1097 |   """
      1098 |   Total object count.
      1099 |   """
      1100 |   count: Int
      1101 |   """
      1102 |   Array of objects.
      1103 |   """
      1104 |   items: [User]
      1105 |   """
      1106 |   Information to aid in pagination.
      1107 |   """
      1108 |   pageInfo: PaginationInfo!
      1109 | }

#### ⚙️ Options

    {
      "allowLeadingUnderscore": true,
      "types": "PascalCase",
      "InputValueDefinition": "camelCase",
      "EnumValueDefinition": "UPPER_CASE",
      "FragmentDefinition": "PascalCase",
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/27

    > 1 | input _idOperatorsFilterFindManyUserInput {
        |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterFindManyUserInput" should be in PascalCase format
      2 |   gt: MongoID

#### ❌ Error 2/27

      10 |
    > 11 | input _idOperatorsFilterFindOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterFindOneUserInput" should be in PascalCase format
      12 |   gt: MongoID

#### ❌ Error 3/27

      20 |
    > 21 | input _idOperatorsFilterRemoveManyUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterRemoveManyUserInput" should be in PascalCase format
      22 |   gt: MongoID

#### ❌ Error 4/27

      30 |
    > 31 | input _idOperatorsFilterRemoveOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterRemoveOneUserInput" should be in PascalCase format
      32 |   gt: MongoID

#### ❌ Error 5/27

      40 |
    > 41 | input _idOperatorsFilterUpdateManyUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUpdateManyUserInput" should be in PascalCase format
      42 |   gt: MongoID

#### ❌ Error 6/27

      50 |
    > 51 | input _idOperatorsFilterUpdateOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUpdateOneUserInput" should be in PascalCase format
      52 |   gt: MongoID

#### ❌ Error 7/27

      60 |
    > 61 | input _idOperatorsFilterUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUserInput" should be in PascalCase format
      62 |   gt: MongoID

#### ❌ Error 8/27

      207 | enum EnumUserGender {
    > 208 |   male
          |   ^^^^ Enumeration value "male" should be in UPPER_CASE format
      209 |   female

#### ❌ Error 9/27

      208 |   male
    > 209 |   female
          |   ^^^^^^ Enumeration value "female" should be in UPPER_CASE format
      210 |   ladyboy

#### ❌ Error 10/27

      209 |   female
    > 210 |   ladyboy
          |   ^^^^^^^ Enumeration value "ladyboy" should be in UPPER_CASE format
      211 | }

#### ❌ Error 11/27

      213 | enum EnumUserLanguagesSkill {
    > 214 |   basic
          |   ^^^^^ Enumeration value "basic" should be in UPPER_CASE format
      215 |   fluent

#### ❌ Error 12/27

      214 |   basic
    > 215 |   fluent
          |   ^^^^^^ Enumeration value "fluent" should be in UPPER_CASE format
      216 |   native

#### ❌ Error 13/27

      215 |   fluent
    > 216 |   native
          |   ^^^^^^ Enumeration value "native" should be in UPPER_CASE format
      217 | }

#### ❌ Error 14/27

      238 |   _operators: OperatorsFilterFindManyUserInput
    > 239 |   OR: [FilterFindManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      240 |   AND: [FilterFindManyUserInput!]

#### ❌ Error 15/27

      239 |   OR: [FilterFindManyUserInput!]
    > 240 |   AND: [FilterFindManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      241 |

#### ❌ Error 16/27

      267 |   _operators: OperatorsFilterFindOneUserInput
    > 268 |   OR: [FilterFindOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      269 |   AND: [FilterFindOneUserInput!]

#### ❌ Error 17/27

      268 |   OR: [FilterFindOneUserInput!]
    > 269 |   AND: [FilterFindOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      270 | }

#### ❌ Error 18/27

      291 |   _operators: OperatorsFilterRemoveManyUserInput
    > 292 |   OR: [FilterRemoveManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      293 |   AND: [FilterRemoveManyUserInput!]

#### ❌ Error 19/27

      292 |   OR: [FilterRemoveManyUserInput!]
    > 293 |   AND: [FilterRemoveManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      294 | }

#### ❌ Error 20/27

      315 |   _operators: OperatorsFilterRemoveOneUserInput
    > 316 |   OR: [FilterRemoveOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      317 |   AND: [FilterRemoveOneUserInput!]

#### ❌ Error 21/27

      316 |   OR: [FilterRemoveOneUserInput!]
    > 317 |   AND: [FilterRemoveOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      318 | }

#### ❌ Error 22/27

      339 |   _operators: OperatorsFilterUpdateManyUserInput
    > 340 |   OR: [FilterUpdateManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      341 |   AND: [FilterUpdateManyUserInput!]

#### ❌ Error 23/27

      340 |   OR: [FilterUpdateManyUserInput!]
    > 341 |   AND: [FilterUpdateManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      342 | }

#### ❌ Error 24/27

      363 |   _operators: OperatorsFilterUpdateOneUserInput
    > 364 |   OR: [FilterUpdateOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      365 |   AND: [FilterUpdateOneUserInput!]

#### ❌ Error 25/27

      364 |   OR: [FilterUpdateOneUserInput!]
    > 365 |   AND: [FilterUpdateOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      366 | }

#### ❌ Error 26/27

      387 |   _operators: OperatorsFilterUserInput
    > 388 |   OR: [FilterUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      389 |   AND: [FilterUserInput!]

#### ❌ Error 27/27

      388 |   OR: [FilterUserInput!]
    > 389 |   AND: [FilterUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      390 | }
`;

exports[`naming-convention > invalid > operations-recommended config 1`] = `
#### ⌨️ Code

       1 |         query TestQuery { test }
       2 |         query QueryTest { test }
       3 |         query GetQuery { test }
       4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
       5 |
       6 |         mutation TestMutation { test }
       7 |         mutation MutationTest { test }
       8 |
       9 |         subscription TestSubscription { test }
      10 |         subscription SubscriptionTest { test }
      11 |
      12 |         fragment TestFragment on Test { id }
      13 |         fragment FragmentTest on Test { id }

#### ⚙️ Options

    {
      "VariableDefinition": "camelCase",
      "OperationDefinition": {
        "style": "PascalCase",
        "forbiddenPrefixes": [
          "Query",
          "Mutation",
          "Subscription",
          "Get"
        ],
        "forbiddenSuffixes": [
          "Query",
          "Mutation",
          "Subscription"
        ]
      },
      "FragmentDefinition": {
        "style": "PascalCase",
        "forbiddenPrefixes": [
          "Fragment"
        ],
        "forbiddenSuffixes": [
          "Fragment"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/9

    > 1 |         query TestQuery { test }
        |               ^^^^^^^^^ Operation "TestQuery" should not have "Query" suffix
      2 |         query QueryTest { test }

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query Test { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 2/9

      1 |         query TestQuery { test }
    > 2 |         query QueryTest { test }
        |               ^^^^^^^^^ Operation "QueryTest" should not have "Query" prefix
      3 |         query GetQuery { test }

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query Test { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 3/9

      2 |         query QueryTest { test }
    > 3 |         query GetQuery { test }
        |               ^^^^^^^^ Operation "GetQuery" should not have "Get" prefix
      4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }

#### 💡 Suggestion: Rename to \`Query\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query Query { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 4/9

      5 |
    > 6 |         mutation TestMutation { test }
        |                  ^^^^^^^^^^^^ Operation "TestMutation" should not have "Mutation" suffix
      7 |         mutation MutationTest { test }

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation Test { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 5/9

      6 |         mutation TestMutation { test }
    > 7 |         mutation MutationTest { test }
        |                  ^^^^^^^^^^^^ Operation "MutationTest" should not have "Mutation" prefix
      8 |

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation Test { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 6/9

       8 |
    >  9 |         subscription TestSubscription { test }
         |                      ^^^^^^^^^^^^^^^^ Operation "TestSubscription" should not have "Subscription" suffix
      10 |         subscription SubscriptionTest { test }

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription Test { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 7/9

       9 |         subscription TestSubscription { test }
    > 10 |         subscription SubscriptionTest { test }
         |                      ^^^^^^^^^^^^^^^^ Operation "SubscriptionTest" should not have "Subscription" prefix
      11 |

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription Test { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 8/9

      11 |
    > 12 |         fragment TestFragment on Test { id }
         |                  ^^^^^^^^^^^^ Fragment "TestFragment" should not have "Fragment" suffix
      13 |         fragment FragmentTest on Test { id }

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment Test on Test { id }
    13 |         fragment FragmentTest on Test { id }

#### ❌ Error 9/9

      12 |         fragment TestFragment on Test { id }
    > 13 |         fragment FragmentTest on Test { id }
         |                  ^^^^^^^^^^^^ Fragment "FragmentTest" should not have "Fragment" prefix

#### 💡 Suggestion: Rename to \`Test\`

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |
     6 |         mutation TestMutation { test }
     7 |         mutation MutationTest { test }
     8 |
     9 |         subscription TestSubscription { test }
    10 |         subscription SubscriptionTest { test }
    11 |
    12 |         fragment TestFragment on Test { id }
    13 |         fragment Test on Test { id }
`;

exports[`naming-convention > invalid > schema-recommended config 1`] = `
#### ⌨️ Code

       1 |         type Query {
       2 |           fieldQuery: ID
       3 |           queryField: ID
       4 |           getField: ID
       5 |         }
       6 |
       7 |         type Mutation {
       8 |           fieldMutation: ID
       9 |           mutationField: ID
      10 |         }
      11 |
      12 |         type Subscription {
      13 |           fieldSubscription: ID
      14 |           subscriptionField: ID
      15 |         }
      16 |
      17 |         enum TestEnum
      18 |         extend enum EnumTest {
      19 |           A
      20 |         }
      21 |
      22 |         interface TestInterface
      23 |         extend interface InterfaceTest {
      24 |           id: ID
      25 |         }
      26 |
      27 |         union TestUnion
      28 |         extend union UnionTest = TestInterface
      29 |
      30 |         type TestType
      31 |         extend type TypeTest {
      32 |           id: ID
      33 |         }

#### ⚙️ Options

    {
      "types": "PascalCase",
      "FieldDefinition": "camelCase",
      "InputValueDefinition": "camelCase",
      "Argument": "camelCase",
      "DirectiveDefinition": "camelCase",
      "EnumValueDefinition": "UPPER_CASE",
      "FieldDefinition[parent.name.value=Query]": {
        "forbiddenPrefixes": [
          "query",
          "get"
        ],
        "forbiddenSuffixes": [
          "Query"
        ]
      },
      "FieldDefinition[parent.name.value=Mutation]": {
        "forbiddenPrefixes": [
          "mutation"
        ],
        "forbiddenSuffixes": [
          "Mutation"
        ]
      },
      "FieldDefinition[parent.name.value=Subscription]": {
        "forbiddenPrefixes": [
          "subscription"
        ],
        "forbiddenSuffixes": [
          "Subscription"
        ]
      },
      "EnumTypeDefinition,EnumTypeExtension": {
        "forbiddenPrefixes": [
          "Enum"
        ],
        "forbiddenSuffixes": [
          "Enum"
        ]
      },
      "InterfaceTypeDefinition,InterfaceTypeExtension": {
        "forbiddenPrefixes": [
          "Interface"
        ],
        "forbiddenSuffixes": [
          "Interface"
        ]
      },
      "UnionTypeDefinition,UnionTypeExtension": {
        "forbiddenPrefixes": [
          "Union"
        ],
        "forbiddenSuffixes": [
          "Union"
        ]
      },
      "ObjectTypeDefinition,ObjectTypeExtension": {
        "forbiddenPrefixes": [
          "Type"
        ],
        "forbiddenSuffixes": [
          "Type"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/15

      1 |         type Query {
    > 2 |           fieldQuery: ID
        |           ^^^^^^^^^^ Field "fieldQuery" should not have "Query" suffix
      3 |           queryField: ID

#### 💡 Suggestion: Rename to \`field\`

     1 |         type Query {
     2 |           field: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 2/15

      2 |           fieldQuery: ID
    > 3 |           queryField: ID
        |           ^^^^^^^^^^ Field "queryField" should not have "query" prefix
      4 |           getField: ID

#### 💡 Suggestion: Rename to \`Field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           Field: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 3/15

      3 |           queryField: ID
    > 4 |           getField: ID
        |           ^^^^^^^^ Field "getField" should not have "get" prefix
      5 |         }

#### 💡 Suggestion: Rename to \`Field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           Field: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 4/15

      7 |         type Mutation {
    > 8 |           fieldMutation: ID
        |           ^^^^^^^^^^^^^ Field "fieldMutation" should not have "Mutation" suffix
      9 |           mutationField: ID

#### 💡 Suggestion: Rename to \`field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           field: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 5/15

       8 |           fieldMutation: ID
    >  9 |           mutationField: ID
         |           ^^^^^^^^^^^^^ Field "mutationField" should not have "mutation" prefix
      10 |         }

#### 💡 Suggestion: Rename to \`Field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           Field: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 6/15

      12 |         type Subscription {
    > 13 |           fieldSubscription: ID
         |           ^^^^^^^^^^^^^^^^^ Field "fieldSubscription" should not have "Subscription" suffix
      14 |           subscriptionField: ID

#### 💡 Suggestion: Rename to \`field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           field: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 7/15

      13 |           fieldSubscription: ID
    > 14 |           subscriptionField: ID
         |           ^^^^^^^^^^^^^^^^^ Field "subscriptionField" should not have "subscription" prefix
      15 |         }

#### 💡 Suggestion: Rename to \`Field\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           Field: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 8/15

      16 |
    > 17 |         enum TestEnum
         |              ^^^^^^^^ Enumerator "TestEnum" should not have "Enum" suffix
      18 |         extend enum EnumTest {

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum Test
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 9/15

      17 |         enum TestEnum
    > 18 |         extend enum EnumTest {
         |                     ^^^^^^^^ EnumTypeExtension "EnumTest" should not have "Enum" prefix
      19 |           A

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum Test {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 10/15

      21 |
    > 22 |         interface TestInterface
         |                   ^^^^^^^^^^^^^ Interface "TestInterface" should not have "Interface" suffix
      23 |         extend interface InterfaceTest {

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface Test
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 11/15

      22 |         interface TestInterface
    > 23 |         extend interface InterfaceTest {
         |                          ^^^^^^^^^^^^^ InterfaceTypeExtension "InterfaceTest" should not have "Interface" prefix
      24 |           id: ID

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface Test {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 12/15

      26 |
    > 27 |         union TestUnion
         |               ^^^^^^^^^ Union "TestUnion" should not have "Union" suffix
      28 |         extend union UnionTest = TestInterface

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union Test
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 13/15

      27 |         union TestUnion
    > 28 |         extend union UnionTest = TestInterface
         |                      ^^^^^^^^^ UnionTypeExtension "UnionTest" should not have "Union" prefix
      29 |

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union Test = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 14/15

      29 |
    > 30 |         type TestType
         |              ^^^^^^^^ Type "TestType" should not have "Type" suffix
      31 |         extend type TypeTest {

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type Test
    31 |         extend type TypeTest {
    32 |           id: ID
    33 |         }

#### ❌ Error 15/15

      30 |         type TestType
    > 31 |         extend type TypeTest {
         |                     ^^^^^^^^ ObjectTypeExtension "TypeTest" should not have "Type" prefix
      32 |           id: ID

#### 💡 Suggestion: Rename to \`Test\`

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |
     7 |         type Mutation {
     8 |           fieldMutation: ID
     9 |           mutationField: ID
    10 |         }
    11 |
    12 |         type Subscription {
    13 |           fieldSubscription: ID
    14 |           subscriptionField: ID
    15 |         }
    16 |
    17 |         enum TestEnum
    18 |         extend enum EnumTest {
    19 |           A
    20 |         }
    21 |
    22 |         interface TestInterface
    23 |         extend interface InterfaceTest {
    24 |           id: ID
    25 |         }
    26 |
    27 |         union TestUnion
    28 |         extend union UnionTest = TestInterface
    29 |
    30 |         type TestType
    31 |         extend type Test {
    32 |           id: ID
    33 |         }
`;

exports[`naming-convention > invalid > should error when selected type names do not match require prefixes 1`] = `
#### ⌨️ Code

       1 |         scalar Secret
       2 |
       3 |         interface Snake {
       4 |           value: String!
       5 |         }
       6 |
       7 |         type Test {
       8 |           enabled: Boolean!
       9 |           secret: Secret!
      10 |           snake: Snake
      11 |         }

#### ⚙️ Options

    {
      "FieldDefinition[gqlType.gqlType.name.value=Boolean]": {
        "style": "camelCase",
        "requiredPrefixes": [
          "is",
          "has"
        ]
      },
      "FieldDefinition[gqlType.gqlType.name.value=Secret]": {
        "requiredPrefixes": [
          "SUPER_SECRET_"
        ]
      },
      "FieldDefinition[gqlType.name.value=Snake]": {
        "style": "snake_case",
        "requiredPrefixes": [
          "hiss"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/3

      7 |         type Test {
    > 8 |           enabled: Boolean!
        |           ^^^^^^^ Field "enabled" should have one of the following prefixes: is or has
      9 |           secret: Secret!

#### 💡 Suggestion 1/2: Rename to \`isEnabled\`

     1 |         scalar Secret
     2 |
     3 |         interface Snake {
     4 |           value: String!
     5 |         }
     6 |
     7 |         type Test {
     8 |           isEnabled: Boolean!
     9 |           secret: Secret!
    10 |           snake: Snake
    11 |         }

#### 💡 Suggestion 2/2: Rename to \`hasEnabled\`

     1 |         scalar Secret
     2 |
     3 |         interface Snake {
     4 |           value: String!
     5 |         }
     6 |
     7 |         type Test {
     8 |           hasEnabled: Boolean!
     9 |           secret: Secret!
    10 |           snake: Snake
    11 |         }

#### ❌ Error 2/3

       8 |           enabled: Boolean!
    >  9 |           secret: Secret!
         |           ^^^^^^ Field "secret" should have one of the following prefixes: SUPER_SECRET_
      10 |           snake: Snake

#### 💡 Suggestion: Rename to \`SUPER_SECRET_secret\`

     1 |         scalar Secret
     2 |
     3 |         interface Snake {
     4 |           value: String!
     5 |         }
     6 |
     7 |         type Test {
     8 |           enabled: Boolean!
     9 |           SUPER_SECRET_secret: Secret!
    10 |           snake: Snake
    11 |         }

#### ❌ Error 3/3

       9 |           secret: Secret!
    > 10 |           snake: Snake
         |           ^^^^^ Field "snake" should have one of the following prefixes: hiss
      11 |         }

#### 💡 Suggestion: Rename to \`hiss_snake\`

     1 |         scalar Secret
     2 |
     3 |         interface Snake {
     4 |           value: String!
     5 |         }
     6 |
     7 |         type Test {
     8 |           enabled: Boolean!
     9 |           secret: Secret!
    10 |           hiss_snake: Snake
    11 |         }
`;

exports[`naming-convention > invalid > should error when selected type names do not match require suffixes 1`] = `
#### ⌨️ Code

      1 |         scalar IpAddress
      2 |
      3 |         type Test {
      4 |           specialFeature: Boolean!
      5 |           user: IpAddress!
      6 |         }

#### ⚙️ Options

    {
      "FieldDefinition[gqlType.gqlType.name.value=Boolean]": {
        "style": "camelCase",
        "requiredSuffixes": [
          "Enabled",
          "Disabled"
        ]
      },
      "FieldDefinition[gqlType.gqlType.name.value=IpAddress]": {
        "requiredSuffixes": [
          "IpAddress"
        ]
      },
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

#### ❌ Error 1/2

      3 |         type Test {
    > 4 |           specialFeature: Boolean!
        |           ^^^^^^^^^^^^^^ Field "specialFeature" should have one of the following suffixes: Enabled or Disabled
      5 |           user: IpAddress!

#### 💡 Suggestion 1/2: Rename to \`specialFeatureEnabled\`

    1 |         scalar IpAddress
    2 |
    3 |         type Test {
    4 |           specialFeatureEnabled: Boolean!
    5 |           user: IpAddress!
    6 |         }

#### 💡 Suggestion 2/2: Rename to \`specialFeatureDisabled\`

    1 |         scalar IpAddress
    2 |
    3 |         type Test {
    4 |           specialFeatureDisabled: Boolean!
    5 |           user: IpAddress!
    6 |         }

#### ❌ Error 2/2

      4 |           specialFeature: Boolean!
    > 5 |           user: IpAddress!
        |           ^^^^ Field "user" should have one of the following suffixes: IpAddress
      6 |         }

#### 💡 Suggestion: Rename to \`userIpAddress\`

    1 |         scalar IpAddress
    2 |
    3 |         type Test {
    4 |           specialFeature: Boolean!
    5 |           userIpAddress: IpAddress!
    6 |         }
`;

exports[`naming-convention > invalid > should ignore selections fields but check alias renaming 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           test {
      3 |             _badAlias: foo
      4 |             badAlias_: bar
      5 |             _ok
      6 |             ok_
      7 |           }
      8 |         }

#### ❌ Error 1/2

      2 |           test {
    > 3 |             _badAlias: foo
        |             ^^^^^^^^^ Leading underscores are not allowed
      4 |             badAlias_: bar

#### 💡 Suggestion: Rename to \`badAlias\`

    1 |         {
    2 |           test {
    3 |             badAlias: foo
    4 |             badAlias_: bar
    5 |             _ok
    6 |             ok_
    7 |           }
    8 |         }

#### ❌ Error 2/2

      3 |             _badAlias: foo
    > 4 |             badAlias_: bar
        |             ^^^^^^^^^ Trailing underscores are not allowed
      5 |             _ok

#### 💡 Suggestion: Rename to \`badAlias\`

    1 |         {
    2 |           test {
    3 |             _badAlias: foo
    4 |             badAlias: bar
    5 |             _ok
    6 |             ok_
    7 |           }
    8 |         }
`;
