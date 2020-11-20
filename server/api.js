const sqlite3 = require("sqlite3").verbose();
var cors = require("cors");
var express = require("express");

var app = express();
app.use(cors());
app.use(express.json());

let db = new sqlite3.Database("./database.db");

/**
 * Search for answers
 */
app.post("/nodes/search", function (req, res) {
  let query = req.body.query;
  if (!query) return res.status(400).send("Bad query");

  let queryTerms = query.toLowerCase().split(" ");

  db.all(
    `select
                a.id, a.title, b.content
            from
                answers a
                join blocks b
      on a.id=b.answer_id`,
    {},
    (err, rows_raw) => {
      let rows = rows_raw.map((r) => {
        return { id: r.id, title: r.title, content: JSON.parse(r.content) };
      });

      let matched_rows = rows.filter((answer) => {
        // create a big string that includes all content text
        let extract_text = (block) => {
          if (Array.isArray(block)) {
            return block.map(extract_text);
          }
          var text = "";
          for (let [key, value] of Object.entries(block)) {
            if (Array.isArray(value)) {
              text += value.map(extract_text);
            } else if (key != "type") {
              text += " " + value;
            }
          }
          return text;
        };

        // mash it all together and normalize it
        let fulltext = (
          answer.title +
          " " +
          extract_text(answer.content).join(" ")
        ).toLowerCase();

        // see if all the terms show up
        for (term of queryTerms) {
          if (!fulltext.includes(term)) return false;
        }
        return true;
      });

      let result_rows = matched_rows.map((r) => {
        return { id: r.id, title: r.title };
      });

      res.status(200).send(result_rows);
    }
  );
});

/**
 * Returns all of our variable data
 */
app.get("/variables", (req, res) => {
  db.all(`select * from variables`, {}, (err, variables_raw) => {
    res.status(200).send(variables_raw);
  });
});

app.get("/nodes", (req, res) => {
  db.all(
    `select
      a.id, a.title
    from
      answers a`,
    {},
    (err, rows_raw) => {
      let rows = rows_raw.map((r) => {
        return { id: r.id, title: r.title };
      });
      res.status(200).send(rows);
    }
  );
});

/**
 * Returns all data related to a specific answer
 */
app.get("/nodes/:id", (req, res) => {
  db.all(
    `select
    a.id, a.title, b.content, a.connections
  from
    answers a
  join blocks b
      on a.id=b.answer_id
      where a.id=${req.params.id}`,
    {},
    (err, rows_raw) => {
      const response = rows_raw.map((row) => {
        row.content = JSON.parse(row.content);
        row.connections = JSON.parse(row.connections);

        return row;
      });
      res.status(200).send(response);
    }
  );
});

var server = app.listen(5000, function () {
  console.log("Express server listening on port " + server.address().port);
});
