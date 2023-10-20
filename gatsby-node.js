const fs = require("fs");
const path = require("path");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Read the JSON file
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./src/data/pages.json"))
  );

  // Loop through each page in the JSON and create a corresponding Gatsby page
  data.pages.forEach((page) => {
    createPage({
      path: page.link,
      component: path.resolve(__dirname, "./src/templates/pageTemplate.js"), // Point to the template you'd use for these pages
      context: {
        label: page.label,
        link: page.link,
      },
    });
  });
};
