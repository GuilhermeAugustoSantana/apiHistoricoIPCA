import express from 'express';
import historicoIPCA from './dados/dados.js';
import { buscaElementoPorId, calcularReajuste, validaParamentros } from './service/service.js'

const app = express();

app.get('/historicoIPCA', (req, res) => {
  const ano = req.query.ano;
  let resultado = '';
  if (ano) {
    if (ano >= 2015 && ano <= 2023) {
      resultado = historicoIPCA.filter(anoIPCA => anoIPCA.ano == ano)
      res.json(resultado);
    }
    else res.status(404).json({ error: "Nenhum historico encontrado para o ano especificado" });
  } else res.json(historicoIPCA);
});

app.get('/historicoIPCA/calculo', (req, res) => {
  const valor = parseInt(req.query.valor)
  const mesInicial = parseInt(req.query.mesInicial)
  const anoInicial = parseInt(req.query.anoInicial)
  const mesFinal = parseInt(req.query.mesFinal)
  const anoFinal = parseInt(req.query.anoFinal)

  if (validaParamentros(valor, mesInicial, anoInicial, mesFinal, anoFinal)) {
    const resultado = calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal)
    res.json({ resultado: resultado });
  }
  else res.status(400).json({ error: "Parâmetros invalidos" })
})

app.get('/historicoIPCA/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const resultado = buscaElementoPorId(id);

  if (resultado) res.json(resultado)
  else res.status(404).json({ error: "Dados não foi encontrado" })
})

app.listen(8080, () => {
  let data = new Date();
  console.log("Servidor iniciado em " + data);
});
