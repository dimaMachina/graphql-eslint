// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

      1 | type b { test: String }

⚙️ Options

    {
      "types": "PascalCase",
      "FieldDefinition": "PascalCase"
    }

❌ Error 1/2

    > 1 | type b { test: String }
        |      ^ Type "b" should be in PascalCase format

💡 Suggestion: Rename to "B"

    1 | type B { test: String }

❌ Error 2/2

    > 1 | type b { test: String }
        |          ^^^^ Field "test" should be in PascalCase format

💡 Suggestion: Rename to "Test"

    1 | type b { Test: String }
`;

exports[` 2`] = `
Code

      1 | type __b { test__: String }

⚙️ Options

    {
      "allowLeadingUnderscore": false,
      "allowTrailingUnderscore": false
    }

❌ Error 1/2

    > 1 | type __b { test__: String }
        |      ^^^ Leading underscores are not allowed

💡 Suggestion: Rename to "b"

    1 | type b { test__: String }

❌ Error 2/2

    > 1 | type __b { test__: String }
        |            ^^^^^^ Trailing underscores are not allowed

💡 Suggestion: Rename to "test"

    1 | type __b { test: String }
`;

exports[` 3`] = `
⚙️ Options

    {
      "ScalarTypeDefinition": "snake_case"
    }

❌ Error

    > 1 | scalar BSONDecimal
        |        ^^^^^^^^^^^ Scalar "BSONDecimal" should be in snake_case format

💡 Suggestion: Rename to "bson_decimal"

    1 | scalar bson_decimal
