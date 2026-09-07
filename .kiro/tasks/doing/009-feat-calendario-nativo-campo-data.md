# 009 · feat · Calendário nativo no campo data do formulário de tarefas

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** — Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/009-feat-calendario-nativo-campo-data/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/009-feat-calendario-nativo-campo-data.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 009 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/009-feat-calendario-nativo-campo-data -b feature/009-feat-calendario-nativo-campo-data ia-main
  cd .kiro/worktrees/009-feat-calendario-nativo-campo-data
  git branch --show-current  # Deve mostrar: feature/009-feat-calendario-nativo-campo-data
  ```

---

## 📋 Contexto e Motivação

O formulário de criação de tarefas (`AddTask.jsx`) atualmente não exibe nenhum campo de data visível ao usuário — a data é preenchida automaticamente com `new Date().toLocaleDateString('pt-BR')` no momento do submit (resultado da task 008).

O usuário precisa conseguir **escolher a data via calendário visual** ao incluir uma tarefa, sem precisar digitar manualmente. O valor continua sendo gravado no banco de dados como **string no formato `DD/MM/YYYY`**, sem alteração no backend ou no modelo de dados.

### Abordagem adotada: `<input type="date">` nativo

Usar o input nativo do HTML5 é a solução mais simples, sem dependências externas, totalmente compatível com os browsers modernos e alinhada com a filosofia de simplicidade do projeto.

- O input nativo exibe um **calendário visual** ao clicar
- O valor retornado pelo browser é no formato `YYYY-MM-DD`
- Antes de enviar para a API, converter para `DD/MM/YYYY`
- Se o usuário **não selecionar nenhuma data**, usar a data de hoje automaticamente (comportamento atual preservado)

---

## 🎯 Objetivo

Adicionar ao formulário `AddTask.jsx` um campo de data com calendário visual, usando `<input type="date">` nativo do HTML5, que:
- Permite ao usuário escolher a data clicando em um calendário
- Converte o valor para `DD/MM/YYYY` antes de enviar à API
- Usa a data de hoje como padrão quando nenhuma data for selecionada
- Não requer nenhuma biblioteca externa adicional

---

## 📁 Arquivos Impactados

| Arquivo | Alteração |
|---|---|
| `client/src/components/AddTask.jsx` | Adicionar campo `<input type="date">` com state e conversão de formato |

> **Nenhum outro arquivo precisa ser alterado.** Backend, modelo de dados e API permanecem intactos.

---

## ✅ Checklist de Implementação

### 1. Adicionar state de data no `AddTask.jsx`

- [ ] Adicionar o state para a data selecionada:
  ```jsx
  const [dia, setDia] = useState("");
  ```

### 2. Adicionar função de conversão de formato

- [ ] Criar helper para converter `YYYY-MM-DD` → `DD/MM/YYYY`:
  ```js
  const formatarData = (dataISO) => {
    if (!dataISO) return new Date().toLocaleDateString('pt-BR');
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };
  ```

### 3. Atualizar o `onSubmit` para usar a data selecionada

- [ ] Substituir o valor fixo de `dia_atividade` pela função `formatarData`:
  ```jsx
  onAdd({
    titulo: titulo.trim(),
    dia_atividade: formatarData(dia),
    importante,
  });
  ```
- [ ] Resetar o campo data após o submit:
  ```jsx
  setDia("");
  ```

### 4. Adicionar o campo JSX no formulário

- [ ] Inserir o campo `<input type="date">` entre o campo "Tarefa" e o checkbox "Importante":
  ```jsx
  <div className="form-control">
    <label htmlFor="data">Data</label>
    <input
      type="date"
      id="data"
      value={dia}
      onChange={(e) => setDia(e.target.value)}
    />
  </div>
  ```
  - O campo **não deve ser obrigatório** (`required` ausente) — se vazio, usa a data de hoje

### 5. Verificação do resultado esperado

- [ ] O formulário exibe o campo "Data" com um calendário nativo ao clicar
- [ ] Ao selecionar uma data no calendário, o campo é preenchido
- [ ] Ao submeter sem selecionar data, `dia_atividade` recebe a data de hoje no formato `DD/MM/YYYY`
- [ ] Ao submeter com data selecionada, `dia_atividade` recebe a data escolhida no formato `DD/MM/YYYY`
- [ ] Após o submit, o campo data é resetado (fica vazio novamente)
- [ ] O campo título permanece obrigatório e o modal de erro continua funcionando

### 6. Build e testes

- [ ] Executar build para garantir que não há erros:
  ```bash
  cd client && npm run build
  ```
- [ ] Testar criação de tarefa com data selecionada via calendário
- [ ] Testar criação de tarefa sem selecionar data (deve usar hoje)
- [ ] Verificar que a tarefa criada aparece corretamente na lista

---

## 📐 Definition of Done (DoD)

- [ ] Campo "Data" com calendário nativo visível no formulário de criação de tarefas
- [ ] Seleção de data via calendário funciona corretamente
- [ ] Data enviada à API sempre no formato `DD/MM/YYYY` (string)
- [ ] Quando nenhuma data é selecionada, usa a data de hoje automaticamente
- [ ] Campo resetado após o submit
- [ ] Sem novas dependências no `package.json`
- [ ] Build do frontend sem erros
- [ ] Sem regressões nas demais funcionalidades

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/009-feat-calendario-nativo-campo-data

git branch --show-current
# Deve mostrar: feature/009-feat-calendario-nativo-campo-data
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: adiciona calendário nativo no campo data do formulário de tarefas"
git push origin feature/009-feat-calendario-nativo-campo-data
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..
```

**NOTIFICAR O PO:**
> "Task 009 concluída. Todos os itens do checklist marcados. Branch `feature/009-feat-calendario-nativo-campo-data` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
cd .kiro/worktrees/009-feat-calendario-nativo-campo-data
# Revisar código e testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
cd ../../..
mv .kiro/tasks/doing/009-feat-calendario-nativo-campo-data.md .kiro/tasks/done/
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 009 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
cd .kiro/worktrees/009-feat-calendario-nativo-campo-data
git branch --show-current
# Deve mostrar: feature/009-feat-calendario-nativo-campo-data

gh pr create --base ia-main --title "009: Calendário nativo no campo data do formulário" --body "Closes task 009"
```

### 4. Após PR Mergeado
```bash
cd ../../..
git worktree remove .kiro/worktrees/009-feat-calendario-nativo-campo-data
git worktree prune
git branch -d feature/009-feat-calendario-nativo-campo-data
```

Notificar conclusão: "Task 009 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
