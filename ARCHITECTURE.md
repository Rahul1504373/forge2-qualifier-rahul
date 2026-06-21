# Forge 2 Qualifier Architecture

## Agent Roles
- Hermes (brain): planning, decomposition, memory recall, skill-triggered status reports, autonomous cron updates.
- OpenClaw (hands): implementation, command execution, coding tasks, and structured progress reports.

## Slack Channel Scheme
- #sprint-main: human <-> Hermes planning and approvals
- #agent-coder: Hermes task handoff to OpenClaw and coding reports
- #agent-log: autonomous run logs and raw audit activity

## Model Routing (Free Stack)
- Hermes planning model: openai/gpt-oss-120b via Groq
- OpenClaw coding model: qwen2.5-coder via Ollama local
- Fallback ladder: Groq -> Gemini -> OpenRouter free -> Cerebras -> Ollama

## Application Topology
- Frontend: React + Vite in frontend/
- Backend: Laravel API + SQLite in backend/
- Data model: Board -> Lists -> Cards, plus Tags and Members

## Human-in-the-loop Loop
1. Human posts goal in #sprint-main
2. Hermes posts plan and task breakdown
3. Hermes assigns coding task in #agent-coder
4. OpenClaw implements and reports in three sections
5. Human approves or redirects
