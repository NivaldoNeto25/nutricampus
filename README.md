# 🍏 NutriCampus

> **Nutrição Inteligente e Prática para Universitários de Dupla Jornada.**

O **NutriCampus** é uma aplicação web mobile-first desenvolvida para resolver um problema crítico no ambiente acadêmico: a dificuldade que estudantes enfrentam para manter uma alimentação saudável, equilibrada e econômica em meio a uma rotina exaustiva de estudos, trabalho e treinos. 

Quando o tempo é escasso, o consumo de *fast food* e o salto de refeições tornam-se comuns, gerando impactos negativos como cansaço constante, inchaço e comprometimento do foco. O NutriCampus atua como um assistente pessoal que automatiza o planejamento alimentar, otimiza o tempo de preparo e gamifica a consistência.

---

## ✨ Funcionalidades Principais

### 🎯 1. Onboarding Dinâmico e Personalizado
O aplicativo inicia com uma triagem rápida (Nome, Peso, Altura e Objetivo Principal: *Economizar Tempo*, *Mais Energia* ou *Ganhar Massa*). O motor do app utiliza esses dados para gerar toda a experiência subsequente. O sistema é robusto o suficiente para suportar diferentes demandas energéticas, adaptando-se desde rotinas focadas em estudos até cronogramas intensos de treino (como divisões de 5 dias em *Push/Pull/Legs* e *Upper/Lower*, intercaladas com dias de cardio e abdômen).

### 🍽️ 2. Cardápio Inteligente (5 Refeições)
Um painel interativo que exibe o cardápio diário (Café da Manhã, Lanche da Manhã, Almoço, Lanche da Tarde e Jantar) alinhado ao objetivo do usuário. 
- **Check-in de Refeições:** O usuário marca o que já consumiu, alimentando o sistema de gamificação.
- **Substituições Inteligentes:** Opções rápidas para trocar um alimento caso enjoe ou falte algum ingrediente.

### ⏱️ 3. Guia de Meal Prep (Preparo em Lote)
A "mágica" para economizar tempo. O usuário seleciona (via *checkbox*) quais itens do cardápio semanal deseja cozinhar no dia. O aplicativo gera instantaneamente um **passo a passo cronológico e otimizado** (Ex: "1. Coloque os grãos no fogo. 2. Pique os legumes. 3. Grelhe a proteína").

### 🛒 4. Lista de Compras Categorizada
Gerada automaticamente a partir do cardápio da semana. Os itens são agrupados por seções do supermercado (Hortifruti, Carnes, Mercearia) para que o estudante faça as compras no menor tempo possível.

### 🆘 5. Dicas "Plano B" (Contenção de Danos)
Uma aba de sobrevivência universitária com cards de ação rápida. Se o planejamento falhar e o usuário esquecer a marmita, o app sugere o que comprar na cantina da faculdade ou como montar um lanche nutritivo em 5 minutos à noite.

### 🏆 6. Perfil e Gamificação
Para manter o engajamento, o NutriCampus transforma a consistência em um jogo:
- **Dashboard de Sucesso:** Gráficos que mostram a taxa de adesão ao plano na semana.
- **Streaks (Ofensivas):** Contador de dias seguidos batendo as metas.
- **Badges:** Conquistas desbloqueáveis, como *"Mestre do Meal Prep"* ou *"Foco de Aço"*.

---

## 🚀 Tecnologias Utilizadas

O MVP foi construído com foco em performance e reatividade:

* **Front-end:** React.js
* **Estilização:** Tailwind CSS
* **Gerenciamento de Estado:** Context API / React Hooks (useState, useEffect)
* **Ícones:** Lucide Icons
* **Design Pattern:** Mobile-first, UI/UX minimalista focado em conversão de tarefas.

---
