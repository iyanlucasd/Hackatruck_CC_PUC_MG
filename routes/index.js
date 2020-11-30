var express = require("express");
const app = require("../app.js");
const { response, connect } = require("../app.js");
var router = express.Router();
var bodyParser = require("body-parser");
const mysqlConn = require("mysql");

var mysql = mysqlConn.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "beb38fe1670c6f",
  password: "8128bfa4",
  database: "heroku_c2dfb677c56f025",
  multipleStatements: true,
});
mysql.connect();

console.log("Começou!");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

// fim inicial e login

router.get("/chatbot", function (req, res, next) {
  res.redirect(301, "https://t.me/WatsonChatIyanBot");
});

router.get("/pag-explicacao/processador", function (req, res, next) {
  res.render("processador", { title: "Express" });
});

router.get("/noticia/noticia1", function (req, res, next) {
  res.render("noticia1", { title: "Express" });
});

router.get("/pag-explicacao/MemoriaRam", function (req, res, next) {
  res.render("memoriaRam", { title: "Express" });
});

router.get("/pag-explicacao/harddisk", function (req, res, next) {
  res.render("harddisk", { title: "Express" });
});

router.get("/pag-explicacao/mouse", function (req, res, next) {
  res.render("mouse", { title: "Express" });
});

router.get("/pag-explicacao/quem-somos", function (req, res, next) {
  res.render("quemSomos", { title: "Express" });
});

router.get("/pag-explicacao/teclado", function (req, res, next) {
  res.render("teclado", { title: "Express" });
});

// fim pagina explicação e quem somos

// comparador

router.get("/banco-de-peca", function (req, res, next) {
  res.render("bancoPeca", { title: "Express", layout: "comp" });
});
router.post("/comparador/submit", function (req, res, next) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  console.log(req.body);
  var id = req.body.pecas1;
  var id2 = req.body.pecas2;
  console.log("--------------------------------------");
  console.log("-----------chegou aqui-------------");
  console.log(id);
  console.log(id2);
  res.redirect("/comparador/" + id + "/" + id2);
});

/* GET home page. */
// router.get("/comparador/", function (req, res, next) {
//   var id = [req.query.pecas1, req.query.pecas2];

//   res.render("duaspecas", { title: "Express", layout: "comp" });
//   console.log(id);
// });

router.get("/comparador/", function (req, res, next) {
  
  var id = [req.query.pecas1, req.query.pecas2];
  console.log(id);
  console.log(
    "SELECT * FROM Possui WHERE FK_idPeca = ",
    req.query.id1,
    " OR FK_idPeca = ",
    req.query.id2,
    "; SELECT * FROM pecas WHERE idpecas = ",
    req.query.id1,
    "OR idpecas = ",
    req.query.id2
  );
  mysql.query(
    "SELECT * FROM Possui WHERE FK_idPeca = ? OR FK_idPeca = ?; SELECT * FROM pecas WHERE idpecas = ? OR idpecas = ?;",
    [id[0], id[1], id[0], id[1]],
    function (err, rows, fields) {
      if (err) throw err;
      console.log("The solution is: ", rows[0][0], rows[1][0]);
      res.render("duaspecas", {
        title: "Express",
        SQLarray: rows[0],
        nomeArray: rows[1],
        layout: "comp",
      });
    }
  );
  console.log("chegou");
});

// fim comparador

module.exports = router;
