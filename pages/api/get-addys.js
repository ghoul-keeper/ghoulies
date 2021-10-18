import redis from "../../lib/redis";

export default async function get(req, res) {
  const features = await redis.hvals("features");

  return res.status(200).json({ features });
}
