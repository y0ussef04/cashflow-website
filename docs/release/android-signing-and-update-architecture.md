# CashFlow — Permanent Android Signing, Versioning & Update Reliability Architecture

**Status:** Verified & Enforced (Emulator-Tested, Non-Destructive)  
**Authoritative Ledger:** `release/android-release-history.json`  
**Scope:** Android Application (`com.cashflow.app`), Gradle Release Gates, Official Website Release Manifest, and In-Place Update Pipeline.

---

## 1. Root-Cause Investigation (Phase 1 Audit Findings)

### 1.1 Exact Cause of Historical APK Installation / Update Conflicts
The installation and update conflicts (`INSTALL_FAILED_UPDATE_INCOMPATIBLE` / `INSTALL_FAILED_VERSION_DOWNGRADE`) were caused by **three concurrent misconfigurations** in earlier builds:

1. **Signing Certificate Collision (`CN=Android Debug` vs. Production RSA-3072):**
   - In git `HEAD` (`598aea4e`) prior to the working-tree hardening, `app/build.gradle.kts` configured `buildTypes.release` with `signingConfig = signingConfigs.getByName("debug")`, signing `com.cashflow.app` with the local debug keystore (`CN=Android Debug`, SHA-256: `e4328766ef8a866510405a83bb54b95fdfab70c04013defb179a684de447ca98`).
   - Meanwhile, on `2026-11-21`, the permanent production keystore (`cashflow-app-signing.p12`, SHA-256: `2689db5025f902bf7399d5cf0b209dea67470fe581e24c5b6e15e2ac1153b90f`) was provisioned and used to sign `CashFlow-v1.0.0.apk` (`2026-11-23`).
   - Android rejects any update whose signing certificate differs from the currently installed package.
2. **Unisolated Build Variants Sharing `com.cashflow.app`:**
   - `stagingDebug`, `debug`, and `benchmark` did not define `applicationIdSuffix`. Installing any debug or staging build on a device or emulator overwrote or conflicted with the production `com.cashflow.app` package ID using the debug certificate.
3. **Version Code Regression (`versionCode` 2 → 1):**
   - `app/build/outputs/apk/staging/debug/app-staging-debug.apk` (`2026-11-21`) was built with `versionCode=2` (`versionName=1.1.0`) under `com.cashflow.app`, whereas the later `CashFlow-v1.0.0.apk` (`2026-11-23`) was built with `versionCode=1` (`versionName=1.0.0`). Android strictly rejects installing `versionCode=1` over `versionCode=2` (`INSTALL_FAILED_VERSION_DOWNGRADE`).

### 1.2 Baseline Production State Verified on `2026-11-25`
- **Live Website (`https://cashflow-website-1ur.pages.dev/release-manifest.json` & `/downloads/CashFlow-v1.0.0.apk`):**
  - `application_id`: `com.cashflow.app`, `version_code`: `1`, `version_name`: `1.0.0`, `size_bytes`: `3803931`
  - `apk_sha256`: `ec113e03c2c4d76710eb9c5818275bb5a1722489d74a29074988915759d55bbc`
  - `signer_cert_sha256`: `2689db5025f902bf7399d5cf0b209dea67470fe581e24c5b6e15e2ac1153b90f`
- **Emulator (`emulator-5554`) Installed Package:**
  - `com.cashflow.app` `versionCode=1`, `versionName=1.0.0`, signed with `2689db5025f902bf7399d5cf0b209dea67470fe581e24c5b6e15e2ac1153b90f` (byte-identical to the live website `CashFlow-v1.0.0.apk`).
  - **Conclusion:** Devices running the official `v1.0.0` website release already hold the permanent production signing certificate and **can be updated in place** to `v1.1.0+` without uninstalling or losing data.

---

## 2. Permanent Production Signing Identity

| Property | Approved Production Value |
|---|---|
| **Application ID** | `com.cashflow.app` (immutable) |
| **Keystore Format** | PKCS12 (`.p12`) |
| **Key Alias** | `cashflow-app-signing` |
| **Subject / Issuer DN** | `CN=CashFlow, OU=Android App Signing` |
| **Serial Number** | `00CA4C5426B981A323` |
| **Key Algorithm** | RSA 3072-bit (`SHA256withRSA`) |
| **Validity Window** | `2026-11-21T04:09:53+02:00` → `2126-11-22T04:09:53+02:00` (100 years) |
| **Certificate SHA-256** | `2689db5025f902bf7399d5cf0b209dea67470fe581e24c5b6e15e2ac1153b90f` |
| **Certificate SHA-1** | `99fce075edd64305d940621c56d7a07b8e189bf1` |
| **Public Key SHA-256** | `6db093925be3e459fc7a7dce5cc92af9401153056bab7839a3caed47804cd43c` |
| **APK Signature Schemes** | v2 (`enableV2Signing = true`) and v3 (`enableV3Signing = true`); v1 disabled (`minSdk = 26`) |

