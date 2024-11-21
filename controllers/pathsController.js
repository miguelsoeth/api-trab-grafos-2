const { construirGrafo } = require('../models/grafoBuilder');

exports.findCheapestPath = (req, res) => {
    console.log("Received req to: findCheapestPath");

    const { kmPerLiter, precoGasolina, origem, destino } = req.body;

    if (!kmPerLiter || !precoGasolina || !origem || !destino) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários.' });
    }

    if (kmPerLiter <= 0 || precoGasolina <= 0) {
        return res.status(400).json({ error: 'Consumo e preço da gasolina devem ser positivos.' });
    }

    const { grafo, pedagios } = construirGrafo(kmPerLiter, precoGasolina);

    if (!grafo.vertices[origem] || !grafo.vertices[destino]) {
        return res.status(400).json({ error: 'Origem ou destino inválidos.' });
    }

    const resultado = grafo.dijkstra(origem, destino);

    if (resultado.distancia === Infinity) {
        return res.status(404).json({ error: `Não há caminho entre ${origem} e ${destino}.` });
    }

    const custoTotal = resultado.distancia + parseFloat(pedagios[origem] || 0);
    res.json({
        caminho: resultado.caminho,
        custoTotal: custoTotal.toFixed(2),
    });
};
