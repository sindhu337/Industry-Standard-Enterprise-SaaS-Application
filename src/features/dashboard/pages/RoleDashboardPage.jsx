import { useSelector } from 'react-redux'
import { ROLES } from '@/constants/roles'
import EmployeeDashboard from './EmployeeDashboard'
import ProcurementManagerDashboard from './ProcurementManagerDashboard'
import ComplianceOfficerDashboard from './ComplianceOfficerDashboard'
import AuditorDashboard from './AuditorDashboard'
import AdministratorDashboard from './AdministratorDashboard'

export default function RoleDashboardPage() {
  const { user } = useSelector((state) => state.auth)

  switch (user?.role) {
    case ROLES.PROCUREMENT_MANAGER:
      return <ProcurementManagerDashboard />
    case ROLES.COMPLIANCE_OFFICER:
      return <ComplianceOfficerDashboard />
    case ROLES.AUDITOR:
      return <AuditorDashboard />
    case ROLES.ADMIN:
      return <AdministratorDashboard />
    case ROLES.EMPLOYEE:
    default:
      return <EmployeeDashboard />
  }
}