### Variant Package ID Isolation
To ensure debug/staging/benchmark builds can never collide with Production `com.cashflow.app`:
- `productionRelease` → `com.cashflow.app` (signed with permanent production keystore)
- `staging` flavor → `applicationIdSuffix = ".staging"`
- `debug` buildType → `applicationIdSuffix = ".debug"`
- `benchmark` buildType → `applicationIdSuffix = ".benchmark"`

---

## 3. Keystore Location & Secure Backup / Recovery Procedure

- **Live Keystore Path (outside repository):** `C:\Users\DELL\.cashflow-signing\cashflow-app-signing.p12`
- **Credentials Location (outside repository):** `C:\Users\DELL\.gradle\gradle.properties` (properties: `CASHFLOW_RELEASE_STORE_FILE`, `CASHFLOW_RELEASE_STORE_PASSWORD`, `CASHFLOW_RELEASE_KEY_ALIAS`, `CASHFLOW_RELEASE_KEY_PASSWORD`).
- **Source Control Enforcement:** `.gitignore` excludes `*.jks`, `*.keystore`, `*.p12`, `*.pfx`, `*.key`, `*.pem`, `keystore.properties`, `signing.properties`, and `production.properties`. `ValidateReleaseSigningConfiguration` also fails the build if any signing credential appears inside repository property files or if the keystore path resides inside the repository tree.
- **Encrypted Backup Archive:** `C:\Users\DELL\.cashflow-signing\cashflow-app-signing-backup.cfbk`
  - Cipher: AES-256-GCM (128-bit tag, 32-byte salt, 12-byte nonce, PBKDF2-HMAC-SHA256 with 600,000 iterations).
  - Archive SHA-256: `5F99B00F6A519F262D5C65510B1561A20D21A204E3B24AA2587EA6EFF09D66B9`.
  - Recovery password is protected locally via Windows DPAPI (`backup-recovery-password.dpapi`) and must be stored in an offline encrypted password manager; maintain two offline removable-drive copies of `cashflow-app-signing-backup.cfbk`, `BackupCipher.java`, `Restore-EncryptedBackup.ps1`, and `BACKUP-PLAN.md` in separate physical locations. Never upload keystores, `.cfbk`, or passwords to Git or cloud storage.

---

## 4. Versioning Policy & Release Build Procedure

### 4.1 Monotonic Versioning Policy
- **`versionCode`:** Strictly monotonically increasing integer (`1, 2, 3, ...`). Never reused or decremented.
- **`versionName`:** Strict `MAJOR.MINOR.PATCH` semantic version (e.g., `1.0.0`, `1.1.0`, `1.2.0`), never reused across published releases.
- **Authoritative Ledger:** `release/android-release-history.json` records `latest_published_version_code`, `latest_published_version_name`, `production_identity`, and every published release's `apk_sha256` and `size_bytes`.
- **Gradle Defaults & Overrides:** `app/build.gradle.kts` defaults to `CASHFLOW_VERSION_CODE` (`2`) and `CASHFLOW_VERSION_NAME` (`1.1.0`), or accepts `-PCASHFLOW_VERSION_CODE=<N> -PCASHFLOW_VERSION_NAME=<X.Y.Z>`.
- **Current Published Production Release (`v1.2.0`, `versionCode=3`):**
  - `apk_file_name`: `CashFlow-v1.2.0.apk`
  - `size_bytes`: `3852583`
  - `apk_sha256`: `7699994883db4f1ca24f2127acaa351983a97906dc98192ee80c8de9e61c018b`
  - `min_supported_version_code`: `1` (`1.0.0`)
  - `released_at`: `2026-11-25T01:00:16Z`
  - `download_url`: `https://cashflow-website-1ur.pages.dev/downloads/CashFlow-v1.2.0.apk`

