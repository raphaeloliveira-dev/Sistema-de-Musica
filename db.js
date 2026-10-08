const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senai2026',  // senha do meu banco de dados
    database: 'sistema_musica'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});

module.exports = conexao;