# Credentials Quick Reference

## Found Credentials Summary

### 🔴 Database Credentials (SQL Server)
- **Username**: `svc-jenkinsblds`
- **Password**: `Pom1dor4ik`
- **Server**: `AWECORPQA1DB01.onetech.local`
- **Database**: `OTServices`
- **Domain**: `ONETECH.local`

**Found in**:
- `tests/utils/dbUtils.ts` (line 11-14)
- `tests/utils/dbUtilsSql.ts` (line 12-16)
- `tests/utils/dbUtilsTedious.ts` (line 15-19)

### 🔴 Jenkins Credentials
- **URL**: `https://awecorpjen001.onetech.local`
- **Username**: `svc-jenkinsblds`
- **Password**: `Pom1dor4ik`

**Found in**:
- `tests/utils/userUtils.ts` (line 42-45)

### 🟡 Application Test Credentials
- **Email**: `anneabtestcsid@dataart.com`
- **Password**: `password1`

**Found in**:
- `tests/utils/userUtils.ts` (line 8-18)
- Note: Has environment variable fallback support

## Branches Affected
- DbExperiments
- experimentsBranch
- firstTestBranch
- newTestLook

## See CREDENTIALS_LOCATION.md for:
- Detailed code snippets
- Security recommendations
- Remediation checklist
- Complete impact assessment
