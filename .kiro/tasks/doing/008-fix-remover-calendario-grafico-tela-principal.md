# 008 · fix · Remover calendário e gráfico da tela principal

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** — Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/008-fix-remover-calendario-grafico-tela-principal.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 008 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal -b fix/008-fix-remover-calendario-grafico-tela-principal ia-main
  cd .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal
  git branch --show-current  # Deve mostrar: fix/008-fix-remover-calendario-grafico-tela-principal
  ```

---

## 📋 Contexto e Motivação

A tela principal do projeto BIA possui dois elementos visuais que precisam ser removidos:

1. **Calendário (DatePicker):** Campo "Data/Prazo" no formulário `AddTask.jsx`, implementado com a biblioteca `react-datepicker`. O campo armazena a data na propriedade `dia_atividade` da tarefa.
2. **Card de acesso rápido ao gráfico:** Bloco `analytics-link-card` exibido na `HomePage` dentro do `App.jsx`, que exibe o atalho "📊 Ver Analytics" logo abaixo do formulário de criação de tarefas.

> **Importante:** A página `/analytics` em si (componente `Analytics.jsx`) **NÃO** deve ser removida — apenas o card de atalho exibido na tela principal.

---

## 🎯 Objetivo

Simplificar a tela principal removendo:
- O campo de data/calendário do formulário de criação de tarefas
- O card de acesso rápido "📊 Ver Analytics" da tela principal

---

## 📁 Arquivos Impactados

| Arquivo | Alteração |
|---|---|
| `client/src/components/AddTask.jsx` | Remover campo "Data/Prazo" com DatePicker, imports relacionados e lógica da data |
| `client/src/App.jsx` | Remover bloco do `analytics-link-wrapper` (card de acesso rápido ao analytics) |
| `client/src/styles/datepicker.css` | Avaliar se deve ser removido (não há mais uso do DatePicker) |
| `client/package.json` | Avaliar remoção das dependências `react-datepicker` e `date-fns` caso não sejam usadas em outro lugar |

---

## ✅ Checklist de Implementação

### 1. Remover calendário do `AddTask.jsx`

- [ ] Remover imports:
  ```js
  import DatePicker from "react-datepicker";
  import { registerLocale } from "react-datepicker";
  import { ptBR } from "date-fns/locale/pt-BR";
  import "react-datepicker/dist/react-datepicker.css";
  import "../styles/datepicker.css";
  ```
- [ ] Remover a chamada `registerLocale("pt-BR", ptBR)`
- [ ] Remover o state `const [dia, setDia] = useState(null)`
- [ ] Remover o bloco JSX do campo "Data/Prazo":
  ```jsx
  <div className="form-control">
    <label>Data/Prazo</label>
    <DatePicker ... />
  </div>
  ```
- [ ] Na função `onSubmit`, remover a função `formatDateToString` e ajustar o objeto enviado:
  - Remover a propriedade `dia_atividade: formatDateToString(dia)` **ou** manter enviando a data atual fixa (`new Date().toLocaleDateString('pt-BR')`) — a decisão deve preservar compatibilidade com o backend
  - **Recomendado:** manter `dia_atividade` enviando a data atual automaticamente para não quebrar o contrato com a API

### 2. Remover card de acesso rápido ao analytics do `App.jsx`

- [ ] Localizar e remover o bloco JSX:
  ```jsx
  {/* Card de acesso rápido ao Analytics */}
  <div className="analytics-link-wrapper">
    <a href="/analytics" className="analytics-link-card">
      <span className="analytics-link-icon">📊</span>
      <div className="analytics-link-text">
        <strong>Ver Analytics</strong>
        <span>Visualize suas tarefas por prioridade</span>
      </div>
      <span className="analytics-link-arrow">→</span>
    </a>
  </div>
  ```
- [ ] Verificar se o import do componente `Analytics` em `App.jsx` ainda é necessário (a rota `/analytics` deve ser mantida) — **não remover** o import nem a rota

### 3. Limpar arquivos órfãos (avaliar com cautela)

- [ ] Verificar se `client/src/styles/datepicker.css` é referenciado em outros lugares:
  ```bash
  grep -r "datepicker" client/src --include="*.jsx" --include="*.css" --include="*.js"
  ```
- [ ] Se não houver mais referências, remover o arquivo `datepicker.css`
- [ ] Verificar se `react-datepicker` e `date-fns` são usados em outros componentes antes de remover do `package.json`

### 4. Verificação visual e testes

- [ ] Rodar a aplicação localmente e confirmar que a tela principal não exibe mais o calendário
- [ ] Confirmar que o card "📊 Ver Analytics" não aparece mais na tela principal
- [ ] Confirmar que a página `/analytics` ainda funciona normalmente
- [ ] Confirmar que a criação de tarefas ainda funciona sem o campo de data
- [ ] Verificar se não houve quebra de layout após a remoção dos elementos

---

## 📐 Definition of Done (DoD)

- [ ] Campo "Data/Prazo" (DatePicker) removido do formulário da tela principal
- [ ] Card de acesso rápido "📊 Ver Analytics" removido da tela principal
- [ ] Criação de tarefas continua funcional (campo `dia_atividade` enviado automaticamente ou de outra forma compatível com a API)
- [ ] Rota `/analytics` e componente `Analytics.jsx` continuam funcionando
- [ ] Arquivos CSS e dependências órfãs removidos (se aplicável)
- [ ] Build do frontend sem erros (`npm run build` ou `yarn build` na pasta `client/`)
- [ ] Sem regressões visuais nas demais funcionalidades da tela principal

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal

# Verificar branch
git branch --show-current
# Deve mostrar: fix/008-fix-remover-calendario-grafico-tela-principal
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "fix: remove calendário e card de analytics da tela principal"
git push origin fix/008-fix-remover-calendario-grafico-tela-principal
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 008 concluída. Todos os itens do checklist marcados. Branch `fix/008-fix-remover-calendario-grafico-tela-principal` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/008-fix-remover-calendario-grafico-tela-principal.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 008 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal
git branch --show-current
# Deve mostrar: fix/008-fix-remover-calendario-grafico-tela-principal

# Abrir PR contra ia-main
gh pr create --base ia-main --title "008: Remove calendário e card de analytics da tela principal" --body "Closes task 008"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/008-fix-remover-calendario-grafico-tela-principal

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d fix/008-fix-remover-calendario-grafico-tela-principal
```

Notificar conclusão: "Task 008 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
