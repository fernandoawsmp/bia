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

- [x] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [x] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/001-feat-tela-versao-api.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 001 para doing"
  git push origin ia-main
  ```

- [x] **Criar worktree:**
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
- [x] Criar componente `Version.jsx` em `client/src/components/` seguindo o padrão do componente `Tasks.jsx`
- [x] Implementar rota `/versao` no sistema de roteamento do React
- [x] Exibir informações de versão da API consumindo o endpoint `/api/versao`
- [x] Mostrar status de conectividade com a API (online/offline)

### Interface e UX
- [x] Seguir o mesmo padrão visual da tela de tarefas
- [x] Implementar loading state durante verificação da API
- [x] Exibir indicadores visuais de status (ícones coloridos para online/offline)
- [x] Incluir botão para atualizar as informações manualmente
- [x] Interface responsiva para diferentes tamanhos de tela

### Navegação
- [x] Adicionar link no menu/header para acessar a tela de versão
- [x] Implementar indicação de página ativa (link ativo no nav destaca a página corrente)
- [x] Manter consistência com o padrão de navegação existente

### Tratamento de Erros
- [x] Exibir mensagem amigável quando a API estiver indisponível
- [x] Implementar timeout para requisições
- [x] Log de erros no contexto de debug existente (se houver)

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

- [x] Ler e entender o componente `Tasks.jsx` para referenciar o padrão
- [x] Verificar a resposta do endpoint `/api/versao` para mapear os campos
- [x] Criar o componente `Version.jsx` com loading state e tratamento de erro
- [x] Adicionar a rota `/versao` no sistema de rotas
- [x] Adicionar link de navegação no header/menu apontando para `/versao`
- [x] Implementar destaque visual do link ativo na navegação
- [x] Implementar botão de atualizar manualmente
- [x] Verificar responsividade da tela
- [x] Rodar os testes existentes para garantir que nenhuma regressão foi introduzida:
  ```bash
  npm test
  ```
- [x] Testar manualmente a rota `/versao` no browser com API disponível
- [x] Testar comportamento quando API está indisponível
- [x] Fazer commit com mensagem descritiva:
  ```bash
  git add .
  git commit -m "feat: adiciona tela de versao da API"
  git push -u origin feature/001-feat-tela-versao-api
  ```

---

## 📐 Definição de Pronto (DoD)

- [x] Componente `Version.jsx` criado e funcionando
- [x] Rota `/versao` configurada e acessível
- [x] Link de navegação presente no header/menu
- [x] Link ativo destacado visualmente na página corrente
- [x] Loading state exibido enquanto consulta a API
- [x] Status online/offline exibido com indicador visual
- [x] Mensagem amigável exibida quando API indisponível
- [x] Botão de atualizar funcional
- [x] Interface responsiva
- [x] Testes existentes passando sem regressão
- [x] Código segue os padrões do projeto (React hooks, context)

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

## ⚠️ CORREÇÕES NECESSÁRIAS - UX

### 🔴 Problema Identificado
A bolinha verde (indicador de status) foi movida de posição após a implementação, prejudicando a experiência do usuário.

### ✅ Correções Obrigatórias
- [x] **RESTAURAR** a bolinha verde para sua posição original na interface ✅ *CSS duplicado removido*
- [x] **MANTER** funcionalidade básica da bolinha (versão + status API apenas)
- [x] **SEPARAR** responsabilidades: bolinha verde = info básica, tela `/versao` = detalhes completos
- [x] **PRESERVAR** comportamento de clique original da bolinha verde
- [x] **GARANTIR** que não há conflitos visuais entre bolinha e tela de versão ✅ *`.header` duplicado removido*
- [x] **ALTERAR** o botão "Add New Task" para "Incluir nova tarefa"

## Notas Técnicas
- Reutilizar lógica existente do componente `VersionInfo.jsx` como base
- Manter consistência com o padrão de fetch de dados usado em `Tasks.jsx`
- Utilizar os contextos existentes (Theme, Log)
- Seguir a estrutura de pastas e nomenclatura do projeto
- **CRÍTICO**: Revisar CSS/styling que alterou posição da bolinha verde

## Valor de Negócio
- **Alto** - Facilita monitoramento e troubleshooting
- Melhora experiência do usuário para verificação de status
- Padroniza acesso a informações técnicas da aplicação
- **RESTAURA** experiência familiar do usuário

## Estimativa
**2 Story Points** - Tarefa de complexidade baixa/média

## Dependências
- Nenhuma dependência externa identificada
- Utiliza endpoints e componentes já existentes