---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a2e
color: #eee
style: |
  section {
    font-family: 'Segoe UI', sans-serif;
  }
  h1, h2, h3 {
    color: #e94560;
  }
  code {
    background: #16213e;
    color: #0f3460;
  }
  pre code {
    color: #eee;
  }
  a {
    color: #e94560;
  }
  blockquote {
    border-left: 4px solid #e94560;
    padding-left: 1em;
    color: #aaa;
  }
  table {
    color: #eee;
  }
  th {
    background: #16213e;
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

## What Are Agent Teams?

Multiple AI agents collaborating to solve problems — each with a **specific role**, **tools**, and **scope**.

Instead of one monolithic prompt doing everything:

- **Decompose** work into specialized agents
- **Coordinate** via an orchestrator or message passing
- **Isolate** failures — one agent failing doesn't crash the system

> Think microservices, but for AI workflows.

---

## Why Agent Teams?

| Single Agent | Agent Team |
|---|---|
| One massive context window | Focused, smaller contexts |
| All tools available everywhere | Least-privilege per agent |
| Hard to debug | Trace per agent |
| Prompt gets unwieldy | Each agent has a clear role |
| One failure = total failure | Graceful degradation |

---

## Common Patterns

### 1. Orchestrator Pattern
One "manager" agent dispatches tasks to specialist workers.

```
┌──────────────┐
│  Orchestrator │
└──┬───┬───┬───┘
   │   │   │
   v   v   v
 [A] [B] [C]   ← worker agents
```

### 2. Pipeline Pattern
Agents process work sequentially — output of one feeds the next.

```
[Planner] → [Coder] → [Reviewer] → [Tester]
```

---

## Common Patterns (cont.)

### 3. Debate / Critic Pattern
Multiple agents propose solutions, a critic selects the best.

```
[Agent A] ──┐
[Agent B] ──┼──→ [Critic] → final answer
[Agent C] ──┘
```

### 4. Autonomous Swarm
Agents pick up work from a shared queue (e.g., GitHub Issues).

```
[Issue Queue] ←→ [Agent 1]
              ←→ [Agent 2]
              ←→ [Agent 3]
```

---

## Claude Code: Built-in Agent Teams

Claude Code natively supports multi-agent workflows:

- **`Agent` tool** — spawn subagents with isolated context
- **`subagent_type`** — specialized agents (Explore, Plan, etc.)
- **`isolation: "worktree"`** — each agent gets its own git branch
- **`SendMessage`** — agents can communicate mid-task
- **`TeamCreate`** — define persistent agent teams

```javascript
// Spawn a focused research agent
Agent({
  subagent_type: "Explore",
  prompt: "Find all API endpoints in this repo"
})
```

---

## Agent Roles in Practice

| Role | What it does | Tools it uses |
|---|---|---|
| **Planner** | Breaks down tasks, creates issues | GitHub API, Read |
| **Implementer** | Writes code in a worktree | Edit, Write, Bash |
| **Reviewer** | Reviews PRs, suggests fixes | Read, Grep, GitHub API |
| **Tester** | Runs tests, reports results | Bash, Read |
| **Deployer** | Handles CI/CD triggers | Bash, GitHub API |

> Least-privilege: each agent only has the tools it needs.

---

## Live Demo: The Ticket Lifecycle

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Planner   │────→│ GitHub Issue  │────→│ Implementer  │
│   Agent     │     │   Created     │     │    Agent     │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                │
                                         ┌──────▼───────┐
                                         │   Pull       │
                                         │   Request    │
                                         └──────────────┘
```

1. **Planner agent** analyzes requirements → creates GitHub Issues
2. **Implementer agent** picks up an issue → writes code → opens PR
3. All visible in the GitHub repo — real commits, real PRs

---

## Demo: Creating Issues with an Agent

```markdown
# Agent prompt (planner)
Analyze the README and codebase. Create GitHub Issues
for improvements, bugs, or missing features.

Use `gh issue create` for each issue. Label them
with priority and type.
```

The agent:
- Reads the codebase
- Identifies work items
- Creates structured GitHub issues
- Labels and assigns them

---

## Demo: Implementing a Ticket

```markdown
# Agent prompt (implementer)
Pick up issue #3 from GitHub. Read the issue description,
implement the changes in a feature branch, and open a PR.
```

The agent:
- Reads the issue details via `gh issue view`
- Creates a feature branch
- Implements the changes
- Commits and opens a PR referencing the issue

---

## Key Design Principles

### 1. Clear Boundaries
Each agent has a well-defined scope. No overlap.

### 2. Least Privilege
Agents only get the tools they need — a reviewer shouldn't deploy.

### 3. Observable
Every agent action is traceable — git commits, issue comments, PR reviews.

### 4. Idempotent
Agents should be safe to re-run. No destructive side effects.

### 5. Human in the Loop
Critical decisions (merge, deploy) require human approval.

---

## Pitfalls to Avoid

- **Over-engineering** — start with 2 agents, not 12
- **Shared mutable state** — use git worktrees for isolation
- **Unbounded autonomy** — always have kill switches
- **Ignoring cost** — each agent call costs tokens; be intentional
- **No observability** — log every agent action, every decision

> "The best agent team is the smallest one that solves the problem."

---

## Getting Started

```bash
# 1. Define your agents in CLAUDE.md
# 2. Create agent definitions
# 3. Use Claude Code's Agent tool to orchestrate

# Example: run two agents in parallel
claude -p "Create issues for the TODO items" &
claude -p "Review open PRs and add comments" &
```

Or use the **Agent SDK** for programmatic control:

```python
from claude_agent_sdk import Agent, Team

team = Team(agents=[planner, implementer, reviewer])
team.run("Build the login feature")
```

---

## Repo Structure for Agent Teams

```
agent-teams/
├── CLAUDE.md           # Project instructions
├── .claude/
│   └── agents/         # Agent definitions
│       ├── planner.md
│       └── implementer.md
├── doc/
│   └── agent-teams.md  # This presentation
├── src/                # Demo application
└── README.md
```

---

## What's Next?

- **Scheduled agents** — cron-based agents that run daily
- **Event-driven agents** — trigger on PR, issue, or Slack message
- **Cross-repo teams** — agents that work across multiple repos
- **Agent memory** — persistent context across runs
- **Self-improving teams** — agents that optimize their own prompts

---

## Questions?

**Repository:** github.com/joriswijlens/agent-teams

**Resources:**
- [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
- [Agent SDK](https://github.com/anthropics/claude-code/tree/main/packages/claude-agent-sdk)

> *"The future of software engineering is not AI replacing developers —
> it's developers orchestrating teams of AI agents."*
