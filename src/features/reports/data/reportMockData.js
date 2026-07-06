export const PROCUREMENT_SUMMARY_MOCK = [
  { id: 'PR-001', title: 'Enterprise Laptop Fleet Refresh', department: 'IT', budget: '2500000 INR', status: 'Pending', approvalTime: 'N/A' },
  { id: 'PR-002', title: 'Server Infrastructure Upgrade', department: 'IT', budget: '8400000 INR', status: 'Approved', approvalTime: '2 Days' },
  { id: 'PR-003', title: 'Office Ergonomic Chairs', department: 'Operations', budget: '450000 INR', status: 'Draft', approvalTime: 'N/A' },
  { id: 'PR-004', title: 'Office Stationery & Consumables', department: 'Operations', budget: '120000 INR', status: 'In Review', approvalTime: 'N/A' },
  { id: 'PR-005', title: 'Cloud Security Audit Suite', department: 'Internal Audit', budget: '1800000 INR', status: 'Rejected', approvalTime: '5 Days' },
];

export const VENDOR_MATRIX_MOCK = [
  { vendor: 'Dell Technologies', category: 'IT Hardware', rating: 92, activeContracts: 3, riskLevel: 'Low' },
  { vendor: 'HP Enterprise', category: 'IT Hardware', rating: 88, activeContracts: 2, riskLevel: 'Low' },
  { vendor: 'SecureVault Systems', category: 'IT Services', rating: 74, activeContracts: 1, riskLevel: 'Medium' },
  { vendor: 'Sodexo Services', category: 'Professional Services', rating: 95, activeContracts: 4, riskLevel: 'Low' },
  { vendor: 'Apex Supplies Co.', category: 'Office Supplies', rating: 62, activeContracts: 2, riskLevel: 'High' },
];

export const RISK_REGISTER_MOCK = [
  { riskId: 'RSK-101', department: 'IT', description: 'Data Center Power Failure', likelihood: 'Low', impact: 'Critical', status: 'Mitigated' },
  { riskId: 'RSK-102', department: 'Finance', description: 'Currency Exchange Fluctuation', likelihood: 'High', impact: 'Medium', status: 'Open' },
  { riskId: 'RSK-103', department: 'Operations', description: 'Supply Chain Disruption', likelihood: 'Medium', impact: 'High', status: 'In Progress' },
  { riskId: 'RSK-104', department: 'Legal', description: 'GDPR Non-Compliance', likelihood: 'Low', impact: 'Critical', status: 'Open' },
  { riskId: 'RSK-105', department: 'HR', description: 'Key Personnel Departure', likelihood: 'High', impact: 'Low', status: 'Mitigated' },
];

export const COMPLIANCE_VIOLATION_MOCK = [
  { entity: 'Apex Supplies Co.', type: 'Expired ISO 9001', date: '2025-05-12', severity: 'High', status: 'Pending Review' },
  { entity: 'PR-005', type: 'Budget Overrun', date: '2025-05-18', severity: 'Medium', status: 'Resolved' },
  { entity: 'SecureVault Systems', type: 'Missing Data Privacy Addendum', date: '2025-06-02', severity: 'Critical', status: 'Pending Review' },
  { entity: 'PR-012', type: 'Unapproved Vendor Selection', date: '2025-06-15', severity: 'High', status: 'Resolved' },
];

export const SYSTEM_AUDIT_LOGS_MOCK = [
  { timestamp: '2025-07-05 08:32:15', user: 'admin_bob', action: 'Approved Procurement', module: 'Approval Workbench', ip: '192.168.1.45' },
  { timestamp: '2025-07-05 09:15:22', user: 'alice_j', action: 'Created Procurement', module: 'Procurement', ip: '192.168.1.112' },
  { timestamp: '2025-07-05 11:05:43', user: 'system', action: 'Automated Risk Scan', module: 'Risk Management', ip: '127.0.0.1' },
  { timestamp: '2025-07-05 13:42:10', user: 'carol_s', action: 'Updated Vendor Details', module: 'Vendor Management', ip: '192.168.1.88' },
  { timestamp: '2025-07-05 15:20:05', user: 'admin_bob', action: 'Rejected Procurement', module: 'Approval Workbench', ip: '192.168.1.45' },
];
