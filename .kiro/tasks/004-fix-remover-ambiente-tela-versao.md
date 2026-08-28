# 004 - fix - Remover informação de ambiente da tela de versão

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/004-fix-remover-ambiente-tela-versao/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/004-fix-remover-ambiente-tela-versao.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 004 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/004-fix-remover-ambiente-tela-versao -b feature/004-fix-remover-ambiente-tela-versao ia-main
  cd .kiro/worktrees/004-fix-remover-ambiente-tela-versao
  git branch --show-current  # Deve mostrar: feature/004-fix-remover-ambiente-tela-versao
  ```

---

## 📋 Descrição

A tela de versão (`/versao`), renderizada pelo componente `client/src/components/Version.jsx`, exibe atualmente dois cards:

1. **🔌 Status da API** — mostra status (online/offline), versão e última verificação
2. **🌍 Ambiente** — mostra tipo de ambiente inferido pelo hostname/protocolo

O card de **Ambiente deve ser removido**. A tela deve exibir apenas o card de **Status da API**.

---

## 🎯 Critério de Aceite

- A tela `/versao` exibe **somente** o card de Status da API.
- O card "🌍 Ambiente" não deve mais aparecer na tela.
- O card de Status da API deve continuar funcionando normalmente (status online/offline, versão, última verificação, botão atualizar).
- A função `getEnvironmentInfo` e qualquer código exclusivo ao card de ambiente podem ser removidos do arquivo `Version.jsx`.
- Nenhum outro componente ou rota deve ser alterado.

---

## 🛠️ Implementação

### Arquivo alvo
`client/src/components/Version.jsx`

### O que remover

**1. A função `getEnvironmentInfo`** (linhas do topo do arquivo):
```js
const getEnvironmentInfo = () => {
  // ... toda a função
};
```

**2. A linha que instancia `envInfo`** (dentro do componente):
```js
const envInfo = getEnvironmentInfo();
```

**3. O segundo card inteiro** no JSX retornado:
```jsx
<div className="version-card">
  <div className="card-header">
    <h3>🌍 Ambiente</h3>
    <span
      className="env-badge"
      style={{ backgroundColor: envInfo.color }}
    >
      {envInfo.icon} {envInfo.label}
    </span>
  </div>
  <div className="card-content">
    <p><strong>Tipo:</strong> {envInfo.label}</p>
    <p><strong>Endereço:</strong> {envInfo.description}</p>
    <p><strong>Protocolo:</strong> {window.location.protocol}</p>
    <p><strong>API URL:</strong> {apiUrl}</p>
  </div>
</div>
```

### O que manter intacto
- Todo o card de **Status da API**
- O cabeçalho da página (`version-header` com título e botão Atualizar)
- Toda a lógica de fetch (`fetchVersionInfo`, `useEffect`, estados de loading/error/success)

---

## ✅ Checklist de Implementação

- [ ] Abrir o arquivo `client/src/components/Version.jsx`
- [ ] Remover a função `getEnvironmentInfo` do arquivo
- [ ] Remover a linha `const envInfo = getEnvironmentInfo();` dentro do componente
- [ ] Remover o segundo card "🌍 Ambiente" do JSX
- [ ] Verificar que não restaram referências a `envInfo` no arquivo
- [ ] Verificar visualmente que a tela `/versao` exibe apenas o card de Status da API
- [ ] Verificar que o card de Status da API ainda funciona (carrega versão, mostra status)
- [ ] Rodar os testes existentes para garantir que nenhuma regressão foi introduzida
  ```bash
  npm test
  ```
- [ ] Fazer commit com mensagem descritiva:
  ```bash
  git add client/src/components/Version.jsx
  git commit -m "fix: remove card de ambiente da tela de versao"
  git push -u origin feature/004-fix-remover-ambiente-tela-versao
  ```

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/004-fix-remover-ambiente-tela-versao

# Verificar branch
git branch --show-current
# Deve mostrar: feature/004-fix-remover-ambiente-tela-versao
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "fix: finaliza implementação da task 004"
git push origin feature/004-fix-remover-ambiente-tela-versao
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 004 concluída. Todos os itens do checklist marcados. Branch `feature/004-fix-remover-ambiente-tela-versao` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/004-fix-remover-ambiente-tela-versao

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/004-fix-remover-ambiente-tela-versao.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 004 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/004-fix-remover-ambiente-tela-versao
git branch --show-current
# Deve mostrar: feature/004-fix-remover-ambiente-tela-versao

# Abrir PR contra ia-main
gh pr create --base ia-main --title "004: remove card de ambiente da tela de versão" --body "Closes task 004"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/004-fix-remover-ambiente-tela-versao

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/004-fix-remover-ambiente-tela-versao

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/004-fix-remover-ambiente-tela-versao
```

Notificar conclusão: "Task 004 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
