# Credentials Location Report

## Summary
This document identifies all locations where credentials are stored in the IntegrationTestingFramework repository across different branches.

## ⚠️ CRITICAL SECURITY CONCERN
**Hardcoded credentials have been found in multiple files across the repository.** This is a serious security vulnerability and should be addressed immediately.

---

## Credential Locations

### 1. Database Credentials (SQL Server)

#### File: `tests/utils/dbUtils.ts` (Branch: DbExperiments)
- **Location**: Lines 11-14
- **Credentials Found**:
  - Username: `svc-jenkinsblds`
  - Password: `Pom1dor4ik`
  - Server: `AWECORPQA1DB01.onetech.local`
  - Database: `OTServices`

```typescript
constructor() {
    this.user = "svc-jenkinsblds";
    this.password = "Pom1dor4ik";
    this.server = "AWECORPQA1DB01.onetech.local";
    this.dataBase = "OTServices";
}
```

#### File: `tests/utils/dbUtilsSql.ts` (Branch: DbExperiments)
- **Location**: Lines 12-16
- **Credentials Found**:
  - Username: `svc-jenkinsblds`
  - Password: `Pom1dor4ik`
  - Server: `AWECORPQA1DB01.onetech.local`
  - Database: `OTServices`
  - Domain: `ONETECH.local`

```typescript
constructor() {
    this.user = "svc-jenkinsblds";
    this.password = "Pom1dor4ik";
    this.server = "AWECORPQA1DB01.onetech.local";
    this.dataBase = "OTServices";
    this.domain = "ONETECH.local"
}
```

#### File: `tests/utils/dbUtilsTedious.ts` (Branch: DbExperiments)
- **Location**: Lines 15-19
- **Credentials Found**:
  - Username: `svc-jenkinsblds`
  - Password: `Pom1dor4ik`
  - Server: `AWECORPQA1DB01.onetech.local`
  - Database: `OTServices`
  - Domain: `ONETECH.local`

```typescript
constructor() {
    this.user = "svc-jenkinsblds";
    this.password = "Pom1dor4ik";
    this.server = "AWECORPQA1DB01.onetech.local";
    this.dataBase = "OTServices";
    this.domain = "ONETECH.local"
}
```

---

### 2. Jenkins Credentials

#### File: `tests/utils/userUtils.ts` (Branch: DbExperiments and others)
- **Location**: Lines 42-45
- **Credentials Found**:
  - Jenkins URL: `https://awecorpjen001.onetech.local`
  - Jenkins Username: `svc-jenkinsblds`
  - Jenkins Password: `Pom1dor4ik`

```typescript
const jenkinsUrl = 'https://awecorpjen001.onetech.local';
const jobUrl = jenkinsUrl + '/job/Enroll_Products/build';
const jenkinsLogin = 'svc-jenkinsblds';
const jenkinsPassword = 'Pom1dor4ik'
```

---

### 3. Application Login Credentials

#### File: `tests/utils/userUtils.ts` (Branch: DbExperiments and others)
- **Location**: Lines 8-18
- **Credentials Found** (with environment variable fallback):
  - Default Email: `anneabtestcsid@dataart.com`
  - Default Password: `password1`

```typescript
getLogin() {
    const defaultLogin = 'anneabtestcsid@dataart.com';
    let user = process.env.login ? process.env.login : defaultLogin;
    console.log(`Current userName: ${user}`);
    return user;
}

getPassword() {
    const defaultPassword = 'password1'
    let password = process.env.password ? process.env.password : defaultPassword;
    console.log(`Current password: ${password}`);
    return password;
}
```

**Note**: These credentials support environment variable overrides (`process.env.login` and `process.env.password`), but still have hardcoded defaults.

---

## Branch Locations

The credentials appear in the following branches:

1. **DbExperiments** - Contains all database utility files with credentials
2. **experimentsBranch** - Similar structure, likely contains same credentials
3. **firstTestBranch** - May contain user credentials
4. **newTestLook** - Similar structure to DbExperiments

---

## Security Recommendations

### Immediate Actions Required:

1. **Remove all hardcoded credentials from the codebase**
   - Replace with environment variables
   - Use secure credential management systems

2. **Rotate all exposed credentials**
   - Database password for `svc-jenkinsblds`
   - Jenkins password for `svc-jenkinsblds`
   - Application test account password

3. **Update .gitignore**
   - Add `.env` files
   - Ensure sensitive configuration files are excluded

4. **Implement proper credential management**:
   ```typescript
   // Example for database credentials
   constructor() {
       this.user = process.env.DB_USER || '';
       this.password = process.env.DB_PASSWORD || '';
       this.server = process.env.DB_SERVER || '';
       this.dataBase = process.env.DB_NAME || '';
       
       if (!this.user || !this.password) {
           throw new Error('Database credentials not configured');
       }
   }
   ```

5. **Use environment-specific configuration**
   - Create `.env.example` with placeholder values
   - Document required environment variables in README
   - Use tools like `dotenv` for local development

6. **Add pre-commit hooks**
   - Scan for potential credential leaks
   - Tools like `git-secrets` or `detect-secrets`

7. **Review git history**
   - Consider using `git filter-repo` or `BFG Repo-Cleaner` to remove credentials from history
   - Note: This requires force-pushing and coordinating with all contributors

---

## Impact Assessment

**Severity**: **CRITICAL**

**Affected Systems**:
- SQL Server: `AWECORPQA1DB01.onetech.local`
- Jenkins: `awecorpjen001.onetech.local`
- Application test accounts

**Potential Risks**:
- Unauthorized database access
- Unauthorized Jenkins job execution
- Compromise of test accounts
- Lateral movement within the `ONETECH.local` domain

---

## Checklist for Remediation

- [ ] Remove hardcoded credentials from all files
- [ ] Implement environment variable-based configuration
- [ ] Rotate all exposed credentials
- [ ] Update documentation with secure practices
- [ ] Add `.env.example` file
- [ ] Update `.gitignore`
- [ ] Set up credential scanning in CI/CD
- [ ] Train team on secure credential management
- [ ] Review and clean git history (if necessary)
- [ ] Implement secret management solution (e.g., Azure Key Vault, HashiCorp Vault)

---

## Additional Notes

- The same service account (`svc-jenkinsblds`) is used for both database and Jenkins access
- Credentials are currently committed to multiple branches
- The framework uses Playwright for testing
- Some code already has partial environment variable support, which is a good starting point

---

**Report Generated**: January 15, 2026  
**Repository**: da-yeva-sokolianska/IntegrationTestingFramework
