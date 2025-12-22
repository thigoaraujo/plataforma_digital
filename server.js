const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // compatível com require()

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Função para buscar dados da planilha via ZeroSheets
async function getDadosCompletos() {
    const response = await fetch("https://api.zerosheets.com/v1/id0");
    const data = await response.json();
    return data;
}

// Rota que retorna os dados da planilha
app.get('/api/dados-completos', async (req, res) => {
    try {
        const dados = await getDadosCompletos();
        res.json(dados);
    } catch (err) {
        console.error("Erro ao buscar dados do ZeroSheets:", err.message);
        res.status(500).json({ error: "Falha ao buscar dados da planilha." });
    }
});

// Fallback para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
