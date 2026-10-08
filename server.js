const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let ARTISTAS = [
    {
        id: 1, nome: "Anitta", genero: "Pop", pais: "Brasil"
    },
    {
        id: 2, nome: "Coldplay", genero: "Rock", pais: "Reino Unido"
    },
    {
        id: 3, nome: "Drake", genero: "Hip-Hop", pais: "Canadá"
    }
];

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Lista de artistas",
        artistas: ARTISTAS
    });
});

app.get('/artistas', (req, res) => {
    res.status(200).json(ARTISTAS);
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);

    const artista = ARTISTAS.find(a => a.id === id);

    if (!artista) {
        return res.status(404).json({
            mensagem: "Artista não encontrado"
        });
    }

    res.status(200).json(artista);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



