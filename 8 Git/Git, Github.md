- git status
- git restore index.html
- git restore --staged index.html
- git log // logs history of commits
- git log --oneline
- git commit -v --amend // text editor
    - i for insert
    - esc for escape
    - shift+: wq (write, quit)
- git branch --list
- git branch -m b1 b2 // rename branch b1 to b2
- delete the branch
    - step 1: checkout to main branch
    - step 2: git branch -D <BranchName>
- merge b1 to main
    - checkout to main
    - git merge b1 // nerges b1 to main
    - // all commits are also moved to main