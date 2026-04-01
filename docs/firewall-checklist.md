# Firewall Checklist

- Allow inbound `22/tcp` from trusted admin IPs only.
- Allow inbound `80/tcp` for HTTP redirect and ACME challenge.
- Allow inbound `443/tcp` for HTTPS.
- Deny direct public access to Appwrite and n8n container ports.
- Restrict Docker daemon access to local root and sudo users only.
- Enable `ufw` or cloud firewall logging for denied traffic.
- Install `fail2ban` for SSH protection.
