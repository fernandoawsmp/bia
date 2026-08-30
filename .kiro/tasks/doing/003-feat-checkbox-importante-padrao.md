# 003 - feat - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/003-feat-checkbox-importante-padrao/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/003-feat-checkbox-importante-padrao.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 003 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/003-feat-checkbox-importante-padrao -b feature/003-feat-checkbox-importante-padrao ia-main
  cd .kiro/worktrees/003-feat-checkbox-importante-padrao
  git branch --show-current  # Deve mostrar: feature/003-feat-checkbox-importante-padrao
  ```

---

## 📋 Descrição

Na tela de cadastro de tarefa (`AddTask`), o checkbox de **"Importante"** deve vir **marcado por padrão** quando o formulário é aberto ou resetado após o envio.

Atualmente o estado inicial do campo `importante` é `false`. Ele deve passar a ser `true`.

---

## 🎯 Critério de Aceite

- Ao abrir a tela de cadastro de tarefas, o checkbox "Importante" deve aparecer **marcado (checked)** por padrão.
- Após o envio do formulário (submit com sucesso), o checkbox deve **voltar a ficar marcado** (reset para `true`, não para `false`).
- O comportamento de desmarcar e marcar manualmente deve continuar funcionando normalmente.
- Nenhuma outra funcionalidade da tela deve ser alterada.

---

## 🛠️ Implementação

### Arquivo alvo
`client/src/components/AddTask.jsx`

### Mudanças necessárias

**1. Estado inicial do campo `importante`**

Linha atual:
```js
const [importante, setImportante] = useState(false);
```

Deve ser alterado para:
```js
const [importante, setImportante] = useState(true);
```

**2. Reset após submit**

Linha atual (dentro da função `onSubmit`):
```js
setImportante(false);
```

Deve ser alterado para:
```js
setImportante(true);
```

### Escopo da mudança
- Apenas **2 linhas** no arquivo `AddTask.jsx`
- Sem alterações de CSS, backend, banco de dados ou outros componentes

---

## ✅ Checklist de Implementação

- [ ] Abrir o arquivo `client/src/components/AddTask.jsx`
- [ ] Alterar `useState(false)` para `useState(true)` no campo `importante`
- [ ] Alterar `setImportante(false)` para `setImportante(true)` no reset do `onSubmit`
- [ ] Verificar visualmente que o checkbox aparece marcado ao carregar o formulário
- [ ] Verificar que após submeter uma tarefa, o checkbox volta marcado
- [ ] Verificar que ainda é possível desmarcar e remarcar manualmente o checkbox
- [ ] Rodar os testes existentes para garantir que nenhuma regressão foi introduzida
  ```bash
  npm test
  ```
- [ ] Fazer commit com mensagem descritiva:
  ```bash
  git add client/src/components/AddTask.jsx
  git commit -m "feat: marca checkbox importante como true por padrao no cadastro"
  git push -u origin feature/003-feat-checkbox-importante-padrao
  ```

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/003-feat-checkbox-importante-padrao

# Verificar branch
git branch --show-current
# Deve mostrar: feature/003-feat-checkbox-importante-padrao
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: finaliza implementação da task 003"
git push origin feature/003-feat-checkbox-importante-padrao
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 003 concluída. Todos os itens do checklist marcados. Branch `feature/003-feat-checkbox-importante-padrao` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/003-feat-checkbox-importante-padrao

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/003-feat-checkbox-importante-padrao.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 003 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/003-feat-checkbox-importante-padrao
git branch --show-current
# Deve mostrar: feature/003-feat-checkbox-importante-padrao

# Abrir PR contra ia-main
gh pr create --base ia-main --title "003: checkbox importante marcado por padrão" --body "Closes task 003"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/003-feat-checkbox-importante-padrao

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/003-feat-checkbox-importante-padrao

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/003-feat-checkbox-importante-padrao
```

Notificar conclusão: "Task 003 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
