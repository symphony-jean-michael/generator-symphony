import * as Sym from "@symphony/appsdk";

(async () => {
  // Connect the app to Symphony
  await Sym.start({
    id: "<%= appId %>",
  });

  // Use Navigation to register an entry with callback function
  Sym.navigation.add("<%= appName %>", () => {
    alert("You clicked on Navigation entry");
  });

  // Use Buttons to register a button on cashtag hover
  Sym.buttons.add("Adn app", "cashtag", () => {
    alert("You clicked on cashtag");
  });
})();
