const fs = require("fs");
const path = require("path");

const extractUniqueLinks = (menuItems, linkArray) => {
  menuItems.forEach((item) => {
    linkArray.push({ link: item.link, label: item.label });
    if (item.submenu && item.submenu.length > 0) {
      extractUniqueLinks(item.submenu, linkArray);
    }
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Read the JSON file (Assuming it's named menu.json)
  const rawData = fs.readFileSync(
    path.resolve(__dirname, "./src/data/menu.json")
  );
  const data = JSON.parse(rawData);

  // Use an array to hold the unique link and label pairs
  const linkArray = [];

  // Extract unique links and labels
  extractUniqueLinks(data.menu_items, linkArray);

  // Create a set to hold unique links
  const uniqueLinksSet = new Set();

  // Create pages with unique links and labels
  linkArray.forEach((item) => {
    if (!uniqueLinksSet.has(item.link)) {
      uniqueLinksSet.add(item.link);
      createPage({
        path: item.link,
        component: path.resolve(__dirname, "./src/templates/pageTemplate.js"),
        context: {
          link: item.link,
          label: item.label,
        },
      });
    }
  });
};