### 4.2 Standard Release Build & Verification Commands
```powershell
# 1. Build & cryptographically verify Production Release APK (runs all Gradle gates automatically)
.\gradlew.bat assembleProductionRelease "-PCASHFLOW_VERSION_CODE=3" "-PCASHFLOW_VERSION_NAME=1.2.0"

# 2. Run standalone release gate against candidate or published APK
node scripts/verify-release-gate.mjs --apk website\public\downloads\CashFlow-v1.2.0.apk --manifest website\public\release-manifest.json --mode published

# 3. Verify website manifest alignment & contracts
cd website
npm run typecheck; npm run build; npm test; npm run verify
```

### 4.3 Automated Release Gates (Gradle + Node + Website)
Release builds or publishing fail closed on any of the following conditions:
1. **Unexpected `applicationId` change** (`ValidateProductionReleaseIdentityAndVersion`, `VerifyProductionReleaseArtifact`, `verify-release-gate.mjs` `[GATE_APP_ID_MISMATCH]`, `website/src/lib/releaseManifest.ts`).
2. **Certificate mismatch** (`ValidateReleaseSigningConfiguration`, `VerifyProductionReleaseArtifact`, `verify-release-gate.mjs` `[GATE_CERT_MISMATCH]`, `website/src/lib/releaseManifest.ts`).
3. **Non-increasing `versionCode` or reused `versionName`** (`ValidateProductionReleaseIdentityAndVersion`, `VerifyProductionReleaseArtifact`, `verify-release-gate.mjs` `[GATE_VERSION_NOT_INCREASING]`).
4. **Debug signing or `android:debuggable=true` on production** (`ValidateReleaseSigningConfiguration`, `ValidateProductionReleaseIdentityAndVersion`, `VerifyProductionReleaseArtifact`, `verify-release-gate.mjs` `[GATE_DEBUG_SIGNING]`).
5. **Invalid/tampered APK signature or missing Scheme v2** (`VerifyProductionReleaseArtifact`, `verify-release-gate.mjs` `[GATE_INVALID_SIGNATURE]`).
6. **Incomplete/truncated/corrupted APK archive** (`VerifyProductionReleaseArtifact` ZIP stream CRC check, `verify-release-gate.mjs` ZIP Central Directory check `[GATE_CORRUPT_ARTIFACT]`).

---

## 5. Official Update Architecture & Data Preservation

- **Manifest Discovery (`AppUpdateManager` + `AppUpdateManifestValidator`):**
  - Fetches `https://cashflow-website-1ur.pages.dev/release-manifest.json` over HTTPS (`Cache-Control: no-cache`, 64 KB cap, redirects disabled).
  - Enforces `application_id == com.cashflow.app`, `min_sdk <= deviceSdk`, HTTPS `.apk` URL on the official host, pinned production certificate (`APPROVED_SIGNER_CERT_SHA256`), non-debug certificate, and `version_code > installedVersionCode`.
- **Pre-Download & Pre-Install Safety:**
  - Checks available storage via `StatFs` (`2 * sizeBytes + 32 MB` headroom before download; `sizeBytes + 32 MB` before `PackageInstaller` commit).
  - Downloads to a `.part` file with cancellation and byte-count enforcement; any network drop (`EOFException`/`IOException`) or user cancellation deletes the `.part` file cleanly.
  - Verifies exact byte size, full-file SHA-256, ZIP archive completeness (`AndroidManifest.xml`, `classes.dex`, `resources.arsc` + CRC32), `PackageManager.getPackageArchiveInfo` signature block, `versionCode`, non-debuggability, and certificate match **before** creating a `PackageInstaller` session.
- **In-Place Installation & Data Preservation:**
  - Runs `PRAGMA wal_checkpoint(PASSIVE)` on `CashFlowDatabase` before committing `PackageInstaller.SessionParams(MODE_FULL_INSTALL)`.
  - Never uninstalls the previous app and never clears Room (`cashflow_db.sqlite`), DataStore (`cashflow_user_settings`), or `AndroidEncryptedLicenseStore`.
  - Handles `STATUS_FAILURE_ABORTED` (user cancelled), `STATUS_FAILURE_STORAGE`, `STATUS_FAILURE_CONFLICT`/`INCOMPATIBLE`, and missing `REQUEST_INSTALL_PACKAGES` permission gracefully in `SettingsScreenV2`.
