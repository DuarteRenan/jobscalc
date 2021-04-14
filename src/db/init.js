const Database = require("./config");

const initDb = {
    async init(){

const db = await Database();

////
//passando instruções para o driver do sqlite executar
//códigos de banco de dados devem ser passados entre crases
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);

await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);
//insira na tabela profile os seguintes campos com os valores em values
// Precisamos criar um insert into job para cada job que será cadastrado

await db.run(`

INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
    ) VALUES (
        "Renan",
        "https://avatars.githubusercontent.com/u/71858987?v=4",
        3000,
        5,
        5,
        4,
        75
    );`);

await db.run(`
INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
)VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
)`)

await db.run(`
INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
)VALUES(
    "OneTwo Projects",
    3,
    47,
    1617514376018
)
`)

await db.close();
}
}

initDb.init();