`;

exports[` 4`] = `
Code

       1 | input _idOperatorsFilterFindManyUserInput {
       2 |   gt: MongoID
       3 |   gte: MongoID
       4 |   lt: MongoID
       5 |   lte: MongoID
       6 |   ne: MongoID
       7 |   in: [MongoID]
       8 |   nin: [MongoID]
       9 | }
       10 | input _idOperatorsFilterFindOneUserInput {
       11 |   gt: MongoID
       12 |   gte: MongoID
       13 |   lt: MongoID
       14 |   lte: MongoID
       15 |   ne: MongoID
       16 |   in: [MongoID]
       17 |   nin: [MongoID]
       18 | }
       19 | input _idOperatorsFilterRemoveManyUserInput {
       20 |   gt: MongoID
       21 |   gte: MongoID
       22 |   lt: MongoID
       23 |   lte: MongoID
       24 |   ne: MongoID
       25 |   in: [MongoID]
       26 |   nin: [MongoID]
       27 | }
       28 | input _idOperatorsFilterRemoveOneUserInput {
       29 |   gt: MongoID
       30 |   gte: MongoID
       31 |   lt: MongoID
       32 |   lte: MongoID
       33 |   ne: MongoID
       34 |   in: [MongoID]
       35 |   nin: [MongoID]
       36 | }
       37 | input _idOperatorsFilterUpdateManyUserInput {
       38 |   gt: MongoID
       39 |   gte: MongoID
       40 |   lt: MongoID
       41 |   lte: MongoID
       42 |   ne: MongoID
       43 |   in: [MongoID]
       44 |   nin: [MongoID]
       45 | }
       46 | input _idOperatorsFilterUpdateOneUserInput {
       47 |   gt: MongoID
       48 |   gte: MongoID
       49 |   lt: MongoID
       50 |   lte: MongoID
       51 |   ne: MongoID
       52 |   in: [MongoID]
       53 |   nin: [MongoID]
       54 | }
       55 | input _idOperatorsFilterUserInput {
       56 |   gt: MongoID
       57 |   gte: MongoID
       58 |   lt: MongoID
       59 |   lte: MongoID
       60 |   ne: MongoID
       61 |   in: [MongoID]
       62 |   nin: [MongoID]
       63 | }
       64 | input AgeOperatorsFilterFindManyUserInput {
       65 |   gt: Float
       66 |   gte: Float
       67 |   lt: Float
       68 |   lte: Float
       69 |   ne: Float
       70 |   in: [Float]
       71 |   nin: [Float]
       72 | }
       73 | input AgeOperatorsFilterFindOneUserInput {
       74 |   gt: Float
       75 |   gte: Float
       76 |   lt: Float
       77 |   lte: Float
       78 |   ne: Float
       79 |   in: [Float]
       80 |   nin: [Float]
       81 | }
       82 | input AgeOperatorsFilterRemoveManyUserInput {
       83 |   gt: Float
       84 |   gte: Float
       85 |   lt: Float
       86 |   lte: Float
       87 |   ne: Float
       88 |   in: [Float]
       89 |   nin: [Float]
       90 | }
       91 | input AgeOperatorsFilterRemoveOneUserInput {
       92 |   gt: Float
       93 |   gte: Float
       94 |   lt: Float
       95 |   lte: Float
       96 |   ne: Float
       97 |   in: [Float]
       98 |   nin: [Float]
       99 | }
       100 | input AgeOperatorsFilterUpdateManyUserInput {
       101 |   gt: Float
       102 |   gte: Float
       103 |   lt: Float
       104 |   lte: Float
       105 |   ne: Float
       106 |   in: [Float]
       107 |   nin: [Float]
       108 | }
       109 | input AgeOperatorsFilterUpdateOneUserInput {
       110 |   gt: Float
       111 |   gte: Float
       112 |   lt: Float
       113 |   lte: Float
       114 |   ne: Float
       115 |   in: [Float]
       116 |   nin: [Float]
       117 | }
       118 | input AgeOperatorsFilterUserInput {
       119 |   gt: Float
       120 |   gte: Float
       121 |   lt: Float
       122 |   lte: Float
       123 |   ne: Float
       124 |   in: [Float]
       125 |   nin: [Float]
       126 | }
       127 | """
       128 | The \`Decimal\` scalar type uses the IEEE 754 decimal128 decimal-based
       129 | floating-point numbering format. Supports 34 decimal digits of precision, a max
       130 | value of approximately 10^6145, and min value of approximately -10^6145
       131 | """
       132 | scalar BSONDecimal
       133 | input CreateManyUserInput {
       134 |   name: String
       135 |   age: Float
       136 |   languages: [UserLanguagesInput]
       137 |   contacts: UserContactsInput
       138 |   gender: EnumUserGender
       139 |   address: UserAddressInput
       140 |   """
       141 |   Some dynamic data
       142 |   """
       143 |   someMixed: JSON
       144 |   salaryDecimal: BSONDecimal
       145 | }
       146 | type CreateManyUserPayload {
       147 |   """
       148 |   Created document ID
       149 |   """
       150 |   recordIds: [MongoID]!
       151 |   """
       152 |   Created documents
       153 |   """
       154 |   records: [User]!
       155 |   """
       156 |   Count of all documents created
       157 |   """
       158 |   createCount: Int!
       159 | }
       160 | input CreateOneUserInput {
       161 |   name: String
       162 |   age: Float
       163 |   languages: [UserLanguagesInput]
       164 |   contacts: UserContactsInput
       165 |   gender: EnumUserGender
       166 |   address: UserAddressInput
       167 |   """
       168 |   Some dynamic data
       169 |   """
       170 |   someMixed: JSON
       171 |   salaryDecimal: BSONDecimal
       172 | }
       173 | type CreateOneUserPayload {
       174 |   """
       175 |   Created document ID
       176 |   """
       177 |   recordId: MongoID
       178 |   """
       179 |   Created document
       180 |   """
       181 |   record: User
       182 | }
       183 | enum EnumUserGender {
       184 |   male
       185 |   female
       186 |   ladyboy
       187 | }
       188 | enum EnumUserLanguagesSkill {
       189 |   basic
       190 |   fluent
       191 |   native
       192 | }
       193 | input FilterFindManyUserInput {
       194 |   name: String
       195 |   age: Float
       196 |   languages: [UserLanguagesInput]
       197 |   contacts: UserContactsInput
       198 |   gender: EnumUserGender
       199 |   address: UserAddressInput
       200 |   """
       201 |   Some dynamic data
       202 |   """
       203 |   someMixed: JSON
       204 |   salaryDecimal: BSONDecimal
       205 |   _id: MongoID
       206 |   _ids: [MongoID]
       207 |   """
       208 |   List of *indexed* fields that can be filtered via operators.
       209 |   """
       210 |   _operators: OperatorsFilterFindManyUserInput
       211 |   OR: [FilterFindManyUserInput!]
       212 |   AND: [FilterFindManyUserInput!]
       213 |   """
       214 |   Search by distance in meters
       215 |   """
       216 |   geoDistance: GeoDistance
       217 | }
       218 | input FilterFindOneUserInput {
       219 |   name: String
       220 |   age: Float
       221 |   languages: [UserLanguagesInput]
       222 |   contacts: UserContactsInput
       223 |   gender: EnumUserGender
       224 |   address: UserAddressInput
       225 |   """
       226 |   Some dynamic data
       227 |   """
       228 |   someMixed: JSON
       229 |   salaryDecimal: BSONDecimal
       230 |   _id: MongoID
       231 |   _ids: [MongoID]
       232 |   """
       233 |   List of *indexed* fields that can be filtered via operators.
       234 |   """
       235 |   _operators: OperatorsFilterFindOneUserInput
       236 |   OR: [FilterFindOneUserInput!]
       237 |   AND: [FilterFindOneUserInput!]
       238 | }
       239 | input FilterRemoveManyUserInput {
       240 |   name: String
       241 |   age: Float
       242 |   languages: [UserLanguagesInput]
       243 |   contacts: UserContactsInput
       244 |   gender: EnumUserGender
       245 |   address: UserAddressInput
       246 |   """
       247 |   Some dynamic data
       248 |   """
       249 |   someMixed: JSON
       250 |   salaryDecimal: BSONDecimal
       251 |   _id: MongoID
       252 |   _ids: [MongoID]
       253 |   """
       254 |   List of *indexed* fields that can be filtered via operators.
       255 |   """
       256 |   _operators: OperatorsFilterRemoveManyUserInput
       257 |   OR: [FilterRemoveManyUserInput!]
       258 |   AND: [FilterRemoveManyUserInput!]
       259 | }
       260 | input FilterRemoveOneUserInput {
       261 |   name: String
       262 |   age: Float
       263 |   languages: [UserLanguagesInput]
       264 |   contacts: UserContactsInput
       265 |   gender: EnumUserGender
       266 |   address: UserAddressInput
       267 |   """
       268 |   Some dynamic data
       269 |   """
       270 |   someMixed: JSON
       271 |   salaryDecimal: BSONDecimal
       272 |   _id: MongoID
       273 |   _ids: [MongoID]
       274 |   """
       275 |   List of *indexed* fields that can be filtered via operators.
       276 |   """
       277 |   _operators: OperatorsFilterRemoveOneUserInput
       278 |   OR: [FilterRemoveOneUserInput!]
       279 |   AND: [FilterRemoveOneUserInput!]
       280 | }
       281 | input FilterUpdateManyUserInput {
       282 |   name: String
       283 |   age: Float
       284 |   languages: [UserLanguagesInput]
       285 |   contacts: UserContactsInput
       286 |   gender: EnumUserGender
       287 |   address: UserAddressInput
       288 |   """
       289 |   Some dynamic data
       290 |   """
       291 |   someMixed: JSON
       292 |   salaryDecimal: BSONDecimal
       293 |   _id: MongoID
       294 |   _ids: [MongoID]
       295 |   """
       296 |   List of *indexed* fields that can be filtered via operators.
       297 |   """
       298 |   _operators: OperatorsFilterUpdateManyUserInput
       299 |   OR: [FilterUpdateManyUserInput!]
       300 |   AND: [FilterUpdateManyUserInput!]
       301 | }
       302 | input FilterUpdateOneUserInput {
       303 |   name: String
       304 |   age: Float
       305 |   languages: [UserLanguagesInput]
       306 |   contacts: UserContactsInput
       307 |   gender: EnumUserGender
       308 |   address: UserAddressInput
       309 |   """
       310 |   Some dynamic data
       311 |   """
       312 |   someMixed: JSON
       313 |   salaryDecimal: BSONDecimal
       314 |   _id: MongoID
       315 |   _ids: [MongoID]
       316 |   """
       317 |   List of *indexed* fields that can be filtered via operators.
       318 |   """
       319 |   _operators: OperatorsFilterUpdateOneUserInput
       320 |   OR: [FilterUpdateOneUserInput!]
       321 |   AND: [FilterUpdateOneUserInput!]
       322 | }
       323 | input FilterUserInput {
       324 |   name: String
       325 |   age: Float
       326 |   languages: [UserLanguagesInput]
       327 |   contacts: UserContactsInput
       328 |   gender: EnumUserGender
       329 |   address: UserAddressInput
       330 |   """
       331 |   Some dynamic data
       332 |   """
       333 |   someMixed: JSON
       334 |   salaryDecimal: BSONDecimal
       335 |   _id: MongoID
       336 |   _ids: [MongoID]
       337 |   """
       338 |   List of *indexed* fields that can be filtered via operators.
       339 |   """
       340 |   _operators: OperatorsFilterUserInput
       341 |   OR: [FilterUserInput!]
       342 |   AND: [FilterUserInput!]
       343 | }
       344 | input GenderOperatorsFilterFindManyUserInput {
       345 |   gt: EnumUserGender
       346 |   gte: EnumUserGender
       347 |   lt: EnumUserGender
       348 |   lte: EnumUserGender
       349 |   ne: EnumUserGender
       350 |   in: [EnumUserGender]
       351 |   nin: [EnumUserGender]
       352 | }
       353 | input GenderOperatorsFilterFindOneUserInput {
       354 |   gt: EnumUserGender
       355 |   gte: EnumUserGender
       356 |   lt: EnumUserGender
       357 |   lte: EnumUserGender
       358 |   ne: EnumUserGender
       359 |   in: [EnumUserGender]
       360 |   nin: [EnumUserGender]
       361 | }
       362 | input GenderOperatorsFilterRemoveManyUserInput {
       363 |   gt: EnumUserGender
       364 |   gte: EnumUserGender
       365 |   lt: EnumUserGender
       366 |   lte: EnumUserGender
       367 |   ne: EnumUserGender
       368 |   in: [EnumUserGender]
       369 |   nin: [EnumUserGender]
       370 | }
       371 | input GenderOperatorsFilterRemoveOneUserInput {
       372 |   gt: EnumUserGender
       373 |   gte: EnumUserGender
       374 |   lt: EnumUserGender
       375 |   lte: EnumUserGender
       376 |   ne: EnumUserGender
       377 |   in: [EnumUserGender]
       378 |   nin: [EnumUserGender]
       379 | }
       380 | input GenderOperatorsFilterUpdateManyUserInput {
       381 |   gt: EnumUserGender
       382 |   gte: EnumUserGender
       383 |   lt: EnumUserGender
       384 |   lte: EnumUserGender
       385 |   ne: EnumUserGender
       386 |   in: [EnumUserGender]
       387 |   nin: [EnumUserGender]
       388 | }
       389 | input GenderOperatorsFilterUpdateOneUserInput {
       390 |   gt: EnumUserGender
       391 |   gte: EnumUserGender
       392 |   lt: EnumUserGender
       393 |   lte: EnumUserGender
       394 |   ne: EnumUserGender
       395 |   in: [EnumUserGender]
       396 |   nin: [EnumUserGender]
       397 | }
       398 | input GenderOperatorsFilterUserInput {
       399 |   gt: EnumUserGender
       400 |   gte: EnumUserGender
       401 |   lt: EnumUserGender
       402 |   lte: EnumUserGender
       403 |   ne: EnumUserGender
       404 |   in: [EnumUserGender]
       405 |   nin: [EnumUserGender]
       406 | }
       407 | input GeoDistance {
       408 |   lng: Float!
       409 |   lat: Float!
       410 |   distance: Float!
       411 | }
       412 | """
       413 | The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
       414 | """
       415 | scalar JSON
       416 | """
       417 | The \`ID\` scalar type represents a unique MongoDB identifier in collection.
       418 | MongoDB by default use 12-byte ObjectId value
       419 | (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB
       420 | also may accepts string or integer as correct values for _id field.
       421 | """
       422 | scalar MongoID
       423 | type Mutation {
       424 |   """
       425 |   Create one document with mongoose defaults, setters, hooks and validation
       426 |   """
       427 |   userCreate(record: CreateOneUserInput!): CreateOneUserPayload
       428 |   """
       429 |   Creates Many documents with mongoose defaults, setters, hooks and validation
       430 |   """
       431 |   userCreateMany(records: [CreateManyUserInput!]!): CreateManyUserPayload
       432 |   """
       433 |   Update one document: 1) Retrieve one document by findById. 2) Apply updates to
       434 |   mongoose document. 3) Mongoose applies defaults, setters, hooks and
       435 |   validation. 4) And save it.
       436 |   """
       437 |   userUpdateById(record: UpdateByIdUserInput!): UpdateByIdUserPayload
       438 |   """
       439 |   Update one document: 1) Retrieve one document via findOne. 2) Apply updates to
       440 |   mongoose document. 3) Mongoose applies defaults, setters, hooks and
       441 |   validation. 4) And save it.
       442 |   """
       443 |   userUpdateOne(
       444 |     record: UpdateOneUserInput!
       445 |     """
       446 |     Filter by fields
       447 |     """
       448 |     filter: FilterUpdateOneUserInput
       449 |     sort: SortUpdateOneUserInput
       450 |     skip: Int
       451 |   ): UpdateOneUserPayload
       452 |   """
       453 |   Update many documents without returning them: Use Query.update mongoose
       454 |   method. Do not apply mongoose defaults, setters, hooks and validation.
       455 |   """
       456 |   userUpdateMany(
       457 |     record: UpdateManyUserInput!
       458 |     """
       459 |     Filter by fields
       460 |     """
       461 |     filter: FilterUpdateManyUserInput
       462 |     sort: SortUpdateManyUserInput
       463 |     skip: Int
       464 |     limit: Int = 1000
       465 |   ): UpdateManyUserPayload
       466 |   """
       467 |   Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document.
       468 |   """
       469 |   userRemoveById(_id: MongoID!): RemoveByIdUserPayload
       470 |   """
       471 |   Remove one document: 1) Remove with hooks via findOneAndRemove. 2) Return removed document.
       472 |   """
       473 |   userRemoveOne(
       474 |     """
       475 |     Filter by fields
       476 |     """
       477 |     filter: FilterRemoveOneUserInput
       478 |     sort: SortRemoveOneUserInput
       479 |   ): RemoveOneUserPayload
       480 |   """
       481 |   Remove many documents without returning them: Use Query.remove mongoose
       482 |   method. Do not apply mongoose defaults, setters, hooks and validation.
       483 |   """
       484 |   userRemoveMany(
       485 |     """
       486 |     Filter by fields
       487 |     """
       488 |     filter: FilterRemoveManyUserInput!
       489 |   ): RemoveManyUserPayload
       490 | }
       491 | input NameOperatorsFilterFindManyUserInput {
       492 |   gt: String
       493 |   gte: String
       494 |   lt: String
       495 |   lte: String
       496 |   ne: String
       497 |   in: [String]
       498 |   nin: [String]
       499 | }
       500 | input NameOperatorsFilterFindOneUserInput {
       501 |   gt: String
       502 |   gte: String
       503 |   lt: String
       504 |   lte: String
       505 |   ne: String
       506 |   in: [String]
       507 |   nin: [String]
       508 | }
       509 | input NameOperatorsFilterRemoveManyUserInput {
       510 |   gt: String
       511 |   gte: String
       512 |   lt: String
       513 |   lte: String
       514 |   ne: String
       515 |   in: [String]
       516 |   nin: [String]
       517 | }
       518 | input NameOperatorsFilterRemoveOneUserInput {
       519 |   gt: String
       520 |   gte: String
       521 |   lt: String
       522 |   lte: String
       523 |   ne: String
       524 |   in: [String]
       525 |   nin: [String]
       526 | }
       527 | input NameOperatorsFilterUpdateManyUserInput {
       528 |   gt: String
       529 |   gte: String
       530 |   lt: String
       531 |   lte: String
       532 |   ne: String
       533 |   in: [String]
       534 |   nin: [String]
       535 | }
       536 | input NameOperatorsFilterUpdateOneUserInput {
       537 |   gt: String
       538 |   gte: String
       539 |   lt: String
       540 |   lte: String
       541 |   ne: String
       542 |   in: [String]
       543 |   nin: [String]
       544 | }
       545 | input NameOperatorsFilterUserInput {
       546 |   gt: String
       547 |   gte: String
       548 |   lt: String
       549 |   lte: String
       550 |   ne: String
       551 |   in: [String]
       552 |   nin: [String]
       553 | }
       554 | """
       555 | For performance reason this type contains only *indexed* fields.
       556 | """
       557 | input OperatorsFilterFindManyUserInput {
       558 |   name: NameOperatorsFilterFindManyUserInput
       559 |   age: AgeOperatorsFilterFindManyUserInput
       560 |   gender: GenderOperatorsFilterFindManyUserInput
       561 |   salaryDecimal: SalaryDecimalOperatorsFilterFindManyUserInput
       562 |   _id: _idOperatorsFilterFindManyUserInput
       563 | }
       564 | """
       565 | For performance reason this type contains only *indexed* fields.
       566 | """
       567 | input OperatorsFilterFindOneUserInput {
       568 |   name: NameOperatorsFilterFindOneUserInput
       569 |   age: AgeOperatorsFilterFindOneUserInput
       570 |   gender: GenderOperatorsFilterFindOneUserInput
       571 |   salaryDecimal: SalaryDecimalOperatorsFilterFindOneUserInput
       572 |   _id: _idOperatorsFilterFindOneUserInput
       573 | }
       574 | """
       575 | For performance reason this type contains only *indexed* fields.
       576 | """
       577 | input OperatorsFilterRemoveManyUserInput {
       578 |   name: NameOperatorsFilterRemoveManyUserInput
       579 |   age: AgeOperatorsFilterRemoveManyUserInput
       580 |   gender: GenderOperatorsFilterRemoveManyUserInput
       581 |   salaryDecimal: SalaryDecimalOperatorsFilterRemoveManyUserInput
       582 |   _id: _idOperatorsFilterRemoveManyUserInput
       583 | }
       584 | """
       585 | For performance reason this type contains only *indexed* fields.
       586 | """
       587 | input OperatorsFilterRemoveOneUserInput {
       588 |   name: NameOperatorsFilterRemoveOneUserInput
       589 |   age: AgeOperatorsFilterRemoveOneUserInput
       590 |   gender: GenderOperatorsFilterRemoveOneUserInput
       591 |   salaryDecimal: SalaryDecimalOperatorsFilterRemoveOneUserInput
       592 |   _id: _idOperatorsFilterRemoveOneUserInput
       593 | }
       594 | """
       595 | For performance reason this type contains only *indexed* fields.
       596 | """
       597 | input OperatorsFilterUpdateManyUserInput {
       598 |   name: NameOperatorsFilterUpdateManyUserInput
       599 |   age: AgeOperatorsFilterUpdateManyUserInput
       600 |   gender: GenderOperatorsFilterUpdateManyUserInput
       601 |   salaryDecimal: SalaryDecimalOperatorsFilterUpdateManyUserInput
       602 |   _id: _idOperatorsFilterUpdateManyUserInput
       603 | }
       604 | """
       605 | For performance reason this type contains only *indexed* fields.
       606 | """
       607 | input OperatorsFilterUpdateOneUserInput {
       608 |   name: NameOperatorsFilterUpdateOneUserInput
       609 |   age: AgeOperatorsFilterUpdateOneUserInput
       610 |   gender: GenderOperatorsFilterUpdateOneUserInput
       611 |   salaryDecimal: SalaryDecimalOperatorsFilterUpdateOneUserInput
       612 |   _id: _idOperatorsFilterUpdateOneUserInput
       613 | }
       614 | """
       615 | For performance reason this type contains only *indexed* fields.
       616 | """
       617 | input OperatorsFilterUserInput {
       618 |   name: NameOperatorsFilterUserInput
       619 |   age: AgeOperatorsFilterUserInput
       620 |   gender: GenderOperatorsFilterUserInput
       621 |   salaryDecimal: SalaryDecimalOperatorsFilterUserInput
       622 |   _id: _idOperatorsFilterUserInput
       623 | }
       624 | """
       625 | Information about pagination in a connection.
       626 | """
       627 | type PageInfo {
       628 |   """
       629 |   When paginating forwards, are there more items?
       630 |   """
       631 |   hasNextPage: Boolean!
       632 |   """
       633 |   When paginating backwards, are there more items?
       634 |   """
       635 |   hasPreviousPage: Boolean!
       636 |   """
       637 |   When paginating backwards, the cursor to continue.
       638 |   """
       639 |   startCursor: String
       640 |   """
       641 |   When paginating forwards, the cursor to continue.
       642 |   """
       643 |   endCursor: String
       644 | }
       645 | type PaginationInfo {
       646 |   currentPage: Int!
       647 |   perPage: Int!
       648 |   pageCount: Int
       649 |   itemCount: Int
       650 |   hasNextPage: Boolean
       651 |   hasPreviousPage: Boolean
       652 | }
       653 | type Query {
       654 |   userById(_id: MongoID!): User
       655 |   userByIds(_ids: [MongoID]!, limit: Int = 1000, sort: SortFindByIdsUserInput): [User]
       656 |   userOne(
       657 |     """
       658 |     Filter by fields
       659 |     """
       660 |     filter: FilterFindOneUserInput
       661 |     skip: Int
       662 |     sort: SortFindOneUserInput
       663 |   ): User
       664 |   userMany(
       665 |     """
       666 |     Filter by fields
       667 |     """
       668 |     filter: FilterFindManyUserInput
       669 |     skip: Int
       670 |     limit: Int = 1000
       671 |     sort: SortFindManyUserInput
       672 |   ): [User]
       673 |   userTotal(
       674 |     """
       675 |     Filter by fields
       676 |     """
       677 |     filter: FilterUserInput
       678 |   ): Int
       679 |   userConnection(
       680 |     """
       681 |     Forward pagination argument for returning at most first edges
       682 |     """
       683 |     first: Int
       684 |     """
       685 |     Forward pagination argument for returning at most first edges
       686 |     """
       687 |     after: String
       688 |     """
       689 |     Backward pagination argument for returning at most last edges
       690 |     """
       691 |     last: Int
       692 |     """
       693 |     Backward pagination argument for returning at most last edges
       694 |     """
       695 |     before: String
       696 |     """
       697 |     Filter by fields
       698 |     """
       699 |     filter: FilterFindManyUserInput
       700 |     """
       701 |     Sort argument for data ordering
       702 |     """
       703 |     sort: SortConnectionUserEnum = _ID_DESC
       704 |   ): UserConnection
       705 |   userPagination(
       706 |     """
       707 |     Page number for displaying
       708 |     """
       709 |     page: Int
       710 |     perPage: Int = 20
       711 |     """
       712 |     Filter by fields
       713 |     """
       714 |     filter: FilterFindManyUserInput
       715 |     sort: SortFindManyUserInput
       716 |   ): UserPagination
       717 | }
       718 | type RemoveByIdUserPayload {
       719 |   """
       720 |   Removed document ID
       721 |   """
       722 |   recordId: MongoID
       723 |   """
       724 |   Removed document
       725 |   """
       726 |   record: User
       727 | }
       728 | type RemoveManyUserPayload {
       729 |   """
       730 |   Affected documents number
       731 |   """
       732 |   numAffected: Int
       733 | }
       734 | type RemoveOneUserPayload {
       735 |   """
       736 |   Removed document ID
       737 |   """
       738 |   recordId: MongoID
       739 |   """
       740 |   Removed document
       741 |   """
       742 |   record: User
       743 | }
       744 | input SalaryDecimalOperatorsFilterFindManyUserInput {
       745 |   gt: BSONDecimal
       746 |   gte: BSONDecimal
       747 |   lt: BSONDecimal
       748 |   lte: BSONDecimal
       749 |   ne: BSONDecimal
       750 |   in: [BSONDecimal]
       751 |   nin: [BSONDecimal]
       752 | }
       753 | input SalaryDecimalOperatorsFilterFindOneUserInput {
       754 |   gt: BSONDecimal
       755 |   gte: BSONDecimal
       756 |   lt: BSONDecimal
       757 |   lte: BSONDecimal
       758 |   ne: BSONDecimal
       759 |   in: [BSONDecimal]
       760 |   nin: [BSONDecimal]
       761 | }
       762 | input SalaryDecimalOperatorsFilterRemoveManyUserInput {
       763 |   gt: BSONDecimal
       764 |   gte: BSONDecimal
       765 |   lt: BSONDecimal
       766 |   lte: BSONDecimal
       767 |   ne: BSONDecimal
       768 |   in: [BSONDecimal]
       769 |   nin: [BSONDecimal]
       770 | }
       771 | input SalaryDecimalOperatorsFilterRemoveOneUserInput {
       772 |   gt: BSONDecimal
       773 |   gte: BSONDecimal
       774 |   lt: BSONDecimal
       775 |   lte: BSONDecimal
       776 |   ne: BSONDecimal
       777 |   in: [BSONDecimal]
       778 |   nin: [BSONDecimal]
       779 | }
       780 | input SalaryDecimalOperatorsFilterUpdateManyUserInput {
       781 |   gt: BSONDecimal
       782 |   gte: BSONDecimal
       783 |   lt: BSONDecimal
       784 |   lte: BSONDecimal
       785 |   ne: BSONDecimal
       786 |   in: [BSONDecimal]
       787 |   nin: [BSONDecimal]
       788 | }
       789 | input SalaryDecimalOperatorsFilterUpdateOneUserInput {
       790 |   gt: BSONDecimal
       791 |   gte: BSONDecimal
       792 |   lt: BSONDecimal
       793 |   lte: BSONDecimal
       794 |   ne: BSONDecimal
       795 |   in: [BSONDecimal]
       796 |   nin: [BSONDecimal]
       797 | }
       798 | input SalaryDecimalOperatorsFilterUserInput {
       799 |   gt: BSONDecimal
       800 |   gte: BSONDecimal
       801 |   lt: BSONDecimal
       802 |   lte: BSONDecimal
       803 |   ne: BSONDecimal
       804 |   in: [BSONDecimal]
       805 |   nin: [BSONDecimal]
       806 | }
       807 | enum SortConnectionUserEnum {
       808 |   _ID_DESC
       809 |   _ID_ASC
       810 | }
       811 | enum SortFindByIdsUserInput {
       812 |   _ID_ASC
       813 |   _ID_DESC
       814 |   NAME_ASC
       815 |   NAME_DESC
       816 |   AGE_ASC
       817 |   AGE_DESC
       818 |   SALARYDECIMAL_ASC
       819 |   SALARYDECIMAL_DESC
       820 |   GENDER_ASC
       821 |   GENDER_DESC
       822 |   GENDER__AGE_ASC
       823 |   GENDER__AGE_DESC
       824 | }
       825 | enum SortFindManyUserInput {
       826 |   _ID_ASC
       827 |   _ID_DESC
       828 |   NAME_ASC
       829 |   NAME_DESC
       830 |   AGE_ASC
       831 |   AGE_DESC
       832 |   SALARYDECIMAL_ASC
       833 |   SALARYDECIMAL_DESC
       834 |   GENDER_ASC
       835 |   GENDER_DESC
       836 |   GENDER__AGE_ASC
       837 |   GENDER__AGE_DESC
       838 | }
       839 | enum SortFindOneUserInput {
       840 |   _ID_ASC
       841 |   _ID_DESC
       842 |   NAME_ASC
       843 |   NAME_DESC
       844 |   AGE_ASC
       845 |   AGE_DESC
       846 |   SALARYDECIMAL_ASC
       847 |   SALARYDECIMAL_DESC
       848 |   GENDER_ASC
       849 |   GENDER_DESC
       850 |   GENDER__AGE_ASC
       851 |   GENDER__AGE_DESC
       852 | }
       853 | enum SortRemoveOneUserInput {
       854 |   _ID_ASC
       855 |   _ID_DESC
       856 |   NAME_ASC
       857 |   NAME_DESC
       858 |   AGE_ASC
       859 |   AGE_DESC
       860 |   SALARYDECIMAL_ASC
       861 |   SALARYDECIMAL_DESC
       862 |   GENDER_ASC
       863 |   GENDER_DESC
       864 |   GENDER__AGE_ASC
       865 |   GENDER__AGE_DESC
       866 | }
       867 | enum SortUpdateManyUserInput {
       868 |   _ID_ASC
       869 |   _ID_DESC
       870 |   NAME_ASC
       871 |   NAME_DESC
       872 |   AGE_ASC
       873 |   AGE_DESC
       874 |   SALARYDECIMAL_ASC
       875 |   SALARYDECIMAL_DESC
       876 |   GENDER_ASC
       877 |   GENDER_DESC
       878 |   GENDER__AGE_ASC
       879 |   GENDER__AGE_DESC
       880 | }
       881 | enum SortUpdateOneUserInput {
       882 |   _ID_ASC
       883 |   _ID_DESC
       884 |   NAME_ASC
       885 |   NAME_DESC
       886 |   AGE_ASC
       887 |   AGE_DESC
       888 |   SALARYDECIMAL_ASC
       889 |   SALARYDECIMAL_DESC
       890 |   GENDER_ASC
       891 |   GENDER_DESC
       892 |   GENDER__AGE_ASC
       893 |   GENDER__AGE_DESC
       894 | }
       895 | input UpdateByIdUserInput {
       896 |   name: String
       897 |   age: Float
       898 |   languages: [UserLanguagesInput]
       899 |   contacts: UserContactsInput
       900 |   gender: EnumUserGender
       901 |   address: UserAddressInput
       902 |   """
       903 |   Some dynamic data
       904 |   """
       905 |   someMixed: JSON
       906 |   salaryDecimal: BSONDecimal
       907 |   _id: MongoID!
       908 | }
       909 | type UpdateByIdUserPayload {
       910 |   """
       911 |   Updated document ID
       912 |   """
       913 |   recordId: MongoID
       914 |   """
       915 |   Updated document
       916 |   """
       917 |   record: User
       918 | }
       919 | input UpdateManyUserInput {
       920 |   name: String
       921 |   age: Float
       922 |   languages: [UserLanguagesInput]
       923 |   contacts: UserContactsInput
       924 |   gender: EnumUserGender
       925 |   address: UserAddressInput
       926 |   """
       927 |   Some dynamic data
       928 |   """
       929 |   someMixed: JSON
       930 |   salaryDecimal: BSONDecimal
       931 | }
       932 | type UpdateManyUserPayload {
       933 |   """
       934 |   Affected documents number
       935 |   """
       936 |   numAffected: Int
       937 | }
       938 | input UpdateOneUserInput {
       939 |   name: String
       940 |   age: Float
       941 |   languages: [UserLanguagesInput]
       942 |   contacts: UserContactsInput
       943 |   gender: EnumUserGender
       944 |   address: UserAddressInput
       945 |   """
       946 |   Some dynamic data
       947 |   """
       948 |   someMixed: JSON
       949 |   salaryDecimal: BSONDecimal
       950 | }
       951 | type UpdateOneUserPayload {
       952 |   """
       953 |   Updated document ID
       954 |   """
       955 |   recordId: MongoID
       956 |   """
       957 |   Updated document
       958 |   """
       959 |   record: User
       960 | }
       961 | type User {
       962 |   name: String
       963 |   age: Float
       964 |   languages: [UserLanguages]
       965 |   contacts: UserContacts
       966 |   gender: EnumUserGender
       967 |   address: UserAddress
       968 |   """
       969 |   Some dynamic data
       970 |   """
       971 |   someMixed: JSON
       972 |   salaryDecimal: BSONDecimal
       973 |   _id: MongoID!
       974 |   virtualField(lang: String): String
       975 | }
       976 | type UserAddress {
       977 |   street: String
       978 |   geo: [Float]
       979 |   _id: MongoID
       980 | }
       981 | input UserAddressInput {
       982 |   street: String
       983 |   geo: [Float]
       984 |   _id: MongoID
       985 | }
       986 | """
       987 | A connection to a list of items.
       988 | """
       989 | type UserConnection {
       990 |   """
       991 |   Total object count.
       992 |   """
       993 |   count: Int!
       994 |   """
       995 |   Information to aid in pagination.
       996 |   """
       997 |   pageInfo: PageInfo!
       998 |   """
       999 |   Information to aid in pagination.
      1000 |   """
      1001 |   edges: [UserEdge!]!
      1002 | }
      1003 | type UserContacts {
      1004 |   email: String
      1005 |   phones: [String]
      1006 | }
      1007 | input UserContactsInput {
      1008 |   email: String
      1009 |   phones: [String]
      1010 | }
      1011 | """
      1012 | An edge in a connection.
      1013 | """
      1014 | type UserEdge {
      1015 |   """
      1016 |   The item at the end of the edge
      1017 |   """
      1018 |   node: User!
      1019 |   """
      1020 |   A cursor for use in pagination
      1021 |   """
      1022 |   cursor: String!
      1023 | }
      1024 | type UserLanguages {
      1025 |   language: String
      1026 |   skill: EnumUserLanguagesSkill
      1027 | }
      1028 | input UserLanguagesInput {
      1029 |   language: String
      1030 |   skill: EnumUserLanguagesSkill
      1031 | }
      1032 | """
      1033 | List of items with pagination.
      1034 | """
      1035 | type UserPagination {
      1036 |   """
      1037 |   Total object count.
      1038 |   """
      1039 |   count: Int
      1040 |   """
      1041 |   Array of objects.
      1042 |   """
      1043 |   items: [User]
      1044 |   """
      1045 |   Information to aid in pagination.
      1046 |   """
      1047 |   pageInfo: PaginationInfo!
      1048 | }

