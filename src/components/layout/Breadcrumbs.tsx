';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center text-sm mb-4">
      <Link to="/" className="text-primary hover:underline">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-muted-foreground" />
            {isLast ? (
              <span className="text-foreground capitalize">{value}</span>
            ) : (
              <Link
                to={to}
                className="text-primary hover:underline capitalize"
              >
                {value}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;