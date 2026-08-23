# 001 - feat - Tela de Versão da API

## 📋 Descrição

Implementar uma tela dedicada no frontend da BIA para exibir as informações retornadas pela rota `/api/versao`. Atualmente já existe um componente `Version.jsx` com funcionalidade básica, mas a tela precisa ser aprimorada para oferecer uma experiência visual mais completa, clara e consistente com o restante da aplicação.

## 🎯 Objetivo

O usuário deve conseguir acessar a rota `/versao` no frontend e visualizar de forma clara:
- A versão atual da API (`Bia X.X.X`)
- O status de conectividade com a API (online/offline/verificando)
- A URL da API sendo consultada
- O horário da última verificação
- Um botão para atualizar as informações manualmente

---

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** — Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/001-feat-tela-versao-api/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent dev deve:

- [ ] **Verificar branch atual:**
  ```bash
  git branch --show-current
  ```
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/001-feat-tela-versao-api.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 001 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/001-feat-tela-versao-api -b feature/001-feat-tela-versao-api ia-main
  cd .kiro/worktrees/001-feat-tela-versao-api
  git branch --show-current  # Deve mostrar: feature/001-feat-tela-versao-api
  ```

---

## 📌 Contexto Técnico

### Stack do Frontend
- **React 17.0.2** com Vite
- **Tailwind CSS** (configurado em `client/tailwind.config.js`)
- **React Router DOM** — rota `/versao` já registrada em `client/src/App.jsx`
- **LogContext** disponível para logging de chamadas de API

### Arquivos Relevantes
| Arquivo | Situação |
|---|---|
| `client/src/components/Version.jsx` | Existe — funcionalidade básica implementada, precisa de melhorias visuais |
| `client/src/components/VersionInfo.jsx` | Existe — componente de tooltip no header, não é a tela principal |
| `api/routes/versao.js` | Existe — rota `GET /api/versao` funcionando |
| `api/controllers/versao.js` | Existe — retorna `Bia {VERSAO_API}` como texto |
| `client/src/App.jsx` | Existe — rota `/versao` já mapeada para `<Version />` |

### Resposta da API
```
GET /api/versao
→ 200 OK
→ Body (text/plain): "Bia 4.2.0"
```

---

## ✅ Critérios de Aceite

1. A rota `/versao` no frontend exibe a tela de versão
2. A tela consome a rota `GET /api/versao` e exibe o texto retornado (ex: `Bia 4.2.0`)
3. A tela exibe o status da API com indicador visual claro (online 🟢 / offline 🔴 / verificando 🟡)
4. A tela exibe a URL da API que está sendo consultada
5. A tela exibe o horário da última verificação bem-sucedida
6. Existe um botão "Atualizar" que re-faz a chamada à API
7. Em caso de erro, uma mensagem descritiva é exibida
8. O visual é consistente com o restante da aplicação (usar classes CSS/Tailwind já existentes)
9. A navegação para a tela é acessível — verificar se há link no Header ou menu de navegação

---

## 🛠️ Checklist de Implementação

### Análise e Planejamento
- [ ] Ler o `Version.jsx` atual e entender o que já está implementado
- [ ] Ler o `VersionInfo.jsx` para entender o padrão visual usado no header
- [ ] Verificar o `Header.jsx` para checar se há navegação para `/versao`
- [ ] Ler o `index.css` para entender as classes CSS disponíveis (`.version-page`, `.version-card`, etc.)

### Implementação
- [ ] Revisar e aprimorar o componente `Version.jsx`:
  - [ ] Layout visual claro e organizado
  - [ ] Card com status da API (online/offline/verificando) com indicador colorido
  - [ ] Exibição da versão retornada pela API
  - [ ] Exibição da URL da API consultada
  - [ ] Exibição do timestamp da última verificação
  - [ ] Botão "Atualizar" funcional
  - [ ] Estado de loading com feedback visual
  - [ ] Estado de erro com mensagem descritiva e botão para tentar novamente
- [ ] Verificar se o `Header.jsx` possui link para `/versao`; se não houver, adicionar
- [ ] Garantir que as classes CSS necessárias existam em `index.css`; adicionar se necessário

### Validação
- [ ] Testar a rota `/versao` no browser com API online — dados devem aparecer corretamente
- [ ] Testar com API offline (parar o servidor) — tela deve mostrar estado de erro
- [ ] Testar o botão "Atualizar"
- [ ] Verificar responsividade básica da tela
- [ ] Verificar que o LogContext está registrando as chamadas corretamente

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent dev concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/001-feat-tela-versao-api

# Verificar branch
git branch --show-current
# Deve mostrar: feature/001-feat-tela-versao-api
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: implementa tela de versão da API na rota /versao"
git push -u origin feature/001-feat-tela-versao-api
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 001 concluída. Todos os itens do checklist marcados. Branch `feature/001-feat-tela-versao-api` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/001-feat-tela-versao-api

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/001-feat-tela-versao-api.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 001 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/001-feat-tela-versao-api
git branch --show-current
# Deve mostrar: feature/001-feat-tela-versao-api

# Abrir PR contra ia-main
gh pr create --base ia-main --title "001: Tela de versão da API" --body "Closes task 001 - Implementa tela dedicada na rota /versao exibindo informações da rota GET /api/versao"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/001-feat-tela-versao-api

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/001-feat-tela-versao-api

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/001-feat-tela-versao-api
```

Notificar conclusão: "Task 001 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- `client/src/components/Version.jsx` — Componente atual a ser aprimorado
- `client/src/components/VersionInfo.jsx` — Componente de referência visual
- `api/routes/versao.js` — Rota da API
- `api/controllers/versao.js` — Controller da API
- `client/src/App.jsx` — Registro das rotas do frontend
- `client/src/index.css` — Estilos globais da aplicação
