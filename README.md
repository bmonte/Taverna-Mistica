<p align="center">
  <img alt="Taverna Mística" src="https://i.imgur.com/cLBhMLb.png)" />
</p>

<h3 align="center">
  API da aplicação Taverna Mística.
</h3>

<p align="center">
  <img alt="GitHub followers" src="https://img.shields.io/github/followers/bmonte?color=black&label=bmonte&style=flat-square">

  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/bmonte/Taverna-Mistica?color=black&style=flat-square">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/bmonte/Taverna-Mistica?color=black&style=flat-square">

  <img alt="GitHub stars" src="https://img.shields.io/github/stars/bmonte/Taverna-Mistica?style=social">
</p>

---

## ✋🏻 Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

---

## 🚀 Instalação e Execução
1. Faça um clone desse repositório;
2. Rode o comando `yarn` para instalar as dependências.
3. Execute `yarn dev:server` para rodar o servidor de desenvolvimento.

---

## 🔥 Rotas da aplicação

### Usuários
- **`POST /users`**: Rota de criação de usuário
```json
{
	"username": "johndoe",
	"email": "johndoe@example.com",
	"password": "123456"
}
```
- **`PATCH /users/avatar`**: Essa rota deve receber um multipart contendo um arquivo de imagem, ela deve ter tamanho máximo de 5mb.

### Sessão
- **`POST /session`**: Rota para autenticação de usuário, ela retorna um token que vai ser responsável por manter ele autenticado.
```json
{
	"email": "johndoe@example.com",
	"password": "123456"
}
```

### Perfil
- **`GET /profile`**: Deve retornar o perfil do usuário caso ele esteja autenticado.
```json
{
  "id": "uuid",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "avatar": null | string,
  "created_at": "2020-06-07T17:34:21.423Z",
  "updated_at": "2020-06-07T17:34:21.423Z"
}
```
- **`PUT /profile`**: Rota para atualização do perfil do usuário
```json
{
	"username": "johndoe",
  "email": "johndoe@example.com",
  "password": "123321",
  "old_password": "123456"
}
```

---

## 🧪 Testes

1. Entre na pasta do projeto
2. Rode o comando `yarn test` para iniciar o jest.
3. Ao final do processo vai ser gerada uma pasta `coverage`, nela é possível ver toda a cobertura de testes.

---

## ❤️ Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

---

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ❤️ by Brunno Rodrigues 👋
