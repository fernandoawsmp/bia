# 010 · feat · Analytics com gráfico de barras e pizza e atalho na tela inicial

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** — Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/010-feat-analytics-grafico-barras-pizza/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/010-feat-analytics-grafico-barras-pizza.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 010 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/010-feat-analytics-grafico-barras-pizza -b feature/010-feat-analytics-grafico-barras-pizza ia-main
  cd .kiro/worktrees/010-feat-analytics-grafico-barras-pizza
  git branch --show-current  # Deve mostrar: feature/010-feat-analytics-grafico-barras-pizza
  ```

---

## 📋 Contexto e Motivação

A página `/analytics` já existe no projeto com um gráfico de barras (`BarChart`) agrupando tarefas por prioridade (Importantes × Normais), implementado com a lib `recharts` (já instalada).

Na task 008, o card de atalho "📊 Ver Analytics" foi removido da tela principal. Esta task:

1. **Evolui a página de analytics** adicionando um segundo tipo de visualização: **gráfico de pizza (PieChart)**, com alternância entre os dois formatos via botões/tabs
2. **Restaura o atalho na tela principal** (`App.jsx`) para que o usuário possa navegar até o analytics diretamente da tela inicial

### Por que sem novas dependências
O projeto já usa `recharts` que inclui `PieChart`, `Pie` e `Cell`. Não é necessário instalar nada adicional.

---

## 🎯 Objetivo

- Adicionar gráfico de pizza (`PieChart`) na página `/analytics`, com alternância entre **Barras** e **Pizza**
- Recolocar o card de atalho "📊 Ver Analytics" na tela principal (`App.jsx`)
- Os dados exibidos são os mesmos em ambos os formatos: tarefas **Importantes** × **Normais**

---

## 📁 Arquivos Impactados

| Arquivo | Alteração |
|---|---|
| `client/src/components/Analytics.jsx` | Adicionar PieChart, state de tipo de gráfico ativo e alternador visual |
| `client/src/App.jsx` | Restaurar o card de atalho "📊 Ver Analytics" na `HomePage` |

> **Nenhuma dependência nova** — `recharts` já está no `package.json`.

---

## ✅ Checklist de Implementação

### 1. Evoluir `Analytics.jsx` — adicionar PieChart e alternador

- [ ] Adicionar imports do `PieChart` no topo do arquivo:
  ```js
  import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
    ResponsiveContainer, Tooltip,
    PieChart, Pie, Legend,
  } from "recharts"
  ```

- [ ] Adicionar state para controlar o tipo de gráfico ativo:
  ```jsx
  const [chartType, setChartType] = useState("bar") // "bar" | "pie"
  ```

- [ ] Criar os botões alternadores de visualização (acima da área do gráfico, dentro do `Card`):
  ```jsx
  <div className="chart-toggle">
    <button
      className={`chart-toggle-btn ${chartType === "bar" ? "active" : ""}`}
      onClick={() => setChartType("bar")}
      aria-pressed={chartType === "bar"}
    >
      📊 Barras
    </button>
    <button
      className={`chart-toggle-btn ${chartType === "pie" ? "active" : ""}`}
      onClick={() => setChartType("pie")}
      aria-pressed={chartType === "pie"}
    >
      🥧 Pizza
    </button>
  </div>
  ```

- [ ] Implementar o `PieChart` (exibido quando `chartType === "pie"`):
  ```jsx
  {chartType === "pie" ? (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    /* BarChart existente */
    ...
  )}
  ```
  - O `chartData` já existente no componente (`⭐ Importantes` e `📋 Normais`) é reaproveitado sem alteração

- [ ] Garantir que a legenda visual existente (`analytics-legend`) continue visível em ambos os modos ou seja substituída pelo `<Legend />` nativo do recharts no modo pizza

### 2. Restaurar card de atalho no `App.jsx`

- [ ] Adicionar de volta o bloco de atalho na `HomePage`, entre o `<AddTask />` e a lista de tarefas:
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
  - As classes CSS `analytics-link-wrapper`, `analytics-link-card`, etc. já existem no `index.css` e podem ser reaproveitadas

- [ ] Confirmar que o import do `Analytics` e a rota `/analytics` já existem (não precisam ser criados)

### 3. Adicionar estilos para os botões alternadores

- [ ] Verificar se as classes `chart-toggle` e `chart-toggle-btn` já existem no `index.css`
- [ ] Se não existirem, adicionar estilos mínimos ao final do `index.css` (ou como estilo inline) seguindo o padrão visual já presente no arquivo:
  ```css
  .chart-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;
  }

  .chart-toggle-btn {
    padding: 0.4rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .chart-toggle-btn.active {
    background: var(--primary-color, #3b82f6);
    color: #fff;
    border-color: var(--primary-color, #3b82f6);
  }

  .chart-toggle-btn:hover:not(.active) {
    background: var(--bg-hover, rgba(0,0,0,0.05));
  }
  ```

### 4. Build e testes

- [ ] Executar build sem erros:
  ```bash
  cd client && npm run build
  ```
- [ ] Verificar que o card "📊 Ver Analytics" aparece na tela principal
- [ ] Clicar no card e acessar a página `/analytics`
- [ ] Verificar que o gráfico de **barras** é exibido por padrão
- [ ] Clicar no botão "🥧 Pizza" e verificar que o gráfico de pizza é exibido
- [ ] Clicar no botão "📊 Barras" e verificar que o gráfico de barras é restaurado
- [ ] Confirmar que os dados (Importantes × Normais) estão corretos em ambas as visualizações
- [ ] Verificar acessibilidade: `aria-pressed` nos botões reflete o estado ativo

---

## 📐 Definition of Done (DoD)

- [ ] Card de atalho "📊 Ver Analytics" visível na tela principal
- [ ] Página `/analytics` exibe o gráfico de **barras** por padrão
- [ ] Botões alternadores **Barras / Pizza** funcionam corretamente
- [ ] Gráfico de **pizza** exibe Importantes × Normais com percentuais
- [ ] Ambos os gráficos usam as mesmas cores (`#f59e0b` para Importantes, `#10b981` para Normais)
- [ ] Sem novas dependências no `package.json`
- [ ] Build do frontend sem erros
- [ ] Sem regressões nas demais funcionalidades

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/010-feat-analytics-grafico-barras-pizza

git branch --show-current
# Deve mostrar: feature/010-feat-analytics-grafico-barras-pizza
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: adiciona gráfico de pizza e alternador no analytics, restaura atalho na tela inicial"
git push origin feature/010-feat-analytics-grafico-barras-pizza
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..
```

**NOTIFICAR O PO:**
> "Task 010 concluída. Todos os itens do checklist marcados. Branch `feature/010-feat-analytics-grafico-barras-pizza` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
cd .kiro/worktrees/010-feat-analytics-grafico-barras-pizza
# Revisar código e testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
cd ../../..
mv .kiro/tasks/doing/010-feat-analytics-grafico-barras-pizza.md .kiro/tasks/done/
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 010 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
cd .kiro/worktrees/010-feat-analytics-grafico-barras-pizza
git branch --show-current
# Deve mostrar: feature/010-feat-analytics-grafico-barras-pizza

gh pr create --base ia-main --title "010: Analytics com gráfico de barras e pizza e atalho na tela inicial" --body "Closes task 010"
```

### 4. Após PR Mergeado
```bash
cd ../../..
git worktree remove .kiro/worktrees/010-feat-analytics-grafico-barras-pizza
git worktree prune
git branch -d feature/010-feat-analytics-grafico-barras-pizza
```

Notificar conclusão: "Task 010 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
