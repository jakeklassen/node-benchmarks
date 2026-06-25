import { run, bench, summary } from "mitata";

/**
 * `Map.prototype.getOrInsert` / `getOrInsertComputed` are the new idioms for the
 * read-then-write-if-missing pattern that previously had to be written by hand.
 *
 *   getOrInsert(key, value)            // eager default value
 *   getOrInsertComputed(key, callback) // lazy default, only built on a miss
 *
 * Run with: node --expose-gc mitata/map/get-or-insert.ts
 *
 * The headline gotcha is ALLOCATION, not map-lookup speed:
 *
 *   - getOrInsert(key, []) evaluates its default eagerly, so it allocates a
 *     fresh [] on every call even on a hit. With many hits that is mostly
 *     garbage. Only safe for cheap/shared/primitive defaults.
 *
 *   - getOrInsertComputed(key, () => []) avoids the wasted array, but an inline
 *     `() => []` literal allocates a fresh closure on every call. Hoist the
 *     callback to a `const` outside the loop and that cost disappears — it then
 *     matches (or slightly beats) the hand-written get + set idiom.
 *
 * See the two summary blocks below: object defaults (allocation matters) and
 * primitive defaults (no allocation — isolates pure builtin-call overhead).
 */

// ---------------------------------------------------------------------------
// Workload 1: grouping — bucket items by key into arrays (object default).
// Keys repeat (500 distinct over 50k items) so the first-sighting "miss" path
// runs 500x and the "hit" path runs ~49.5k times.
// ---------------------------------------------------------------------------
const ITEMS = Array.from({ length: 50_000 }, (_, i) => ({
  key: `bucket-${i % 500}`,
  value: i,
}));

// Hoisted callback for getOrInsertComputed: closure allocated once, not per call.
const newBucket = (): number[] => [];

function groupWithGet(items: typeof ITEMS): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const { key, value } of items) {
    let bucket = map.get(key);
    if (bucket === undefined) {
      bucket = [];
      map.set(key, bucket);
    }
    bucket.push(value);
  }
  return map;
}

function groupWithHas(items: typeof ITEMS): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const { key, value } of items) {
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(value);
  }
  return map;
}

// Lazy default, fresh closure allocated on every iteration — the trap.
function groupWithComputedInline(items: typeof ITEMS): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const { key, value } of items) {
    map.getOrInsertComputed(key, () => []).push(value);
  }
  return map;
}

// Lazy default, callback hoisted out of the loop — the idiomatic form.
function groupWithComputedHoisted(items: typeof ITEMS): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const { key, value } of items) {
    map.getOrInsertComputed(key, newBucket).push(value);
  }
  return map;
}

// Eager default: a fresh [] is allocated on every iteration, even on a hit.
function groupWithGetOrInsert(items: typeof ITEMS): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const { key, value } of items) {
    map.getOrInsert(key, []).push(value);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Workload 2: counting — Map<string, number> (primitive default).
// No per-key allocation, so this isolates the pure builtin-call overhead of
// getOrInsert from the allocation effects above.
// ---------------------------------------------------------------------------
function countWithGet(items: typeof ITEMS): Map<string, number> {
  const map = new Map<string, number>();
  for (const { key } of items) {
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

function countWithGetOrInsert(items: typeof ITEMS): Map<string, number> {
  const map = new Map<string, number>();
  for (const { key } of items) {
    map.set(key, map.getOrInsert(key, 0) + 1);
  }
  return map;
}

// Sanity check: every strategy produces the same result.
{
  const groupers = [
    groupWithGet,
    groupWithHas,
    groupWithComputedInline,
    groupWithComputedHoisted,
    groupWithGetOrInsert,
  ];
  const [ref, ...rest] = groupers.map((fn) => fn(ITEMS));
  for (const other of rest) {
    console.assert(ref.size === other.size, "grouping strategies disagree on size");
    for (const [key, bucket] of ref) {
      console.assert(
        bucket.length === other.get(key)?.length,
        `grouping strategies disagree on bucket ${key}`,
      );
    }
  }

  const countRef = countWithGet(ITEMS);
  const countOther = countWithGetOrInsert(ITEMS);
  console.assert(countRef.size === countOther.size, "counting strategies disagree on size");
  for (const [key, n] of countRef) {
    console.assert(n === countOther.get(key), `counting strategies disagree on ${key}`);
  }
}

// Object default — allocation dominates.
summary(() => {
  bench("group: get + set (read -> if undefined -> write)", () => {
    groupWithGet(ITEMS);
  });

  bench("group: has + set + get", () => {
    groupWithHas(ITEMS);
  });

  bench("group: getOrInsertComputed(key, () => []) - inline closure", () => {
    groupWithComputedInline(ITEMS);
  });

  bench("group: getOrInsertComputed(key, newBucket) - hoisted callback", () => {
    groupWithComputedHoisted(ITEMS);
  });

  bench("group: getOrInsert(key, []) - eager default (allocates on hits)", () => {
    groupWithGetOrInsert(ITEMS);
  });
});

// Primitive default — no allocation, isolates pure builtin-call overhead.
summary(() => {
  bench("count: set((get ?? 0) + 1)", () => {
    countWithGet(ITEMS);
  });

  bench("count: set(getOrInsert(key, 0) + 1)", () => {
    countWithGetOrInsert(ITEMS);
  });
});

await run();
