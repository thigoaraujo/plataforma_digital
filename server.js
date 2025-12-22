const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota de API para dados do ZeroSheets
app.get('/api/dados-completos', async (req, res) => {
  try {
    const response = await fetch("https://api.zerosheets.com/v1/id0");
    const dados = await response.json();
    res.json(dados);
  } catch (err) {
    console.error("Erro ao buscar dados:", err.message);
    res.status(500).json({ error: "Falha ao buscar dados." });
  }
});

// Rotas amigáveis para páginas HTML existentes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Página Dados (funciona tanto em /dados quanto /dados.html)
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
