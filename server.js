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
    const { nome, genero, pais, duracao } = req.body;

    if (!nome || !genero || !pais || !duracao) {
        return res.status(400).json({ erro: 'Nome, gênero, país e duração são obrigatórios' });
    }

    const sql = 'INSERT INTO artistas (nome, genero, pais, duracao) VALUES (?, ?, ?, ?)';

    conexao.query(sql, [nome, genero, pais, duracao], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao cadastrar artista' });
        }

        res.status(201).json({
            mensagem: 'Artista cadastrado com sucesso',
            id: resultado.insertId
        });
    });
});

app.delete('/artistas/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM artistas WHERE id = ?';
    conexao.query(sql,[id],(erro, resultado) => {
        if(erro){
            return res.status(500).json({
                erro: "Erro ao deletar artista."
            });
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensagem: "Artista não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Artista deletado com sucesso."
        });
    });
});

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id); 
    const { nome, genero, pais, duracao } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID do artista inválido." });
    }

    if (!nome || !genero || !pais || !duracao) {
        return res.status(400).json({ erro: "Nome, gênero, país e duração são obrigatórios." });
    }

    const sql = "UPDATE artistas SET nome = ?, genero = ?, pais = ?, duracao = ? WHERE id = ?";

    conexao.query(sql, [nome, genero, pais, duracao, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar artista."});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: "Artista não encontrado."});
        }
        res.status(200).json({mensagem: "Artista atualizado com sucesso."});
    });
});

app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de música funcionando!' });
});

app.get('/albuns', (req, res) => {
    const sql = 'SELECT * FROM albuns';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar álbuns' });
        }

        res.status(200).json(resultado);
    });
});

app.get('/albuns/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM albuns WHERE id = ?';

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID do álbum inválido' });
    }

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar álbum' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }

        res.status(200).json(resultado[0]);
    });
});

app.get('/albuns/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM albuns WHERE id = ?';

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID do álbum inválido' });
    }

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar álbum' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }

        res.status(200).json(resultado[0]);
    });
});

app.get('/albuns/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM albuns WHERE id = ?';

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID do álbum inválido' });
    }

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar álbum' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Álbum não encontrado' });
        }

        res.status(200).json(resultado[0]);
    });
});

app.post('/albuns', (req, res) => {
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!titulo || !ano_lancamento || !artista_id) {
        return res.status(400).json({ erro: 'Título, ano de lançamento e ID do artista são obrigatórios' });
    }

    const sql = 'INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?, ?, ?)';

    conexao.query(sql, [titulo, ano_lancamento, artista_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao cadastrar álbum' });
        }

        res.status(201).json({
            mensagem: 'Álbum cadastrado com sucesso',
            id: resultado.insertId
        });
    });
});

app.delete('/albuns/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM albuns WHERE id = ?';
    conexao.query(sql,[id],(erro, resultado) => {
        if(erro){
            return res.status(500).json({
                erro: "Erro ao deletar álbum."
            });
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensagem: "Álbum não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Álbum deletado com sucesso."
        });
    });
});

app.put("/albuns/:id", (req, res) => {
    const id = Number(req.params.id); 
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID do álbum inválido." });
    }

    if (!titulo || !Number.isInteger(ano_lancamento) || ano_lancamento <= 0 ||
        !Number.isInteger(artista_id) || artista_id <= 0) {
        return res.status(400).json({ erro: "Título, ano de lançamento e ID do artista são obrigatórios e válidos." });
    }

    const sql = "UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, ano_lancamento, artista_id, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar álbum."});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: "Álbum não encontrado."});
        }
        res.status(200).json({mensagem: "Álbum atualizado com sucesso."});
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

app.get("/musicas_completas", (req, res) => {
    const sql = `SELECT m.id, m.titulo, m.duracao, a.nome AS artista, al.titulo AS album
                 FROM musicas m
                 JOIN artistas a ON m.artista_id = a.id
                 JOIN albuns al ON m.album_id = al.id`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao listar músicas completas." });
        }

        res.status(200).json(resultado);
    });
}
);
 