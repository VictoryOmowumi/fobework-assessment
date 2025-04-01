import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BanknotesIcon,
  ArrowsRightLeftIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  Squares2X2Icon, 
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import logoLight from '../../assets/logo-1.svg';
import logoDark from '../../assets/logo-2.svg';
import { useTheme } from 'next-themes';
const Sidebar = () => {

  const location = useLocation();
  const { theme } = useTheme();
  const navItems = [
    {
      section: 'Dashboard',
      title: 'Dashboard',
      icon:  Squares2X2Icon,
      items: [
        { title: 'Dashboard', link: `/` },
      ],
    },
    {
      section: 'Transactions',
      title: 'Transactions',
      icon: ArrowsRightLeftIcon,
      items: [
        { title: 'History', link: `/transactions` },
        { title: 'New Transfer', link: `/transactions/new` },
      ],
    },
    {
      section: 'Accounts',
      title: 'Accounts',
      icon: BanknotesIcon,
      items: [
        { title: 'All Accounts', link: `/accounts` },
        { title: 'Add Account', link: `/accounts/add` },
      ],
    },
    {
      section: 'Goals',
      title: 'Goals',
      icon: TrophyIcon,
      items: [
        { title: 'All Goals', link: `/goals` },
        { title: 'Create Goal', link: `/goals/create` },
      ],
    },
    {
      section: 'Investments',
      title: 'Investments',
      icon: ChartPieIcon,
      items: [
        { title: 'Portfolio', link: `/investments` },
        { title: 'Market Data', link: `/investments/market` },
      ],
    },
    {
      section: 'Settings',
      title: 'Settings',
      icon: Cog6ToothIcon,
      items: [
        { title: 'General Settings', link: `/settings` },
        { title: 'Profile Settings', link: `/settings/profile` },
      ],
    },
  ];

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSectionActive = (items: { link: string }[]) => {
    return items.some((item) => {
      if (item.link === "/") {
       
        return location.pathname === "/";
      }
    
      return location.pathname.startsWith(item.link);
    });
  };

  return (
    <div className="flex flex-col overflow-y-auto h-screen sticky top-0 no-scrollbar">
      <div className="px-4 py-2.5 border-b border-border flex gap-2 ">
        <img
          src={theme === 'dark' ? logoDark : logoLight}
          alt="FinPal Logo"
          className="w-16"
        />
      
      </div>

      <nav className="flex-1 p-2 space-y-6">
        {navItems.map((section) => {
          const isActive = isSectionActive(section.items);

          return (
            <div key={section.section}>
             
              {/* Section Title */}
              <div className="text-[0.65rem] opacity-50 font-medium text-[#61748f] uppercase dark:text-gray-300 px-3 py-2">
                {section.title}
              </div>

              {/* Section Header */}
              <div
                className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => toggleSection(section.section)}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                {expandedSections[section.section] ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                )}
              </div>

              {/* Section Items */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections[section.section] ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                <div className="space-y-1 mt-2 pl-8">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.link}
                      to={item.link}
                      className={({ isActive }) => `
                        block px-3 py-2 rounded-md text-sm font-light
                        ${
                          isActive
                            ? 'text-primary'
                            : 'hover:bg-accent  hover:text-accent-foreground'
                        }
                      `}
                    >
                     
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">FinPal v0.1</div>
      </div>
    </div>
  );
};

export default Sidebar;