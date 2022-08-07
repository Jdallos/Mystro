import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
// This is to allow connect between the front and and back end on the same host? Seems necessary...
app.use(cors());
// JSON middleware to parse the JSON
app.use(express.json());

// This info should come from env variables...
const db = mysql.createConnection({
  user: "ENTER CREDENTIALS",
  host: "ENTER CREDENTIALS",
  password: "ENTER CREDENTIALS",
  database: "ENTER CREDENTIALS",
});

// Store registration credentials into DB
app.post("/register", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ userName: name, userId: result.insertId });
      }
    }
  );
});

// Check login credentials against DB
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT id, username FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Something went wrong...");
      } else {
        res.send(result);
      }
    }
  );
});

// Save saved recommendations to the DB
app.post("/save", (req, res) => {
  const userId = req.body.userId;
  const data = req.body.stringData;

  db.query(
    "INSERT INTO recommendations (userId, data) VALUES (?,?)",
    [userId, data],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // What to return here?
        res.send("Values Inserted");
      }
    }
  );
});

// CHANGE TO A GET USING PATH PARAMS
// Should the id be stored as path parameter, req.params, e.g. :userId, then this could be get /save
app.post("/retrieve", (req, res) => {
  const userId = req.body.userId;

  db.query(
    "SELECT * FROM recommendations WHERE userId = ?",
    userId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        (result);
        res.send(result);
      }
    }
  );
});

// THIS SHOULD BE CHANGE FROM A PORT TO A DELETE
// Should the id be stored as path parameter, req.params, e.g. :userId, then this could be get /save
app.post("/delete", (req, res) => {
  const userId = req.body.userId;
  const dbId = req.body.dbId;

  db.query(
    "DELETE FROM recommendations WHERE userId = ? AND recommendationsId = ?",
    [userId, dbId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// USEFUL NOTES FOR FURTHER DEV
// // for updates
// app.put("/update", (req, res) => {
//     const id = req.body.id;
//     const wage = req.body.wage;

//     // Make wage dynamic
//     db.query("UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

// // Note the :id as it takes a param, and id is a variable
// app.delete("/delete/:id", (req, res) => {
//     // Note req.params
//     const id = req.params.id;

//     db.query("DELETE FROM employees WHERE id = ?",
//     id,
//     (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

// app.post("/login", (req, res) => {
//     const userName = req.body.userName;
//     const password = req.body.password;

//     try{
//         db.query("SELECT * FROM employees WHERE name = ?", userName,
//         (err, result) => {
//             if (err) {
//                 res.send(err);
//             } else {
//                 if (!result.length) {
//                     res.send("Invalid username");
//                 }
//                 else if (result[0].password === password){
//                     res.send("Login Successful");
//                 } else {
//                     res.send("Login failed: Incorrect password");
//                 }
//             }
//         })
//     } catch {
//         res.send("Invalid Username");
//     }

// })

app.listen(3001, () => {
  console.log("running on 3001");
});