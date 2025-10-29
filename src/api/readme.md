# Documentação API Pública
Este diretório contém os arquivos da API Pública em OpenAPI. 

**Atenção:** não atualize diretamente o arquivo em api-reference/openapi.json. Este arquivo é gerado automaticamente ao executar o script `bundler.js`.

## Estrutura
A estrutura da documentação está separada em arquivos json na raiz e em diretórios.

- `main.json`: contém informações principais do OpenAPI, como titulo, descrição, etc...
- `componenets.json`: contém a seção components do OpenAPI.
- `/paths/**.json`: Contém em cada arquivo o endpoint da API.
- `/webhooks/event.json`: Contém informações sobre a parte de webhook.

