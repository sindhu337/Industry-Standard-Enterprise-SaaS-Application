



export const RISK_CATEGORIES = ['Cybersecurity', 'Procurement', 'Compliance', 'Financial', 'Operational', 'Legal', 'Reputational'];
export const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
export const RISK_STATUSES = ['Open', 'In Progress', 'Mitigated', 'Closed'];

export const RISK_SUMMARY = {
  total: 24, critical: 3, high: 7, medium: 9, low: 5, mitigated: 6
};

export const RISK_TREND_DATA = [
{ month: 'Jan', critical: 5, high: 8, medium: 10, low: 6 },
{ month: 'Feb', critical: 4, high: 9, medium: 11, low: 5 },
{ month: 'Mar', critical: 4, high: 8, medium: 10, low: 6 },
{ month: 'Apr', critical: 3, high: 8, medium: 9, low: 6 },
{ month: 'May', critical: 3, high: 7, medium: 10, low: 5 },
{ month: 'Jun', critical: 3, high: 7, medium: 9, low: 5 }];


export const RISK_CATEGORY_BREAKDOWN = [
{ name: 'Cybersecurity', value: 6 },
{ name: 'Procurement', value: 5 },
{ name: 'Compliance', value: 5 },
{ name: 'Financial', value: 4 },
{ name: 'Operational', value: 4 }];


export const RISK_MOCK_DATA = [
{
  id: 'RK-001', title: 'Third-Party Data Breach',
  category: 'Cybersecurity', probability: 4, impact: 5, score: 20,
  level: 'Critical', owner: 'Eva Chen', status: 'Open',
  mitigationPlan: 'Implement zero-trust architecture and quarterly vendor security audits.',
  reviewDate: '2025-08-01', createdAt: '2025-01-15'
},
{
  id: 'RK-002', title: 'Supplier Concentration Risk',
  category: 'Procurement', probability: 3, impact: 5, score: 15,
  level: 'High', owner: 'Carol Smith', status: 'In Progress',
  mitigationPlan: 'Diversify supplier base. Add 2 alternative vendors per critical category.',
  reviewDate: '2025-07-15', createdAt: '2025-02-10'
},
{
  id: 'RK-003', title: 'Regulatory Non-Compliance',
  category: 'Compliance', probability: 3, impact: 4, score: 12,
  level: 'High', owner: 'David Lee', status: 'Open',
  mitigationPlan: 'Quarterly compliance training and automated monitoring system.',
  reviewDate: '2025-07-30', createdAt: '2025-03-01'
},
{
  id: 'RK-004', title: 'Currency Fluctuation Risk',
  category: 'Financial', probability: 2, impact: 3, score: 6,
  level: 'Medium', owner: 'Bob Martinez', status: 'Mitigated',
  mitigationPlan: 'Hedge foreign currency contracts for amounts over $100K.',
  reviewDate: '2025-09-01', createdAt: '2025-03-20'
},
{
  id: 'RK-005', title: 'Key Personnel Departure',
  category: 'Operational', probability: 2, impact: 4, score: 8,
  level: 'High', owner: 'Alice Johnson', status: 'Open',
  mitigationPlan: 'Succession planning for all critical roles. Knowledge transfer documentation.',
  reviewDate: '2025-08-15', createdAt: '2025-04-01'
},
{
  id: 'RK-006', title: 'Ransomware Attack',
  category: 'Cybersecurity', probability: 3, impact: 5, score: 15,
  level: 'Critical', owner: 'Eva Chen', status: 'In Progress',
  mitigationPlan: 'Endpoint detection, offline backups, tabletop incident response exercises quarterly.',
  reviewDate: '2025-07-20', createdAt: '2025-04-10'
},
{
  id: 'RK-007', title: 'Contract Delivery Failure',
  category: 'Procurement', probability: 2, impact: 4, score: 8,
  level: 'High', owner: 'Carol Smith', status: 'Open',
  mitigationPlan: 'Enforce SLA penalty clauses. Monthly vendor performance reviews.',
  reviewDate: '2025-08-10', createdAt: '2025-05-01'
},
{
  id: 'RK-008', title: 'Audit Finding Escalation',
  category: 'Compliance', probability: 2, impact: 3, score: 6,
  level: 'Medium', owner: 'David Lee', status: 'Closed',
  mitigationPlan: 'Root cause analysis complete. Corrective actions implemented.',
  reviewDate: '2025-06-30', createdAt: '2025-02-15'
},
{
  id: 'RK-009', title: 'Budget Overrun Risk',
  category: 'Financial', probability: 3, impact: 3, score: 9,
  level: 'Medium', owner: 'Bob Martinez', status: 'In Progress',
  mitigationPlan: 'Monthly budget vs actual reviews. Escalation threshold at 10% variance.',
  reviewDate: '2025-09-15', createdAt: '2025-05-20'
},
{
  id: 'RK-010', title: 'IT System Outage',
  category: 'Operational', probability: 2, impact: 5, score: 10,
  level: 'Critical', owner: 'Alice Johnson', status: 'Open',
  mitigationPlan: 'Redundant infrastructure. 4-hour RTO SLA with cloud failover.',
  reviewDate: '2025-07-25', createdAt: '2025-06-01'
},
{
  id: 'RK-011', title: 'IP Theft via Insider Threat',
  category: 'Legal', probability: 1, impact: 5, score: 5,
  level: 'Medium', owner: 'Eva Chen', status: 'Open',
  mitigationPlan: 'DLP tools, access controls, and employee monitoring policy.',
  reviewDate: '2025-10-01', createdAt: '2025-06-10'
},
{
  id: 'RK-012', title: 'Reputational Risk from Vendor Misconduct',
  category: 'Reputational', probability: 2, impact: 4, score: 8,
  level: 'High', owner: 'Carol Smith', status: 'Open',
  mitigationPlan: 'Vendor code of conduct. Mandatory ethics training for all vendors.',
  reviewDate: '2025-09-01', createdAt: '2025-06-15'
}];