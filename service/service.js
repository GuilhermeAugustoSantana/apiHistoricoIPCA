import historicoIPCA from '../dados/dados.js'

export const validaParamentros = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
  if ((valor || valor == 0) && mesInicial && anoInicial && mesFinal && anoFinal) {
    if ((mesInicial >= 1 && mesInicial <= 12) && (mesFinal >= 1 && mesFinal <= 12)) {
      if (
        (anoInicial < anoFinal) ||
        (anoInicial == anoFinal &&
          (mesInicial < mesFinal || mesInicial == mesFinal))) {
        if (anoFinal == 2023) {
          if (mesFinal <= 5) {
            return true
          } else {
            return false;
          }
        }
        return true;
      } else {
        console.log('Error 3');
        return false;
      }
    } else {
      console.log('Error 2');
      return false;
    }
  } else {
    console.log('Error 1');
    return false;
  }


}

export const buscaElementoPorId = (id) => {
  return historicoIPCA.find(historico => historico.id == id);
}

export const calcularReajuste = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
  let resultado = valor;
  let totalTaxa = 1;
  const periodoSelecionado = historicoIPCA.filter(periodo => (
    !(periodo.ano == anoInicial && periodo.mes < mesInicial) &&
    (periodo.ano >= anoInicial) && (periodo.ano <= anoFinal) &&
    (!(periodo.ano == anoFinal && periodo.mes > mesFinal))
  ));

  const taxasIPCA = periodoSelecionado.map(periodo => periodo.ipca)

  for (let taxa of taxasIPCA) {
    totalTaxa *= (1 + (taxa / 100));
  }


  return (resultado * totalTaxa).toFixed(2);
}
