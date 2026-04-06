---
marp: true
theme: default
paginate: true
backgroundColor: #fff
color: #222
style: |
  section {
    font-family: 'Segoe UI', sans-serif;
  }
  h1, h2, h3 {
    color: #c0392b;
  }
  code {
    background: #f4f4f4;
    color: #333;
  }
  pre {
    background: #2d2d2d;
  }
  pre code {
    color: #f8f8f2;
  }
  a {
    color: #c0392b;
  }
  strong {
    color: #111;
  }
  blockquote {
    border-left: 4px solid #c0392b;
    padding-left: 1em;
    color: #555;
  }
  table {
    color: #222;
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background: #c0392b;
    color: #fff;
    padding: 0.5em 1em;
    border: 1px solid #ddd;
  }
  td {
    padding: 0.4em 1em;
    border: 1px solid #ddd;
    background: #fafafa;
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
---

# Agent Teams

## Building Multi-Agent Systems with Claude Code

**Knowit — April 2026**

---

## Inleiding

Mijn belangrijkste professionele doel op dit moment is het elke week opmaken van alle 
tokens in mijn Claude Max plan. (Op een nuttige manier)

Als ik een hele goede week heb kom ik tot 50% maar meestal maar tot 20% 

Dit lukt niet als ik slechts aan een ding tegelijk werk, ik moet Claude taken in parallel laten uitvoeren. 

Claude kan het, de vraag is, kan ik het dan nog bijbenen?

---

## Claude Code: terminal vs IDE

Wat maakt Claude Code anders dan werken met Copilot in de IDE?

Naarmate ik langer met Claude Code werk, begint mijn rol steeds meer te lijken op die van een team leider.

---

## Wat zijn Agent Teams?

Meerdere Claude Code sessies die samenwerken, aangestuurd door een **team lead**.

- **Team lead** — je hoofdsessie; maakt het team, start teammates, coördineert
- **Teammates** — aparte Claude Code instanties, elk met eigen context window
- **Gedeelde takenlijst** — teammates claimen en voltooien taken zelfstandig
- **Direct messaging** — teammates praten met elkaar, niet alleen terug naar de lead

> In tegenstelling tot subagents (die resultaten terugrapporteren), **werken teammates samen**.

---

## Subagents vs Agent Teams

- **Subagents** — gerichte werkers binnen je sessie, rapporteren resultaten terug, geen onderlinge communicatie
- **Agent teams** — onafhankelijke sessies met gedeelde takenlijst, direct messaging, zelf-coördinatie

**Gebruik subagents als** alleen het resultaat telt (onderzoek, verificatie)
**Gebruik agent teams als** teammates bevindingen moeten delen, elkaar uitdagen, samenwerken

⚠️ Agent teams zijn experimenteel — activeer met `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

---

## TMUX

tmux is een terminal multiplexer — je splitst één terminal in meerdere vensters (panes) die naast elkaar draaien.

Met tmux krijgt elke teammate een eigen pane — je ziet alle agents tegelijk werken.

- **Split panes** — elke teammate heeft een eigen terminal, klik erin om direct te communiceren
- **Overzicht** — zie in één oogopslag wie waaraan werkt
- **Direct ingrijpen** — klik in een pane om een teammate bij te sturen

--- 

## Demo

Agents 
- Analist
- Developer
- Tester


