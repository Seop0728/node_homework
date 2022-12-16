const mongoose = require("mongoose");
mongoose.set("strictQuery", false);   // 치트키

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/homework")
    // .connect("mongodb://localhost:27017/homework")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;