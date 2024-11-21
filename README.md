# API para Encontrar o Caminho Mais Barato entre Duas Capitais

Esta API calcula o caminho mais barato entre duas capitais, considerando o consumo de combustível e o preço da gasolina fornecidos pelo usuário.

## Endpoints

### **[GET] /cidades**
Retorna a lista de todas as capitais disponíveis na API.

#### Exemplo de Resposta:
```json
[
  "Brasília",
  "São Paulo",
  "Rio de Janeiro",
  "Salvador",
  "Belo Horizonte"
]
 ``````` 

### **[POST] /caminho-mais-barato**
Calcula o caminho mais barato entre duas capitais.

#### Exemplo de requisição:
```json
{
  "kmPerLiter": 12,
  "precoGasolina": 6,
  "origem": "Porto Alegre",
  "destino": "Florianópolis"
}
 ``````` 

#### Exemplo de Resposta:
```json
{
  "caminho": ["Porto Alegre", "Florianópolis"],
  "custoTotal": 268.00
}
