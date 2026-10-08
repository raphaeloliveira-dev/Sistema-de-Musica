const express = require('express');
const cors = require('cors');
const conexao = require('./db');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de música funcionando!' });
});

app.get('/artistas', (req, res) => {
    const sql = 'SELECT * FROM artistas';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar artistas' });
        }

        res.status(200).json(resultado);
    });
});

app.get('/artistas/', (req, res) => {
    const sql = 'SELECT * FROM artistas';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar artistas' });
        }

        res.status(200).json(resultado);
    });
});

app.get('/artistas/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM artistas WHERE id = ?';

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID do artista inválido' });
    }

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar artista' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Artista não encontrado' });
        }

        res.status(200).json(resultado[0]);
    });
});

app.post('/artistas', (req, res) => {
    const { nome, genero, pais } = req.body;

    if (!nome || !genero || !pais) {
        return res.status(400).json({ erro: 'Nome, gênero e país são obrigatórios' });
    }

    const sql = 'INSERT INTO artistas (nome, genero, pais) VALUES (?, ?, ?)';

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao cadastrar artista' });
        }

        res.status(201).json({
            mensagem: 'Artista cadastrado com sucesso',
            id: resultado.insertId
        });
    });
});

app.delete('/artistas/:id', (req, res) => {});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
