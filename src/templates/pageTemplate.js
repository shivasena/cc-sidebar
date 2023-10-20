import React from "react";
import { Link } from "gatsby";

import SidebarSection from "../components/SidebarSection";

const YourTemplate = ({ location, pageContext }) => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-24">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold my-12">{pageContext.label}</h1>
        </div>
        <div className="max-w-xs">
          {location.pathname === "/" ? (
            <div className="font-medium leading-7 p-2 hover:bg-cc-red/5 flex items-center justify-between">
              Homepage
            </div>
          ) : (
            <Link
              to="/"
              className="font-medium leading-7 p-2 hover:bg-cc-red/5 flex items-center justify-between text-cc-red"
            >
              Homepage
            </Link>
          )}
          <SidebarSection location={location} />
        </div>
      </section>
    </div>
  );
};

export default YourTemplate;
