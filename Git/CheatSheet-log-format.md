### Pretty format
```
git log --pretty="format:%H"
```

### Hash
```
// Commit
%H	commit hash
%h	(abbrev) commit hash

// Tree
%T	tree hash
%t	(abbrev) tree hash

// Parent
%P	parent hash
%p	(abbrev) parent hash
```

### Commit
```
%s	commit subject
%f	commit subject, filename style
%b	commit body
%d	ref names
%e	encoding
```

## Author and committer#

### Author
```
// Name
%an	author
%aN	author, respecting mailmap

// Email
%ae	author email
%aE	author email, respecting mailmap

// Date
%aD	author date (rfc2882)
%ar	author date (relative)
%at	author date (unix timestamp)
%ai	author date (iso8601)
```

### Committer
```
// Name
%cn	committer name
%cN	committer name, respecting mailmap

// Email
%ce	committer email
%cE	committer email, respecting mailmap

// Date
%cD	committer date (rfc2822)
%cr	committer date (relative)
%ct	committer date (unix timestamp)
%ci	committer date (iso8601)
```