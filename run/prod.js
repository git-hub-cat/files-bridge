//"port": "set NODE_ENV=production&&node ./dist/main.js"

process.env.NODE_ENV = "production";
require("../dist/main");
