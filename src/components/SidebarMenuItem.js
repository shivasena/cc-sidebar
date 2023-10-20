import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";

export default function SidebarMenuItem({ menuItem, props, location }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Check if current pathname is in the submenu
  useEffect(() => {
    const checkSubmenu = (submenu) => {
      if (!submenu) return false;

      for (let item of submenu) {
        if (location.pathname?.slice(0, -1) === item.link) {
          return true;
        }
        if (checkSubmenu(item.submenu)) {
          return true;
        }
      }

      return false;
    };

    if (menuItem.submenu) {
      const isCurrentPathMenuItem =
        location.pathname?.slice(0, -1) === menuItem.link;
      const isCurrentPathInSubmenu = checkSubmenu(menuItem.submenu);

      if (isCurrentPathInSubmenu || isCurrentPathMenuItem) {
        setIsSubmenuOpen(true);
      }
    }
  }, [menuItem.submenu, location.pathname, menuItem.link]);

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
            role="button"
            tabIndex={0}
            onClick={menuItem.submenu?.length > 0 ? toggleSubmenu : undefined}
            onKeyDown={handleKeyDown}
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
