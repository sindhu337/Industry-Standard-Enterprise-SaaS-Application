



export const COMPLIANCE_FRAMEWORKS = ['GDPR', 'ISO 27001', 'SOC 2', 'PCI-DSS', 'HIPAA', 'ISO 9001', 'SOX'];
export const COMPLIANCE_STATUSES = ['Compliant', 'Non-Compliant', 'Under Review', 'Expired'];

export const COMPLIANCE_SUMMARY = {
  total: 14, compliant: 8, nonCompliant: 3, underReview: 2, expired: 1,
  overallScore: 76
};

export const COMPLIANCE_MOCK_DATA = [
{
  id: 'CM-001', framework: 'GDPR', status: 'Compliant', score: 94,
  owner: 'David Lee', lastAudit: '2025-02-15', nextAudit: '2026-02-15',
  controls: 42, passed: 40, findings: 2,
  description: 'General Data Protection Regulation – EU data privacy standard.'
},
{
  id: 'CM-002', framework: 'ISO 27001', status: 'Compliant', score: 88,
  owner: 'Eva Chen', lastAudit: '2025-03-10', nextAudit: '2026-03-10',
  controls: 114, passed: 100, findings: 14,
  description: 'Information Security Management System international standard.'
},
{
  id: 'CM-003', framework: 'SOC 2', status: 'Under Review', score: 71,
  owner: 'Alice Johnson', lastAudit: '2024-11-01', nextAudit: '2025-11-01',
  controls: 64, passed: 46, findings: 18,
  description: 'Service Organization Control – Trust Services Criteria.'
},
{
  id: 'CM-004', framework: 'PCI-DSS', status: 'Non-Compliant', score: 55,
  owner: 'Bob Martinez', lastAudit: '2024-12-20', nextAudit: '2025-06-20',
  controls: 12, passed: 7, findings: 5,
  description: 'Payment Card Industry Data Security Standard.'
},
{
  id: 'CM-005', framework: 'HIPAA', status: 'Compliant', score: 91,
  owner: 'Carol Smith', lastAudit: '2025-01-08', nextAudit: '2026-01-08',
  controls: 18, passed: 17, findings: 1,
  description: 'Health Insurance Portability and Accountability Act.'
},
{
  id: 'CM-006', framework: 'ISO 9001', status: 'Compliant', score: 96,
  owner: 'James Wright', lastAudit: '2025-04-01', nextAudit: '2026-04-01',
  controls: 30, passed: 29, findings: 1,
  description: 'Quality Management System international standard.'
},
{
  id: 'CM-007', framework: 'SOX', status: 'Non-Compliant', score: 62,
  owner: 'David Lee', lastAudit: '2025-01-15', nextAudit: '2025-07-15',
  controls: 25, passed: 16, findings: 9,
  description: 'Sarbanes-Oxley Act – financial reporting controls.'
},
{
  id: 'CM-008', framework: 'GDPR', status: 'Expired', score: 48,
  owner: 'Linda Foster', lastAudit: '2024-06-01', nextAudit: '2024-12-01',
  controls: 42, passed: 20, findings: 22,
  description: 'GDPR certification has expired. Recertification overdue.'
}];


export const VIOLATIONS_MOCK_DATA = [
{
  id: 'VL-001', framework: 'PCI-DSS', title: 'Unencrypted cardholder data at rest',
  severity: 'Critical', status: 'Open', owner: 'Bob Martinez',
  dueDate: '2025-07-30', reportedDate: '2025-06-01',
  description: 'Cardholder data detected in plaintext in legacy database tables.'
},
{
  id: 'VL-002', framework: 'SOX', title: 'Missing segregation of duties – Finance',
  severity: 'High', status: 'In Progress', owner: 'David Lee',
  dueDate: '2025-08-15', reportedDate: '2025-05-20',
  description: 'Same user has authorization and posting access in the ERP system.'
},
{
  id: 'VL-003', framework: 'GDPR', title: 'Data subject request not fulfilled within 30 days',
  severity: 'High', status: 'Closed', owner: 'Carol Smith',
  dueDate: '2025-04-01', reportedDate: '2025-03-01',
  description: 'Subject access request received March 1. Response delayed to April 5.'
},
{
  id: 'VL-004', framework: 'ISO 27001', title: 'Access review not completed on schedule',
  severity: 'Medium', status: 'Open', owner: 'Eva Chen',
  dueDate: '2025-07-20', reportedDate: '2025-06-10',
  description: 'Quarterly access review for privileged accounts overdue by 45 days.'
},
{
  id: 'VL-005', framework: 'SOX', title: 'Manual journal entries lacking dual approval',
  severity: 'High', status: 'In Progress', owner: 'Bob Martinez',
  dueDate: '2025-08-01', reportedDate: '2025-05-30',
  description: '12 manual journal entries above threshold processed without dual sign-off.'
}];