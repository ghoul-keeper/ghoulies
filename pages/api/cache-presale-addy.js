import redis from "../../lib/redis";

export default async function set(req, res) {
  const { id } = req.body;

  await redis.hset("features", id, id);

  return res.status(200).json({ id });
}
