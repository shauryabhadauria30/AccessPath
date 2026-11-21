# Git quick-start for Windows

Git records project snapshots so the team can compare changes and recover earlier work. Git is local; GitHub is an optional online copy and collaboration service.

## 1. Install and configure

Install **Git for Windows** from [git-scm.com/download/win](https://git-scm.com/download/win). Open PowerShell or Git Bash and set the name/email that should appear on your commits:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global --list
```

Use an email you are comfortable associating with commits; GitHub offers a private noreply address in account settings.

## 2. Start tracking this folder

In PowerShell, move into the project folder with `cd`, then:

```powershell
git init
```

Create `.gitignore` before adding files. A sensible starter for a JavaScript app is:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
```

Do not commit passwords, API keys, private data, or generated dependencies. Check what Git sees:

```powershell
git status
git add .
git status
git commit -m "Add AccessPath starter docs"
```

`add` stages selected changes; `commit` saves a snapshot. Repeat `git status`, `git add <file>`, and `git commit -m "Describe the change"` as you work.

## 3. Branches (optional for a three-person beginner team)

For the first shared demo, one `main` branch with small, coordinated commits may be simplest. If parallel edits cause collisions, create a short-lived branch:

```powershell
git switch -c feature/route-view
```

After the work is ready, commit it, switch to `main`, and merge:

```powershell
git switch main
git merge feature/route-view
```

Coordinate before two people edit the same files. Resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) by keeping the intended combined content, save, then `git add <file>` and commit.

## 4. Optional GitHub remote and sync

Create an empty GitHub repository (do not add a README if this folder already has one), then connect its URL:

```powershell
git remote add origin https://github.com/USER/REPOSITORY.git
git push -u origin main
```

For later sync, get teammates' latest commits before sending yours:

```powershell
git pull --rebase
git push
```

Use the repository URL GitHub provides and sign in through its prompt/browser. Never paste a password or token into source files. If working without a remote, commits still provide local history but are not backed up online.

## Common fixes

- **Wrong folder:** run `pwd` and `git status`; use `cd` to enter the project.
- **`git` not recognized:** finish Git for Windows installation, reopen the terminal, and try again.
- **Nothing to commit:** run `git status`; save edited files, then `git add` them.
- **Committed the wrong files, not pushed:** edit as needed and make a new commit; avoid history rewriting during the hackathon.
- **Forgot a file:** `git add <file>` then `git commit --amend --no-edit` only if the commit has not been shared; otherwise make a new commit.
- **Push rejected:** run `git pull --rebase`, resolve any conflicts, then `git push`.
- **Accidentally staged a file:** `git restore --staged <file>` unstages it without deleting your work.
- **Undo an unshared file edit:** `git restore <file>` discards that edit permanently; use only when certain.
