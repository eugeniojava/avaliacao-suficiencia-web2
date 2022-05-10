# avaliacao-suficiencia-web2

## Demo da aplicacao

Para acessar uma demo da apliacao deployada no _Heroku_, acesse o endereco abaixo. Para fazer login como admin, utilize as credenciais *admin* para user e *admin* para senha.

https://asw2-my-posts.herokuapp.com/

## Estrutura

Este projeto esta separado entre client (front-end: /client) e server (back-end: /server). Cada parte contem seus respectivos codigos-fontes e _Dockerfile_.

## Executando

Para executa-lo com sucesso, certifique-se de que as portas 3000, 5432 e 8080 da sua maquina estao *livres* e rode o seguinte comando na raiz do projeto:

```
docker-compose up -d
```