- **Website & Admin Dashboard Integration:**
  - `website/public/release-manifest.json` is the single authoritative manifest consumed by both the Android app (`AppUpdateManager`) and the static website (`DownloadSection`, privacy modal, and `verify-local-artifacts.mjs`).
  - `website/public/_headers` enforces `Cache-Control: no-store, max-age=0, must-revalidate` on `/release-manifest.json` and `Content-Type: application/vnd.android.package-archive`, `X-Content-Type-Options: nosniff`, `Cache-Control: public, max-age=31536000, immutable` on `/downloads/*.apk`. Both `CashFlow-v1.0.0.apk` and `CashFlow-v1.2.0.apk` remain hosted in `website/public/downloads/`.
  - `admin-dashboard/src/components/modules/AppReleasesModule.tsx` + `admin-dashboard/src/lib/releasePolicy.ts` provide fail-closed release draft/publish validation, in-browser SHA-256 (`crypto.subtle`) and ZIP entry verification, `release-manifest.json` export, and a local audit trail.

---

## 6. Verification & Emulator Upgrade Test Results (`2026-11-25`)

All upgrade tests were executed exclusively on Android emulator `emulator-5554` (API 35). No physical device was used.

| Test Case | Result | Evidence / Observed Outcome |
|---|---|---|
| **Website Contracts, Typecheck, Build, Verify** | **PASS** | `11/11` Node contract tests, `tsc --noEmit`, `next build`, `verify-local-artifacts.mjs` |
| **Android Unit Tests (`AppUpdateManagerAndVerifierTest`, `LocalBackupManagerTest`, `OnboardingAndUpgradeGateTest`)** | **PASS** | `AppUpdateManagerAndVerifierTest`, `LocalBackupManagerTest` (`27/27`), `OnboardingAndUpgradeGateTest` all green |
| **Automated Release Gate Suite (`scripts/verify-release-gate.test.mjs`)** | **PASS** | `8/8` scenarios passed (published `v1.2.0`, candidate `v1.2.0` vs `v1.0.0`, downgrade fail, debug-signed fail, wrong `appId` fail, wrong cert fail, tampered signature fail, truncated APK fail) |
| **Gradle Negative Release Gates** | **PASS** | Non-zero exit verified for `versionCode=1`, wrong keystore, and wrong-key APK |
| **Emulator Baseline (`v1.0.0`, code 1)** | **PASS** | `firstInstallTime=2026-11-24 20:21:58`; created `UpgradeTest` Vodafone Cash wallet (`01099887766`, 5,000 EGP) + 500 EGP Cash In tx (Cashbox: 500 EGP, Wallet: 4,500 EGP) |
| **Wrong-Key APK Rejection** | **PASS** | `INSTALL_FAILED_UPDATE_INCOMPATIBLE` verified against both `v1.0.0` and `v1.2.0` |
| **In-Place Upgrade #1 (`v1.0.0` → `v1.1.0`, code 2)** | **PASS** | `Success`; `versionCode=2`, `firstInstallTime` unchanged; `5,000 ج.م` total, `500 ج.م` cashbox, `4,500 ج.م` wallet, `1 عملية اليوم` preserved |
| **Consecutive Upgrade #2 (`v1.1.0` → `v1.2.0`, code 3)** | **PASS** | `Success`; `versionCode=3`, `firstInstallTime` unchanged; all balances & transaction preserved |
| **PackageInstaller Session Cancellation** | **PASS** | `pm install-create` + `pm install-abandon` succeeded; `v1.2.0` and all data remained intact |

---

## 7. Recovery Procedures

1. **Lost Keystore on Workstation:** Restore `cashflow-app-signing.p12` and `gradle.properties` from `cashflow-app-signing-backup.cfbk` using `Restore-EncryptedBackup.ps1` and `BackupCipher.java` as documented in `BACKUP-PLAN.md`. Never generate a new production key.
2. **Bad Release Published:** Never attempt a versionCode downgrade (Android blocks it). Update `release-manifest.json` only to a forward-fixed release with `versionCode > latest_published_version_code` signed with `cashflow-app-signing.p12`, or temporarily point `release-manifest.json` to the previous higher/compatible release only if no clients have upgraded past it.
3. **One-Time Migration for Any Legacy Pre-Nov-23 Debug-Signed Install:**
   - Any internal test device that installed a pre-`2026-11-23` debug-signed `com.cashflow.app` APK cannot upgrade in place to the production RSA-3072 build due to Android's signature enforcement.
   - **Safe Migration:** Open **Settings → Backup & Export → Save Backup to Device** (`.cashflowbak` ZIP with SHA-256 & SQLite integrity verification), verify the backup file exists, uninstall the legacy debug build, install the official `CashFlow` production APK, and use **Settings → Restore Local Backup**. Note: device-bound subscription licenses require re-syncing/transferring via the owner admin dashboard if the device identity changes.
