const express = require("express");
// const morgan = require("morgan");
const path = require("path");

// dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

// app.use(morgan("dev"));
// app.use('/', express.static(path.join(__dirname, 'css폴더이름')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
  }
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
