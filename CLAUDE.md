# Agent Teams — Project Instructions

## About
This is a demo project for showcasing multi-agent workflows with Claude Code.
The repo is used in a presentation and as a live demo.

## Repository
- GitHub: joriswijlens/agent-teams

## Conventions
- Use GitHub Issues for task tracking
- Feature branches: `feature/<issue-number>-<short-description>`
- PRs should reference the issue they resolve with `Closes #<number>`

## Agent Roles

### Planner
- Reads the codebase and identifies work items
- Creates GitHub Issues with clear descriptions and acceptance criteria
- Labels issues with `enhancement`, `bug`, or `documentation`

### Implementer
- Picks up a GitHub Issue
- Creates a feature branch
- Implements the changes
- Opens a PR referencing the issue

## Demo Application
The `src/` directory contains a simple application that agents can improve.
