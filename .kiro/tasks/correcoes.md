## ⚠️ CORREÇÕES NECESSÁRIAS - UX

### 🔴 Problema Identificado
A bolinha verde (indicador de status) foi movida de posição após a implementação, prejudicando a experiência do usuário.

### ✅ Correções Obrigatórias
- [ ] **RESTAURAR** a bolinha verde para sua posição original na interface ✅ *CSS duplicado removido*
- [ ] **MANTER** funcionalidade básica da bolinha (versão + status API apenas)
- [ ] **SEPARAR** responsabilidades: bolinha verde = info básica, tela `/versao` = detalhes completos
- [ ] **PRESERVAR** comportamento de clique original da bolinha verde
- [ ] **GARANTIR** que não há conflitos visuais entre bolinha e tela de versão ✅ *`.header` duplicado removido*
- [ ] **ALTERAR** o botão "Add New Task" para "Incluir nova tarefa"

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