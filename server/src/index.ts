import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import microOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microOrmConfig);

  const post = orm.em.create(Post, { title: "My first post" });

  await orm.em.persistAndFlush(post);
};

main().catch((e) => console.error(e));
