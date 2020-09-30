# Enforce names of input parameters and input types

- Name: `input-name`
- Requires GraphQL Schema: `false`

Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.

## Rule Details

This rule enforces all input parameters to be named `input`, and all InputTypes to use the name of the mutation + `'Input'`.

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/input-name: ["error", { checkInputType: true }]

type Mutation {
  SetMessage(message: InputMessage): String
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/input-name: ["error", { checkInputType: true }]

type Mutation {
  SetMessage(input: SetMessageInput): String
}
```

```graphql
# eslint @graphql-eslint/input-name: ["error", { checkInputType: false }]

type Mutation {
  SetMessage(input: AnyInputTypeName): String
}
```

## Configuration

This rule accepts one option `checkInputType`. If `true` (default) it will verify that the name of the input type matches name of the mutation + 'Input'. If `false` it will not check InputType name.
