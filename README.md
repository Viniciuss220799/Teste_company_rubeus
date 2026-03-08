🧪 QA Automation - Testes com Playwright

Projeto de automação de testes desenvolvido para validar funcionalidades básicas das páginas:

🔗 https://qualidade.apprbs.com.br/site

🔗 https://qualidade.apprbs.com.br/certificacao

Os testes foram implementados utilizando Playwright com foco em Smoke Tests e validações funcionais básicas.

📋 Objetivo

Garantir que as páginas estejam:

acessíveis

carregando corretamente

renderizando conteúdo

sem erros críticos no console

com elementos interativos disponíveis

⚙️ Tecnologias Utilizadas

Playwright

Node.js

TypeScript

Brave Browser (Chromium)

📂 Estrutura do Projeto
tests/
│
├── apprbs.spec.ts
├── certificacao.spec.ts
├── site.spec.ts
└── smoke.spec.ts
Arquivo	Descrição
apprbs.spec.ts	Testes gerais de validação das páginas
site.spec.ts	Testes específicos da página /site
certificacao.spec.ts	Testes específicos da página /certificacao
smoke.spec.ts	Smoke tests para validação rápida de disponibilidade
🚀 Como Executar os Testes
1️⃣ Instalar dependências
npm install
2️⃣ Instalar navegadores do Playwright
npx playwright install
3️⃣ Executar os testes
npx playwright test
4️⃣ Executar com interface visual
npx playwright test --ui
5️⃣ Abrir relatório de execução
npx playwright show-report
🧪 Escopo dos Testes
Página /site

Validações realizadas:

✅ carregamento da página com resposta válida

✅ validação de título da página

✅ verificação de estrutura renderizada

✅ verificação de erros críticos no console

Página /certificacao

Validações realizadas:

✅ carregamento da página com status válido

✅ verificação de conteúdo interativo ou formulário

✅ validação de elemento clicável de ação

✅ tentativa de envio vazio sem quebra da página

✅ verificação de erros críticos no console

Smoke Tests

Executados para validação rápida da aplicação:

✅ resposta válida da página /site

✅ resposta válida da página /certificacao

✅ presença de título nas páginas

📊 Resultado da Execução
Métrica	Resultado
Total de testes	12
Testes aprovados	12
Testes reprovados	0
Status	✅ Sucesso
🔍 Evidências Observadas

Durante a execução dos testes foi possível validar que:

as páginas responderam corretamente às requisições

o conteúdo foi renderizado na interface

elementos interativos estão presentes

não foram detectados erros críticos no console

as ações realizadas não causaram falhas ou quebra de página
