# Zenith Security Architecture & Setup

Security is treated as a core architectural foundation from Day 1—not an afterthought or a patch applied before deployment. We utilize a **defense-in-depth pipeline** spanning validation, identity management, static code analysis, and supply-chain protection.

---

## 1. Core Security Philosophy
* **Day-1 Integration:** Security boundaries are established alongside the initial UI and base layout structure.
* **Zero-Trust UI:** The client environment is untrusted. Critical business logic, authorization, and data validation always occur at the boundary or server level.
* **Strict Input Boundaries:** No raw or unchecked inputs are allowed to cross system boundaries.

---

## 2. Security Tech Stack

### A. Runtime Validation: **Zod**
* **Purpose:** Enforces strict runtime type-checking and schema validation for all data entering the system.
* **Implementation:** All form inputs, URL parameters, and API payloads must pass through Zod schemas before interacting with app state or backend services to prevent malformed data or injection vectors.

### B. Identity & Session Core: **Supabase Auth / Better Auth**
* **Purpose:** Handles user sessions, password hashing, Multi-Factor Authentication (MFA), and secure token exchange.
* **Implementation:** Avoid storing raw JWTs or session tokens in `localStorage` (vulnerable to XSS). Utilize encrypted, HTTP-only cookies managed by the auth provider.

### C. IDE Static Analysis: **`eslint-plugin-security`**
* **Purpose:** Lints JavaScript/TypeScript code specifically for security vulnerabilities.
* **Implementation:** Acts as an automated guardian inside the code editor (VS Code, Cursor, Windsurf) to flag dangerous patterns (e.g., unsafe regex, object injection) during active development.

### D. Supply Chain Shield: **Socket.dev / Dependabot**
* **Purpose:** Monitors third-party npm packages for malware, suspicious behavior, and known vulnerabilities.
* **Implementation:** Automated alerts and dependency scanning to prevent supply-chain poisoning from open-source dependencies.

---

## 3. Implementation Checklist for Zenith
- [ ] Initialize Zod schemas for incoming user inputs and authentication forms.
- [ ] Configure secure, HTTP-only cookie-based session handling via the auth provider.
- [ ] Install and configure `eslint-plugin-security` rules in the linting pipeline.
- [ ] Enable dependency monitoring tools (`Dependabot` or `Socket.dev`) on the repository.