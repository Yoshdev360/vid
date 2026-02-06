import { Context } from "hono";

export async function getMissions(c: Context) {
  const user = c.get("user");
  
  const missions = await c.env.DB.prepare(`
    SELECT 
      m.*,
      CASE WHEN um.is_completed = 1 THEN 1 ELSE 0 END as is_completed,
      um.completed_at
    FROM missions m
    LEFT JOIN user_missions um ON m.id = um.mission_id AND um.user_id = ?
    WHERE m.is_active = 1
    ORDER BY m.id
  `)
    .bind(user.id)
    .all();

  return c.json(missions.results);
}

export async function completeMission(c: Context) {
  const user = c.get("user");
  const body = await c.req.json();
  const { mission_id } = body;

  // Check if mission exists and is active
  const mission = await c.env.DB.prepare(
    "SELECT * FROM missions WHERE id = ? AND is_active = 1"
  )
    .bind(mission_id)
    .first();

  if (!mission) {
    return c.json({ error: "Mission not found" }, 404);
  }

  // Check if already completed
  const existing = await c.env.DB.prepare(
    "SELECT * FROM user_missions WHERE user_id = ? AND mission_id = ?"
  )
    .bind(user.id, mission_id)
    .first();

  if (existing && existing.is_completed) {
    return c.json({ error: "Mission already completed" }, 400);
  }

  // Mark as completed
  if (existing) {
    await c.env.DB.prepare(
      "UPDATE user_missions SET is_completed = 1, completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND mission_id = ?"
    )
      .bind(user.id, mission_id)
      .run();
  } else {
    await c.env.DB.prepare(
      "INSERT INTO user_missions (user_id, mission_id, is_completed, completed_at) VALUES (?, ?, 1, CURRENT_TIMESTAMP)"
    )
      .bind(user.id, mission_id)
      .run();
  }

  // Get current profile
  const profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user.id)
    .first();

  if (!profile) {
    return c.json({ error: "Profile not found" }, 404);
  }

  const rewardCoins = mission.reward_coins as number;
  const newBalance = (profile.coins as number) + rewardCoins;

  // Update coins
  await c.env.DB.prepare(
    "UPDATE user_profiles SET coins = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?"
  )
    .bind(newBalance, user.id)
    .run();

  // Record transaction
  await c.env.DB.prepare(
    "INSERT INTO coin_transactions (user_id, amount, description, balance_after) VALUES (?, ?, ?, ?)"
  )
    .bind(user.id, rewardCoins, `Misión completada: ${mission.title}`, newBalance)
    .run();

  // Log mission completion activity
  await c.env.DB.prepare(
    "INSERT INTO user_activities (user_id, activity_type, description, metadata) VALUES (?, ?, ?, ?)"
  )
    .bind(user.id, "mission_completed", `Misión completada: ${mission.title}`, JSON.stringify({ reward: rewardCoins }))
    .run();

  return c.json({ success: true, coins_earned: rewardCoins });
}
