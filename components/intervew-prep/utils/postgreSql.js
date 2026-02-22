export const postgreSql = [
  {
    "id": 1,
    "topic": "postgresql",
    "question": "Explain PostgreSQL's process architecture and how it differs from a traditional thread-per-connection model.",
    "answer": "PostgreSQL uses a multi-process architecture, not multi-threaded. Each client connection gets its own backend process (postgres), spawned by the postmaster. The postmaster listens on the port, accepts connections, and forks a new backend for each. This design isolates crashes—if one backend dies, others continue. Shared memory (shared_buffers, WAL buffers) is used for coordination. Each process has its own private memory for query execution, work_mem, and temp buffers.\n\nInternally, background processes handle maintenance: autovacuum launcher spawns workers, checkpointer flushes dirty pages, WAL writer writes WAL to disk, stats collector gathers metrics. The advantage is robustness: no single-thread crash can take down the server. The trade-off is higher memory per connection and context-switch overhead at very high connection counts—hence connection pooling (PgBouncer) is critical in production.\n\nProduction tip: On a 16GB box, 100 connections × ~10MB each can consume 1GB. Use PgBouncer in transaction mode to multiplex thousands of clients onto tens of real connections.",
    "tags": [
      "architecture",
      "process-model"
    ],
    "actionWords": [
      "multi-process",
      "postmaster",
      "backend process",
      "shared memory",
      "connection pooling"
    ],
    "codeExample": "SELECT pid, usename, application_name, state FROM pg_stat_activity WHERE datname = current_database();"
  },
  {
    "id": 2,
    "topic": "postgresql",
    "question": "How do ACID properties manifest in PostgreSQL, and what happens when each property is violated?",
    "answer": "ACID ensures reliable transactions. Atomicity: All statements in a transaction commit or all rollback. PostgreSQL uses WAL (Write-Ahead Logging)—changes are written to WAL before data files. On failure, recovery replays or undoes based on WAL. If you INSERT 3 rows and the 3rd fails, the first 2 are rolled back automatically.\n\nConsistency: Constraints (CHECK, FK, UNIQUE) are enforced. A transaction cannot leave the DB in a constraint-violating state. Deferred constraints allow temporary violations within a transaction but enforce at commit.\n\nIsolation: MVCC (Multi-Version Concurrency Control) lets readers see snapshots without blocking writers. Default isolation is Read Committed; you can set Serializable for strictest isolation. Phantom reads and non-repeatable reads depend on isolation level.\n\nDurability: Once COMMIT returns, data survives crashes. sync_commit=on (default) means fsync before returning. Setting sync_commit=off trades durability for speed—acceptable for some analytics workloads but risky for financial data.\n\nProduction edge case: Long-running transactions block vacuum from reclaiming dead rows, causing table bloat. Keep transactions short.",
    "tags": [
      "ACID",
      "transactions"
    ],
    "actionWords": [
      "atomicity",
      "consistency",
      "isolation",
      "durability",
      "WAL",
      "MVCC"
    ],
    "codeExample": "BEGIN;\nINSERT INTO accounts (id, balance) VALUES (1, 100);\nUPDATE accounts SET balance = balance - 50 WHERE id = 2;\n-- If either fails, both roll back\nCOMMIT;"
  },
  {
    "id": 3,
    "topic": "postgresql",
    "question": "Explain MVCC in PostgreSQL: how does it work internally, and why does it enable high concurrency?",
    "answer": "MVCC (Multi-Version Concurrency Control) means readers never block writers and writers never block readers. Each row version has two hidden columns: xmin (transaction ID that inserted it) and xmax (transaction ID that deleted/updated it, or 0 if still valid). When you UPDATE, PostgreSQL doesn't overwrite—it inserts a new row version and marks the old one with xmax. Readers see only rows visible to their snapshot (based on transaction ID at snapshot start).\n\nInternally, the visibility check: a row is visible if xmin is committed and xmax is either 0 or uncommitted. Snapshot isolation is built from the transaction ID ranges. This avoids read locks—SELECT never blocks UPDATE. The cost is storage: old row versions accumulate until vacuumed. Autovacuum removes dead tuples and updates the visibility map.\n\nWhy high concurrency: No shared locks on read. A long analytical query can run while OLTP updates continue. Trade-off: table bloat if vacuum lags, and UPDATE creates new row versions (heap hot updates can avoid index changes if no indexed columns change).\n\nProduction pitfall: Long-running transactions (e.g., 2-hour reports) prevent vacuum from reclaiming dead tuples created during that window, leading to bloat and slow queries.",
    "tags": [
      "MVCC",
      "concurrency"
    ],
    "actionWords": [
      "xmin",
      "xmax",
      "snapshot",
      "visibility",
      "dead tuples",
      "bloat"
    ],
    "codeExample": "SELECT ctid, xmin, xmax, * FROM my_table LIMIT 1;"
  },
  {
    "id": 4,
    "topic": "postgresql",
    "question": "Compare PostgreSQL isolation levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
    "answer": "Read Uncommitted: PostgreSQL treats it like Read Committed—it doesn't support dirty reads. You'll never see uncommitted data.\n\nRead Committed (default): Each statement sees a snapshot at statement start. Within a transaction, two SELECTs can return different results if another transaction commits in between (non-repeatable read). Phantom reads possible: a second query can see new rows.\n\nRepeatable Read: Snapshot is taken at transaction start. All statements see the same data. Non-repeatable reads and phantoms are prevented. If a concurrent transaction commits a conflicting change, you get a serialization failure—application must retry.\n\nSerializable: Strictest. Uses SSI (Serializable Snapshot Isolation)—tracks read/write dependencies and aborts transactions that would violate serializability. Use for financial or inventory systems where consistency is critical. Expect more aborts under contention.\n\nProduction choice: Most apps use Read Committed. Use Repeatable Read for reports that must be consistent. Use Serializable when you need to prevent anomalies like lost updates without explicit locking.",
    "tags": [
      "transactions",
      "isolation-levels"
    ],
    "actionWords": [
      "Read Committed",
      "Repeatable Read",
      "Serializable",
      "SSI",
      "phantom read",
      "non-repeatable read"
    ],
    "codeExample": "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nBEGIN;\nSELECT * FROM accounts WHERE id = 1;\n-- Snapshot fixed; no one else's commits visible until we commit\nCOMMIT;"
  },
  {
    "id": 5,
    "topic": "postgresql",
    "question": "What are the main lock types in PostgreSQL, and when does each cause blocking or deadlock?",
    "answer": "Row-level locks: FOR UPDATE (exclusive), FOR SHARE (shared). Multiple transactions can hold FOR SHARE on the same row; FOR UPDATE blocks others. Used in SELECT ... FOR UPDATE to lock rows for update.\n\nTable-level locks: ACCESS SHARE (reads), ROW SHARE (SELECT FOR UPDATE), ROW EXCLUSIVE (INSERT/UPDATE/DELETE), SHARE (CREATE INDEX CONCURRENTLY), SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE (DROP, TRUNCATE, VACUUM FULL). Locks have a compatibility matrix: some block each other.\n\nDeadlock: Transaction A locks row 1, B locks row 2; A waits for row 2, B waits for row 1. PostgreSQL detects deadlocks and aborts one transaction. Avoid by always locking in the same order (e.g., lock by id ASC).\n\nAdvisory locks: Application-defined locks via pg_advisory_lock. Useful for distributed locking without a dedicated service.\n\nProduction debugging: Use pg_locks and pg_stat_activity to find blocking. long-running queries holding locks are common culprits. Set lock_timeout to prevent indefinite waits.",
    "tags": [
      "locking",
      "deadlocks"
    ],
    "actionWords": [
      "row-level lock",
      "FOR UPDATE",
      "deadlock",
      "ACCESS EXCLUSIVE",
      "pg_locks"
    ],
    "codeExample": "SELECT * FROM accounts WHERE id = 1 FOR UPDATE;\n-- Hold row lock until commit"
  },
  {
    "id": 6,
    "topic": "postgresql",
    "question": "Why is a query slow even though an index exists? List common production causes.",
    "answer": "Index exists but planner chooses Sequential Scan: Statistics may be stale (run ANALYZE). For small tables, seq scan is cheaper. Wrong index for the predicate: index on (a, b) doesn't help WHERE b = 1. Index not used for functions: WHERE lower(email) = 'x' can't use index on email. Use expression index: CREATE INDEX ON t (lower(email)).\n\nHigh selectivity: Index on a column with few distinct values (e.g., boolean) often not used—seq scan is faster. OR conditions: SELECT * FROM t WHERE a = 1 OR b = 2 may not use indexes well; UNION or bitmap scan can help.\n\nIndex bloat: Many dead tuples in index; VACUUM doesn't fully compact indexes. REINDEX may help. Correlated columns: Planner underestimates rows; increase statistics target for the column.\n\nProduction checklist: Run EXPLAIN (ANALYZE, BUFFERS) to see actual plan. Check actual vs estimated rows. Update stats with ANALYZE. Consider partial or expression indexes for atypical access patterns.",
    "tags": [
      "performance",
      "indexes",
      "execution-plan"
    ],
    "actionWords": [
      "sequential scan",
      "ANALYZE",
      "selectivity",
      "EXPLAIN ANALYZE",
      "statistics"
    ],
    "codeExample": "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE created_at > '2024-01-01';"
  },
  {
    "id": 7,
    "topic": "postgresql",
    "question": "Compare B-Tree, Hash, GIN, GiST, and BRIN indexes: when to use each?",
    "answer": "B-Tree (default): Best for equality and range queries, ORDER BY, DISTINCT. Supports LIKE 'prefix%'. One B-tree per indexed column or expression. Use for primary keys, foreign keys, and common WHERE/ORDER BY columns.\n\nHash: Only equality (=). Smaller and faster for pure equality. Use when you have many lookups by exact key and no ranges. In PostgreSQL 10+ hash indexes are WAL-logged and reliable.\n\nGIN (Generalized Inverted Index): For multi-value and containment: arrays, JSONB, full-text. Stores (element -> row) mappings. Use for @>, ?|, ?& on JSONB, array operators, tsvector.\n\nGiST (Generalized Search Tree): For overlap, containment, nearest-neighbor. Used by PostGIS, range types, full-text. Lossy for some types—fetches heap to confirm. Use for geometric/range queries.\n\nBRIN (Block Range INdex): Stores min/max per block. Tiny size, good for large ordered tables (time-series, logs). Use when data is physically ordered by the indexed column. Less precise than B-tree but very cheap.\n\nProduction: Default to B-tree. Add GIN for JSONB/arrays/full-text. Use BRIN for append-only time-series on timestamp columns.",
    "tags": [
      "indexes",
      "B-Tree",
      "GIN",
      "GiST",
      "BRIN"
    ],
    "actionWords": [
      "B-Tree",
      "GIN",
      "GiST",
      "BRIN",
      "Hash",
      "containment"
    ],
    "codeExample": "CREATE INDEX idx_orders_created ON orders USING BRIN (created_at);\nCREATE INDEX idx_events_data ON events USING GIN (data jsonb_path_ops);"
  },
  {
    "id": 8,
    "topic": "postgresql",
    "question": "How does the PostgreSQL query planner choose between Index Scan, Index Only Scan, Bitmap Heap Scan, and Sequential Scan?",
    "answer": "The planner estimates cost for each strategy. Cost = disk I/O (seq_page_cost, random_page_cost) + CPU (cpu_tuple_cost, etc.). It picks the plan with lowest total cost.\n\nIndex Scan: Fetches rows one by one via index. Good when few rows match. Random I/O per row can be expensive for many rows.\n\nIndex Only Scan: If all needed columns are in the index (covering index), no heap fetch. Requires index to be fully visible (visibility map). Best for aggregate or narrow SELECT with perfect index.\n\nBitmap Heap Scan: Index scan builds a bitmap of heap page IDs, then fetches pages in physical order (reduces random I/O). Good when moderate number of rows match—avoids many random reads.\n\nSequential Scan: Reads entire table. Chosen when many rows match, table is small, or no useful index. shared_buffers caching makes it faster than you might expect for small tables.\n\nProduction: Use EXPLAIN (ANALYZE, BUFFERS) to see actual costs. High \"rows\" vs \"actual rows\" means stats are wrong—run ANALYZE. Add covering indexes for index-only scans.",
    "tags": [
      "query-planner",
      "EXPLAIN",
      "execution-plan"
    ],
    "actionWords": [
      "Index Scan",
      "Bitmap Heap Scan",
      "Index Only Scan",
      "Sequential Scan",
      "cost"
    ],
    "codeExample": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE) SELECT id, name FROM users WHERE status = 'active';"
  },
  {
    "id": 9,
    "topic": "postgresql",
    "question": "Explain Nested Loop, Hash Join, and Merge Join. When does the planner choose each?",
    "answer": "Nested Loop: For each row in outer table, scan inner table (or index). Cost O(outer × inner). Chosen when one side is very small (e.g., single-row lookup) or inner has index on join key. Can be efficient for small datasets.\n\nHash Join: Builds in-memory hash table from smaller side, probes with larger side. Cost O(outer + inner). Needs work_mem for hash table. Chosen when both sides are large and no useful index on inner. Requires equality join.\n\nMerge Join: Both sides sorted on join key; merge like two sorted lists. Cost O(outer + inner). Chosen when inputs are pre-sorted (e.g., index scan output) or sorting is cheap. Requires equality join.\n\nPlanner choice: Small outer + indexed inner → Nested Loop. Large unsorted sides → Hash Join. Large pre-sorted sides → Merge Join. work_mem limits hash size; if exceeded, spills to disk (slow).\n\nProduction: If Hash Join shows \"Disk: ...\" in EXPLAIN, increase work_mem for that session or tune the query. Ensure join columns have matching types (implicit cast can prevent index use).",
    "tags": [
      "joins",
      "query-planner",
      "execution-plan"
    ],
    "actionWords": [
      "Nested Loop",
      "Hash Join",
      "Merge Join",
      "work_mem"
    ],
    "codeExample": "EXPLAIN SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;"
  },
  {
    "id": 10,
    "topic": "postgresql",
    "question": "When to normalize vs denormalize in PostgreSQL? Discuss trade-offs and production patterns.",
    "answer": "Normalization: Splits data into tables to avoid redundancy and anomalies. 3NF typical. Pros: consistency, smaller storage, single source of truth. Cons: more JOINs, which can slow reads.\n\nDenormalization: Duplicates data (e.g., storing customer name in orders). Pros: fewer JOINs, faster reads. Cons: update anomalies, storage bloat, consistency risk.\n\nProduction pattern: Normalize for transactional/OLTP data. Denormalize for read-heavy reporting. Common hybrid: keep normalized base tables, add materialized views or summary tables for analytics. Use triggers or application logic to maintain denormalized columns.\n\nJSONB for semi-structured: Store variable attributes in JSONB instead of sparse columns. Index with GIN for queryability. Good for product attributes, event metadata.\n\nEdge case: Over-normalization (e.g., 6NF) causes excessive JOINs and planner complexity. Denormalizing everything causes update storms. Choose based on read/write ratio and consistency requirements.",
    "tags": [
      "normalization",
      "denormalization",
      "schema-design"
    ],
    "actionWords": [
      "3NF",
      "denormalization",
      "materialized view",
      "JSONB"
    ],
    "codeExample": "CREATE MATERIALIZED VIEW order_summary AS\nSELECT customer_id, COUNT(*), SUM(amount) FROM orders GROUP BY customer_id;"
  },
  {
    "id": 11,
    "topic": "postgresql",
    "question": "What are deferred constraints, and when are they useful?",
    "answer": "Deferred constraints are checked at commit time, not at each statement. By default, constraints are immediate: each INSERT/UPDATE is validated. With DEFERRABLE INITIALLY DEFERRED (or DEFERRED in the transaction), violation is checked only on COMMIT.\n\nUse case: Circular foreign keys. Table A references B, B references A. You can't insert either without the other existing. Defer both FKs: insert A (nullable FK to B), insert B (FK to A), update A to set FK—all valid at commit.\n\nAnother use: Bulk load where order matters. Insert children before parents temporarily, then update. Or reorder rows within a table that has a self-referential FK.\n\nSyntax: CREATE TABLE ... CONSTRAINT fk1 FOREIGN KEY (...) REFERENCES ... DEFERRABLE INITIALLY DEFERRED. In transaction: SET CONSTRAINTS fk1 DEFERRED.\n\nEdge case: Only DEFERRABLE constraints can be deferred. NOT NULL and CHECK can be DEFERRABLE. Unique and FK are common candidates.",
    "tags": [
      "constraints",
      "foreign-keys"
    ],
    "actionWords": [
      "DEFERRABLE",
      "INITIALLY DEFERRED",
      "circular reference"
    ],
    "codeExample": "SET CONSTRAINTS fk_orders_customer DEFERRED;\nBEGIN;\nINSERT INTO orders (customer_id) VALUES (999);\nINSERT INTO customers (id) VALUES (999);\nCOMMIT;"
  },
  {
    "id": 12,
    "topic": "postgresql",
    "question": "Views vs Materialized Views: differences, performance implications, and when to refresh.",
    "answer": "View: Virtual. No storage. Each query re-executes the defining SELECT. Always fresh but can be slow for complex queries.\n\nMaterialized View: Physical storage. Query reads stored data. Fast but stale until REFRESH. REFRESH MATERIALIZED VIEW locks the matview for reads (in older PG) unless CONCURRENTLY. CONCURRENTLY requires a unique index and doesn't block reads but is slower and can fail if the underlying data changes during refresh.\n\nWhen to use: View for simple abstractions, security (column masking), always-current data. Materialized view for heavy aggregations, dashboards, reporting—when seconds/minutes of staleness is OK.\n\nRefresh strategy: Manual after ETL. Scheduled (cron) every N minutes. Or use pg_cron/pg_partman for automation. For near-real-time, consider streaming or incremental approaches instead of full refresh.\n\nProduction: Large matviews—REFRESH CONCURRENTLY to avoid blocking. Monitor refresh duration. Index the matview for common query patterns.",
    "tags": [
      "views",
      "materialized-views"
    ],
    "actionWords": [
      "materialized view",
      "REFRESH",
      "CONCURRENTLY"
    ],
    "codeExample": "CREATE MATERIALIZED VIEW daily_sales AS SELECT date_trunc('day', created_at) d, SUM(amount) FROM orders GROUP BY 1;\nREFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;"
  },
  {
    "id": 13,
    "topic": "postgresql",
    "question": "Explain PostgreSQL functions and triggers: when to use each, and common pitfalls.",
    "answer": "Functions: Reusable logic in PL/pgSQL (or other languages). Can be called from SQL or triggers. Use for business logic, validation, computed columns. Volatility (VOLATILE, STABLE, IMMUTABLE) affects inlining and caching.\n\nTriggers: Fire on INSERT/UPDATE/DELETE. BEFORE vs AFTER: BEFORE can modify the row or abort; AFTER sees final state. INSTEAD OF for views. Use for audit logs, maintaining denormalized columns, enforcing complex rules.\n\nPitfalls: Triggers run inside the transaction—slow triggers slow every write. Avoid external calls or heavy work. Recursive triggers: trigger can fire another trigger—design to avoid infinite loops. SECURITY DEFINER functions run with owner's permissions; use carefully to avoid privilege escalation.\n\nProduction: Prefer application-level logic when possible—easier to test and deploy. Use triggers for cross-cutting concerns (audit, sync) that must be consistent. Keep trigger logic lean.",
    "tags": [
      "functions",
      "triggers"
    ],
    "actionWords": [
      "PL/pgSQL",
      "BEFORE trigger",
      "AFTER trigger",
      "SECURITY DEFINER"
    ],
    "codeExample": "CREATE OR REPLACE FUNCTION audit_trigger() RETURNS TRIGGER AS $$\nBEGIN\n  INSERT INTO audit_log (table_name, old_data, new_data) VALUES (TG_TABLE_NAME, row_to_json(OLD), row_to_json(NEW));\n  RETURN NEW;\nEND; $$ LANGUAGE plpgsql;"
  },
  {
    "id": 14,
    "topic": "postgresql",
    "question": "JSON vs JSONB in PostgreSQL: storage, indexing, and performance trade-offs.",
    "answer": "JSON: Stores exact text. Preserves key order, whitespace, duplicate keys. Parsing on each access. No native indexing (use expression index on specific path).\n\nJSONB: Binary format. No key order, no duplicate keys, normalized. Faster to query—supports GIN indexes. Slightly larger on disk than JSON for small documents; often smaller for large ones due to compression. Use for structured querying.\n\nOperators: -> (JSON), ->> (text), @> (contains), ?| (any key), ?& (all keys). GIN with jsonb_path_ops is smaller than jsonb_ops; use for @> containment. jsonb_ops supports ?|, ?&.\n\nProduction: Prefer JSONB for application data. Use JSON only when you need exact replica of input. Index frequently queried paths. Avoid searching inside huge JSONB values—extract to columns if hot path.",
    "tags": [
      "JSON",
      "JSONB"
    ],
    "actionWords": [
      "JSONB",
      "GIN",
      "@>",
      "jsonb_path_ops"
    ],
    "codeExample": "CREATE INDEX idx_events_payload ON events USING GIN (payload jsonb_path_ops);\nSELECT * FROM events WHERE payload @> '{\"type\":\"click\"}';"
  },
  {
    "id": 15,
    "topic": "postgresql",
    "question": "When and how to use table partitioning in PostgreSQL?",
    "answer": "Partitioning splits a table into child tables by range, list, or hash. Query planner can prune partitions—only relevant children are scanned. Use for large tables (10M+ rows) with clear partition key (e.g., date, region).\n\nTypes: RANGE (dates, numbers), LIST (discrete values), HASH (even distribution). Native partitioning (PG 10+) uses PARTITION BY. Create parent, create children, attach. Inserts route automatically.\n\nBenefits: Query pruning, easier archival (detach old partition), parallel maintenance (vacuum per partition).\n\nCaveats: Global indexes don't exist—each partition has its own indexes. Unique/primary key must include partition key. Too many partitions (hundreds) can slow planning. Default constraint exclusion can be disabled—ensure it's on for pruning.\n\nProduction: Partition by time for logs/events. Create new partition in advance (e.g., monthly). Use pg_partman extension for automation. Monitor partition count.",
    "tags": [
      "partitioning"
    ],
    "actionWords": [
      "partition pruning",
      "RANGE",
      "LIST",
      "HASH",
      "attach partition"
    ],
    "codeExample": "CREATE TABLE events (id BIGSERIAL, created_at TIMESTAMPTZ, data JSONB) PARTITION BY RANGE (created_at);\nCREATE TABLE events_2024_01 PARTITION OF events FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');"
  },
  {
    "id": 16,
    "topic": "postgresql",
    "question": "Explain WAL (Write-Ahead Logging): purpose, mechanics, and tuning.",
    "answer": "WAL ensures durability and supports recovery. Rule: changes must be written to WAL before data files. On crash, replay WAL to restore committed state. WAL is sequential—fast writes.\n\nMechanics: Transactions generate WAL records. WAL writer process flushes to disk. Checkpoint writes dirty buffers to data files and marks WAL as recyclable. On commit, with sync_commit=on, WAL is fsync'd before returning.\n\nFiles: pg_wal directory. Segments (default 16MB). checkpointer advances the redo point; old segments archived or recycled.\n\nTuning: wal_buffers (default 64KB–16MB) for in-memory WAL before disk. archive_mode and archive_command for PITR. full_page_writes=on prevents partial-page writes (needed for crash recovery). max_wal_size, min_wal_size affect checkpoint frequency. sync_commit=off speeds commits but risks losing last few seconds on crash.\n\nProduction: Never disable fsync. Use synchronous_commit=remote_apply for synchronous replication. Monitor WAL generation rate and archive lag.",
    "tags": [
      "WAL",
      "durability",
      "recovery"
    ],
    "actionWords": [
      "Write-Ahead Logging",
      "checkpoint",
      "sync_commit",
      "archive_mode"
    ],
    "codeExample": "SELECT pg_current_wal_lsn(), pg_walfile_name(pg_current_wal_lsn());"
  },
  {
    "id": 17,
    "topic": "postgresql",
    "question": "Streaming replication vs logical replication in PostgreSQL.",
    "answer": "Streaming (physical) replication: Replicates byte-for-byte WAL from primary to standby. Standby is identical copy—same PostgreSQL version, same schema. Used for HA, read replicas, backups. Async (default) or sync (synchronous_commit=on + synchronous_standby_names).\n\nLogical replication: Replicates logical changes (INSERT/UPDATE/DELETE) as decoded WAL. Can replicate subset of tables, to different version, or to another system. Use for: multi-master, cross-version upgrade, feeding data warehouse, selective replication.\n\nStreaming: Low overhead, simple. No schema flexibility. Logical: More flexible, selective, but higher overhead and replication lag. Logical decoding uses output plugin (pgoutput built-in, or wal2json).\n\nProduction: Streaming for HA and read scaling. Logical for migrations, data pipeline, or partial replication. Monitor replication lag (pg_stat_replication for streaming; subscription status for logical).",
    "tags": [
      "replication",
      "high-availability"
    ],
    "actionWords": [
      "streaming replication",
      "logical replication",
      "WAL",
      "standby"
    ],
    "codeExample": "CREATE PUBLICATION my_pub FOR TABLE orders, customers;\nCREATE SUBSCRIPTION my_sub CONNECTION '...' PUBLICATION my_pub;"
  },
  {
    "id": 18,
    "topic": "postgresql",
    "question": "Why is connection pooling critical for PostgreSQL, and how does PgBouncer work?",
    "answer": "Each connection consumes memory (work_mem, temp buffers) and a backend process. Hundreds of connections exhaust RAM and cause context-switch overhead. Most apps have short queries—connection sits idle between requests. Pooling multiplexes many client connections onto fewer real DB connections.\n\nPgBouncer: Lightweight connection pooler. Clients connect to PgBouncer; it maintains a pool of connections to PostgreSQL. Modes: Session (client holds connection for session—good for prepared statements, temp tables). Transaction (connection returned after each transaction—best for web apps). Statement (returned after each query—some features break).\n\nTransaction mode: 1000 clients can share 50 DB connections. Connection churn eliminated. Caveat: Prepared statements, session variables, advisory locks don't work across transactions in transaction mode.\n\nProduction: Use transaction mode for typical web apps. Size pool at 2–4 × CPU cores for OLTP. Run PgBouncer on same host or nearby for low latency.",
    "tags": [
      "connection-pooling",
      "PgBouncer"
    ],
    "actionWords": [
      "connection pooling",
      "PgBouncer",
      "transaction mode",
      "session mode"
    ],
    "codeExample": ";[databases]\nmydb = host=localhost dbname=mydb\n;[pgbouncer]\npool_mode = transaction\nmax_client_conn = 1000\ndefault_pool_size = 50"
  },
  {
    "id": 19,
    "topic": "postgresql",
    "question": "Why is autovacuum not cleaning a table? Troubleshooting steps.",
    "answer": "Autovacuum may not run or may skip a table. Causes: (1) autovacuum disabled: autovacuum=off. (2) Table excluded: autovacuum_naptime, autovacuum_max_workers limit how many tables processed per round. Large DBs may not reach your table often. (3) Not enough dead tuples: autovacuum runs when n_dead_tup > autovacuum_vacuum_threshold + reltuples * autovacuum_vacuum_scale_factor. Default scale 0.2 = 20% dead. Low-churn tables may never hit threshold. (4) Long-running transactions: Oldest xmin blocks vacuum from removing tuples. Check pg_stat_activity for long queries. (5) Table-specific settings: storage params override (autovacuum_vacuum_threshold, autovacuum_vacuum_scale_factor).\n\nDebug: pg_stat_user_tables shows n_dead_tup, n_live_tup, last_vacuum, last_autovacuum. pg_stat_progress_vacuum shows current vacuum progress. Check log_min_duration_statement and autovacuum log. Manual VACUUM VERBOSE for details.\n\nFix: Lower scale_factor for busy tables. Increase autovacuum_vacuum_cost_limit. Kill long transactions. Add ANALYZE to vacuum schedule.",
    "tags": [
      "autovacuum",
      "vacuum",
      "maintenance"
    ],
    "actionWords": [
      "autovacuum",
      "dead tuples",
      "n_dead_tup",
      "scale_factor"
    ],
    "codeExample": "SELECT relname, n_dead_tup, n_live_tup, last_autovacuum FROM pg_stat_user_tables WHERE relname = 'orders';\nALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.05);"
  },
  {
    "id": 20,
    "topic": "postgresql",
    "question": "Why is replication lag happening? Diagnose and mitigate.",
    "answer": "Replication lag: Standby is behind primary. Causes: (1) Network: Slow or saturated link. (2) Standby overload: Replay can't keep up—CPU/disk bottleneck. (3) Conflict: Hot standby query holds lock, blocks replay. (4) Large transactions: Single huge transaction sends big WAL burst; standby applies serially. (5) Replication slots: Consumer (e.g., logical subscriber) is slow; primary retains WAL, filling disk.\n\nDiagnose: pg_stat_replication shows write_lsn, flush_lsn, replay_lsn, and lag. pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) for bytes behind. Check standby's pg_stat_activity for replay process.\n\nMitigate: Improve network. Add standby resources. Tune wal_compression to reduce WAL size. Increase max_wal_senders and replication buffers. For logical replication, add more apply workers (max_logical_replication_workers). Resolve hot standby conflicts: increase hot_standby_feedback or set old_snapshot_threshold.\n\nProduction: Set alerting on lag (e.g., > 1MB). Consider synchronous replication for critical data—accept write latency for zero lag.",
    "tags": [
      "replication",
      "high-availability",
      "troubleshooting"
    ],
    "actionWords": [
      "replication lag",
      "replay",
      "pg_stat_replication",
      "hot standby conflict"
    ],
    "codeExample": "SELECT client_addr, state, pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes FROM pg_stat_replication;"
  },
  {
    "id": 21,
    "topic": "postgresql",
    "question": "Why is a deadlock occurring? How to detect and prevent.",
    "answer": "Deadlock: Two or more transactions wait for each other. A holds lock 1, wants 2; B holds 2, wants 1. PostgreSQL detects and aborts one (victim) with error.\n\nDetection: Check logs for \"deadlock detected\". Query pg_locks with pg_blocking_pids() to see wait chains. Enable log_lock_waits and deadlock_timeout to log before deadlock.\n\nPrevention: Lock order—always acquire locks in same order (e.g., by id ASC). Use SELECT ... FOR UPDATE to lock rows before update. Short transactions—reduce window for deadlock. Avoid multiple tables updated in varying order. Use advisory locks for application-level critical sections.\n\nRetry: On deadlock error, application should retry the transaction. Exponential backoff avoids stampede.\n\nProduction: Deadlocks are rare with proper design. If frequent, review transaction patterns. Use lock_timeout to fail fast instead of waiting indefinitely.",
    "tags": [
      "deadlocks",
      "locking",
      "troubleshooting"
    ],
    "actionWords": [
      "deadlock",
      "lock order",
      "FOR UPDATE",
      "retry"
    ],
    "codeExample": "SELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;"
  },
  {
    "id": 22,
    "topic": "postgresql",
    "question": "Why is CPU usage high on PostgreSQL? Common causes and fixes.",
    "answer": "High CPU usually means expensive queries or maintenance. (1) Bad plans: Sequential scans on large tables, nested loops with large inner. Fix: Add indexes, ANALYZE. (2) Expensive functions: User-defined functions in SELECT (VOLATILE called per row). Use STABLE/IMMUTABLE where safe; avoid functions in hot path. (3) JSON/array processing: Parsing and operators. Extract to columns or improve indexing. (4) Aggregations: Large GROUP BY, DISTINCT. Increase work_mem; consider pre-aggregation. (5) Autovacuum/analyze: Can spike during maintenance. Tune autovacuum to spread load. (6) Compilation: JIT (just-in-time) for complex queries—can increase CPU. Disable jit=off if needed. (7) Connection overhead: Too many backends. Use pooling.\n\nDiagnose: pg_stat_activity shows active queries. pg_stat_statements (extension) shows total time per query. Top queries by total_exec_time. EXPLAIN ANALYZE for plan. Enable auto_explain for slow query capture.\n\nProduction: Identify top 5–10 queries by CPU. Optimize or cache. Use read replicas to offload.",
    "tags": [
      "performance",
      "CPU",
      "troubleshooting"
    ],
    "actionWords": [
      "CPU",
      "work_mem",
      "pg_stat_statements",
      "sequential scan"
    ],
    "codeExample": "SELECT query, calls, total_exec_time, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;"
  },
  {
    "id": 23,
    "topic": "postgresql",
    "question": "Backup and restore strategies: pg_dump vs physical backup, PITR.",
    "answer": "pg_dump: Logical backup. Exports schema and data as SQL or custom format. Restore with psql or pg_restore. Pros: Selective (tables, schema only), version-portable, no special setup. Cons: Slow for large DBs, single-threaded (pg_dump can parallelize directory format). Use for small-medium DBs, schema migration, logical copies.\n\nPhysical backup: Copy data directory and WAL. Requires consistent snapshot (pg_start_backup/pg_stop_backup or pg_basebackup). Restore = replace data dir and replay WAL. Pros: Fast, exact copy. Cons: Same PG version, platform. Use for full restore, cloning.\n\nPITR (Point-in-Time Recovery): Base backup + archived WAL. Restore to any point after backup. Configure archive_mode, archive_command. recovery_target_time to stop at specific time. Use for RPO (recovery point objective)—minimize data loss.\n\nProduction: Daily pg_dump for logical safety. Continuous WAL archiving + base backup weekly for PITR. Test restores regularly. Consider Barman, pgBackRest, WAL-G for automation.",
    "tags": [
      "backup",
      "restore",
      "PITR"
    ],
    "actionWords": [
      "pg_dump",
      "pg_basebackup",
      "PITR",
      "WAL archive"
    ],
    "codeExample": "pg_dump -Fc -f backup.dump mydb\npg_basebackup -D /backup -Ft -z"
  },
  {
    "id": 24,
    "topic": "postgresql",
    "question": "High availability options for PostgreSQL: streaming replication, Patroni, and failover.",
    "answer": "Streaming replication: Primary + synchronous standby. Primary fails → promote standby. Manual or automated. synchronous_commit=on and synchronous_standby_names ensure no data loss on commit.\n\nPatroni: HA manager using etcd/Consul/ZooKeeper for leader election. Handles failover automatically. Integrates with pg_rewind to avoid full reclone. Handles configuration, replication slots, and health checks.\n\nFailover process: Detect primary down (heartbeat timeout). Elect new primary. Promote standby (pg_promote or recovery.conf). Update DNS/connection string. Applications reconnect. Async replication may lose last few transactions—use sync for zero data loss.\n\nConsiderations: Split-brain if network partitions. Use quorum. Failover takes 30s–2min typically. Application must handle reconnects and retries. Read replicas for scale-out; primary for writes.",
    "tags": [
      "high-availability",
      "replication",
      "Patroni"
    ],
    "actionWords": [
      "streaming replication",
      "Patroni",
      "failover",
      "synchronous replication"
    ],
    "codeExample": "ALTER SYSTEM SET synchronous_standby_names = 'standby1';\nSELECT pg_promote();"
  },
  {
    "id": 25,
    "topic": "postgresql",
    "question": "Key configuration parameters for PostgreSQL performance tuning.",
    "answer": "shared_buffers: Main cache for data pages. 25% of RAM rule of thumb; 8–16GB common. Too small = disk I/O; too large = OS cache starved.\n\nwork_mem: Per-operation memory (sort, hash). Default 4MB. Increase for complex queries (joins, ORDER BY). Session can use multiple × per query. Set per-query with SET for heavy reports.\n\neffective_cache_size: Hint for planner—estimates OS cache. Set to 50–75% of total RAM. Affects index vs seq scan choice.\n\nrandom_page_cost: Cost for random I/O. Lower on SSDs (1.1–1.5). Default 4.0 assumes HDD.\n\nmax_parallel_workers_per_gather, max_parallel_workers: Parallel query. Increase for multi-core. effective_io_concurrency for SSD.\n\ncheckpoint_completion_target: Spread checkpoints. 0.9 default.\n\nProduction: Tune incrementally. Use pg_tune or similar. Monitor hit ratios (buffer, index). Avoid extreme values.",
    "tags": [
      "performance",
      "configuration"
    ],
    "actionWords": [
      "shared_buffers",
      "work_mem",
      "effective_cache_size",
      "random_page_cost"
    ],
    "codeExample": "SHOW shared_buffers;\nSET work_mem = '256MB';"
  },
  {
    "id": 26,
    "topic": "postgresql",
    "question": "Caching strategies: shared_buffers, OS cache, and application-level caching.",
    "answer": "shared_buffers: PostgreSQL's own buffer pool. Holds table and index pages. Hit ratio = (heap_blks_hit) / (heap_blks_hit + heap_blks_read). Target > 99%. Larger shared_buffers = more cached. But double-buffering: data in both PG buffers and OS page cache. On Linux, PG uses direct I/O for shared_buffers in PG 15+ (shared_buffers=huge_pages).\n\nOS cache: Pages evicted from shared_buffers may stay in OS cache. effective_cache_size tells planner about this. Read-heavy workloads benefit from total RAM (shared_buffers + OS cache).\n\nApplication cache: Redis, Memcached for hot data. Reduces DB load. Use for: session data, frequently read rarely written. Invalidation is hard—use TTL or event-driven. Cache aside: app checks cache, misses hit DB, stores in cache.\n\nProduction: Right-size shared_buffers. Prefer application cache for expensive or infrequently changing data. Avoid caching everything—memory is finite. Use connection pooling to reduce connection overhead.",
    "tags": [
      "caching",
      "performance"
    ],
    "actionWords": [
      "shared_buffers",
      "buffer hit ratio",
      "effective_cache_size"
    ],
    "codeExample": "SELECT sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read), 0) AS buffer_hit_ratio FROM pg_statio_user_tables;"
  },
  {
    "id": 27,
    "topic": "postgresql",
    "question": "How do you debug a production query that suddenly became slow?",
    "answer": "Steps: (1) Reproduce: Run the query, note execution time. (2) EXPLAIN (ANALYZE, BUFFERS): Compare actual vs estimated rows. Large difference = stale stats. Check for Seq Scan on large table, expensive loops. (3) Check statistics: pg_stat_user_tables for n_dead_tup, n_live_tup. Run ANALYZE if stale. (4) Check for blocking: pg_stat_activity with wait_event. pg_locks for lock waits. (5) Check bloat: pgstattuple or pg_stat_user_tables. VACUUM or VACUUM FULL if severe. (6) Check autovacuum: last_vacuum, last_autovacuum. Long-running transactions block vacuum. (7) Check data growth: More rows = different plan. Partitioning or archiving may help. (8) Check config changes: work_mem, shared_buffers. (9) pg_stat_statements: Compare current vs historical for same query.\n\nCommon causes: Stale stats, bloat, new indexes needed, data distribution change, blocking. Document findings and apply fix. Re-test.",
    "tags": [
      "troubleshooting",
      "performance",
      "debugging"
    ],
    "actionWords": [
      "EXPLAIN ANALYZE",
      "stale statistics",
      "bloat",
      "ANALYZE"
    ],
    "codeExample": "EXPLAIN (ANALYZE, BUFFERS, VERBOSE) <your_query>"
  },
  {
    "id": 28,
    "topic": "postgresql",
    "question": "Explain prepared statements and plan caching. When does the planner choose a generic plan?",
    "answer": "Prepared statements: Parse and plan once, execute many times with different parameters. Reduces parse/plan overhead. Use PREPARE ... AS SELECT ...; EXECUTE ... (param1, param2).\n\nPlan caching: First 5 executes use custom plan (with actual parameter values). After 5, if custom and generic plans have similar cost, switch to generic plan (no parameters). Generic plan can be suboptimal for skewed data—e.g., SELECT * FROM t WHERE status = $1. If status is usually 'active', custom plan uses index; generic plan may choose seq scan.\n\nprepare_plan_caching: Can disable to always use custom plans (PG 12+).\n\nConnection pooling: In transaction pooling, prepared statements are session-scoped; connection is released each transaction. Prepare on first use per connection. Use simple query protocol or server-side prepare with care.\n\nProduction: Prepared statements good for repeated queries. Watch for generic plan regressions with skewed parameters. Use pg_stat_statements to find candidates.",
    "tags": [
      "prepared-statements",
      "query-planner"
    ],
    "actionWords": [
      "PREPARE",
      "EXECUTE",
      "generic plan",
      "custom plan"
    ],
    "codeExample": "PREPARE get_user (INT) AS SELECT * FROM users WHERE id = $1;\nEXECUTE get_user(1);"
  },
  {
    "id": 29,
    "topic": "postgresql",
    "question": "What is the visibility map and how does it affect vacuum and index-only scans?",
    "answer": "Visibility map: A bitmap per table marking pages where all rows are visible to all transactions (no dead tuples). Stored in separate fork. Vacuum skips such pages (except for freezing)—speeds vacuum. Index-only scan can avoid heap fetch if index tuples point to all-visible pages.\n\nTwo bits per page: all-visible, all-frozen. all-frozen means no old transactions can see any row—important for preventing XID wraparound.\n\nVacuum: Only needs to scan pages with dead tuples or not all-visible. Skips all-visible pages. all-frozen allows aggressive removal of old clog.\n\nIndex-only scan: If index has all columns and heap page is all-visible, no heap fetch. Requires index built with include or is a covering index. ANALYZE updates visibility map.\n\nProduction: Visibility map accelerates vacuum on large tables. For index-only scans, ensure target columns in index and run ANALYZE.",
    "tags": [
      "vacuum",
      "visibility-map",
      "index-only-scan"
    ],
    "actionWords": [
      "visibility map",
      "all-visible",
      "all-frozen",
      "index-only scan"
    ],
    "codeExample": "CREATE INDEX idx_orders_covering ON orders (id) INCLUDE (total, status);"
  },
  {
    "id": 30,
    "topic": "postgresql",
    "question": "Explain parallel query: when is it used, and how to tune it?",
    "answer": "Parallel query: Single query uses multiple workers. Applicable to sequential scans, hash joins, nested loops (inner parallel), aggregates. Leader process gathers results. Workers scan different parts of table or build hash table in parallel.\n\nConditions: cost of plan must exceed parallel_min_parallel_table_scan_size (default 8MB). parallel_tuple_cost and parallel_setup_cost influence choice. max_parallel_workers_per_gather limits workers per node. max_parallel_workers limits total.\n\nTuning: max_parallel_workers_per_gather = 2–4 typical. max_worker_processes and max_parallel_workers. effective_io_concurrency for SSD. Lower parallel_min_parallel_table_scan_size to parallelize smaller scans. Set min_parallel_table_scan_size for minimum table size.\n\nLimitations: No parallel for writes (except COPY), subtransactions, or some functions. DDL and certain operations disable parallel.\n\nProduction: Enable for analytics. For OLTP, parallel rarely triggers (small tables). Monitor with EXPLAIN to see Workers Planned.",
    "tags": [
      "parallel-query",
      "performance"
    ],
    "actionWords": [
      "parallel query",
      "max_parallel_workers_per_gather",
      "Workers Planned"
    ],
    "codeExample": "EXPLAIN SELECT COUNT(*) FROM large_table;"
  },
  {
    "id": 31,
    "topic": "postgresql",
    "question": "What are UNLOGGED tables and when to use them?",
    "answer": "UNLOGGED: No WAL logging. Much faster writes (no fsync for WAL). Not crash-safe—truncated on crash or unclean shutdown. Not replicated to standby.\n\nUse for: Temporary data, caches, staging tables, session data. Data that can be rebuilt or is disposable.\n\nDo not use for: Persistent user data, anything requiring durability or replication.\n\nIndexes on UNLOGGED tables are also unlogged. You can create UNLOGGED and later ALTER to LOGGED (requires full rewrite).\n\nProduction: Common for materialized cache tables refreshed periodically. Or staging for ETL. Ensure application handles empty table after crash.",
    "tags": [
      "UNLOGGED",
      "durability"
    ],
    "actionWords": [
      "UNLOGGED",
      "WAL",
      "crash-safe"
    ],
    "codeExample": "CREATE UNLOGGED TABLE cache (key TEXT PRIMARY KEY, value JSONB);"
  },
  {
    "id": 32,
    "topic": "postgresql",
    "question": "Explain CHECKPOINT and its impact on performance.",
    "answer": "Checkpoint: Flushes all dirty buffers to data files. Marks WAL before that point as recyclable. Ensures recovery can start from a known state.\n\nProcess: checkpointer process runs. Dirty pages written to disk. WAL flushed. Checkpoint record written. Old WAL segments can be recycled or archived.\n\nPerformance: Checkpoints cause write I/O burst. Can stall reads if I/O saturated. checkpoint_completion_target (0–1) spreads checkpoint over time. 0.9 = use 90% of time between checkpoints. Reduces spike.\n\nTiming: Checkpoint when (1) WAL size exceeds max_wal_size, (2) time since last checkpoint, (3) manual CHECKPOINT. Reduce checkpoint frequency by increasing max_wal_size (more WAL, less frequent checkpoints, but more recovery time).\n\nProduction: Tune checkpoint_completion_target to 0.9. Ensure enough I/O capacity. On fast SSD, checkpoints less of a concern.",
    "tags": [
      "checkpoint",
      "WAL",
      "performance"
    ],
    "actionWords": [
      "checkpoint",
      "checkpoint_completion_target",
      "dirty buffers"
    ],
    "codeExample": "CHECKPOINT;"
  },
  {
    "id": 33,
    "topic": "postgresql",
    "question": "How does PostgreSQL handle NULL in indexes and queries?",
    "answer": "B-tree indexes: NULLs are stored (by default) and can be searched. WHERE col IS NULL uses index if col is indexed. Unique index: Multiple NULLs allowed (NULL <> NULL). UNIQUE NULLS NOT DISTINCT (PG 15+) treats NULLs as equal—only one NULL per unique key.\n\nQueries: NULL in comparisons yields NULL (unknown). WHERE col = NULL finds nothing; use IS NULL. Aggregates: COUNT(*) counts rows; COUNT(col) excludes NULLs. SUM, AVG ignore NULLs. DISTINCT treats NULLs as equal (one group).\n\nSorting: NULLs first or last with NULLS FIRST / NULLS LAST in ORDER BY. Default is last for ASC, first for DESC.\n\nIndex: For (a, b), condition a = 1 AND b IS NULL can use index. Partial index WHERE col IS NOT NULL for non-null lookups.",
    "tags": [
      "NULL",
      "indexes"
    ],
    "actionWords": [
      "NULL",
      "UNIQUE",
      "IS NULL",
      "NULLS FIRST"
    ],
    "codeExample": "CREATE UNIQUE INDEX idx_email ON users (email) WHERE email IS NOT NULL;"
  },
  {
    "id": 34,
    "topic": "postgresql",
    "question": "What are exclusion constraints and practical use cases?",
    "answer": "Exclusion constraints: Enforce that no two rows satisfy a specified operator with respect to a column. Generalization of UNIQUE—UNIQUE uses =, exclusion can use range operators, overlap, etc.\n\nSyntax: EXCLUDE USING gist (col WITH &&) or USING btree (col WITH =). Requires btree_gist extension for mixed types. && = overlaps (ranges, tsrange).\n\nUse cases: (1) No overlapping reservations: EXCLUDE USING gist (daterange(start, end) WITH &&). (2) No overlapping IP ranges. (3) One active subscription per user: EXCLUDE USING btree (user_id WITH =) WHERE status = 'active' (partial).\n\nIndex: Creates supporting index (GiST or B-tree). Must have matching index for the operators used.\n\nProduction: Replaces application-level checks. Ensures consistency at DB level. Useful for scheduling, resource allocation.",
    "tags": [
      "constraints",
      "exclusion"
    ],
    "actionWords": [
      "EXCLUDE",
      "overlap",
      "btree_gist",
      "daterange"
    ],
    "codeExample": "CREATE EXTENSION btree_gist;\nCREATE TABLE bookings (id SERIAL, room_id INT, period daterange, EXCLUDE USING gist (room_id WITH =, period WITH &&));"
  },
  {
    "id": 35,
    "topic": "postgresql",
    "question": "Explain CTEs (WITH clauses): optimization fence and when to use MATERIALIZED.",
    "answer": "CTE: Named subquery. WITH cte AS (SELECT ...) SELECT * FROM cte. Clean, readable. Can be recursive.\n\nOptimization fence (pre-PG 12): CTE was an optimization barrier—planner optimized it separately and materialized result. Outer query couldn't push predicates into CTE. Could cause bad plans (e.g., full scan of CTE instead of index on base table).\n\nPG 12+: CTEs are inlined when beneficial. Planner can treat CTE as subquery and optimize jointly. Use MATERIALIZED to force old behavior (compute once, reuse). Use NOT MATERIALIZED (default for non-recursive) to allow inlining.\n\nWhen MATERIALIZED: CTE is expensive and used multiple times—compute once. Or to limit rows before join. When NOT MATERIALIZED: Want predicate pushdown, index use.\n\nRecursive CTEs: Always materialized (by semantics).",
    "tags": [
      "CTE",
      "query-optimization"
    ],
    "actionWords": [
      "CTE",
      "WITH",
      "MATERIALIZED",
      "optimization fence"
    ],
    "codeExample": "WITH recent AS (SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '7 days')\nSELECT * FROM recent WHERE total > 100;"
  },
  {
    "id": 36,
    "topic": "postgresql",
    "question": "What is HOT (Heap-Only Tuple) update and when does it occur?",
    "answer": "HOT update: UPDATE that doesn't require index updates. Possible when: (1) No indexed columns change, (2) New row version fits on same heap page as old. PostgreSQL places new version on same page, sets HEAP_HOT_UPDATED on old, HEAP_ONLY_TUPLE on new. Index still points to old tuple; line pointer redirects to new. Vacuum can prune old version.\n\nBenefit: No index bloat from updates. Faster. Less WAL.\n\nWhen not HOT: Indexed column changes—all indexes must point to new tuple. Row doesn't fit (fillfactor).\n\nfillfactor: Leave space on page for HOT updates. Default 100 (full). Set 90 to leave 10% free for updates. Trade-off: slightly larger tables, more I/O for inserts.\n\nProduction: For tables with frequent updates on non-indexed columns (e.g., view_count, last_seen), ensure indexed columns not updated and consider fillfactor.",
    "tags": [
      "HOT-update",
      "index-bloat"
    ],
    "actionWords": [
      "HOT update",
      "fillfactor",
      "heap-only tuple"
    ],
    "codeExample": "CREATE TABLE events (id SERIAL PRIMARY KEY, data JSONB) WITH (fillfactor = 90);"
  },
  {
    "id": 37,
    "topic": "postgresql",
    "question": "How does PostgreSQL handle full-text search? tsvector, tsquery, and GIN indexes.",
    "answer": "Full-text search: Converts text to tsvector (normalized, stemmed tokens) and query to tsquery. Match with @@. Supports ranking (ts_rank), highlighting.\n\nto_tsvector('english', 'The quick brown fox'): 'brown':3 'fox':4 'quick':2. to_tsquery('english', 'fox & quick'): 'fox' & 'quick'.\n\nOperators: @@ (match), @> (contains), || (concatenate). & (and), | (or), ! (not).\n\nGIN index: CREATE INDEX ON docs USING GIN (to_tsvector('english', body)). Enables fast @@ and @> queries. tsvector_ops (default) or gist.\n\nConfigurations: 'english' (stemming, stop words). Other languages available. Use setweight for ranking (title vs body).\n\nProduction: GIN for large corpora. Consider tsvector column updated by trigger for complex documents. Use phrase search with <-> (followed by) for proximity.",
    "tags": [
      "full-text-search",
      "tsvector",
      "GIN"
    ],
    "actionWords": [
      "tsvector",
      "tsquery",
      "to_tsvector",
      "GIN"
    ],
    "codeExample": "CREATE INDEX idx_docs_fts ON docs USING GIN (to_tsvector('english', body));\nSELECT * FROM docs WHERE to_tsvector('english', body) @@ to_tsquery('english', 'postgresql & performance');"
  },
  {
    "id": 38,
    "topic": "postgresql",
    "question": "Explain LISTEN/NOTIFY and when to use it vs polling.",
    "answer": "LISTEN/NOTIFY: Lightweight pub/sub. Session does LISTEN channel; another session does NOTIFY channel [Payload]. Listener receives asynchronous notification. Payload limited to 8KB. No persistence—if listener disconnected, misses notifications.\n\nUse for: Cache invalidation, real-time UI updates, triggering application logic. Low latency, no polling.\n\nLimitations: Not transactional in sense of delivery—NOTIFY sent at commit. Listener must be connected. No replay. For durable messaging, use external queue (RabbitMQ, Kafka).\n\nPolling: SELECT in loop with SLEEP. Simpler but higher latency and load. Use when LISTEN not feasible (e.g., serverless, no long-lived connection).\n\nProduction: LISTEN/NOTIFY for same-DB, low-volume notifications. Combine with pg_notify in triggers for change notifications. For cross-service messaging, use message queue.",
    "tags": [
      "LISTEN",
      "NOTIFY",
      "pub-sub"
    ],
    "actionWords": [
      "LISTEN",
      "NOTIFY",
      "pg_notify"
    ],
    "codeExample": "LISTEN order_updates;\nNOTIFY order_updates, 'order_id:123';"
  },
  {
    "id": 39,
    "topic": "postgresql",
    "question": "What is transaction ID wraparound and how does PostgreSQL prevent it?",
    "answer": "Transaction IDs are 32-bit. After ~2^31 transactions, they wrap. Old rows with xmin from \"future\" (past wraparound) would appear invisible incorrectly. Wraparound would cause data loss.\n\nPrevention: Vacuum marks rows as frozen (xmin = FrozenTransactionId) when no transaction can need to see them. Frozen rows are always visible. autovacuum runs aggressively when DB approaches wraparound (pg_database.datfrozenxid).\n\nMonitor: pg_database.datfrozenxid, age(datfrozenxid). If age approaches 200 million, increase autovacuum or run manual VACUUM FREEZE.\n\nautovacuum_freeze_max_age: Vacuum to prevent wraparound when oldest xid reaches this. Default 200M. Don't set too high—recovery from wraparound emergency is costly.\n\nProduction: Ensure autovacuum runs. Long-running transactions block freeze—monitor max connection age. Rarely an issue in healthy systems.",
    "tags": [
      "transaction-id",
      "wraparound",
      "vacuum"
    ],
    "actionWords": [
      "xid wraparound",
      "freeze",
      "datfrozenxid"
    ],
    "codeExample": "SELECT datname, age(datfrozenxid) FROM pg_database;"
  },
  {
    "id": 40,
    "topic": "postgresql",
    "question": "Describe a production debugging scenario: database connections are exhausted. How do you diagnose and fix?",
    "answer": "Symptom: Application errors 'sorry, too many clients already' or connection timeout.\n\nDiagnose: (1) Current connections: SELECT count(*) FROM pg_stat_activity; (2) By state: SELECT state, count(*) FROM pg_stat_activity GROUP BY state; (3) Idle in transaction: Long-running transactions holding connections. (4) Connection sources: application_name, client_addr. (5) max_connections setting.\n\nCauses: Connection leak in app (not returning to pool). Too many app instances × connections each. Long idle-in-transaction (forgotten BEGIN without COMMIT). Connection pool too small for load.\n\nFix: (1) Add connection pooling (PgBouncer) to multiplex clients. (2) Fix application leaks—ensure connections released. (3) Set idle_in_transaction_session_timeout to kill idle transactions (e.g., 5 minutes). (4) Reduce connections per app instance. (5) Increase max_connections only if RAM allows (each ~10MB).\n\nPrevention: Use pool, set timeouts. Monitor pg_stat_activity and connection count.",
    "tags": [
      "troubleshooting",
      "connections",
      "production"
    ],
    "actionWords": [
      "connection exhausted",
      "idle in transaction",
      "connection pooling"
    ],
    "codeExample": "SELECT pid, usename, state, state_change, query FROM pg_stat_activity WHERE state = 'idle in transaction' ORDER BY state_change;"
  },
  {
    "id": 41,
    "topic": "postgresql",
    "question": "Explain VACUUM FULL vs VACUUM and when to use each.",
    "answer": "VACUUM: Removes dead tuples, updates visibility map, freezes old rows. Does not reclaim space to OS—marks space as reusable for future inserts. Doesn't block reads; can run concurrently. May need multiple passes on very bloated tables.\n\nVACUUM FULL: Rewrites entire table. Reclaims space to OS. Requires ACCESS EXCLUSIVE lock—blocks all access. Creates new file, swaps. Use when table is severely bloated and you need space back.\n\nWhen VACUUM: Regular maintenance. Run autovacuum. Manual after bulk deletes. Keeps tables healthy without downtime.\n\nWhen VACUUM FULL: One-time recovery from extreme bloat. Plan for downtime. Alternative: pg_repack (online, no long lock) or create new table, copy data, swap.\n\nProduction: Rely on autovacuum. Use VACUUM ANALYZE after large bulk operations. Avoid VACUUM FULL in production if possible; use pg_repack for online reclaim.",
    "tags": [
      "vacuum",
      "maintenance"
    ],
    "actionWords": [
      "VACUUM",
      "VACUUM FULL",
      "bloat",
      "dead tuples"
    ],
    "codeExample": "VACUUM ANALYZE orders;\nVACUUM FULL orders;"
  },
  {
    "id": 42,
    "topic": "postgresql",
    "question": "What is the difference between SERIAL and IDENTITY columns?",
    "answer": "SERIAL: Shorthand. Creates integer column, sequence, default nextval(seq). SERIAL = INTEGER, BIGSERIAL = BIGINT. Sequence is separate object. Legacy.\n\nIDENTITY (PG 10+): Standard SQL. GENERATED BY DEFAULT AS IDENTITY or GENERATED ALWAYS AS IDENTITY. Sequence tied to column. ALWAYS prevents manual inserts (unless OVERRIDING). BY DEFAULT allows manual values.\n\nDifference: IDENTITY is standard, integrated. Identity columns behave better with COPY, replication, and tools. SERIAL works but is PostgreSQL-specific.\n\nPrefer IDENTITY for new tables. SERIAL still common in existing codebases. Both create sequence and default.",
    "tags": [
      "SERIAL",
      "IDENTITY",
      "sequences"
    ],
    "actionWords": [
      "SERIAL",
      "IDENTITY",
      "GENERATED",
      "sequence"
    ],
    "codeExample": "CREATE TABLE t (id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name TEXT);"
  }
];