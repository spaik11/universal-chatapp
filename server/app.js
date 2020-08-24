const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const socket_io = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { translateMsg } = require("./translate");

const app = express();

const io = socket_io({
  transports: ["websocket"],
  pingTimeout: 120000,
  pingInterval: 5000,
});
app.io = io;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection success!"))
  .catch((e) => console.log(e));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on("join", ({ name, room, lang }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, lang });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const currentUser = getUser(socket.id);
    const allUsers = getUsersInRoom(currentUser.room);

    allUsers.map(async (user) => {
      let lang = user.lang;
      const translatedMsg = await translateMsg(message, lang);

      io.to(`${user.id}`).emit("message", {
        user: currentUser.name,
        text: currentUser.id === user.id ? message : translatedMsg,
      });
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("disconnect", user);
    if (user) {
      console.log("disconnect users", getUsersInRoom(user.room));
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on("reconnect_attempt", () => {
    console.log("reconnect_attempt");
    socket.io.opts.transports = ["polling", "websocket"];
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
