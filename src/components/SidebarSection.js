import React from "react";
import MenuItems from "../data/menu.json";

import SidebarMenuItem from "./SidebarMenuItem";
const menuData = MenuItems.menu_items;

export default function SidebarSection({ location }) {
  return (
    <>
      {menuData.map((menuItem) => (
        <React.Fragment key={menuItem.id}>
          <SidebarMenuItem menuItem={menuItem} location={location || "/"} />
        </React.Fragment>
      ))}
    </>
  );
}
