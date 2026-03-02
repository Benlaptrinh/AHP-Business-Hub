# Contributing to AHP Business Hub

Thanks for contributing. This guide defines the workflow and quality standards for this repository.

## Development Workflow

1. Create a feature branch from `main`.
2. Implement changes in focused, reviewable commits.
3. Ensure lint/build/tests pass locally.
4. Open a pull request with clear context and test evidence.

## Branch Naming

Use one of the following patterns:
- `feature/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`

Examples:
- `feature/admin-role-guard`
- `fix/payment-status-validation`
- `docs/update-setup-guide`

## Commit Message Convention

Use Conventional Commits:

```text
type(scope): summary
```

Allowed types:
- `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`

Examples:
- `feat(auth): add google oauth callback handler`
- `fix(api): validate empty payload in payments endpoint`
- `docs(readme): clarify local setup for docker`

## Pull Request Requirements

Each PR should include:
- Objective: what problem this PR solves.
- Scope: key files/modules changed.
- Validation: commands run and results.
- Risks: known impact or migration notes.

Recommended PR checklist:
- [ ] Branch is up to date with `main`
- [ ] Build passes for both apps
- [ ] Lint passes for both apps
- [ ] Tests updated/added where relevant
- [ ] No secrets or `.env` files committed

## Local Validation Commands

### Frontend

```bash
cd Frontend
npm run lint
npm run build
```

### Backend

```bash
cd Backend
npm run lint
npm run test
npm run build
```

## Coding Standards

- Keep PRs focused and small when possible.
- Prefer explicit names for functions, DTOs, and modules.
- Preserve API contract consistency (`success`, `message`, `data`).
- Use DTO validation for input boundaries.
- Keep role/authorization logic centralized in guards/decorators.

## Documentation Requirements

If your change affects setup, API shape, behavior, or workflows, update related docs in `README.md` or `docs/`.

## Security and Secrets

- Never commit credentials, private keys, or production secrets.
- Use `.env.example` for documenting required variables.
- Report sensitive security issues privately to project maintainers.

## Getting Help

If a requirement is unclear, open an issue before starting large changes so scope and design can be aligned early.
