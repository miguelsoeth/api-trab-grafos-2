const Heap = require('./Heap');

class Grafo {
    constructor() {
        this.vertices = {};
    }

    adicionarVertice(vertice) {
        if (!this.vertices[vertice]) {
            this.vertices[vertice] = [];
        }
    }

    adicionarAresta(origem, vizinho, preco) {
        if (!this.vertices[origem] || !this.vertices[vizinho]) {
            console.log("Vértices não existem");
            return;
        }

        this.vertices[origem].push({ vizinho, preco: parseFloat(preco) });
    }

    dijkstra(origem, destino) {
        const distancias = {};
        const predecessores = {};
        const heap = new Heap();
        const visited = new Set();

        // Initialize distances and predecessors
        for (let vertice in this.vertices) {
            distancias[vertice] = Infinity;
            predecessores[vertice] = null;
        }

        distancias[origem] = 0;
        heap.push({ vertice: origem, distancia: 0 });

        while (!heap.isEmpty()) {
            const { vertice, distancia } = heap.pop();

            if (visited.has(vertice)) continue;
            visited.add(vertice);

            if (vertice === destino) break;

            this.vertices[vertice].forEach(({ vizinho, preco }) => {
                if (visited.has(vizinho)) return;

                const novaDistancia = distancia + preco;
                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    predecessores[vizinho] = vertice;
                    heap.push({ vertice: vizinho, distancia: novaDistancia });
                }
            });
        }

        const caminho = [];
        let current = destino;
        while (current) {
            caminho.unshift(current);
            current = predecessores[current];
        }

        return { distancia: distancias[destino], caminho };
    }
}

module.exports = Grafo;
