import React, { useState, useEffect, useMemo } from "react";
import { Link } from "gatsby";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";

export default function SidebarMenuItem({ menuItem, props, location }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const slicedPathname = useMemo(
    () => location.pathname?.slice(0, -1),
    [location.pathname]
  );

  const checkSubmenu = (submenu, path) => {
    if (!submenu) return false;

    for (let item of submenu) {
      if (path === item.link) {
        return true;
      }
      if (checkSubmenu(item.submenu, path)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (menuItem.submenu) {
      const isCurrentPathMenuItem = slicedPathname === menuItem.link;
      const isCurrentPathInSubmenu = checkSubmenu(
        menuItem.submenu,
        slicedPathname
      );

      if (isCurrentPathInSubmenu || isCurrentPathMenuItem) {
        setIsSubmenuOpen(true);
      }
    }
  }, [menuItem.submenu, slicedPathname, menuItem.link]);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleKeyDown = (event) => {
    // For 'Enter' key or 'Space' key
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleSubmenu();
      event.preventDefault(); // Prevent the default action to stop scrolling when pressing space
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between gap-2 font-medium leading-7 p-2 transition duration-300 ease-in-out hover:bg-cc-red/5 group"
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
            role="button"
            tabIndex={0}
            onClick={menuItem.submenu?.length > 0 ? toggleSubmenu : undefined}
            onKeyDown={handleKeyDown}
          >
            {isSubmenuOpen ? (
              <FiChevronDown className="w-6 h-6 group-hover:bg-white p-1 rounded-sm text-cc-red" />
            ) : (
              <FiChevronLeft className="w-6 h-6 group-hover:bg-white p-1 rounded-sm text-cc-red" />
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
