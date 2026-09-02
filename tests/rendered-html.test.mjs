import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Código da Cena landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>Código da Cena/i);
  assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml"/i);
  assert.match(html, /O que vem depois/i);
  assert.match(html, /33 MÓDULOS/i);
  assert.match(html, /2 DOMINGOS/i);
  assert.match(html, /8 HORAS POR ENCONTRO/i);
  assert.match(html, /CAFÉ DA MANHÃ \+ COFFEE BREAK/i);
  assert.match(html, /ARTISTAS NACIONAIS/i);
  assert.match(html, /ATÉ 50 DJs/i);
  assert.match(html, /ACESSO EXCLUSIVO AOS ALUNOS/i);
  assert.doesNotMatch(html, /6 ENCONTROS|6 SEMANAS|ATÉ 12 DJs/i);
  assert.doesNotMatch(html, /PERGUNTA ADICIONAL|RESPOSTA A INSERIR/i);
  assert.match(html, /Mixar é técnica\. Carreira é construção\./i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
});

test("emits a self-contained Node.js server for Railway", async () => {
  const [packageJson, nextConfig] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    access(new URL("../dist/standalone/server.js", import.meta.url)),
  ]);

  assert.match(packageJson, /"start": "node dist\/standalone\/server\.js"/);
  assert.match(nextConfig, /output:\s*"standalone"/);
});
