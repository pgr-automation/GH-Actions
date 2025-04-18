# GH-Actions
## 1. What is GitHub Actions?
  - Automate testing, building, and deploying apps without leaving GitHub.
---

## 2. Purpose of CI/CD
  - Run your tests automatically on every push to catch bugs early.
---
## 3. Workflows
  - Automatically test code on every push to main.
   ```.github/workflows/test.yml```
---
## 4. Events (Triggers)
```yaml
on:
  push:
    branches: [main]
```
  - Trigger workflow only when code is pushed to main.
---
## 5. Jobs
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```
  - Separate tasks like testing, building, and deploying in different jobs.
---
## 6. Steps
```yaml
steps:
  - name: Install Dependencies
    run: npm install
```
  - Individual commands or actions executed in a job.
---
## 7. Actions
```yaml
- uses: actions/setup-node@v3
  with:
    node-version: 18
```
  - Reusable logic—set up Node.js instead of writing bash every time.
---
## 8. Runners
```yaml
runs-on: ubuntu-latest
```
  -  Use GitHub-hosted runners to execute workflows.
---
## 10. Checkout Action
```yaml
- uses: actions/checkout@v3
```
  - Needed to pull your repo's code into the runner.
## 11. Environment Variables
```yaml
env:
  NODE_ENV: production
```
  - Set NODE_ENV so your app knows it's running in production.
---

## 12. GitHub Secrets
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```
  - Hide API keys securely instead of hardcoding them.
---
## 13. Matrix Strategy
```yaml
strategy:
  matrix:
    node-version: [14, 16, 18]
```
  - Test app in multiple Node versions in parallel.
## 14. Caching
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```
  - Cache npm install results to speed up CI time.
---
## 15. Artifacts
```yaml
- name: Upload Artifact
  uses: actions/upload-artifact@v3
  with:
    name: build
    path: dist/
```
  - Save compiled files or test logs for later jobs or download.
---

## 16. Using run: scripts
```yaml
run: |
  echo "Building project"
  npm run build
```
  - Run multiple shell commands in one step.
---
## 17. Conditional Execution
```yaml
if: github.ref == 'refs/heads/main'
```
  - Only run deployment step on main branch.
---
## 18. Workflow Inputs & Outputs
```yaml
jobs:
  build:
    outputs:
      version: ${{ steps.get_version.outputs.version }}
```
  - Share version number between jobs.
---
## 19. Job Dependencies
```yaml
jobs:
  test:
  deploy:
    needs: test
```
  - Ensure deploy runs only if test succeeds
--- 
## 20. Timeouts & Error Handling
```yaml
timeout-minutes: 5
```
  - Stop jobs that hang longer than expected.
---
## 21. Manual Triggers
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [staging, production]
```
  - Trigger deployments manually with options.
---
## 22. Scheduled Triggers
```yaml
on:
  schedule:
    - cron: '0 0 * * *'
```
  - Run nightly builds/tests (midnight UTC in this case).

---
## 23. Workflow Reuse
```yaml
uses: ./.github/workflows/deploy.yml
```
  - Call a central deployment workflow from multiple pipelines.
---
## 24. Creating Custom Actions (JS)

  - Build your own GitHub Action to lint PR titles or enforce naming rules.
---
## 25. Action Metadata (action.yml)
```yaml
name: 'My Custom Action'
description: 'Checks PR naming'
runs:
  using: 'node12'
  main: 'index.js'
```
  - Define your custom action’s interface.
---
##  28. GitHub Context & Expressions
```yaml
if: ${{ github.actor == 'octocat' }}
```
  - Use dynamic values in workflow logic.
--- 
## 30. Status Checks & Required Workflows

  - Block PRs from merging unless tests pass and linting completes.

---
## 31. Third-Party Integrations

  - Send Slack message after deploy using 8398a7/action-slack.
---
## 32. Monorepo Support
```yaml
on:
  push:
    paths:
      - 'apps/frontend/**'
```
  - Trigger workflow only if frontend folder changes.
---
## 33. Reusable Composite Actions

  - Combine steps like install, lint, and test into one action used by multiple projects.

---
# Github actions Supported Build types
1. Matrix build
2. Single-Environment Build
3. Parrallel Builds
4. Dependemcy Builds
5. Scheduled Builds
6. Resuable Workflow builds