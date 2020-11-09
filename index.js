
(async () =>{
    const db = require("./db");
    console.log("começou");
    const tarefas = await db.selectTarefas();
    console.log('SELECT * FROM CLIENTES');
    console.log(tarefas);

})();