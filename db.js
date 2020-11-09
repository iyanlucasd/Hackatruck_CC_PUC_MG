async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    "mysql://root:Alucard931812@localhost:3306/crud"
  );
  console.log("conectou no mysql");
  global.connection = connection;
  return connection;
}

async function selectTarefas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM lista;');
    return await rows;
}

module.exports = {selectTarefas};
