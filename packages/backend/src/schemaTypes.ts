import { z } from 'zod';
import { scalarType } from 'nexus';
import { Kind } from 'graphql';

const stringSchema = z.string();
const dateSchema = z.date();

export * from './schemaModules/accounts';

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(stringSchema.parse(value));
  },
  serialize(value) {
    return dateSchema.parse(value).getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
