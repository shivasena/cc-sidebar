import React from "react";
import SidebarSection from "../components/SidebarSection";

export default function IndexPage({ location }) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-24">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <h1 className="text-3xl font-bold my-12">
            Homepage: Sidebar Menu Example
          </h1>
        </div>
        <div className="max-w-xs">
          <div className="font-medium leading-7 p-2 hover:bg-cc-red/5 flex items-center justify-between">
            Homepage
          </div>
          <SidebarSection location={location} />
        </div>
      </section>
    </div>
  );
}
