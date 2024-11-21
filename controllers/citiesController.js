const fs = require('fs');

exports.getCities = (req, res) => {
    try {
        console.log("Received req to: getCities");
        const dados = fs.readFileSync('./capitais.json', 'utf8');
        const capitais = JSON.parse(dados).map((capital) => Object.keys(capital)[0]);
        res.json(capitais);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter cidades.' });
    }
};