⚙️ Options

    {
      "allowLeadingUnderscore": true,
      "types": "PascalCase",
      "InputValueDefinition": "camelCase",
      "EnumValueDefinition": "UPPER_CASE",
      "FragmentDefinition": "PascalCase"
    }

❌ Error 1/27

    > 1 | input _idOperatorsFilterFindManyUserInput {
        |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterFindManyUserInput" should be in PascalCase format
      2 |   gt: MongoID

❌ Error 2/27

       9 | }
    > 10 | input _idOperatorsFilterFindOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterFindOneUserInput" should be in PascalCase format
      11 |   gt: MongoID

❌ Error 3/27

      18 | }
    > 19 | input _idOperatorsFilterRemoveManyUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterRemoveManyUserInput" should be in PascalCase format
      20 |   gt: MongoID

❌ Error 4/27

      27 | }
    > 28 | input _idOperatorsFilterRemoveOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterRemoveOneUserInput" should be in PascalCase format
      29 |   gt: MongoID

❌ Error 5/27

      36 | }
    > 37 | input _idOperatorsFilterUpdateManyUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUpdateManyUserInput" should be in PascalCase format
      38 |   gt: MongoID

❌ Error 6/27

      45 | }
    > 46 | input _idOperatorsFilterUpdateOneUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUpdateOneUserInput" should be in PascalCase format
      47 |   gt: MongoID

