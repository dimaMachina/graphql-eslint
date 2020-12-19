# `input-name`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/input-name`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".
Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/input-name: ["error", [{"checkInputType":true}]]

type Mutation {
  SetMessage(message: InputMessage): String
}
```

### Correct (with checkInputType)

```graphql
# eslint @graphql-eslint/input-name: ["error", [{"checkInputType":true}]]

type Mutation {
  SetMessage(input: SetMessageInput): String
}
```

### Correct (without checkInputType)

```graphql
# eslint @graphql-eslint/input-name: ["error", [{"checkInputType":false}]]

type Mutation {
  SetMessage(input: AnyInputTypeName): String
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `checkInputType` (boolean)

Default: `"true"`