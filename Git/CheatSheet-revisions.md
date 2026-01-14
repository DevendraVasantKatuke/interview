```
git log master...develop	inspect differences in branches
git rebase -i HEAD~3		rebase last 3 commits
git reset --hard HEAD@{2}	undo last operation that changed HEAD
git checkout v2^{}			checkout the v2 tag (not v2 branch)

// The 3rd argument in each of these commands is a git revision. These gitrevisions can be passed to many Git commands.
```
```
git show dae68e1			sha1
git show HEAD				reference
git show v1.0.0				tag
git show master				local branch
git show origin/master		remote branch
git show master~2			2 commits back from master
git show master..fix		reachable from fix but not master
git show master...fix		reachable from fix and master, but not both

// These are just the common ones, there’s a lot more below! (These work in many other commands, not just git show.)
```

### Commits
```
git checkout dae68e1		sha1
```

### References
```
git checkout HEAD			reference
git checkout master			branch
git checkout v1.0.0			tag
git checkout origin/master	aka, refs/remotes/origin/master
git checkout heads/master	aka, refs/heads/master
```

### Searching back
```
git checkout master@{yesterday}		also 1 day ago, etc
git checkout master@{2}				2nd prior value
git checkout master@{push}			where master would push to
git checkout master^				parent commit
git checkout master^2				2nd parent, eg, what it merged
git checkout master~5				5 parents back
git checkout master^0				this commit; disambiguates from tags
git checkout v0.99.8^{tag}			can be commit, tag, tree, object
git checkout v0.99.8^{}				defaults to {tag}
git checkout ":/fix bug"			searches commit messages
```

### Other
```
HEAD:README	…
0:README	(0 to 3) …
```

## Ranges

### Ranges
```
git log master			reachable parents from master
git log ^master			exclude reachable parents from master
git log master..fix		reachable from fix but not master
git log master...fix	reachable from fix and master, but not both
git log HEAD^@			parents of HEAD
git log HEAD^!			HEAD, then excluding parents’s ancestors
git log HEAD^{:/fix}	search previous HEADs matching criteria
```

### Ranges illustration
```
A ─┬─ E ── F ── G   master
   │
   └─ B ── C ── D   fix
git log master..fix	BCD
git log master...fix	BCD and EFG
```