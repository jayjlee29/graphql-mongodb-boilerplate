import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { schemaComposer } from 'graphql-compose';

import * as typeDefs from './schema/schema.graphql';
import resolvers from './resolveMap';
import mongooseSchema from './mongooseSchema'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schemaComposer.merge(mongooseSchema)
schemaComposer.merge(schema)

export default schemaComposer.buildSchema();