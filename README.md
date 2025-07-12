#SIGAF – Testes Automatizados (API + UI)

Este repositório contém os testes de integração e interface do sistema SIGAF (Sistema Integrado de Gestão Académica e Filiais), com foco nos seguintes pontos:

- Testes da API com coleções exportadas do **Hoppscotch**
- Testes de interface pública com **Playwright**
- Execução automática de testes via **GitHub Actions**

#Links úteis

Website: [https://website-app-6v7k.onrender.com](https://website-app-6v7k.onrender.com)
API: [https://backend-sigaf.onrender.com/api/v1/](https://backend-sigaf.onrender.com/api/v1/)

#Estrutura do Projeto

```txt
sigaf-tests-github/
── api-tests/
   ── sigaf-hoppscotch-collection.json       # Testes da API exportados do Hoppscotch
── sigaf-testes/
   ── testes/
       ── demo.spec.ts                       # Teste UI público com Playwright
       ── playwright.config.ts               # Configuração Playwright
       ── package.json                       # Dependências e scripts
── .github/
   ── workflows/
       ── ui-tests.yml                       # GitHub Actions - testes automatizados
── .gitignore
── README.md
