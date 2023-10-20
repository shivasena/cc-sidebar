import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";

export default function SidebarMenuItem({ menuItem, props, location }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Check if current pathname is in the submenu
  useEffect(() => {
    if (menuItem.submenu) {
      const isCurrentPathInSubmenu = menuItem.submenu.some(
        (submenuItem) => location.pathname?.slice(0, -1) === submenuItem.link
      );

      if (isCurrentPathInSubmenu) {
        setIsSubmenuOpen(true);
      }
    }
  }, [menuItem.submenu, location.pathname]);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  return (
    <>
      <div
        className="flex items-center justify-between gap-2 font-medium leading-7 p-2 hover:bg-cc-red/5 group"
        {...props}
      >
        {location.pathname?.slice(0, -1) === menuItem.link ? (
          <div>{menuItem.label}</div>
        ) : (
          <Link className="text-cc-red" to={menuItem.link}>
            {menuItem.label}
          </Link>
        )}

        {menuItem.submenu?.length > 0 ? (
          <div
            onClick={menuItem.submenu?.length > 0 ? toggleSubmenu : undefined}
          >
            {isSubmenuOpen ? (
              <FiChevronDown className="w-6 h-6 group-hover:bg-white p-1 rounded-sm" />
            ) : (
              <FiChevronLeft className="w-6 h-6 group-hover:bg-white p-1 rounded-sm" />
            )}
          </div>
        ) : null}
      </div>
      {isSubmenuOpen && menuItem.submenu ? (
        <div className="ml-4">
          {menuItem.submenu.map((submenuItem) => (
            <SidebarMenuItem
              key={submenuItem.id}
              menuItem={submenuItem}
              location={location}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
