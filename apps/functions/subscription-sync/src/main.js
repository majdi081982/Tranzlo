module.exports = async ({ req, res, log }) => {
  const payload = JSON.parse(req.body || "{}");
  log(`Syncing subscription update ${payload.providerEventId || "unknown"}`);

  return res.json({
    ok: true,
    workflow: "subscription-sync",
    targetCollections: ["subscriptions", "payments", "audit_logs"],
    payload
  });
};
