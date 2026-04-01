module.exports = async ({ req, res, log }) => {
  const payload = JSON.parse(req.body || "{}");
  log(`Matching translators for job ${payload.jobId || "unknown"}`);

  return res.json({
    ok: true,
    workflow: "job-alert-matcher",
    matchedUsing: [
      "languagePairs",
      "specialties",
      "country",
      "experienceLevel",
      "catTools"
    ],
    payload
  });
};
