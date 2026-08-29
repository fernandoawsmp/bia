# 001 - feat - Implementar Tela de Versão da API

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/001-feat-tela-versao-api/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
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

## 📋 Descrição

Como usuário do sistema BIA, eu quero acessar uma tela específica que exiba informações detalhadas sobre a versão da aplicação, para que eu possa verificar o status da API e outras informações técnicas relevantes.

A tela deverá seguir o mesmo padrão visual e estrutural da tela de tarefas já existente no projeto.

---

## 🎯 Critérios de Aceitação

### Funcionalidades Principais
- [ ] Criar componente `Version.jsx` em `client/src/components/` seguindo o padrão do componente `Tasks.jsx`
- [ ] Implementar rota `/versao` no sistema de roteamento do React
- [ ] Exibir informações de versão da API consumindo o endpoint `/api/versao`
- [ ] Mostrar status de conectividade com a API (online/offline)

### Interface e UX
- [ ] Seguir o mesmo padrão visual da tela de tarefas
- [ ] Implementar loading state durante verificação da API
- [ ] Exibir indicadores visuais de status (ícones coloridos para online/offline)
- [ ] Incluir botão para atualizar as informações manualmente
- [ ] Interface responsiva para diferentes tamanhos de tela

### Navegação
- [ ] Adicionar link no menu/header para acessar a tela de versão
- [ ] Implementar indicação de página ativa (link ativo no nav destaca a página corrente)
- [ ] Manter consistência com o padrão de navegação existente

### Tratamento de Erros
- [ ] Exibir mensagem amigável quando a API estiver indisponível
- [ ] Implementar timeout para requisições
- [ ] Log de erros no contexto de debug existente (se houver)

---

## 🛠️ Implementação

### Arquivos a criar/modificar

| Arquivo | Ação |
|---|---|
| `client/src/components/Version.jsx` | **Criar** — componente principal da tela |
| `client/src/App.jsx` (ou equivalente de rotas) | **Modificar** — adicionar rota `/versao` |
| `client/src/components/Header.jsx` (ou Nav equivalente) | **Modificar** — adicionar link de navegação |

### Referência de endpoint
- **URL:** `GET /api/versao`
- **Resposta esperada:** JSON com informações de versão da aplicação
- Antes de implementar, verificar a resposta real do endpoint para saber quais campos exibir

### Padrão visual
- Antes de implementar, ler o arquivo `Tasks.jsx` para seguir exatamente o mesmo padrão de estrutura, hooks e estilos

---

## ✅ Checklist de Implementação

- [ ] Ler e entender o componente `Tasks.jsx` para referenciar o padrão
- [ ] Verificar a resposta do endpoint `/api/versao` para mapear os campos
- [ ] Criar o componente `Version.jsx` com loading state e tratamento de erro
- [ ] Adicionar a rota `/versao` no sistema de rotas
- [ ] Adicionar link de navegação no header/menu apontando para `/versao`
- [ ] Implementar destaque visual do link ativo na navegação
- [ ] Implementar botão de atualizar manualmente
- [ ] Verificar responsividade da tela
- [ ] Rodar os testes existentes para garantir que nenhuma regressão foi introduzida:
  ```bash
  npm test
  ```
- [ ] Testar manualmente a rota `/versao` no browser com API disponível
- [ ] Testar comportamento quando API está indisponível
- [ ] Fazer commit com mensagem descritiva:
  ```bash
  git add .
  git commit -m "feat: adiciona tela de versao da API"
  git push -u origin feature/001-feat-tela-versao-api
  ```

---

## 📐 Definição de Pronto (DoD)

- [ ] Componente `Version.jsx` criado e funcionando
- [ ] Rota `/versao` configurada e acessível
- [ ] Link de navegação presente no header/menu
- [ ] Link ativo destacado visualmente na página corrente
- [ ] Loading state exibido enquanto consulta a API
- [ ] Status online/offline exibido com indicador visual
- [ ] Mensagem amigável exibida quando API indisponível
- [ ] Botão de atualizar funcional
- [ ] Interface responsiva
- [ ] Testes existentes passando sem regressão
- [ ] Código segue os padrões do projeto (React hooks, context)

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

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
git commit -m "feat: finaliza implementação da task 001"
git push origin feature/001-feat-tela-versao-api
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
gh pr create --base ia-main --title "001: implementa tela de versão da API" --body "Closes task 001"
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
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
