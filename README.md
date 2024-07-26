<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJs Boilerplate

Boilerplate Nestjs com algumas implementações pronto para clonar e começar um novo projeto

## Funcionalidades

- Autenticaçaõ JWT
- Criação de Usuário
- Swagger
- Rating Limiter

## Documentação da API

#### Swagger

```http
  GET /api
```

link para o swagger

#### Login

```http
  GET /api/auth/login
```

| Parâmetro  | Tipo     | Descrição                         |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Obrigatório**. email do usuário |
| `password` | `string` | **Obrigatório**. senha do usuário |

#### Retorna o perfil do usuário

```http
  GET /api/auth/me
```

| Parâmetro | Tipo | Descrição |
| :-------- | :--- | :-------- |

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL` valor padrão `file:./dev.db`

## Autores

- [@Ruanv123](https://www.github.com/Ruanv123)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
