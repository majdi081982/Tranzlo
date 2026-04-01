# DNS Checklist

- Create `A` record for `tranzlo.net` to the VPS IP.
- Create `A` record for `www.tranzlo.net` to the VPS IP.
- Create `A` record for `appwrite.tranzlo.net` to the VPS IP.
- Create `A` record for `n8n.tranzlo.net` to the VPS IP.
- Lower TTL during first deployment.
- Confirm reverse proxy host rules match the exact DNS names.
- Verify TLS certificate coverage for all four hostnames.
