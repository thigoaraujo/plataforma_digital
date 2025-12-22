const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // habilita CORS se front e back estiverem em domínios/ports diferentes
app.use(express.static(path.join(__dirname, 'public')));

// Saúde do servidor
app.get('/health', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Rota de API para dados completos
app.get('/api/dados-completos', async (req, res) => {
  try {
    const url = 'https://api.zerosheets.com/v1/id0';
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      console.error(`ZeroSheets HTTP ${response.status}`);
      return res.status(502).json({ error: `Falha ao buscar dados (HTTP ${response.status})` });
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData)) {
      console.error('ZeroSheets retornou formato não-array');
      return res.status(502).json({ error: 'Formato inesperado da ZeroSheets' });
    }

    // Transformar os dados para o formato que o frontend espera
    const dadosFormatados = rawData.map(item => ({
      // ids como número (se não existir, vira NaN e é tratado no front)
      escola_id: Number(item.escola_id ?? item.EscolaID ?? item._escola_id),
      escola_nome: item.escola_nome ?? item.EscolaNome ?? '',
      programa_id: Number(item.programa_id ?? item.ProgramaID ?? item._programa_id),
      programa_nome: item.programa_nome ?? item.ProgramaNome ?? '',
      programa_descricao: item.programa_descricao ?? item.Descricao ?? '',
      status: item.status ?? item.Status ?? 'Não Iniciado'
    }));

    res.json(dadosFormatados);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Falha ao buscar dados.' });
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