❌ Error 7/27

      54 | }
    > 55 | input _idOperatorsFilterUserInput {
         |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^ Input type "_idOperatorsFilterUserInput" should be in PascalCase format
      56 |   gt: MongoID

❌ Error 8/27

      183 | enum EnumUserGender {
    > 184 |   male
          |   ^^^^ Enumeration value "male" should be in UPPER_CASE format
      185 |   female

❌ Error 9/27

      184 |   male
    > 185 |   female
          |   ^^^^^^ Enumeration value "female" should be in UPPER_CASE format
      186 |   ladyboy

❌ Error 10/27

      185 |   female
    > 186 |   ladyboy
          |   ^^^^^^^ Enumeration value "ladyboy" should be in UPPER_CASE format
      187 | }

❌ Error 11/27

      188 | enum EnumUserLanguagesSkill {
    > 189 |   basic
          |   ^^^^^ Enumeration value "basic" should be in UPPER_CASE format
      190 |   fluent

❌ Error 12/27

      189 |   basic
    > 190 |   fluent
          |   ^^^^^^ Enumeration value "fluent" should be in UPPER_CASE format
      191 |   native

❌ Error 13/27

      190 |   fluent
    > 191 |   native
          |   ^^^^^^ Enumeration value "native" should be in UPPER_CASE format
      192 | }

❌ Error 14/27

      210 |   _operators: OperatorsFilterFindManyUserInput
    > 211 |   OR: [FilterFindManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      212 |   AND: [FilterFindManyUserInput!]

❌ Error 15/27

      211 |   OR: [FilterFindManyUserInput!]
    > 212 |   AND: [FilterFindManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      213 |   """

❌ Error 16/27

      235 |   _operators: OperatorsFilterFindOneUserInput
    > 236 |   OR: [FilterFindOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      237 |   AND: [FilterFindOneUserInput!]

❌ Error 17/27

      236 |   OR: [FilterFindOneUserInput!]
    > 237 |   AND: [FilterFindOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      238 | }

❌ Error 18/27

      256 |   _operators: OperatorsFilterRemoveManyUserInput
    > 257 |   OR: [FilterRemoveManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      258 |   AND: [FilterRemoveManyUserInput!]

❌ Error 19/27

      257 |   OR: [FilterRemoveManyUserInput!]
    > 258 |   AND: [FilterRemoveManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      259 | }

❌ Error 20/27

      277 |   _operators: OperatorsFilterRemoveOneUserInput
    > 278 |   OR: [FilterRemoveOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      279 |   AND: [FilterRemoveOneUserInput!]

❌ Error 21/27

      278 |   OR: [FilterRemoveOneUserInput!]
    > 279 |   AND: [FilterRemoveOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      280 | }

❌ Error 22/27

      298 |   _operators: OperatorsFilterUpdateManyUserInput
    > 299 |   OR: [FilterUpdateManyUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      300 |   AND: [FilterUpdateManyUserInput!]

❌ Error 23/27

      299 |   OR: [FilterUpdateManyUserInput!]
    > 300 |   AND: [FilterUpdateManyUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      301 | }

❌ Error 24/27

      319 |   _operators: OperatorsFilterUpdateOneUserInput
    > 320 |   OR: [FilterUpdateOneUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      321 |   AND: [FilterUpdateOneUserInput!]

❌ Error 25/27

      320 |   OR: [FilterUpdateOneUserInput!]
    > 321 |   AND: [FilterUpdateOneUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      322 | }

❌ Error 26/27

      340 |   _operators: OperatorsFilterUserInput
    > 341 |   OR: [FilterUserInput!]
          |   ^^ Input property "OR" should be in camelCase format
      342 |   AND: [FilterUserInput!]

❌ Error 27/27

      341 |   OR: [FilterUserInput!]
    > 342 |   AND: [FilterUserInput!]
          |   ^^^ Input property "AND" should be in camelCase format
      343 | }
`;

exports[` 5`] = `
Code

      1 | enum B { test }

⚙️ Options

    {
      "EnumTypeDefinition": "camelCase",
      "EnumValueDefinition": "UPPER_CASE"
    }

❌ Error 1/2

    > 1 | enum B { test }
        |      ^ Enumerator "B" should be in camelCase format

💡 Suggestion: Rename to "b"

    1 | enum b { test }

❌ Error 2/2

    > 1 | enum B { test }
        |          ^^^^ Enumeration value "test" should be in UPPER_CASE format

💡 Suggestion: Rename to "TEST"

    1 | enum B { TEST }
`;

exports[` 6`] = `
Code

      1 | input test { _Value: String }

⚙️ Options

    {
      "types": "PascalCase",
      "InputValueDefinition": "snake_case"
    }

❌ Error 1/3

    > 1 | input test { _Value: String }
        |       ^^^^ Input type "test" should be in PascalCase format

💡 Suggestion: Rename to "Test"

    1 | input Test { _Value: String }

❌ Error 2/3

    > 1 | input test { _Value: String }
        |              ^^^^^^ Input property "_Value" should be in snake_case format

💡 Suggestion: Rename to "_value"

    1 | input test { _value: String }

❌ Error 3/3

    > 1 | input test { _Value: String }
        |              ^^^^^^ Leading underscores are not allowed

💡 Suggestion: Rename to "Value"

    1 | input test { Value: String }
`;

exports[` 7`] = `
Code

      1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }

⚙️ Options

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
      }
    }

❌ Error 1/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |      ^^^^^^^ Type "TypeOne" should be in camelCase format

💡 Suggestion: Rename to "typeOne"

    1 | type typeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }

❌ Error 2/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                ^^^^^^ Field "aField" should have "AAA" suffix

💡 Suggestion: Rename to "aFieldAAA"

    1 | type TypeOne { aFieldAAA: String } enum Z { VALUE_ONE VALUE_TWO }

❌ Error 3/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                                          ^^^^^^^^^ Enumeration value "VALUE_ONE" should have "ENUM" suffix

💡 Suggestion: Rename to "VALUE_ONEENUM"

    1 | type TypeOne { aField: String } enum Z { VALUE_ONEENUM VALUE_TWO }

❌ Error 4/4

    > 1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }
        |                                                    ^^^^^^^^^ Enumeration value "VALUE_TWO" should have "ENUM" suffix

💡 Suggestion: Rename to "VALUE_TWOENUM"

    1 | type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWOENUM }
`;

exports[` 8`] = `
Code

      1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }

⚙️ Options

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
      }
    }

❌ Error 1/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |            ^^^^^^ Field "aField" should have "Field" prefix

💡 Suggestion: Rename to "FieldaField"

    1 | type One { FieldaField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }

❌ Error 2/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |                                      ^^^^^^^^^^^^^^^^ Enumeration value "A_ENUM_VALUE_ONE" should have "ENUM" prefix

💡 Suggestion: Rename to "ENUMA_ENUM_VALUE_ONE"

    1 | type One { aField: String } enum Z { ENUMA_ENUM_VALUE_ONE VALUE_TWO }

❌ Error 3/3

    > 1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }
        |                                                       ^^^^^^^^^ Enumeration value "VALUE_TWO" should have "ENUM" prefix

💡 Suggestion: Rename to "ENUMVALUE_TWO"

    1 | type One { aField: String } enum Z { A_ENUM_VALUE_ONE ENUMVALUE_TWO }
`;

exports[` 9`] = `
Code

      1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

⚙️ Options

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
      }
    }

❌ Error 1/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |      ^^^ Type "One" should not have "On" prefix

💡 Suggestion: Rename to "e"

    1 | type e { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

❌ Error 2/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |            ^^^^^^ Field "getFoo" should not have "Foo" suffix

💡 Suggestion: Rename to "get"

    1 | type One { get: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }

❌ Error 3/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                            ^^^^ Field "getA" should not have "get" prefix

💡 Suggestion: Rename to "A"

    1 | type One { getFoo: String, queryBar: String } type Query { A(id: ID!): String, queryB: String } extend type Query { getC: String }

❌ Error 4/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                                                   ^^^^^^ Field "queryB" should not have "query" prefix

💡 Suggestion: Rename to "B"

    1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, B: String } extend type Query { getC: String }

❌ Error 5/5

    > 1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }
        |                                                                                                                        ^^^^ Field "getC" should not have "get" prefix

💡 Suggestion: Rename to "C"

    1 | type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { C: String }
`;

exports[` 10`] = `
Code

      1 | query Foo { foo } query getBar { bar }

⚙️ Options

    {
      "OperationDefinition": {
        "style": "camelCase",
        "forbiddenPrefixes": [
          "get"
        ]
      }
    }

❌ Error 1/2

    > 1 | query Foo { foo } query getBar { bar }
        |       ^^^ Operation "Foo" should be in camelCase format

💡 Suggestion: Rename to "foo"

    1 | query foo { foo } query getBar { bar }

❌ Error 2/2

    > 1 | query Foo { foo } query getBar { bar }
        |                         ^^^^^^ Operation "getBar" should not have "get" prefix

💡 Suggestion: Rename to "Bar"

    1 | query Foo { foo } query Bar { bar }
`;

exports[` 11`] = `
Code

       1 |         type Query {
       2 |           fieldQuery: ID
       3 |           queryField: ID
       4 |           getField: ID
       5 |         }
       6 |         type Mutation {
       7 |           fieldMutation: ID
       8 |           mutationField: ID
       9 |         }
      10 |         type Subscription {
      11 |           fieldSubscription: ID
      12 |           subscriptionField: ID
      13 |         }

⚙️ Options

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
      }
    }

❌ Error 1/7

      1 |         type Query {
    > 2 |           fieldQuery: ID
        |           ^^^^^^^^^^ Field "fieldQuery" should not have "Query" suffix
      3 |           queryField: ID

💡 Suggestion: Rename to "field"

     1 |         type Query {
     2 |           field: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 2/7

      2 |           fieldQuery: ID
    > 3 |           queryField: ID
        |           ^^^^^^^^^^ Field "queryField" should not have "query" prefix
      4 |           getField: ID

💡 Suggestion: Rename to "Field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           Field: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 3/7

      3 |           queryField: ID
    > 4 |           getField: ID
        |           ^^^^^^^^ Field "getField" should not have "get" prefix
      5 |         }

💡 Suggestion: Rename to "Field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           Field: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 4/7

      6 |         type Mutation {
    > 7 |           fieldMutation: ID
        |           ^^^^^^^^^^^^^ Field "fieldMutation" should not have "Mutation" suffix
      8 |           mutationField: ID

💡 Suggestion: Rename to "field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           field: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 5/7

      7 |           fieldMutation: ID
    > 8 |           mutationField: ID
        |           ^^^^^^^^^^^^^ Field "mutationField" should not have "mutation" prefix
      9 |         }

💡 Suggestion: Rename to "Field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           Field: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 6/7

      10 |         type Subscription {
    > 11 |           fieldSubscription: ID
         |           ^^^^^^^^^^^^^^^^^ Field "fieldSubscription" should not have "Subscription" suffix
      12 |           subscriptionField: ID

💡 Suggestion: Rename to "field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           field: ID
    12 |           subscriptionField: ID
    13 |         }

❌ Error 7/7

      11 |           fieldSubscription: ID
    > 12 |           subscriptionField: ID
         |           ^^^^^^^^^^^^^^^^^ Field "subscriptionField" should not have "subscription" prefix
      13 |         }

💡 Suggestion: Rename to "Field"

     1 |         type Query {
     2 |           fieldQuery: ID
     3 |           queryField: ID
     4 |           getField: ID
     5 |         }
     6 |         type Mutation {
     7 |           fieldMutation: ID
     8 |           mutationField: ID
     9 |         }
    10 |         type Subscription {
    11 |           fieldSubscription: ID
    12 |           Field: ID
    13 |         }
`;

exports[` 12`] = `
Code

       1 |         query TestQuery { test }
       2 |         query QueryTest { test }
       3 |         query GetQuery { test }
       4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
       5 |         mutation TestMutation { test }
       6 |         mutation MutationTest { test }
       7 |         subscription TestSubscription { test }
       8 |         subscription SubscriptionTest { test }
       9 |         fragment TestFragment on Test { id }
      10 |         fragment FragmentTest on Test { id }

⚙️ Options

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
      }
    }

❌ Error 1/9

    > 1 |         query TestQuery { test }
        |               ^^^^^^^^^ Operation "TestQuery" should not have "Query" suffix
      2 |         query QueryTest { test }

💡 Suggestion: Rename to "Test"

     1 |         query Test { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 2/9

      1 |         query TestQuery { test }
    > 2 |         query QueryTest { test }
        |               ^^^^^^^^^ Operation "QueryTest" should not have "Query" prefix
      3 |         query GetQuery { test }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query Test { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 3/9

      2 |         query QueryTest { test }
    > 3 |         query GetQuery { test }
        |               ^^^^^^^^ Operation "GetQuery" should not have "Get" prefix
      4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }

💡 Suggestion: Rename to "Query"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query Query { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 4/9

      4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
    > 5 |         mutation TestMutation { test }
        |                  ^^^^^^^^^^^^ Operation "TestMutation" should not have "Mutation" suffix
      6 |         mutation MutationTest { test }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation Test { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 5/9

      5 |         mutation TestMutation { test }
    > 6 |         mutation MutationTest { test }
        |                  ^^^^^^^^^^^^ Operation "MutationTest" should not have "Mutation" prefix
      7 |         subscription TestSubscription { test }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation Test { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 6/9

      6 |         mutation MutationTest { test }
    > 7 |         subscription TestSubscription { test }
        |                      ^^^^^^^^^^^^^^^^ Operation "TestSubscription" should not have "Subscription" suffix
      8 |         subscription SubscriptionTest { test }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription Test { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 7/9

      7 |         subscription TestSubscription { test }
    > 8 |         subscription SubscriptionTest { test }
        |                      ^^^^^^^^^^^^^^^^ Operation "SubscriptionTest" should not have "Subscription" prefix
      9 |         fragment TestFragment on Test { id }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription Test { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 8/9

       8 |         subscription SubscriptionTest { test }
    >  9 |         fragment TestFragment on Test { id }
         |                  ^^^^^^^^^^^^ Fragment "TestFragment" should not have "Fragment" suffix
      10 |         fragment FragmentTest on Test { id }

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment Test on Test { id }
    10 |         fragment FragmentTest on Test { id }

❌ Error 9/9

       9 |         fragment TestFragment on Test { id }
    > 10 |         fragment FragmentTest on Test { id }
         |                  ^^^^^^^^^^^^ Fragment "FragmentTest" should not have "Fragment" prefix

💡 Suggestion: Rename to "Test"

     1 |         query TestQuery { test }
     2 |         query QueryTest { test }
     3 |         query GetQuery { test }
     4 |         query Test { test(CONTROLLED_BY_SCHEMA: 0) }
     5 |         mutation TestMutation { test }
     6 |         mutation MutationTest { test }
     7 |         subscription TestSubscription { test }
     8 |         subscription SubscriptionTest { test }
     9 |         fragment TestFragment on Test { id }
    10 |         fragment Test on Test { id }
`;

exports[` 13`] = `
Code

      1 |         {
      2 |           test {
      3 |             _badAlias: foo
      4 |             badAlias_: bar
      5 |             _ok
      6 |             ok_
      7 |           }
      8 |         }

❌ Error 1/2

      2 |           test {
    > 3 |             _badAlias: foo
        |             ^^^^^^^^^ Leading underscores are not allowed
      4 |             badAlias_: bar

💡 Suggestion: Rename to "badAlias"

    1 |         {
    2 |           test {
    3 |             badAlias: foo
    4 |             badAlias_: bar
    5 |             _ok
    6 |             ok_
    7 |           }
    8 |         }

❌ Error 2/2

      3 |             _badAlias: foo
    > 4 |             badAlias_: bar
        |             ^^^^^^^^^ Trailing underscores are not allowed
      5 |             _ok

💡 Suggestion: Rename to "badAlias"

    1 |         {
    2 |           test {
    3 |             _badAlias: foo
    4 |             badAlias: bar
    5 |             _ok
    6 |             ok_
    7 |           }
    8 |         }
`;
