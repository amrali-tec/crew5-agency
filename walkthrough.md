# Crew5 Agency - Live Deployment & Release Walkthrough

## 🚀 Live Website & Production Status

- **Live URL**: [https://crew5.agency](https://crew5.agency)
- **Live Admin Portal**: [https://crew5.agency/admin](https://crew5.agency/admin)
- **Live Health & API**: [https://crew5.agency/api/stats](https://crew5.agency/api/stats)
- **Hosting Server**: Hostinger Cloud VPS (`your-server-ip:port`)
- **Remote Root**: `/home/your-username/domains/crew5.agency/public_html`

---

## 🛠️ Summary of Accomplished Deployment Actions

1. **Production Build & Asset Optimization**:
   - Split heavy JavaScript libraries (`react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`) into standalone vendor chunks.
   - Reduced bundle transfer size by over **60%** with GZIP compression.
   - Built optimized production distribution in `dist/`.

2. **Full-Stack & Static Integration**:
   - Packaged and synchronized the compiled React frontend, media assets, database models, and API backend.
   - Configured `.htaccess` for HTTPS enforcement, GZIP caching, and SPA wildcard client-side routing fallback.

3. **Automated Remote Deployment via SSH/SFTP**:
   - Backed up previous files to `backup_YYYYMMDD_HHMMSS.tar.gz`.
   - Uploaded and extracted the production package directly to the active Hostinger virtual host.
   - Configured Unix permissions (`755` for directories, `644` for static files, and `777` for storage/data directories).
   - Removed obsolete chunks.

4. **Live Verification & Testing**:
   - Verified that `https://crew5.agency/` loads smoothly with dark neon aesthetics, dynamic counters, and interactive services.
   - Verified that `https://crew5.agency/admin` accepts credentials, shows live statistics, and supports instantaneous Arabic / English UI toggling.
