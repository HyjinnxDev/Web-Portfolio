# Project skills (Cursor Mobile)

These skills are copied from your global `~/.cursor/skills/` so they travel with this repo on **Cursor Mobile** and cloud agents.

## On mobile

1. Clone/open **HyjinnxDev/Web-Portfolio** in Cursor Mobile
2. Skills load automatically from `.cursor/skills/`
3. Type `/` in agent chat to invoke them (e.g. `/impeccable`, `/ui-ux-pro-max`)

## Sync from desktop

After installing or updating skills globally, re-copy them into this repo:

```powershell
robocopy "$env:USERPROFILE\.cursor\skills" ".cursor\skills" /E /XD frontend-design vercel-best-practices
```

Then commit and push.

## Included skills

- **impeccable** — UI design, polish, audit
- **ui-ux-pro-max** — design system search (needs Python on the agent machine)
- **baseline-ui**, **ui-styling**, **design**, **design-system**, **brand**, **banner-design**, **slides**
- **fixing-accessibility**, **fixing-metadata**, **fixing-motion-performance**
- **ui-skills-root**, **test**

Built-in Cursor skills (`/create-skill`, `/canvas`, etc.) are account-managed and do not need to be in this folder.
