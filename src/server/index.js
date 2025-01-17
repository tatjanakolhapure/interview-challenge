const express = require("express");
const items = require("./items");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static("dist"));

app.get("/api/items", (req, res) => {
  const itemsList = req.query.search
    ? items.filter(
        (item) =>
          item.name.toLowerCase().indexOf(req.query.search.toLowerCase()) !== -1
      )
    : items;
  return res.send({ items: itemsList });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
