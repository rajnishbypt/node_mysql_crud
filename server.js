const express = require("express");
const app = express();
// require or import other files
const connection = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
app.get("/", (req, res) => {
  res.redirect("/create.html");
});
// create data
app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const phone = req.body.phone;

  try {
    connection.query(
      "INSERT into crud (name,email,phone) values(?,?,?)",
      [name, email, phone],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/data");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// show data
app.get("/data", (req, res) => {
  connection.query("select * from crud", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render("read.ejs", { rows });
    }
  });
});
// edit data  by id
app.get("/update_data", (req, res) => {
  const updateQuary = "select * from crud where id=?";
  connection.query(updateQuary, [req.query.id], (err, eachRow) => {
    if (err) {
      console.log(err);
    } else {
      result = JSON.parse(JSON.stringify(eachRow[0]));
      res.render("edit.ejs", { result });
    }
  });
});
// update
app.post("/final_update", (req, res) => {
  const id = req.body.hidden_id;
  const name = req.body.name;
  const email = req.body.email;

  const phone = req.body.phone;
  const updateData = "update crud set name=?, email=?, phone=? where id=?";
  try {
    connection.query(updateData, [name, email, phone, id], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/data");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// delete by Id
app.get("/delete_data", (req, res) => {
  const deleteByIdQuaery = "delete from crud where id=?";
  connection.query(deleteByIdQuaery, [req.query.id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/data");
    }
  });
});
// server
app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;
  console.log(`server running on port ${process.env.PORT}`);
});
