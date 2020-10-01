import { PostResolver } from "./resolvers/post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import microOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const orm = await MikroORM.init(microOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000);
};

main().catch((e) => console.error(e));
