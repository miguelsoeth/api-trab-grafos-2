document.addEventListener("DOMContentLoaded", () => {
    const kmPerLiterInput = document.getElementById("kmPerLiter");
    const precoGasolinaInput = document.getElementById("precoGasolina");
    const origemSelect = document.getElementById("origem");
    const destinoSelect = document.getElementById("destino");
    const calcularButton = document.getElementById("calcularButton");
    const resultadoDiv = document.getElementById("resultado");

    async function loadCities() {
        try {
            const response = await fetch("http://localhost:3000/cidades");
            const cities = await response.json();
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                origemSelect.appendChild(option.cloneNode(true));
                destinoSelect.appendChild(option);
            });
        } catch (error) {
            alert("Erro ao carregar as cidades.");
        }
    }

    async function calculatePath() {
        const kmPerLiter = parseFloat(kmPerLiterInput.value);
        const precoGasolina = parseFloat(precoGasolinaInput.value);
        const origem = origemSelect.value;
        const destino = destinoSelect.value;

        if (!kmPerLiter || !precoGasolina || !origem || !destino) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/caminho-mais-barato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kmPerLiter, precoGasolina, origem, destino }),
            });

            if (response.ok) {
                const data = await response.json();
                resultadoDiv.innerHTML = `
                    <h2>Resultado:</h2>
                    <p><strong>Caminho:</strong> ${data.caminho.join(" → ")}</p>
                    <p><strong>Custo Total:</strong> R$ ${data.custoTotal}</p>
                `;
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Rota inexistente.");
            }
        } catch (error) {
            alert("Erro ao calcular o caminho.");
        }
    }

    calcularButton.addEventListener("click", calculatePath);

    loadCities();
});
