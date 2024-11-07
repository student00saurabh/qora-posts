const express = require("express");
const app = express();
const methodOverride = require("method-override");

const port = 8080;

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "saurabh",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "manish",
    content: "I a body builder",
  },
  {
    id: uuidv4(),
    username: "rajnish",
    content: "I like simple living and high thinking",
  },
  {
    id: uuidv4(),
    username: "anuj",
    content: "I am a medical student",
  },
];

// for getting a new post request or creatting a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// to recoll updated homepage
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//show in detailed
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// to update a post ...
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(newContent);
  res.redirect("/posts");
});

//edit post form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// initial request --- for home page....>
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// for deleting a requist
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

//port is listinning .... to check
app.listen(port, () => {
  console.log(`Port is listening ${port}`);
});
