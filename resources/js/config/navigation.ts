import type { NavItem } from '@/types'
import { 
    LayoutDashboard, 
    Database, 
    Wrench, 
    FileText,
    Settings,
    User,
    Package
} from 'lucide-vue-next'

export const navigationItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Database',
        href: '/database',
        icon: Database,
    },
    {
        title: 'Tools & Research',
        href: '/tools-research',
        icon: Wrench,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: User,
    },
]
