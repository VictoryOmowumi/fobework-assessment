import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const MobileNav = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Transactions', path: '/transactions', icon: ArrowsRightLeftIcon },
    { name: 'Accounts', path: '/accounts', icon: BanknotesIcon },
    { name: 'Investments', path: '/investments', icon: ChartBarIcon },
    { name: 'Goals', path: '/goals', icon: TrophyIcon },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 w-full ${
              location.pathname === item.path
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;