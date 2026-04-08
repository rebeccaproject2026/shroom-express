import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm font-medium">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.path ? (
              <Link to={item.path} className="text-[#EA3D2A] hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#64748B]">{item.label}</span>
            )}
            {!isLast && (
              <Icon icon="lucide:chevron-right" className="text-[#94A3B8]" width="16" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
