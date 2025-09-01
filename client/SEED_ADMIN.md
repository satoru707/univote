# Admin Account Setup

This document describes how to create admin accounts for the UniVote system.

## Creating Admin Accounts

Admin accounts should be created directly in the database with the following structure:

### Database Setup (Example SQL)

```sql
-- Create admin user
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@university.edu',
  now(),
  now(),
  now()
);

-- Create admin profile
INSERT INTO public.admin_profiles (id, email, role, created_at)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@university.edu'),
  'admin@university.edu',
  'admin',
  now()
);
```

### Demo/Development Credentials

For testing and development purposes, use these credentials:

**Email**: `admin@university.edu`  
**Password**: `admin123`

### Production Setup

For production environments:

1. **Strong Passwords**: Use complex passwords with minimum 12 characters
2. **Multi-Factor Authentication**: Enable 2FA for all admin accounts
3. **Email Verification**: Ensure admin emails are verified university addresses
4. **Role Assignment**: Assign appropriate admin roles (super_admin, election_admin, etc.)
5. **Audit Logging**: Enable audit logging for all admin actions

### Recommended Admin Roles

- **Super Admin**: Full system access, can create other admins
- **Election Admin**: Can create and manage elections
- **Observer**: Read-only access to election data and results

### Security Best Practices

1. **Regular Password Updates**: Require password changes every 90 days
2. **Session Management**: Implement session timeout (15 minutes idle)
3. **IP Restrictions**: Limit admin access to university networks
4. **Activity Monitoring**: Log all admin actions with timestamps
5. **Backup Access**: Maintain emergency access procedures

### Environment-Specific Setup

#### Development
```bash
# Add to your backend seed script
npm run seed:admin
```

#### Staging
```bash
# Use staging-specific credentials
ADMIN_EMAIL=staging-admin@university.edu
ADMIN_PASSWORD=staging-secure-password
```

#### Production
```bash
# Use secure production credentials
ADMIN_EMAIL=admin@university.edu
ADMIN_PASSWORD=<secure-production-password>
```

## Testing Admin Functionality

Once an admin account is created, test the following flows:

1. **Login Flow**: Verify admin can log in with correct credentials
2. **Election Creation**: Create a test election with candidates
3. **Election Management**: Open/close elections, view statistics
4. **Results Access**: Verify admin can view results at any time
5. **Audit Functions**: Check vote logs and integrity reports

## Troubleshooting

### Common Issues

**Admin Cannot Login**
- Verify email and password are correct
- Check if account exists in database
- Verify admin role is properly assigned

**Admin Cannot Create Elections**
- Verify admin has proper permissions
- Check if required fields are filled
- Ensure candidate data is valid

**Admin Cannot Access Results**
- Verify election exists
- Check if results are available
- Ensure admin has read permissions

### Support Contacts

- **Technical Issues**: it-support@university.edu
- **Election Issues**: electoral-office@university.edu
- **Security Concerns**: security@university.edu

---

**Important**: Keep admin credentials secure and follow university security policies.