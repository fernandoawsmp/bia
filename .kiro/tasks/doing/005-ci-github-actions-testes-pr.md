# 005 - ci - GitHub Actions: Execução de Testes a cada PR contra ia-main

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/005-ci-github-actions-testes-pr/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/005-ci-github-actions-testes-pr.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 005 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/005-ci-github-actions-testes-pr -b feature/005-ci-github-actions-testes-pr ia-main
  cd .kiro/worktrees/005-ci-github-actions-testes-pr
  git branch --show-current  # Deve mostrar: feature/005-ci-github-actions-testes-pr
  ```

---

## 📋 Descrição

Como desenvolvedor do projeto BIA, eu quero que o GitHub Actions execute automaticamente os testes unitários a cada Pull Request aberto contra a branch `ia-main`, para que regressões sejam identificadas antes do merge e a qualidade do código seja garantida continuamente.

O workflow existente em `.github/workflows/testes-pr.yml` já possui a estrutura básica, mas precisa ser aprimorado com: cache de dependências, relatório de cobertura, badge de status e tratamento correto de variáveis de ambiente necessárias para os testes.

---

## 🎯 Critérios de Aceitação

### Workflow CI
- [ ] O workflow dispara em todo `pull_request` aberto ou atualizado contra `ia-main`
- [ ] O workflow também dispara em `push` direto para `ia-main` (proteção da branch principal)
- [ ] Cache de `node_modules` configurado via `actions/cache` para acelerar execuções
- [ ] Versão do Node fixada em `22` (alinhada com o que já existe no workflow)
- [ ] Testes unitários executados com `npm test`
- [ ] Job falha (exit code não-zero) se qualquer teste falhar, bloqueando o merge

### Cobertura de Testes
- [ ] Cobertura de código gerada com `--coverage` no Jest
- [ ] Relatório de cobertura publicado como artefato do workflow (upload via `actions/upload-artifact`)
- [ ] Threshold mínimo de cobertura de **70%** configurado no `jest.config.js` (ou em `package.json`)

### Testes Existentes
- [ ] Todos os testes em `tests/unit/controllers/tarefas.test.js` passando (17 casos)
- [ ] Todos os testes em `tests/unit/controllers/versao.test.js` passando (3 casos)
- [ ] Verificar e corrigir eventuais dependências faltantes para os testes rodarem no ambiente CI

### Feedback Visual
- [ ] Badge de status do workflow adicionado ao `README.md` do projeto
- [ ] Badge aponta para o workflow `testes-pr.yml` na branch `ia-main`

---

## 🛠️ Implementação

### Arquivos a criar/modificar

| Arquivo | Ação | Descrição |
|---|---|---|
| `.github/workflows/testes-pr.yml` | **Modificar** | Aprimorar workflow com cache, cobertura e push trigger |
| `package.json` | **Modificar** | Adicionar configuração de coverage threshold no Jest |
| `README.md` | **Modificar** | Adicionar badge de status do CI |

### Estrutura atual do workflow (referência)
```yaml
# .github/workflows/testes-pr.yml — estado atual
name: Testes Unitários
on:
  pull_request:
    branches:
      - ia-main
jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Instalar dependências
        run: npm install
      - name: Executar testes unitários
        run: npm test
```

### Estrutura alvo do workflow
```yaml
name: Testes Unitários

on:
  pull_request:
    branches:
      - ia-main
  push:
    branches:
      - ia-main

