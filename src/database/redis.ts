import { createClient, RedisClientType } from "redis";

let client: RedisClientType | undefined;

export async function conectarRedis(): Promise<void> {
  const url = process.env.REDIS_URL as string;

  client = createClient({ url });

  client.on("error", (err) => {
    console.error("Erro no Redis:", err);
  });

  await client.connect();

  console.log("Conectado ao Redis!");
}

export function getRedisClient(): RedisClientType {
  if (!client) {
    throw new Error("Redis não conectado. Chame conectarRedis() primeiro.");
  }
  return client;
}
