# Código da Cena

Landing page do programa presencial Código da Cena.

## Requisitos

- Node.js `>=22.13.0`
- npm

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm start
```

O build gera um servidor Node.js independente em `dist/standalone`. O servidor
escuta a variável `PORT` fornecida pelo ambiente e usa `0.0.0.0` por padrão.

## Deploy no Railway pelo GitHub

1. Crie um repositório vazio no GitHub e envie este projeto.
2. No Railway, crie um projeto com **Deploy from GitHub repo**.
3. Selecione o repositório e a branch `main`.
4. O Railway detectará o projeto Node.js e executará `npm run build` e
   `npm start`.
5. Depois do primeiro deploy, gere um domínio público em **Networking**.

Não é necessário cadastrar manualmente a variável `PORT`.

## Comandos

- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera o pacote de produção.
- `npm start`: inicia o servidor de produção.
- `npm test`: gera o build e executa os testes do HTML renderizado.
- `npm run lint`: executa a verificação de código.
