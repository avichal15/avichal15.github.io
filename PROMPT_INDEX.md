# Prompt Index — Which prompt should I use?

| Goal | Prompt | Expected behavior |
|---|---|---|
| Build the portfolio end-to-end | `MASTER_EXECUTION_PROMPT.md` | Recommended. Audits first, then implements in phases, uses real tools, builds/validates Blender model when source sheet is available, and tests the real site. |
| Review what exists without changing files | `ANTIGRAVITY_FIRST_PROMPT.md` | Read-only audit and plan only. No installs, code changes or modelling. |
| Create and prove only the 3D avatar asset | `ANTIGRAVITY_BLENDER_ASSET_PROMPT.md` | Dedicated Blender task using the detailed mandatory fidelity and rigging spec. |

Don't paste multiple prompts at once. Select the prompt that matches the work you want done. The root `AGENTS.md` and `.agents/rules/*.md` are persistent constraints, not prompts to paste as a chat message.
