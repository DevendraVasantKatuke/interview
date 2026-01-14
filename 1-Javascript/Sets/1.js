
// Combining Sets:
// Set.prototype.intersection(other)
// Set.prototype.union(other)
// Set.prototype.difference(other)
// Set.prototype.symmetricDifference(other)

// Checking Set relationships:
// Set.prototype.isSubsetOf(other)
// Set.prototype.isSupersetOf(other)
// Set.prototype.isDisjointFrom(other)

assert.deepEqual(
  new Set(['a', 'b', 'c']).union(new Set(['b', 'c', 'd'])),
  new Set(['a', 'b', 'c', 'd'])
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).intersection(new Set(['b', 'c', 'd'])),
  new Set(['b', 'c'])
);
assert.deepEqual(
  new Set(['a', 'b']).isSubsetOf(new Set(['a', 'b', 'c'])),
  true
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).isSupersetOf(new Set(['a', 'b'])),
  true
);