const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(
  "/",
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  })
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
