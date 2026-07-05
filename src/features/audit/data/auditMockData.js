



export const AUDIT_STATUSES = ['Open', 'In Progress', 'Closed', 'Escalated'];
export const AUDIT_TYPES = ['Internal', 'External', 'Regulatory', 'Compliance', 'IT'];

export const AUDIT_SUMMARY = {
  total: 18, open: 4, inProgress: 5, closed: 7, escalated: 2
};

export const AUDIT_MOCK_DATA = [
{
  id: 'AU-001', title: 'Q1 Financial Controls Audit',
  type: 'Internal', status: 'Closed', auditor: 'David Lee',
  startDate: '2025-01-10', endDate: '2025-02-14',
  findings: 3, criticalFindings: 0,
  description: 'Review of Q1 financial reporting controls and SOX compliance.'
},
{
  id: 'AU-002', title: 'ISO 27001 Surveillance Audit',
  type: 'External', status: 'Closed', auditor: 'BSI Auditors',
  startDate: '2025-02-01', endDate: '2025-02-28',
  findings: 6, criticalFindings: 1,
  description: 'Annual ISO 27001 surveillance by external certification body.'
},
{
  id: 'AU-003', title: 'Vendor Payment Process Review',
  type: 'Internal', status: 'In Progress', auditor: 'Carol Smith',
  startDate: '2025-05-01', endDate: '2025-07-31',
  findings: 2, criticalFindings: 0,
  description: 'Audit of vendor onboarding, payment approval, and disbursement processes.'
},
{
  id: 'AU-004', title: 'GDPR Data Handling Audit',
  type: 'Compliance', status: 'In Progress', auditor: 'Alice Johnson',
  startDate: '2025-05-15', endDate: '2025-08-15',
  findings: 4, criticalFindings: 1,
  description: 'Assessment of personal data processing, consent management, and DSAR procedures.'
},
{
  id: 'AU-005', title: 'IT Infrastructure Security Audit',
  type: 'IT', status: 'Open', auditor: 'Eva Chen',
  startDate: '2025-06-01', endDate: '2025-09-01',
  findings: 0, criticalFindings: 0,
  description: 'Comprehensive review of network security, access controls, and patch management.'
},
{
  id: 'AU-006', title: 'PCI-DSS Level 1 Assessment',
  type: 'Regulatory', status: 'Escalated', auditor: 'Qualified Security Assessor',
  startDate: '2025-03-01', endDate: '2025-06-01',
  findings: 8, criticalFindings: 3,
  description: 'Annual PCI-DSS Level 1 assessment for cardholder data environment.'
},
{
  id: 'AU-007', title: 'HR Policy & Process Audit',
  type: 'Internal', status: 'Closed', auditor: 'Bob Martinez',
  startDate: '2025-01-20', endDate: '2025-03-20',
  findings: 1, criticalFindings: 0,
  description: 'Review of HR hiring, termination, and performance review processes.'
},
{
  id: 'AU-008', title: 'Supply Chain Risk Audit',
  type: 'Internal', status: 'Open', auditor: 'Carol Smith',
  startDate: '2025-07-01', endDate: '2025-09-30',
  findings: 0, criticalFindings: 0,
  description: 'Assessment of third-party supplier risk management and due diligence.'
}];


export const SYSTEM_LOGS_DATA = [
{ id: 'SL-001', timestamp: '2025-07-04 09:12:34', action: 'User Login', user: 'alice.johnson@corp.com', module: 'Auth', level: 'Info', detail: 'Successful login from 192.168.1.45' },
{ id: 'SL-002', timestamp: '2025-07-04 09:15:02', action: 'Procurement Created', user: 'carol.smith@corp.com', module: 'Procurement', level: 'Info', detail: 'PR-2025-013 created for $45,000' },
{ id: 'SL-003', timestamp: '2025-07-04 09:44:18', action: 'Unauthorized Access Attempt', user: 'unknown', module: 'Auth', level: 'Warning', detail: 'Failed login attempt – account locked after 5 tries' },
{ id: 'SL-004', timestamp: '2025-07-04 10:05:50', action: 'Vendor Record Updated', user: 'david.lee@corp.com', module: 'Vendors', level: 'Info', detail: 'Vendor v004 compliance score updated to 55' },
{ id: 'SL-005', timestamp: '2025-07-04 10:30:22', action: 'Report Exported', user: 'bob.martinez@corp.com', module: 'Reports', level: 'Info', detail: 'Compliance report exported to CSV' },
{ id: 'SL-006', timestamp: '2025-07-04 11:00:00', action: 'Risk Escalated', user: 'eva.chen@corp.com', module: 'Risk', level: 'Warning', detail: 'RK-006 escalated to Critical level' },
{ id: 'SL-007', timestamp: '2025-07-04 11:22:45', action: 'User Role Changed', user: 'admin@corp.com', module: 'Settings', level: 'Critical', detail: 'bob.martinez role changed from Employee to Procurement Manager' },
{ id: 'SL-008', timestamp: '2025-07-04 14:05:11', action: 'Approval Rejected', user: 'alice.johnson@corp.com', module: 'Procurement', level: 'Info', detail: 'PR-2025-010 rejected – budget exceeded threshold' }];


export const USER_ACTIVITY_DATA = [
{ id: 'UA-001', timestamp: '2025-07-04 09:12:34', user: 'Alice Johnson', action: 'Logged in', module: 'Auth', ip: '192.168.1.45' },
{ id: 'UA-002', timestamp: '2025-07-04 09:20:00', user: 'Carol Smith', action: 'Created procurement request PR-2025-013', module: 'Procurement', ip: '10.0.0.12' },
{ id: 'UA-003', timestamp: '2025-07-04 09:44:18', user: 'Unknown', action: 'Failed login attempt (5 tries)', module: 'Auth', ip: '203.45.12.99' },
{ id: 'UA-004', timestamp: '2025-07-04 10:05:50', user: 'David Lee', action: 'Updated vendor v004 compliance record', module: 'Vendors', ip: '10.0.0.23' },
{ id: 'UA-005', timestamp: '2025-07-04 10:30:22', user: 'Bob Martinez', action: 'Exported compliance report', module: 'Reports', ip: '10.0.0.34' },
{ id: 'UA-006', timestamp: '2025-07-04 11:00:00', user: 'Eva Chen', action: 'Escalated risk RK-006 to Critical', module: 'Risk', ip: '10.0.0.11' },
{ id: 'UA-007', timestamp: '2025-07-04 11:22:45', user: 'Admin', action: 'Changed role for bob.martinez', module: 'Settings', ip: '10.0.0.1' }];