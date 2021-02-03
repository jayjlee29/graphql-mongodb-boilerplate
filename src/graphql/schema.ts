'use strict'
import path from 'path'
import 'graphql-import-node';
//import { makeExecutableSchema, mergeSchemas} from 'graphql-tools';
import { mergeTypeDefs, mergeResolvers, mergeSchemas } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { schemaComposer,  } from 'graphql-compose';
import mongooseSchema from './mongooseSchema'
import typeDef from './gql/typedef.gql';
import resolver from './resolveMap';


// const schema: GraphQLSchema = makeExecutableSchema({
//    typeDefs: typeDef,
//    resolvers: resolver,
//    allowUndefinedInResolve: false
//  });
//schemaComposer.merge(schema)

// const typesArray = loadFilesSync(path.join(__dirname, './gql'));
//const typeDefs = mergeTypeDefs(typesArray);

const mergedSchema = mergeSchemas({
  schemas: [mongooseSchema],
  typeDefs: [typeDef],
  resolvers: [resolver]
})
schemaComposer.merge(mergedSchema)
schemaComposer.merge(mongooseSchema)


export default schemaComposer.buildSchema();