jobs:
  testes:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Executar testes unitários com cobertura
        run: npm test -- --coverage

      - name: Publicar relatório de cobertura
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7
```

### Configuração de coverage no package.json
Adicionar dentro da chave `jest` (ou criar a chave):
```json
"jest": {
  "coverageThreshold": {
    "global": {
      "lines": 70,
      "functions": 70,
      "branches": 70,
      "statements": 70
    }
  }
}
```

### Badge para o README.md
```markdown
[![Testes Unitários](https://github.com/<owner>/<repo>/actions/workflows/testes-pr.yml/badge.svg?branch=ia-main)](https://github.com/<owner>/<repo>/actions/workflows/testes-pr.yml)
```
> ⚠️ Substituir `<owner>/<repo>` pela URL real do repositório antes de adicionar ao README.

---

## ✅ Checklist de Implementação

- [ ] Ler o workflow atual `.github/workflows/testes-pr.yml`
- [ ] Identificar o `remote.origin.url` do repositório via `git remote -v` para montar a badge correta
- [ ] Atualizar `.github/workflows/testes-pr.yml` com trigger de `push`, cache e step de cobertura
- [ ] Trocar `npm install` por `npm ci` para builds reproduzíveis em CI
- [ ] Adicionar `--coverage` no comando de testes
- [ ] Adicionar step de `upload-artifact` para o relatório de cobertura
- [ ] Adicionar configuração `jest.coverageThreshold` no `package.json`
- [ ] Executar localmente para validar: `npm test -- --coverage`
- [ ] Verificar se todos os 20 testes passam e o threshold é atingido
- [ ] Adicionar badge no `README.md` com a URL correta do repositório
- [ ] Fazer commit descritivo:
  ```bash
  git add .github/workflows/testes-pr.yml package.json README.md
  git commit -m "ci: aprimora workflow de testes com cache, cobertura e badge"
  git push -u origin feature/005-ci-github-actions-testes-pr
  ```

---

## 📐 Definição de Pronto (DoD)

- [ ] Workflow dispara em PR e push para `ia-main`
- [ ] Cache de `node_modules` configurado no workflow
- [ ] `npm ci` utilizado no lugar de `npm install`
- [ ] Relatório de cobertura gerado e publicado como artefato
- [ ] Threshold de 70% configurado e validado localmente
- [ ] Todos os 20 testes existentes passando
- [ ] Badge de status adicionado ao `README.md`
- [ ] Commit realizado na branch `feature/005-ci-github-actions-testes-pr`

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/005-ci-github-actions-testes-pr

# Verificar branch
git branch --show-current
# Deve mostrar: feature/005-ci-github-actions-testes-pr

# Rodar testes localmente para confirmar tudo verde
npm test -- --coverage
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "ci: finaliza implementação da task 005"
git push origin feature/005-ci-github-actions-testes-pr
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 005 concluída. Todos os itens do checklist marcados. Branch `feature/005-ci-github-actions-testes-pr` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/005-ci-github-actions-testes-pr

# Verificar se todos os itens estão ✅
npm test -- --coverage
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/005-ci-github-actions-testes-pr.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 005 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/005-ci-github-actions-testes-pr
git branch --show-current
# Deve mostrar: feature/005-ci-github-actions-testes-pr

# Abrir PR contra ia-main
gh pr create --base ia-main --title "005: ci - GitHub Actions executa testes a cada PR" --body "Closes task 005"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/005-ci-github-actions-testes-pr

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/005-ci-github-actions-testes-pr

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/005-ci-github-actions-testes-pr
```

Notificar conclusão: "Task 005 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- Testes existentes: `tests/unit/controllers/tarefas.test.js` (17 casos) e `tests/unit/controllers/versao.test.js` (3 casos)
- Workflow atual: `.github/workflows/testes-pr.yml`
- Framework de testes: Jest `^27.5.1`
- Comando atual: `npm test` → `jest tests/unit`

## Notas Técnicas
- Usar `npm ci` em vez de `npm install` para garantir builds reproduzíveis no CI (usa `package-lock.json`)
- O `actions/setup-node@v4` com `cache: 'npm'` já cuida do cache de `node_modules` automaticamente
- O relatório de cobertura é gerado em `./coverage/` por padrão pelo Jest
- A badge usa o formato padrão do GitHub Actions: `/<owner>/<repo>/actions/workflows/<arquivo>.yml/badge.svg`

## Valor de Negócio
- **Alto** — Garante que nenhum PR quebre os testes antes de entrar na branch principal
- Reduz regressões e aumenta confiança nos merges
- Relatório de cobertura visível por todos os revisores no PR

## Estimativa
**1 Story Point** — Tarefa de complexidade baixa, majoritariamente configuração

## Dependências
- Nenhuma dependência nova de código
- Requer que o repositório esteja hospedado no GitHub com GitHub Actions habilitado
