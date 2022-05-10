# avaliacao-suficiencia-web2

## Demo do projeto

Para acessar a demo da aplicacao deployada no _Heroku_, acesse o endereco abaixo. Utilize as seguintes credenciais caso queira realizar login como admin:

```
Login: admin
Password: admin
```

https://asw2-my-posts.herokuapp.com/

## Estrutura

Este projeto esta separado entre client (front-end: /client) e server (back-end: /server). Cada parte contem seus respectivos codigos-fontes e _Dockerfile_.

## Executando

Para executa-lo localmente com o *Docker* instalado na sua maquina, certifique-se de que as portas 3000, 5432 e 8080 estao *livres* e rode o seguinte comando na raiz do projeto:

```
docker-compose up -d
```
