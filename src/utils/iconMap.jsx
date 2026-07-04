import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'

const ICON_MAP = {
  Dashboard: DashboardRoundedIcon,
  ShoppingCart: ShoppingCartRoundedIcon,
  CheckCircle: CheckCircleRoundedIcon,
  Business: BusinessRoundedIcon,
  Warning: WarningRoundedIcon,
  VerifiedUser: VerifiedUserRoundedIcon,
  FindInPage: FindInPageRoundedIcon,
  Assessment: AssessmentRoundedIcon,
  Notifications: NotificationsRoundedIcon,
  Settings: SettingsRoundedIcon,
  Shield: ShieldRoundedIcon,
  Menu: MenuRoundedIcon,
  ChevronLeft: ChevronLeftRoundedIcon,
  Search: SearchRoundedIcon,
  LightMode: LightModeRoundedIcon,
  DarkMode: DarkModeRoundedIcon,
  Person: PersonRoundedIcon,
  Logout: LogoutRoundedIcon,
  ManageAccounts: ManageAccountsRoundedIcon,
}

export function getIcon(name, props = {}) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon {...props} />
}

export { ICON_MAP }
