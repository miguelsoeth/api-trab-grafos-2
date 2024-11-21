const fs = require('fs');
const Grafo = require('./Grafo');

exports.construirGrafo = (kmPerLiter, precoGasolina) => {
    const grafo = new Grafo();
    const dados = fs.readFileSync('./capitais.json', 'utf8');
    const capitais = JSON.parse(dados);
    const pedagios = {};

    capitais.forEach((capital) => {
        const name = Object.keys(capital)[0];
        pedagios[name] = capital[name].toll;
    });

    capitais.forEach((capital) => {
        const name = Object.keys(capital)[0];
        grafo.adicionarVertice(name);

        Object.entries(capital[name].neighbors).forEach(([vizinho, distancia]) => {
            grafo.adicionarVertice(vizinho);
            const custoGasolina = (distancia / kmPerLiter) * precoGasolina;
            const custoTotal = custoGasolina + parseFloat(pedagios[vizinho] || 0);
            grafo.adicionarAresta(name, vizinho, custoTotal.toFixed(2));
        });
    });

    return { grafo, pedagios };
};
