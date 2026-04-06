# Agent Teams

A demo project showcasing multi-agent workflows with Claude Code.

## What's Here

- **`doc/`** — Marp presentation about agent teams
- **`src/`** — Demo application for agents to work on
- **`.claude/`** — Agent definitions and project config

## Quick Start

```bash
# View the presentation
npx @marp-team/marp-cli doc/agent-teams.md --preview

# Export to PDF
npx @marp-team/marp-cli doc/agent-teams.md -o doc/agent-teams.pdf
```

## Agent Workflow

1. **Planner agent** — reads the codebase, creates GitHub Issues for improvements
2. **Implementer agent** — picks up issues, writes code, opens PRs

```bash
# Let an agent create tickets
claude -p "Read the codebase and create GitHub Issues for any improvements or missing features"

# Let an agent implement a ticket
claude -p "Pick up issue #1, implement it in a feature branch, and open a PR"
```

## License

MIT
