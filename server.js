const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota de API para dados completos
app.get('/api/dados-completos', async (req, res) => {
  try {
    const response = await fetch("https://api.zerosheets.com/v1/id0");
    if (!response.ok) throw new Error("Erro HTTP " + response.status);

    const rawData = await response.json();

    // Transformar os dados no formato esperado pelo frontend
    const dadosFormatados = rawData.map(item => ({
      escola_id: parseInt(item.escola_id || item.EscolaID || item._escola_id, 10),
      escola_nome: item.escola_nome || item.EscolaNome || "",
      programa_id: parseInt(item.programa_id || item.ProgramaID || item._programa_id, 10),
      programa_nome: item.programa_nome || item.ProgramaNome || "",
      programa_descricao: item.programa_descricao || item.Descricao || "",
      status: item.status || item.Status || "Não Iniciado"
    }));

    res.json(dadosFormatados);
  } catch (err) {
    console.error("Erro ao buscar dados:", err.message);
    res.status(500).json({ error: "Falha ao buscar dados." });
  }
});

// Rotas amigáveis para páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dados', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Dados.html'));
});
app.get('/dados.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Dados.html'));
});

app.get('/mapa', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Mapa.html'));
});

app.get('/pg2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pg2.html'));
});

app.get('/asanorte', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'asanorte.html'));
});

app.get('/cruzeiro1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cruzeiro1.html'));
});

app.get('/elefantebranco', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'elefantebranco.html'));
});

app.get('/freire', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'freire.html'));
});

app.get('/leste', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leste.html'));
});

app.get('/oeste', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'oeste.html'));
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
