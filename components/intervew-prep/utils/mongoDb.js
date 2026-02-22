export const mongoDB = [
    {
        id: 1,
        topic: "mongo",
        question: "What is MongoDB?",
        answer: "MongoDB is a <mark>cross-platform document-based NoSQL database</mark> designed for scalability, flexibility, and developer productivity.\n- It stores data as flexible, JSON-like documents instead of fixed tables, making it the <mark>primary choice for modern application development</mark>.\n- Data is stored in BSON (Binary JSON) format on disk, with the WiredTiger storage engine handling persistence, compression, and caching.\n\n How MongoDB Works Internally :\n\n1. Document Model:\n   - Unlike relational databases that store data in fixed tables with rows and columns, MongoDB stores data as documents—flexible structures that can vary in schema.\n   - Documents map naturally to objects in application code, reducing the impedance mismatch between application logic and database storage.\n\n2. BSON Storage:\n   - BSON extends JSON with types like Date, ObjectId, and Binary. WiredTiger handles persistence, compression, and in-memory caching.\n\n3. Schema Flexibility:\n   - Enables rapid iteration without schema migrations. Supports nested and hierarchical data in a single read.\n\n Common Use Cases for MongoDB :\n\n1. Content management systems (CMS) and product catalogs with varying attributes.\n2. User profiles with optional fields and event logging.\n3. IoT sensor data and mobile app backends.\n\n Key Points :\n\n- \"Schema-less\" does not mean no schema—applications should still enforce structure using validation (e.g., Mongoose schemas).\n- Use application-level validation to prevent data drift and inconsistency.\n\nIn summary, MongoDB is a document-based NoSQL database that excels at flexibility, scalability, and developer productivity, making it ideal for applications with evolving data needs.",
        tags: ["definition", "core-concepts"],
        keyFeatures: [],
        actionWords: ["cross-platform document-based database", "BSON", "WiredTiger"],
        codeExample: ""
    },
    {
        id: 2,
        topic: "mongo",
        question: "What are the features of MongoDB?",
        answer: "MongoDB provides a <mark>rich feature set for modern application development</mark>, combining flexibility with enterprise-grade capabilities.\n- It supports JSON-like documents with dynamic schema, avoiding expensive joins for related data.\n- WiredTiger storage engine with document-level locking enables <mark>high-performance reads and writes</mark>.\n\n Key Features of MongoDB :\n\n1. Document-Oriented:\n   - JSON-like documents with nested documents and arrays. No fixed schema required.\n\n2. High Performance:\n   - WiredTiger with document-level locking, in-memory caching, and compression.\n   - Secondary indexes (B-tree based) enable fast lookups. Aggregation pipeline processes data efficiently.\n\n3. Horizontal Scaling:\n   - Native sharding distributes data across servers. Replica sets provide automatic failover and read scaling.\n\n4. ACID Transactions:\n   - Multi-document transactions (v4.0+) with snapshot isolation across collections.\n\n5. Security:\n   - Role-based access control (RBAC), authentication (SCRAM, LDAP, x.509), encryption at rest (TDE) and in transit (TLS).\n\n6. Developer Experience:\n   - Rich query language (MQL), aggregation framework, Change Streams for real-time notifications.\n\n Key Points :\n\n- Feature richness requires discipline: over-indexing hurts writes; improper shard key choice causes hotspots.\n- Transactions add latency—keep them short for best performance.\n\nIn summary, MongoDB offers document orientation, horizontal scaling, ACID transactions, and strong security, making it suitable for a wide range of production workloads.",
        tags: ["features"],
        keyFeatures: [],
        actionWords: ["document-oriented", "sharding", "replica sets", "ACID", "WiredTiger"],
        codeExample: ""
    },
    {
        id: 3,
        topic: "mongo",
        question: "What type of NoSQL database is MongoDB?",
        answer: "MongoDB is a <mark>document-oriented NoSQL database</mark>—one of four main NoSQL categories (key-value, document, column-family, graph).\n- Each record is a self-contained document with key-value pairs, analogous to a row but much more flexible.\n- Documents are stored in collections, which are similar to tables but do not require a fixed schema.\n\n Document Model Explained :\n\n1. Self-Contained Documents:\n   - Each document contains key-value pairs. Documents in the same collection need not share the same structure.\n   - Differs from key-value stores (simpler, no query capability) and column-family stores (optimized for wide, sparse rows).\n\n2. Why Document Over Relational:\n   - Schema flexibility for evolving requirements.\n   - Embedding related data reduces round-trips and avoids expensive JOINs.\n   - Natural fit for nested or hierarchical data (e.g., order with line items).\n   - Horizontal scaling via sharding without complex JOIN semantics.\n\n When NOT to Use MongoDB :\n\n- Highly relational data with complex many-to-many relationships.\n- Strong ACID requirements across logical entities.\n- Heavy analytical queries with lots of JOINs—consider PostgreSQL or a data warehouse.\n\nIn summary, MongoDB is a document-oriented NoSQL database that excels at flexible schemas and nested data, but is less suited for heavily relational workloads.",
        tags: ["features", "core-concepts"],
        keyFeatures: [],
        actionWords: ["document-oriented NoSQL", "collections", "schema-less"],
        codeExample: ""
    },
    {
        id: 4,
        topic: "mongo",
        question: "Explain namespace in MongoDB?",
        answer: "In MongoDB, a <mark>namespace</mark> uniquely identifies a collection within a database.\n- The format is: database_name.collection_name (e.g., \"ecommerce.orders\").\n- It is used internally for catalog management, locking scope, and storage organization.\n\n Purpose of Namespace in MongoDB :\n\n1. Collection Identification:\n   - The namespace \"ecommerce.orders\" means collection \"orders\" in database \"ecommerce\".\n   - WiredTiger stores each collection in a separate file; the namespace maps to that file.\n\n2. Internal Use:\n   - MongoDB uses namespaces for catalog management and locking scope.\n   - In sharded clusters, config servers maintain chunk metadata keyed by namespace and shard key range.\n\n How Namespace is Used :\n\n- Indexes are stored with namespace prefixes. Operations are scoped by namespace.\n- The system namespace \"db.system.namespaces\" (deprecated in newer versions) listed all namespaces.\n\n Key Points :\n\n- Namespace length is limited (max 120 bytes). Very long names can hit this limit.\n- Deeply nested subcollections or very long database or collection names may cause issues.\n\nIn summary, a namespace is the full qualifier that uniquely identifies a collection in MongoDB and is used throughout the system for organization and routing.",
        tags: ["namespace", "core-concepts"],
        keyFeatures: [],
        actionWords: ["database_name.collection_name", "uniquely identifies a collection"],
        codeExample: ""
    },
    {
        id: 5,
        topic: "mongo",
        question: "What is a Collection?",
        answer: "A <mark>collection</mark> is a grouping of MongoDB documents, analogous to a table in a relational database.\n- Unlike SQL tables, collections are schema-less—documents can have different fields.\n- Each collection has a default \"_id\" index and is stored as a B-tree indexed structure.\n\n Purpose of a Collection in MongoDB :\n\n1. Grouping Documents:\n   - Collections group related documents together. MongoDB does not enforce a fixed structure.\n   - WiredTiger stores collection data in WT files with compression.\n\n2. When to Use Multiple Collections:\n   - Group documents by access pattern and lifecycle (e.g., \"users\" vs \"user_sessions\").\n   - Different retention, indexing, and query patterns suggest separate collections.\n   - Avoid over-fragmenting; too many small collections add metadata overhead.\n\n How Collections Work :\n\n- Each collection has a default \"_id\" index. Documents can vary in structure within the same collection.\n- Use application-level schema validation (JSON Schema in MongoDB 3.6+) to enforce structure while retaining flexibility.\n\n Key Points :\n\n- Collections are schema-less by default but benefit from application-level validation.\n- Example: \"users\" collection can contain documents with \"name\", \"email\", \"age\", or \"address\"—all in the same collection.\n\nIn summary, a collection is a flexible container for MongoDB documents, similar to a table but without a fixed schema requirement.",
        tags: ["collection", "core-concepts"],
        keyFeatures: [],
        actionWords: ["group of documents", "schema-less"],
        codeExample: "db.users.insertOne({ name: \"Alice\", email: \"alice@example.com\", age: 25 });\ndb.users.insertOne({ name: \"Bob\", email: \"bob@example.com\", address: \"123 Main St\" });"
    },
    {
        id: 6,
        topic: "mongo",
        question: "What is a Document?",
        answer: "A <mark>document</mark> is the basic unit of data storage in MongoDB—a BSON object with field-value pairs.\n- It is similar to a row in SQL but supports nested documents and arrays.\n- Each document has a maximum size of 16 MB; for larger data, use GridFS or external storage.\n\n Purpose of a Document in MongoDB :\n\n1. Data Storage:\n   - Documents store data as BSON (Binary JSON) with types like Date, ObjectId, Binary, and Decimal128.\n   - BSON is binary-encoded for efficient parsing. Slightly larger than JSON on disk but faster to parse.\n\n2. Document Structure:\n   - Supports nested documents and arrays. Field order is preserved.\n   - Field names are stored (unlike column names in SQL), so keep them short to save space.\n\n3. Size Limit:\n   - 16 MB per document. For larger blobs, use GridFS or external storage (e.g., S3) with references.\n\n Key Points :\n\n- Single-document read and write is atomic. Design documents so frequently accessed data lives together.\n- Example: { _id: ObjectId(...), name: \"Bob\", orders: [{ id: 1, total: 99 }] }\n\nIn summary, a document is the fundamental unit of data in MongoDB, stored in BSON format with a 16 MB size limit.",
        tags: ["document", "core-concepts"],
        keyFeatures: [],
        actionWords: ["basic unit of storage", "BSON", "16MB limit"],
        codeExample: "{ _id: ObjectId(\"...\"), name: \"Bob\", email: \"bob@x.com\", age: 30 }"
    },
    {
        id: 7,
        topic: "mongo",
        question: "Differentiate MongoDB and MySQL?",
        answer: "MongoDB and MySQL are both popular databases but differ in data model, query language, and scalability approach.\n- MongoDB is a <mark>document-based NoSQL database</mark>; MySQL is a relational database with tables and rows.\n- MongoDB uses MQL; MySQL uses SQL.\n\n Key Differences :\n\n1. Data Model:\n   - MongoDB: Document (BSON, flexible schema). MySQL: Relational (tables, rows, fixed schema).\n\n2. Query Language:\n   - MongoDB: MQL (MongoDB Query Language)—JSON-like filter objects.\n   - MySQL: SQL with native JOINs.\n\n3. Scalability:\n   - MongoDB: Horizontal scaling via sharding.\n   - MySQL: Vertical scaling (larger machines) or manual sharding (complex).\n\n4. Joins:\n   - MongoDB: Uses $lookup (limited) or embedding. MySQL: Native JOINs—better for complex relational queries.\n\n5. Transactions:\n   - Both support ACID. MongoDB added multi-document transactions in 4.0; MySQL has long supported them.\n\n When to Choose :\n\n- MongoDB: Flexible schema, document-oriented data, horizontal scale, rapid iteration, nested data.\n- MySQL: Heavy relational queries, mature tooling, team expertise, strict schema requirements.\n\nIn summary, choose MongoDB for flexibility and horizontal scaling; choose MySQL for traditional relational workloads.",
        tags: ["comparison"],
        keyFeatures: [],
        actionWords: ["MQL vs SQL", "horizontal scaling", "document vs relational"],
        codeExample: ""
    },
    {
        id: 8,
        topic: "mongo",
        question: "Differentiate MongoDB and PostgreSQL?",
        answer: "MongoDB and PostgreSQL serve different use cases: MongoDB is document-first; PostgreSQL is relational with JSONB support.\n- MongoDB is a <mark>document-based NoSQL database</mark>; PostgreSQL is an object-relational database (ORDBMS).\n- Both support JSON/BSON, but PostgreSQL uses SQL; MongoDB uses MQL.\n\n Key Differences :\n\n1. Data Model:\n   - MongoDB: Document (BSON). PostgreSQL: Relational with JSONB (hybrid).\n\n2. Query Language:\n   - MongoDB: MQL. PostgreSQL: SQL with CTEs, window functions, full-text search.\n\n3. Scalability:\n   - MongoDB: Built-in sharding for horizontal scaling.\n   - PostgreSQL: Typically vertical scaling or Citus/read replicas.\n\n4. JSON Support:\n   - PostgreSQL's JSONB offers indexing and SQL querying over JSON.\n   - MongoDB is document-first with native BSON.\n\n When to Choose :\n\n- MongoDB: Document workloads, schema evolution, horizontal scaling.\n- PostgreSQL: Complex SQL, geospatial, hybrid relational and JSON workloads.\n\nIn summary, choose MongoDB for document-first applications; choose PostgreSQL for complex relational queries with optional JSON.",
        tags: ["comparison"],
        keyFeatures: [],
        actionWords: ["PostgreSQL JSONB", "MongoDB documents", "scalability"],
        codeExample: ""
    },
    {
        id: 9,
        topic: "mongo",
        question: "Explain Indexes in MongoDB?",
        answer: "Indexes in MongoDB are data structures that <mark>speed up queries</mark> by allowing the database to locate documents without scanning the entire collection.\n- Without indexes, MongoDB performs a full collection scan, which is slow for large datasets.\n- MongoDB (WiredTiger) uses B-tree indexes by default for O(log n) lookups and range scans.\n\n Purpose of Indexes in MongoDB :\n\n1. Query Performance:\n   - Index entries store (key, pointer to document). Enables fast lookups, range queries, and sorted traversal.\n\n2. Types of Indexes:\n   - Single-field: One field. Compound: Multiple fields (order matters).\n   - Multikey: For array fields. Text: Full-text search. Geospatial: 2dsphere for location.\n   - Hashed: Equality and sharding. TTL: Auto-delete. Partial: Conditional index.\n\n3. Trade-offs:\n   - Indexes speed reads but slow writes (each index updated on insert/update).\n   - Index fields used in filter, sort, and projection for hot queries.\n   - Avoid indexing rarely-queried or high-cardinality fields unnecessarily.\n\n How to Verify Index Usage :\n\n- Use db.collection.find(...).explain(\"executionStats\"). Look for IXSCAN and low totalDocsExamined.\n\n Key Points :\n\n- Compound index field order must match query pattern. Index {a:1, b:1} helps {a:1} and {a:1, b:1} but NOT {b:1} alone.\n\nIn summary, indexes are essential for performance; create them based on query patterns and monitor usage with explain().",
        tags: ["indexing"],
        keyFeatures: [],
        actionWords: ["B-tree", "compound index", "IXSCAN"],
        codeExample: "db.users.createIndex({ email: 1 });\ndb.users.createIndex({ status: 1, createdAt: -1 });"
    },
    {
        id: 10,
        topic: "mongo",
        question: "Explain the significance of a covered query?",
        answer: "A <mark>covered query</mark> is a query where all fields needed (filter, sort, projection) are contained in the index.\n- MongoDB never needs to fetch the actual document—data comes entirely from the index.\n- This results in faster execution, lower memory usage, and reduced disk I/O.\n\n Purpose of Covered Queries :\n\n1. Performance Benefits:\n   - No disk reads for documents—data comes from the index.\n   - Lower memory usage and faster execution.\n   - In sharded clusters, less data over the network.\n\n2. How to Achieve:\n   - Create a compound index that includes projected fields.\n   - Example: Query {status:1} projecting {name:1, status:1} → index {status:1, name:1} covers it.\n   - Exclude \"_id\" in projection if not needed, since \"_id\" is always in the index.\n\n3. Limitations:\n   - The index must include every projected field.\n   - Including \"_id\":0 in projection can make a query covered when \"_id\" would otherwise force a document fetch.\n\n How to Verify :\n\n- Check explain output: \"totalDocsExamined\": 0 and \"stage\": \"PROJECTION_COVERED\" indicate a covered query.\n\n Key Points :\n\n- Covered queries are the fastest type of query in MongoDB when all requirements are met.\n\nIn summary, a covered query satisfies the query entirely from the index, avoiding document fetches for optimal performance.",
        tags: ["indexing", "performance"],
        keyFeatures: [],
        actionWords: ["all fields in index", "no document fetch", "totalDocsExamined 0"],
        codeExample: "db.orders.createIndex({ customerId: 1, orderDate: 1, total: 1 });\ndb.orders.find({ customerId: 123 }, { orderDate: 1, total: 1, _id: 0 });"
    },
    {
        id: 11,
        topic: "mongo",
        question: "What is a replica set?",
        answer: "A <mark>replica set</mark> is a group of MongoDB servers that maintain identical copies of the same data.\n- It provides <mark>high availability and data redundancy</mark> through automatic failover.\n- One server acts as the primary (receives all writes); others are secondaries that replicate from the primary.\n\n Purpose of a Replica Set in MongoDB :\n\n1. Components:\n   - Primary: Receives all writes and serves reads.\n   - Secondaries: Replicate from primary, can serve reads for scaling.\n   - Arbiter (optional): Votes in elections but holds no data.\n\n2. How Replication Works:\n   - The primary records operations in the oplog (operation log—a capped collection).\n   - Secondaries tail the oplog and apply operations asynchronously.\n   - Replication is asynchronous—secondaries may lag behind the primary.\n\n3. Failover:\n   - If the primary goes down, secondaries hold an election.\n   - Majority of voting members must agree. Winner becomes new primary.\n   - Typical failover: 10–30 seconds.\n\n Read Preferences :\n\n- primary (default): Always read from primary. primaryPreferred, secondary, secondaryPreferred, nearest.\n- Use secondary or nearest for read scaling but accept eventual consistency.\n\n Key Points :\n\n- Even a 3-node replica set needs 2 nodes for majority. Distribute across data centers for resilience.\n\nIn summary, a replica set provides high availability, automatic failover, and read scaling through replicated data across multiple nodes.",
        tags: ["replication", "high-availability"],
        keyFeatures: [],
        actionWords: ["primary", "secondary", "oplog", "automatic failover"],
        codeExample: ""
    },
    {
        id: 12,
        topic: "mongo",
        question: "Explain Storage Encryption?",
        answer: "Storage encryption is a security measure that <mark>encrypts data at rest</mark>—data stored on disk—to protect it from unauthorized access.\n- It protects against theft, physical compromise, or unauthorized access to storage devices.\n- Encryption converts plaintext to ciphertext; only with the key can data be decrypted.\n\n Purpose of Storage Encryption :\n\n1. MongoDB Enterprise:\n   - Transparent Data Encryption (TDE) encrypts data files and journal using AES-256.\n   - Keys managed by KMIP or local keyfile. Application is unchanged.\n\n2. MongoDB Atlas:\n   - Encryption at rest by default (AES-256) via cloud provider.\n\n3. MongoDB Community:\n   - Use filesystem encryption (LUKS, BitLocker) or application-level encryption for sensitive fields.\n\n Key Points :\n\n- Encryption in transit (TLS) is separate—protects data during network transmission.\n- Keys must be stored securely (HSM, KMS). Key rotation requires re-encryption.\n\nIn summary, storage encryption protects data at rest and is essential for regulatory compliance and security.",
        tags: ["security"],
        keyFeatures: [],
        actionWords: ["data at rest", "TDE", "AES-256"],
        codeExample: ""
    },
    {
        id: 13,
        topic: "mongo",
        question: "What is the importance of GridFS and Journaling?",
        answer: "GridFS and Journaling serve different but important purposes in MongoDB.\n- GridFS stores files larger than the <mark>16MB BSON document limit</mark>.\n- Journaling ensures <mark>data durability</mark> by recording writes before applying them to data files.\n\n Importance of GridFS :\n\n1. Large File Storage:\n   - Splits files into 255KB chunks (configurable), stores in \"fs.chunks\"; metadata in \"fs.files\".\n   - Enables streaming and partial retrieval. Use for large binaries, videos, backups.\n\n2. Alternative:\n   - Store files in S3 or Object Storage and keep only metadata in MongoDB.\n\n Importance of Journaling :\n\n1. Write-Ahead Log (WAL):\n   - MongoDB writes changes to journal files before applying to data files.\n   - On crash, journal is replayed for recovery. Ensures durability.\n\n2. Configuration:\n   - Journal committed to disk approximately every 100ms (WiredTiger). Enabled by default.\n\n Key Points :\n\n- Journal protects single-node recovery; replica set provides overall durability.\n\nIn summary, GridFS handles large files; Journaling ensures data survives crashes.",
        tags: ["storage", "durability"],
        keyFeatures: [],
        actionWords: ["GridFS", "journal", "WAL", "16MB limit"],
        codeExample: ""
    },
    {
        id: 14,
        topic: "mongo",
        question: "How to do locking or transactions in MongoDB?",
        answer: "MongoDB supports both document-level locking and multi-document transactions for data consistency.\n- WiredTiger uses <mark>document-level locking</mark>—multiple writers can update different documents concurrently.\n- For operations spanning multiple documents, use multi-document transactions (v4.0+).\n\n How Locking and Transactions Work :\n\n1. Document-Level Locking:\n   - WiredTiger locks at the document level (not collection or database).\n   - Different documents can be written concurrently without blocking.\n\n2. Multi-Document Transactions:\n   - Use sessions with startTransaction, commitTransaction, abortTransaction.\n   - Supports ACID across multiple documents and collections in the same database.\n   - Requires replica set or sharded cluster.\n\n3. Internal Mechanism:\n   - Snapshot isolation: reads see a consistent snapshot; writes are serialized.\n   - Uses WiredTiger transaction internally.\n\n Key Points :\n\n- Transactions add latency. Keep them short. Avoid long-running transactions.\n- Code pattern: startSession() → startTransaction() → perform operations with { session } → commitTransaction() or abortTransaction() → endSession().\n\nIn summary, use document-level operations for single-document atomicity; use multi-document transactions when you need ACID across multiple documents.",
        tags: ["transactions", "concurrency"],
        keyFeatures: [],
        actionWords: ["multi-document transactions", "snapshot isolation", "ACID"],
        codeExample: "const session = client.startSession();\nsession.startTransaction();\ntry {\n  await orders.insertOne({...}, { session });\n  await inventory.updateOne({...}, { $inc: { qty: -1 } }, { session });\n  await session.commitTransaction();\n} catch (e) { await session.abortTransaction(); }\nsession.endSession();"
    },
    {
        id: 15,
        topic: "mongo",
        question: "How to do Journaling in MongoDB?",
        answer: "Journaling in MongoDB is <mark>enabled by default</mark> and does not require any specific configuration.\n- MongoDB uses a write-ahead log (WAL) to journal write operations before applying them to the database.\n- This ensures data durability and consistency by preserving write operations in a sequential log on disk.\n\n How Journaling Works :\n\n1. Write-Ahead Log:\n   - Before modifying data files, changes are written to journal files.\n   - On crash, MongoDB replays the journal to recover uncommitted changes.\n   - Journal files are in the dbpath journal directory.\n\n2. Checkpoint Interval:\n   - WiredTiger checkpoints data to disk every 60 seconds (default).\n   - Journal allows recovery between checkpoints.\n\n Key Points :\n\n- To disable (not recommended): use \"--nojournal\"—loses durability on crash.\n- Keep journal on fast storage (same as or faster than data). Ensure sufficient disk space.\n\nIn summary, journaling is enabled by default and ensures MongoDB can recover from crashes by replaying the write-ahead log.",
        tags: ["durability", "storage"],
        keyFeatures: [],
        actionWords: ["write-ahead log", "WAL", "enabled by default"],
        codeExample: ""
    },
    {
        id: 16,
        topic: "mongo",
        question: "How does MongoDB provide concurrency?",
        answer: "MongoDB provides concurrency through multiple mechanisms that allow simultaneous reads and writes while ensuring data consistency.\n- The WiredTiger storage engine uses <mark>document-level locking</mark> and <mark>MVCC (Multi-Version Concurrency Control)</mark>.\n- Different documents can be written concurrently; there is no global lock.\n\n How MongoDB Achieves Concurrency :\n\n1. Document-Level Locking:\n   - WiredTiger locks at the document level, not collection or database.\n   - Multiple clients can read and write different documents simultaneously.\n\n2. MVCC (Multi-Version Concurrency Control):\n   - Writers create new versions; readers see snapshots.\n   - No read locks blocking writes. Improves throughput.\n\n3. Lock Granularity:\n   - Database → Collection → Document. Most operations hold document-level locks briefly.\n\n4. Snapshot Isolation:\n   - Readers see consistent point-in-time snapshots.\n   - Writers serialize at commit.\n\n Key Points :\n\n- Old MMAPv1 used collection-level locks. WiredTiger's document-level + MVCC enables high write concurrency.\n\nIn summary, MongoDB achieves concurrency through document-level locking and MVCC, allowing high throughput while maintaining consistency.",
        tags: ["concurrency", "performance"],
        keyFeatures: [],
        actionWords: ["document-level locking", "MVCC", "WiredTiger"],
        codeExample: ""
    },
    {
        id: 17,
        topic: "mongo",
        question: "What is Sharding?",
        answer: "Sharding is a technique used to <mark>horizontally partition data</mark> across multiple servers (shards) to improve scalability and performance.\n- Data is divided into chunks based on a shard key. Each chunk lives on one shard.\n- mongos routes queries to the correct shard(s); config servers store chunk-to-shard mappings.\n\n Purpose of Sharding in MongoDB :\n\n1. How It Works:\n   - Data is divided into chunks (ranges of shard key values).\n   - mongos routes queries to the appropriate shard(s).\n   - Config servers maintain metadata about chunk distribution.\n\n2. Components:\n   - Shards: Replica sets holding a subset of data.\n   - mongos: Query router. Config servers: Metadata storage.\n\n3. Shard Key:\n   - Determines how data is distributed. Must be immutable or rarely change.\n   - Poor choice (e.g., monotonically increasing) causes hotspot—all writes to one chunk.\n\n Key Points :\n\n- Shard when a single replica set cannot meet storage or throughput needs.\n- Plan shard key early—changing it later is very difficult.\n\nIn summary, sharding distributes data across servers for horizontal scalability and is essential for large-scale MongoDB deployments.",
        tags: ["sharding", "scaling"],
        keyFeatures: [],
        actionWords: ["horizontal partitioning", "shard key", "mongos"],
        codeExample: ""
    },
    {
        id: 18,
        topic: "mongo",
        question: "What is Aggregation in MongoDB?",
        answer: "Aggregation in MongoDB refers to the process of <mark>performing data transformation operations</mark> on documents to compute aggregated results.\n- It includes calculating averages, sums, counts, and grouping data by specific criteria.\n- MongoDB provides the Aggregation Framework—a powerful set of tools for complex data aggregation and analysis.\n\n Purpose of Aggregation in MongoDB :\n\n1. Aggregation Framework:\n   - Pipeline of stages. Each stage receives documents from the previous stage, processes them, and passes to the next.\n   - Stages include: $match, $group, $project, $lookup, $sort, $limit, $unwind, $facet.\n\n2. vs MapReduce:\n   - Aggregation is declarative, optimized, and preferred for most use cases.\n   - MapReduce is legacy, flexible but slower.\n\n3. Performance:\n   - Use $match early to reduce documents. $lookup can be expensive—denormalize when possible.\n\n Key Points :\n\n- Example: Group orders by status and sum totals using $group with $sum accumulator.\n\nIn summary, aggregation enables complex data analysis and transformation through a pipeline of stages.",
        tags: ["aggregation", "querying"],
        keyFeatures: [],
        actionWords: ["pipeline", "$group", "$match"],
        codeExample: "db.orders.aggregate([{ $group: { _id: \"$status\", total: { $sum: \"$amount\" } } }]);"
    },
    {
        id: 19,
        topic: "mongo",
        question: "What is the importance of the profiler in MongoDB?",
        answer: "The profiler in MongoDB is a diagnostic tool that <mark>captures and records information</mark> about database operations.\n- It records query execution times, number of documents scanned, and other performance metrics.\n- It plays a crucial role in database performance tuning, query optimization, and troubleshooting.\n\n Purpose of the Profiler in MongoDB :\n\n1. What It Records:\n   - Duration, execution plan, docs examined, keys examined.\n\n2. Profiling Levels:\n   - 0: Off. 1: Slow operations only (default threshold 100ms). 2: All operations.\n\n3. How to Use:\n   - db.setProfilingLevel(1, { slowms: 50 }) to profile slow queries.\n   - View: db.system.profile.find() or db.getCollection('system.profile').find().\n\n Key Points :\n\n- Keep level 1 with reasonable slowms in production. Level 2 adds significant overhead.\n- Use for identifying slow queries and verifying index usage.\n\nIn summary, the profiler is essential for performance tuning and identifying slow or inefficient queries.",
        tags: ["performance", "monitoring"],
        keyFeatures: [],
        actionWords: ["profiler", "slow queries", "system.profile"],
        codeExample: "db.setProfilingLevel(1, { slowms: 100 });\ndb.system.profile.find().sort({ ts: -1 }).limit(5);"
    },
    {
        id: 20,
        topic: "mongo",
        question: "Explain the Aggregation Pipeline?",
        answer: "The aggregation pipeline in MongoDB is a powerful framework for <mark>data aggregation and transformation</mark>.\n- Documents pass through a series of stages, with each stage transforming the stream.\n- It allows developers to compute aggregated results, perform data transformations, and extract valuable insights.\n\n Purpose of the Aggregation Pipeline :\n\n1. Key Stages:\n   - $match: Filter. $project: Reshape. $group: Aggregate. $sort, $limit, $skip.\n   - $unwind: Flatten arrays. $lookup: Join. $facet: Multiple pipelines. $bucket/$bucketAuto: Histograms.\n\n2. Order Matters:\n   - Place $match early to reduce documents.\n   - $project before $group to drop unneeded fields.\n   - $sort before $limit for deterministic top-N.\n\n3. $match vs find():\n   - First $match in pipeline can use indexes; it is pushed down to query layer when possible.\n\n Key Points :\n\n- Use db.collection.aggregate([...], { explain: true }) to see execution plan.\n\nIn summary, the aggregation pipeline processes documents through configurable stages for flexible data analysis.",
        tags: ["aggregation", "querying"],
        keyFeatures: [],
        actionWords: ["$match", "$group", "$lookup", "$project"],
        codeExample: "[{ $match: { status: \"active\" } }, { $group: { _id: \"$category\", count: { $sum: 1 } } }]"
    },
    {
        id: 21,
        topic: "mongo",
        question: "Explain MapReduce?",
        answer: "MapReduce is a data processing paradigm used for <mark>large-scale data processing and analysis</mark> across distributed systems.\n- In MongoDB, MapReduce allows complex aggregation tasks that are difficult with the Aggregation Framework.\n- It is based on mapping and reducing operations, which can run in parallel across multiple nodes.\n\n Purpose of MapReduce in MongoDB :\n\n1. How It Works:\n   - map() emits key-value pairs; reduce() aggregates values per key.\n   - db.collection.mapReduce(map, reduce, { out: ... }). Output to collection or inline.\n\n2. When to Use:\n   - Rarely. Aggregation pipeline is preferred for almost all use cases.\n   - MapReduce only when you need custom logic the aggregation framework cannot express.\n\n Key Points :\n\n- MongoDB 5.0 deprecated mapReduce for server-side JS. Prefer aggregation or application-side processing.\n\nIn summary, MapReduce is a legacy option for custom aggregation logic; prefer the Aggregation Framework when possible.",
        tags: ["aggregation", "legacy"],
        keyFeatures: [],
        actionWords: ["map", "reduce", "deprecated"],
        codeExample: ""
    },
    {
        id: 22,
        topic: "mongo",
        question: "Explain Splitting in MongoDB sharding?",
        answer: "In MongoDB sharding, splitting refers to the process of <mark>dividing a large chunk of data into smaller chunks</mark>.\n- This ensures efficient distribution and balanced load across shards in a sharded cluster.\n- It is an essential part of managing the scalability and performance of a sharded environment.\n\n Purpose of Splitting in MongoDB :\n\n1. How It Works:\n   - When a chunk exceeds the chunk size (default 64MB), the balancer splits it.\n   - Split creates a new boundary at the midpoint of the shard key range. No data movement—metadata only.\n   - Original chunk is replaced by two chunks on the same shard.\n\n2. Migration:\n   - After splits, the balancer may migrate chunks between shards to balance load.\n   - Migration moves actual data.\n\n Key Points :\n\n- Jumbo chunks cannot be split (e.g., single shard key value with many docs). They are not migrated and can cause imbalance.\n\nIn summary, splitting divides oversized chunks for even distribution across shards.",
        tags: ["sharding"],
        keyFeatures: [],
        actionWords: ["chunk", "balancer", "jumbo chunk"],
        codeExample: ""
    },
    {
        id: 23,
        topic: "mongo",
        question: "What is the purpose of the save() method?",
        answer: "The save() method in MongoDB is used to <mark>insert a new document or update an existing one</mark>.\n- It combines the functionality of both insertOne() and updateOne().\n- If the document has an \"_id\" that matches an existing document, it updates; otherwise it inserts.\n\n Purpose of save() :\n\n1. How It Works:\n   - With matching \"_id\": performs update or replace.\n   - Without matching \"_id\": performs insert.\n\n2. Deprecation:\n   - Deprecated in favor of explicit insertOne(), updateOne(), or replaceOne().\n   - Explicit methods make intent clear and support options (upsert, write concern) consistently.\n\n Key Points :\n\n- Prefer insertOne() for new documents and updateOne()/replaceOne() for updates.\n\nIn summary, save() is a legacy convenience method; use explicit insert and update methods instead.",
        tags: ["crud", "deprecated"],
        keyFeatures: [],
        actionWords: ["insert or update", "deprecated"],
        codeExample: "db.users.save({ _id: 1, name: \"Alice\" });"
    },
    {
        id: 24,
        topic: "mongo",
        question: "What is normalization and when should we normalize data in MongoDB?",
        answer: "Normalization is the process of <mark>organizing data to minimize redundancy</mark>—dividing data into related collections and linking by ID.\n- MongoDB often uses denormalization: embedding related data in documents to optimize for read patterns.\n- One read fetches everything needed without joins.\n\n When to Normalize in MongoDB :\n\n1. Use References (Normalize):\n   - One-to-many with large, unbounded \"many\" (e.g., user with millions of orders).\n   - Many-to-many relationships. Data shared across many parents.\n   - Different access patterns or lifecycle for related data.\n\n2. Use Embedding (Denormalize):\n   - One-to-few. Data always read with parent.\n   - No need to query the embedded piece alone.\n\n3. Hybrid Approach:\n   - Reference for large collections; embed small, frequently-accessed subsets (e.g., last 5 orders).\n\n Key Points :\n\n- MongoDB favors denormalization for read performance; normalize when consistency or unbounded growth is a concern.\n\nIn summary, choose normalization for unbounded or shared data; choose embedding for one-to-few and read-optimized access.",
        tags: ["schema-design"],
        keyFeatures: [],
        actionWords: ["normalization", "denormalization", "embed vs reference"],
        codeExample: ""
    },
    {
        id: 25,
        topic: "mongo",
        question: "Explain Projection in MongoDB?",
        answer: "In MongoDB, projection refers to the process of <mark>selecting specific fields to include or exclude</mark> in the documents returned by a query.\n- It allows you to control the amount of data returned, which can improve performance and reduce network transfer.\n- Use the second argument to find(): { name: 1, email: 1, _id: 0 }.\n\n Purpose of Projection :\n\n1. Performance:\n   - Reduces data transfer, memory usage, and network bandwidth.\n   - Essential for large documents when you only need a few fields.\n\n2. Rules:\n   - 1 = include, 0 = exclude. Cannot mix except for \"_id\".\n   - \"_id\" is included by default unless explicitly excluded.\n\n Key Points :\n\n- If all projected fields (plus filter fields) are in an index, the query can be covered—no document fetch needed.\n\nIn summary, projection improves performance by returning only the fields your application needs.",
        tags: ["querying"],
        keyFeatures: [],
        actionWords: ["projection", "field selection"],
        codeExample: "db.users.find({ status: \"active\" }, { name: 1, email: 1, _id: 0 });"
    },
    {
        id: 26,
        topic: "mongo",
        question: "How can MongoDB simulate subquery or join?",
        answer: "While MongoDB does not support traditional SQL-style joins, it provides several <mark>mechanisms to simulate joins and subqueries</mark>.\n- Embedding stores related data in the same document—no join needed.\n- The aggregation framework offers $lookup and $graphLookup for server-side joins.\n\n How to Simulate Joins in MongoDB :\n\n1. Embedding Documents:\n   - Store related data in the same document. One query fetches everything.\n   - Best for one-to-few relationships and data always read together.\n\n2. $lookup Stage:\n   - Left outer join in aggregation. \"from\" = other collection, \"localField\"/\"foreignField\" for the join.\n   - Use \"let\" and \"pipeline\" for custom join logic. Repeated $lookup can be slow.\n\n3. $graphLookup Stage:\n   - Recursive lookup for org hierarchy, graph traversal.\n\n4. Manual References + Application:\n   - Fetch parent, then query children by IDs. Combine in application code.\n\n Key Points :\n\n- $lookup is flexible but not as optimized as SQL joins. For heavy relational workloads, consider a relational database.\n\nIn summary, use embedding when possible; use $lookup for occasional joins; use application logic for complex join scenarios.",
        tags: ["querying", "schema-design"],
        keyFeatures: [],
        actionWords: ["$lookup", "$graphLookup", "embedding"],
        codeExample: "db.orders.aggregate([{ $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }]);"
    },
    {
        id: 27,
        topic: "mongo",
        question: "Define oplog (operation log)?",
        answer: "The oplog (operations log) is a special <mark>capped collection</mark> in MongoDB that records all changes to data in a replica set.\n- It is short for \"operation log\" and serves a crucial role in MongoDB's replication mechanism.\n- Secondaries replicate by reading and applying oplog entries from the primary.\n\n Purpose of the Oplog :\n\n1. Replication:\n   - Ensures data consistency and enables replica sets to stay in sync.\n   - Each entry has: op (i/u/d/c), ns (namespace), o (document), o2 (query for updates), ts (timestamp).\n\n2. Capped Collection:\n   - Fixed size; old entries are overwritten when full.\n   - Size configured at creation. Must be large enough to hold operations during longest secondary outage.\n\n3. Use Cases:\n   - Replication. Change Streams (built on oplog). Point-in-time recovery with backup + oplog replay.\n\n Key Points :\n\n- Stored in \"local.oplog.rs\". Without sufficient oplog size, a lagging secondary may require full resync.\n\nIn summary, the oplog is the foundation of replication, recording all write operations for secondary nodes to apply.",
        tags: ["replication"],
        keyFeatures: [],
        actionWords: ["oplog", "replication", "capped collection"],
        codeExample: ""
    },
    {
        id: 28,
        topic: "mongo",
        question: "What are NoSQL databases and their types?",
        answer: "NoSQL databases are a category of database management systems that <mark>differ from traditional relational databases</mark> in data storage, retrieval, and structure.\n- They are designed for large volumes of data, diverse data types, and flexible schema design.\n- MongoDB is a document-oriented NoSQL database.\n\n Types of NoSQL Databases :\n\n1. Key-Value Stores:\n   - Simple get/set by key. Examples: Redis, DynamoDB, Riak.\n   - Use cases: Caching, session management.\n\n2. Document Stores:\n   - Documents with nested structure (JSON/BSON). Examples: MongoDB, CouchDB.\n   - Use cases: Content management, user profiles, catalogs.\n\n3. Column-Family Stores:\n   - Wide columns, good for analytics. Examples: Cassandra, HBase.\n\n4. Graph Databases:\n   - Nodes and edges for relationships. Examples: Neo4j, Amazon Neptune.\n\n Key Points :\n\n- MongoDB fits the document store category with secondary indexes, aggregation, and horizontal scaling.\n\nIn summary, NoSQL databases offer schema flexibility and horizontal scalability; MongoDB is a document-oriented type.",
        tags: ["nosql", "core-concepts"],
        keyFeatures: [],
        actionWords: ["key-value", "document", "column-family", "graph"],
        codeExample: ""
    },
    {
        id: 29,
        topic: "mongo",
        question: "Explain Vertical Scaling in MongoDB?",
        answer: "Vertical scaling (scale-up) involves <mark>adding more resources to a single server</mark> to increase its capacity.\n- This includes upgrading CPU, RAM, or storage. It is a straightforward way to improve performance without changing architecture.\n- MongoDB benefits from more RAM for WiredTiger cache, SSD for I/O, and CPU for aggregation.\n\n Purpose of Vertical Scaling :\n\n1. Advantages:\n   - Simpler operations. No distributed complexity. Lower latency (no network).\n\n2. Disadvantages:\n   - Hard limit (max machine size). Single point of failure. Expensive at high end.\n\n3. When to Use:\n   - Initial growth, before sharding. Increase RAM for WiredTiger cache, SSD for I/O.\n\n Key Points :\n\n- Single replica set has practical limits (~2TB data, ~10k ops/s). Beyond that, use sharding.\n\nIn summary, vertical scaling is simpler but limited; use it until sharding is required.",
        tags: ["scaling"],
        keyFeatures: [],
        actionWords: ["scale up", "single server"],
        codeExample: ""
    },
    {
        id: 30,
        topic: "mongo",
        question: "What are the elements of a Sharded Cluster?",
        answer: "A sharded cluster in MongoDB is designed to <mark>distribute data across multiple servers</mark> for large-scale deployments and high throughput.\n- It consists of shards, mongos, and config servers working together.\n- Clients connect to mongos, which routes queries to the appropriate shards.\n\n Elements of a Sharded Cluster :\n\n1. Shards:\n   - Replica sets holding a subset of data. Each shard is one replica set.\n\n2. mongos:\n   - Query router. Clients connect to mongos; it routes queries to shards based on config metadata.\n   - Stateless—run multiple instances for high availability.\n\n3. Config Servers:\n   - Replica set storing cluster metadata: chunk ranges, shard key, balancer state.\n   - Required for sharding.\n\n How They Work Together :\n\n- Flow: Client → mongos → config (metadata) → shards. mongos merges and sorts results when needed.\n\n Key Points :\n\n- Each element has a specific role. Shards store data; mongos routes; config servers maintain metadata.\n\nIn summary, shards, mongos, and config servers together provide a scalable, high-performance sharded cluster.",
        tags: ["sharding"],
        keyFeatures: [],
        actionWords: ["shards", "mongos", "config servers"],
        codeExample: ""
    },
    {
        id: 31,
        topic: "mongo",
        question: "What is a Storage Engine?",
        answer: "A storage engine is a fundamental component that <mark>determines how data is stored, accessed, and managed</mark> on disk.\n- It handles indexing, transactions, compression, and caching.\n- The storage engine affects performance, scalability, and reliability.\n\n Storage Engines in MongoDB :\n\n1. WiredTiger (Default):\n   - B-tree indexes, document-level locking, compression (snappy, zlib, zstd), in-memory cache.\n   - Replaces MMAPv1 (deprecated).\n\n2. In-Memory:\n   - Data in RAM only. Enterprise. For testing or caching layer.\n\n Key Points :\n\n- Storage engine affects concurrency, compression, and recovery behavior.\n\nIn summary, the storage engine is critical for database performance and behavior.",
        tags: ["storage", "WiredTiger"],
        keyFeatures: [],
        actionWords: ["WiredTiger", "storage engine"],
        codeExample: ""
    },
    {
        id: 32,
        topic: "mongo",
        question: "Explain Capped Collection?",
        answer: "A capped collection is a specialized type of collection in MongoDB with <mark>fixed size and circular buffer-like behavior</mark>.\n- It maintains a limited number of documents in insertion order.\n- When full, the oldest documents are automatically overwritten with new ones.\n\n Purpose of Capped Collections :\n\n1. Characteristics:\n   - Fixed size. No deletes. No updates that change document size.\n   - Insertion order preserved. Natural order = insert order. Efficient for logs.\n\n2. Use Cases:\n   - Oplog. Application logs. Recent events. Rate limiting history.\n\n3. How to Create:\n   - db.createCollection(\"logs\", { capped: true, size: 1048576, max: 1000 }).\n   - Size in bytes; max document count is optional.\n\n Key Points :\n\n- Primarily used for a rolling window of data or a fixed-size log of events.\n\nIn summary, capped collections provide a fixed-size, circular buffer for log-like data.",
        tags: ["collections", "storage"],
        keyFeatures: [],
        actionWords: ["capped", "circular buffer", "fixed size"],
        codeExample: "db.createCollection(\"logs\", { capped: true, size: 1048576 });"
    },
    {
        id: 33,
        topic: "mongo",
        question: "What storage engines does MongoDB use?",
        answer: "MongoDB provides a range of storage engines, each with unique features and performance characteristics.\n- <mark>WiredTiger is the default engine</mark> and the production standard.\n- Other engines include In-Memory and deprecated options like MongoRocks and MMAPv1.\n\n Storage Engines in MongoDB :\n\n1. WiredTiger (Default, 3.2+):\n   - Document-level locking, compression, encryption. Production standard.\n\n2. In-Memory:\n   - Data in RAM only. Enterprise. For caching, testing.\n\n3. Deprecated:\n   - MongoRocks (RocksDB-based): No longer recommended.\n   - MMAPv1: Deprecated in 4.0, removed in 4.2.\n\n Key Points :\n\n- Choose based on application requirements. WiredTiger is suitable for most production workloads.\n\nIn summary, WiredTiger is the default and preferred storage engine for MongoDB.",
        tags: ["storage"],
        keyFeatures: [],
        actionWords: ["WiredTiger", "In-Memory"],
        codeExample: ""
    },
    {
        id: 34,
        topic: "mongo",
        question: "How do we configure the cache size in MongoDB?",
        answer: "In MongoDB, the cache size (WiredTiger cache) can be configured to <mark>optimize database performance</mark>.\n- The cache stores frequently accessed data and indexes in memory.\n- Default: 50% of (RAM - 1GB) or 256MB, whichever is larger.\n\n How to Configure Cache Size :\n\n1. Command Line:\n   - mongod --wiredTigerCacheSizeGB 4\n\n2. Config File:\n   - storage.wiredTiger.engineConfig.cacheSizeGB\n\n Key Points :\n\n- Leave headroom for OS, connections, aggregation. On dedicated DB server, 50–70% of RAM is common.\n- Monitor \"wt cache\" metrics to tune effectively.\n\nIn summary, configure the WiredTiger cache based on available RAM and workload.",
        tags: ["performance", "WiredTiger"],
        keyFeatures: [],
        actionWords: ["WiredTiger cache", "cacheSizeGB"],
        codeExample: "mongod --wiredTigerCacheSizeGB 8"
    },
    {
        id: 35,
        topic: "mongo",
        question: "What are the aggregate accumulator operators in MongoDB?",
        answer: "MongoDB aggregation provides accumulator operators for computing values in $group and other stages.\n- Common accumulators include <mark>$sum, $avg, $min, $max, $push, $addToSet</mark>, and more.\n- These operators compute aggregated results when grouping documents.\n\n Aggregate Accumulator Operators :\n\n1. In $group:\n   - $sum, $avg, $min, $max: Numeric aggregation.\n   - $first, $last: First or last value in group.\n   - $push: Array of values. $addToSet: Unique array. $mergeObjects: Merge objects.\n\n2. In $project:\n   - $sum, $avg, etc. for array reduction.\n\n Key Points :\n\n- Example: { $group: { _id: \"$category\", total: { $sum: \"$amount\" }, avg: { $avg: \"$amount\" }, ids: { $push: \"$_id\" } } }\n\nIn summary, accumulator operators enable sums, averages, counts, and other aggregations in the pipeline.",
        tags: ["aggregation"],
        keyFeatures: [],
        actionWords: ["$sum", "$avg", "$push", "$addToSet"],
        codeExample: "{ $group: { _id: \"$category\", total: { $sum: \"$amount\" }, count: { $sum: 1 } } }"
    },
    {
        id: 36,
        topic: "mongo",
        question: "What are the data types in MongoDB (BSON)?",
        answer: "MongoDB uses BSON (Binary JSON) which supports various data types beyond standard JSON.\n- BSON types include <mark>Double, String, Object, Array, ObjectId, Date</mark>, and many more.\n- Each type is optimized for storage and querying in MongoDB.\n\n BSON Data Types in MongoDB :\n\n1. Common Types:\n   - Double, String, Object, Array, Binary, ObjectId, Boolean, Date, Null, Regex.\n   - Int32, Int64, Decimal128, Timestamp, MinKey, MaxKey.\n\n2. Frequently Used:\n   - ObjectId: 12-byte, unique identifier. Date: UTC. NumberInt/NumberLong for precise integers.\n   - Decimal128: For financial data requiring exact decimal representation.\n\n Key Points :\n\n- BSON extends JSON with types like Date, ObjectId, and Binary for efficient storage and querying.\n\nIn summary, BSON provides a rich set of data types for MongoDB documents.",
        tags: ["bson", "core-concepts"],
        keyFeatures: [],
        actionWords: ["BSON types", "ObjectId", "Decimal128"],
        codeExample: ""
    },
    {
        id: 37,
        topic: "mongo",
        question: "What happens when a shard is slow or down during a query?",
        answer: "When a shard is slow or down, query behavior depends on the query type and configuration.\n- <mark>Scatter-gather queries</mark> touch all shards; a slow or absent shard can cause timeouts or failures.\n- Targeted queries (single shard) fail if that shard is down; replica set failover may promote a secondary.\n\n What Happens When a Shard is Slow or Down :\n\n1. Scatter-Gather Query:\n   - mongos sends to all shards. Slow or absent shard causes timeout or partial failure.\n   - Client receives error or partial results depending on read concern.\n\n2. Targeted Query:\n   - If that shard is down, query fails. Replica set failover may promote a secondary.\n\n3. Mitigation:\n   - Replica set per shard for high availability. Configure timeouts and retries in driver.\n   - Monitor shard health. Use readPreference secondaryPreferred to spread read load.\n\n Key Points :\n\n- Proper replication and monitoring are essential for resilience in a sharded cluster.\n\nIn summary, slow or down shards can cause timeouts or failures; use replica sets and monitoring to mitigate.",
        tags: ["sharding", "high-availability"],
        keyFeatures: [],
        actionWords: ["scatter-gather", "timeout", "failover"],
        codeExample: ""
    },
    {
        id: 38,
        topic: "mongo",
        question: "How do we use a primary key in MongoDB?",
        answer: "In MongoDB, the concept of a primary key is analogous to the <mark>\"_id\" field</mark>.\n- The \"_id\" field uniquely identifies documents within a collection.\n- MongoDB automatically assigns a unique ObjectId to each document upon insertion if one is not provided.\n\n Purpose of _id in MongoDB :\n\n1. Primary Key:\n   - Unique per collection. Default unique index on \"_id\".\n   - Used for lookups and sorting by insertion order when ObjectId (time-based).\n\n2. Custom _id:\n   - Can use any unique value (UUID, email, composite). Must be provided on insert. Immutable.\n\n3. Sharding:\n   - \"_id\" is often hashed as shard key for even distribution when no natural key exists.\n\n Key Points :\n\n- The \"_id\" field serves as the primary key, enabling efficient data retrieval, indexing, and manipulation.\n\nIn summary, \"_id\" is the primary key in MongoDB; it is unique and automatically created if omitted.",
        tags: ["core-concepts", "indexing"],
        keyFeatures: [],
        actionWords: ["_id", "primary key", "ObjectId"],
        codeExample: "db.users.insertOne({ _id: \"user123\", name: \"Alice\" });"
    },
    {
        id: 39,
        topic: "mongo",
        question: "How do we see connections used by MongoDB?",
        answer: "To see connections utilized by MongoDB, you can use several methods.\n- <mark>db.serverStatus().connections</mark> returns current, available, and totalCreated connection counts.\n- db.currentOp(true) shows current operations and client connection info.\n\n How to View MongoDB Connections :\n\n1. MongoDB Shell:\n   - db.serverStatus().connections: current, available, totalCreated.\n   - db.currentOp(true): \"inprog\" array includes client connection info.\n\n2. Monitoring Tools:\n   - mongostat, Atlas metrics, Prometheus exporter.\n\n3. Tuning:\n   - net.maxIncomingConnections (default unlimited). Each connection uses approximately 1MB.\n   - Use connection pooling in drivers to manage connections efficiently.\n\n Key Points :\n\n- Monitor connections to avoid exhaustion. Connection pooling reduces connection overhead.\n\nIn summary, use db.serverStatus().connections and db.currentOp() to view and monitor connections.",
        tags: ["monitoring", "operations"],
        keyFeatures: [],
        actionWords: ["connections", "serverStatus", "connection pooling"],
        codeExample: "db.serverStatus().connections"
    },
    {
        id: 40,
        topic: "mongo",
        question: "How do applications access real-time data changes in MongoDB?",
        answer: "Applications can access real-time data modifications in MongoDB using <mark>Change Streams</mark>.\n- Change Streams provide a way for applications to subscribe to real-time notifications of changes.\n- Applications can react to inserts, updates, and deletes as they occur.\n\n How Change Streams Work :\n\n1. Subscription:\n   - Subscribe to changes on a collection, database, or cluster.\n   - collection.watch([{ $match: { \"fullDocument.status\": \"active\" } }]) returns a cursor of change events.\n\n2. Features:\n   - Resume tokens for reliability. Built on oplog.\n   - Requires replica set or sharded cluster (v3.6+).\n\n3. Use Cases:\n   - Cache invalidation. Search index sync. Event sourcing. Audit logs.\n\n Key Points :\n\n- Requires replica set. Change stream can be dropped if oplog entry ages out.\n\nIn summary, Change Streams enable real-time, event-driven architectures for data modifications.",
        tags: ["change-streams", "real-time"],
        keyFeatures: [],
        actionWords: ["Change Streams", "watch", "oplog"],
        codeExample: "db.orders.watch([{ $match: { operationType: \"insert\" } }])"
    },
    {
        id: 41,
        topic: "mongo",
        question: "Define BSON?",
        answer: "BSON stands for Binary JSON—a <mark>binary-encoded serialization format</mark> used to represent and store documents in MongoDB.\n- It is a binary representation of JSON-like documents, optimized for efficient storage and manipulation.\n- BSON extends JSON with additional data types like Date, ObjectId, and Binary.\n\n Purpose of BSON :\n\n1. Why Binary:\n   - Faster to parse than text JSON. Compact. Type-preserving (dates, ObjectId, int64, decimal).\n\n2. Extra Types:\n   - Date, ObjectId, BinData, Decimal128, Timestamp. JSON does not distinguish int/float or date format.\n\n3. Trade-off:\n   - Slightly larger than JSON for simple docs; faster parsing and richer types justify it for MongoDB.\n\n Key Points :\n\n- BSON is the format MongoDB uses internally for all document storage and transmission.\n\nIn summary, BSON is the binary encoding MongoDB uses for documents, with extended types beyond JSON.",
        tags: ["bson", "core-concepts"],
        keyFeatures: [],
        actionWords: ["Binary JSON", "extended types"],
        codeExample: ""
    },
    {
        id: 42,
        topic: "mongo",
        question: "Can we run multiple JavaScript operations concurrently in one MongoDB instance?",
        answer: "Yes, you can run more than one JavaScript operation concurrently in a single MongoDB instance.\n- MongoDB supports <mark>concurrent execution</mark> of operations via connection pooling and WiredTiger's document-level locking.\n- Multiple clients can run reads and writes simultaneously within the database server.\n\n Key Points :\n\n- JavaScript execution (e.g., $where, mapReduce) runs in a single thread per mongod.\n- Avoid heavy JavaScript logic; use the aggregation framework instead for better performance.\n\nIn summary, MongoDB supports concurrent operations; use aggregation over JavaScript for performance-critical workloads.",
        tags: ["concurrency"],
        keyFeatures: [],
        actionWords: ["concurrent", "connection pooling"],
        codeExample: ""
    },
    {
        id: 43,
        topic: "mongo",
        question: "What are the disadvantages of using MongoDB?",
        answer: "While MongoDB offers many advantages, it is important to consider potential drawbacks.\n- <mark>Schema flexibility</mark> can lead to inconsistent data without application-level enforcement.\n- Multi-document transactions, joins, and sharding have specific limitations and trade-offs.\n\n Disadvantages of Using MongoDB :\n\n1. Schema Flexibility:\n   - Can lead to inconsistent data without application enforcement. Requires discipline.\n\n2. Transactions:\n   - Multi-doc transactions add latency; keep them short.\n\n3. Memory:\n   - Working set must fit in RAM for hot data. Large datasets need sharding and appropriate shard key.\n\n4. Joins:\n   - $lookup is less optimized than SQL JOINs. Denormalize when possible.\n\n5. Shard Key:\n   - Poor choice causes hotspots; changing shard key is very difficult.\n\n6. Operational Complexity:\n   - Replica sets, sharding, backups require expertise.\n\n Key Points :\n\n- Evaluate these trade-offs against your application requirements before choosing MongoDB.\n\nIn summary, MongoDB's flexibility and scalability come with trade-offs in consistency, joins, and operations.",
        tags: ["limitations"],
        keyFeatures: [],
        actionWords: ["schema discipline", "shard key", "working set"],
        codeExample: ""
    },
    {
        id: 44,
        topic: "mongo",
        question: "Explain BSON vs JSON in MongoDB?",
        answer: "BSON and JSON are both used for representing document data, but they differ in format and capabilities.\n- JSON is a text format with limited types. BSON is a <mark>binary encoding</mark> used by MongoDB.\n- BSON extends JSON with additional types like Date, ObjectId, and Binary for efficient storage and querying.\n\n BSON vs JSON :\n\n1. JSON:\n   - Text format. Limited types: string, number, boolean, null, array, object.\n   - No native Date, Binary, or 64-bit integer.\n\n2. BSON:\n   - Binary encoding. Extends JSON with: Date, ObjectId, BinData, Int32, Int64, Decimal128, Timestamp, Regex.\n   - Preserves field order. Designed for efficient scanning (length prefixes).\n\n Key Points :\n\n- BSON can be larger than JSON for simple docs but parses faster. Type fidelity matters for sorting and indexing.\n- Drivers serialize/deserialize between language objects and BSON. Use BSON types (e.g., ObjectId, ISODate) for correct behavior.\n\nIn summary, BSON is MongoDB's binary format that extends JSON with richer types for efficient storage and querying.",
        tags: ["bson", "core-concepts"],
        keyFeatures: [],
        actionWords: ["BSON", "JSON", "binary encoding"],
        codeExample: ""
    },
    {
        id: 45,
        topic: "mongo",
        question: "Explain Embedding vs Referencing in MongoDB schema design?",
        answer: "In MongoDB schema design, you choose between embedding and referencing related data.\n- <mark>Embedding</mark> stores related data inside the parent document—one read fetches everything.\n- <mark>Referencing</mark> stores an ID in the parent and keeps related data in a separate collection.\n\n Embedding vs Referencing :\n\n1. Embedding:\n   - Store related data inside the parent document.\n   - Good for: one-to-few, data always accessed together, limited growth (e.g., user with embedded address).\n\n2. Referencing:\n   - Store ID in parent; related data in separate collection.\n   - Good for: one-to-many (unbounded), many-to-many, shared data, different lifecycles.\n   - Requires $lookup or a second query.\n\n3. Trade-offs:\n   - Embedding: Faster reads, no joins; risk of document bloat and 16MB limit.\n   - Referencing: Normalized, scalable; requires extra queries.\n\n Key Points :\n\n- Hybrid: Embed summary; reference full details. E.g., embed last 5 orders in user; full orders in orders collection.\n\nIn summary, embed when data is small and always read together; reference when data grows unbounded or is shared.",
        tags: ["schema-design"],
        keyFeatures: [],
        actionWords: ["embedding", "referencing", "denormalization"],
        codeExample: ""
    },
    {
        id: 46,
        topic: "mongo",
        question: "How does MongoDB relate to the CAP theorem?",
        answer: "The CAP theorem states that a distributed system can guarantee only 2 of: Consistency, Availability, and Partition tolerance.\n- MongoDB's behavior is <mark>tunable</mark>—you can choose between stronger consistency or higher availability.\n- By default, MongoDB favors consistency (CP); you can trade for availability (AP-like) via read preference and write concern.\n\n MongoDB and the CAP Theorem :\n\n1. Default (CP-Leaning):\n   - Strong consistency from primary. During partition, if no majority, no primary = unavailability.\n\n2. Tunable for Availability:\n   - readPreference secondary or nearest: reads can be eventually consistent (AP-like).\n   - Accept replication lag for read scaling.\n\n3. Write Concern:\n   - w:1 = ack from primary only (fast, less durable).\n   - w:\"majority\" = ack when majority have it (durable, consistent).\n\n Key Points :\n\n- MongoDB favors consistency by default; tune read preference and write concern for your availability needs.\n\nIn summary, MongoDB lets you balance consistency and availability through configuration.",
        tags: ["cap-theorem", "distributed-systems"],
        keyFeatures: [],
        actionWords: ["CAP", "consistency", "availability"],
        codeExample: ""
    },
    {
        id: 47,
        topic: "mongo",
        question: "Explain TTL indexes in MongoDB?",
        answer: "A TTL (Time-To-Live) index in MongoDB <mark>automatically deletes documents</mark> after a specified time.\n- Create: db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })—deletes docs 24 hours after createdAt.\n- It is useful for session data, temporary tokens, and event logs that expire.\n\n Purpose of TTL Indexes :\n\n1. How It Works:\n   - Background thread runs approximately every 60 seconds.\n   - Removes documents whose indexed date + expireAfterSeconds is in the past.\n   - Single-field index on a date field required.\n\n2. Use Cases:\n   - Session data. Temporary tokens. Event logs. Cache expiration.\n\n3. Limitations:\n   - Replica set only (relies on background thread). Not instant—up to 60s delay.\n   - Indexed field must be date or array of dates.\n\n Key Points :\n\n- TTL indexes simplify automatic cleanup of time-sensitive data.\n\nIn summary, TTL indexes provide automatic document expiration for time-based data.",
        tags: ["indexing"],
        keyFeatures: [],
        actionWords: ["TTL", "expireAfterSeconds", "automatic deletion"],
        codeExample: "db.sessions.createIndex({ lastAccess: 1 }, { expireAfterSeconds: 3600 });"
    },
    {
        id: 48,
        topic: "mongo",
        question: "Explain Partial indexes in MongoDB?",
        answer: "A partial index in MongoDB indexes only documents that <mark>match a filter expression</mark>.\n- Create: db.users.createIndex({ email: 1 }, { partialFilterExpression: { status: \"active\" } }).\n- The index is smaller and faster to maintain because it excludes documents that do not match.\n\n Purpose of Partial Indexes :\n\n1. Benefits:\n   - Smaller index. Faster writes for filtered-out documents.\n   - Use when queries always include the filter (e.g., status=active).\n\n2. Rule:\n   - Query must include the filter (or superset) for the partial index to be used.\n   - find({ status: \"active\", email: \"x@y.com\" }) uses it. find({ email: \"x@y.com\" }) does not.\n\n3. Use Cases:\n   - Sparse indexing (only non-null). Active-only indexes. Conditional uniqueness.\n\n Key Points :\n\n- Partial indexes reduce index size and write overhead when you only need to index a subset of documents.\n\nIn summary, partial indexes index only matching documents, reducing size and improving performance for filtered queries.",
        tags: ["indexing"],
        keyFeatures: [],
        actionWords: ["partial index", "partialFilterExpression"],
        codeExample: "db.orders.createIndex({ customerId: 1 }, { partialFilterExpression: { status: { $ne: \"cancelled\" } } });"
    },
    {
        id: 49,
        topic: "mongo",
        question: "Explain B-tree structure in MongoDB indexing?",
        answer: "MongoDB (WiredTiger) uses a B-tree (B+ tree) structure for indexes.\n- A B-tree is a <mark>balanced tree</mark> where each node has multiple keys and children.\n- Leaves store (key, value) and are linked for efficient range scans.\n\n Purpose of B-Tree in Indexing :\n\n1. Properties:\n   - O(log n) lookup. Efficient range queries. Sorted order.\n   - Good for equality and range ($gt, $lt, sort). WiredTiger uses copy-on-write for concurrency.\n\n2. Why B-Tree vs Hash:\n   - Hash gives O(1) equality but no range support.\n   - B-tree supports range queries and sorted traversal.\n\n3. Hashed Index:\n   - MongoDB offers hashed index for equality and sharding—different structure, no range.\n\n Key Points :\n\n- B-tree indexes enable both equality lookups and efficient range queries.\n\nIn summary, B-tree is the default index structure in MongoDB for efficient lookups and range scans.",
        tags: ["indexing", "internals"],
        keyFeatures: [],
        actionWords: ["B-tree", "B+ tree", "WiredTiger"],
        codeExample: ""
    },
    {
        id: 50,
        topic: "mongo",
        question: "What is the difference between $match and find()?",
        answer: "Both find() and $match filter documents, but they are used in different contexts.\n- find() is a <mark>top-level query</mark>; $match is a stage in the aggregation pipeline.\n- When $match is the first stage, the query optimizer pushes it down—similar to find().\n\n $match vs find() :\n\n1. find(): Direct query on a collection. MongoDB can use indexes, return cursor.\n\n2. $match (Aggregation): Stage in pipeline. Same predicate syntax as find().\n   - Can use indexes when $match is first stage. Later $match stages do in-memory filter.\n\n3. When to Use Each:\n   - Use find() for simple queries.\n   - Use $match when you need further stages ($group, $lookup, $project).\n\n Key Points :\n\n- Put $match early in the pipeline to reduce documents. First $match uses indexes.\n\nIn summary, find() is for standalone queries; $match is for filtering within an aggregation pipeline.",
        tags: ["querying", "aggregation"],
        keyFeatures: [],
        actionWords: ["$match", "find", "index pushdown"],
        codeExample: "db.orders.aggregate([{ $match: { status: \"pending\" } }, { $group: { _id: \"$user\", total: { $sum: 1 } } }]);"
    },
    {
        id: 51,
        topic: "mongo",
        question: "Explain $lookup in the aggregation pipeline?",
        answer: "The $lookup stage in the aggregation pipeline performs a <mark>left outer join</mark> between collections.\n- For each document in the input, it looks up matching documents in another collection and adds them as an array field.\n- It enables join-like operations that MongoDB does not support natively in find().\n\n Purpose of $lookup :\n\n1. Basic Syntax:\n   - { $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }.\n   - Result: each document gets \"user\": [matched docs].\n\n2. Pipeline (v3.6+):\n   - Use \"let\" and \"pipeline\" for flexible join logic and sub-pipelines.\n\n3. Performance:\n   - $lookup can be expensive. Denormalize when join is frequent.\n   - Index the foreign collection on the join field.\n\n Key Points :\n\n- $lookup simulates SQL joins in the aggregation pipeline. Use sparingly for performance.\n\nIn summary, $lookup performs left outer joins between collections in the aggregation pipeline.",
        tags: ["aggregation", "querying"],
        keyFeatures: [],
        actionWords: ["$lookup", "join", "left outer"],
        codeExample: "{ $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }"
    },
    {
        id: 52,
        topic: "mongo",
        question: "Explain $group in the aggregation pipeline?",
        answer: "The $group stage in the aggregation pipeline aggregates documents by a key and computes accumulations.\n- The \"_id\" field is the group key (can be null for a single group).\n- Accumulators include <mark>$sum, $avg, $push, $addToSet</mark>, and more.\n\n Purpose of $group :\n\n1. Syntax:\n   - { $group: { _id: \"$category\", total: { $sum: \"$amount\" }, count: { $sum: 1 } } }.\n\n2. Memory:\n   - $group uses RAM. Large groupings can exceed 100MB. Use allowDiskUse: true to spill to disk.\n\n3. Sharding:\n   - $group can run on shards, then merge on mongos. Align group key with shard key when possible.\n\n Key Points :\n\n- Use $group to compute sums, averages, counts, and other aggregations by a key.\n\nIn summary, $group aggregates documents by a key and computes values using accumulator operators.",
        tags: ["aggregation"],
        keyFeatures: [],
        actionWords: ["$group", "accumulators", "allowDiskUse"],
        codeExample: "{ $group: { _id: \"$status\", total: { $sum: \"$amount\" }, count: { $sum: 1 } } }"
    },
    {
        id: 53,
        topic: "mongo",
        question: "Explain $project in the aggregation pipeline?",
        answer: "The $project stage in the aggregation pipeline reshapes documents by including, excluding, or adding fields.\n- It <mark>controls which fields are passed</mark> to the next stage and can add computed fields.\n- Use it to reduce document size early in the pipeline.\n\n Purpose of $project :\n\n1. Include/Exclude:\n   - { $project: { name: 1, email: 1, _id: 0 } }. 1=include, 0=exclude.\n\n2. Computed Fields:\n   - { $project: { fullName: { $concat: [\"$first\", \" \", \"$last\"] }, year: { $year: \"$createdAt\" } } }.\n\n3. Best Practice:\n   - Drop unneeded fields early to reduce memory. Use $project after $match, before $group.\n\n Key Points :\n\n- $project reduces data passed through the pipeline and enables computed fields.\n\nIn summary, $project reshapes documents for the aggregation pipeline.",
        tags: ["aggregation"],
        keyFeatures: [],
        actionWords: ["$project", "reshape", "computed fields"],
        codeExample: "{ $project: { name: 1, total: { $multiply: [\"$price\", \"$qty\"] } } }"
    },
    {
        id: 54,
        topic: "mongo",
        question: "How do you use explain() to analyze query performance?",
        answer: "The explain() method helps you analyze query performance and verify index usage.\n- Use <mark>cursor.explain('executionStats')</mark> or db.collection.explain('executionStats').aggregate([...]).\n- It returns execution plan, docs examined, and timing information.\n\n How to Use explain() :\n\n1. Key Fields:\n   - executionStats.totalDocsExamined: Lower is better.\n   - totalKeysExamined, executionTimeMillis.\n   - winningPlan.stage: IXSCAN = index used, COLLSCAN = full scan.\n\n2. Stages:\n   - IXSCAN: Index scan. FETCH: Fetch documents. SORT: In-memory if no index. COLLSCAN: Collection scan (usually bad).\n\n3. Optimization:\n   - Aim for IXSCAN, totalDocsExamined close to nReturned.\n   - If COLLSCAN or high totalDocsExamined, add or fix index.\n\n Key Points :\n\n- Use explain() to verify indexes and identify slow queries.\n\nIn summary, explain() is essential for query optimization and index verification.",
        tags: ["performance", "query-optimization"],
        keyFeatures: [],
        actionWords: ["explain", "executionStats", "IXSCAN", "COLLSCAN"],
        codeExample: "db.users.find({ email: \"x@y.com\" }).explain(\"executionStats\");"
    },
    {
        id: 55,
        topic: "mongo",
        question: "Explain Read Preferences in MongoDB?",
        answer: "Read preference controls which replica set member handles read operations.\n- Options include <mark>primary, primaryPreferred, secondary, secondaryPreferred, nearest</mark>.\n- primary (default) ensures strong consistency; secondary and nearest enable read scaling but may return stale data.\n\n Purpose of Read Preferences :\n\n1. primary:\n   - Always read from primary. Strong consistency. Default.\n\n2. secondary / secondaryPreferred:\n   - Read from secondaries. Scale reads, accept replication lag. Use for analytics, reporting.\n\n3. nearest:\n   - Read from lowest-latency member. Good for geo-distributed apps.\n\n Key Points :\n\n- secondary and nearest may return stale data. Use primary for read-after-write consistency.\n- Accept eventual consistency when using secondary or nearest for read scaling.\n\nIn summary, read preference lets you balance consistency and read scalability.",
        tags: ["replication", "read-preference"],
        keyFeatures: [],
        actionWords: ["readPreference", "primary", "secondary", "nearest"],
        codeExample: "db.users.find().readPref(\"secondaryPreferred\");"
    },
    {
        id: 56,
        topic: "mongo",
        question: "Explain Write Concern in MongoDB?",
        answer: "Write concern specifies when MongoDB acknowledges a write operation.\n- It controls <mark>durability and consistency</mark> of writes across replica set members.\n- { w: 1, j: true } = ack when primary has applied and written to journal.\n\n Purpose of Write Concern :\n\n1. w Options:\n   - 1 = primary only. \"majority\" = majority of nodes. n = n nodes. \"tagSet\" for custom.\n\n2. j:true:\n   - Wait for journal sync. Ensures durability on primary.\n\n3. wtimeout:\n   - Timeout in ms for w>1. Default: no timeout.\n\n Key Points :\n\n- Default: w:1. For critical writes use w:\"majority\", j:true.\n- Trade-off: higher durability = higher latency.\n\nIn summary, write concern controls when MongoDB acknowledges writes and how durable they are.",
        tags: ["replication", "durability"],
        keyFeatures: [],
        actionWords: ["write concern", "w:majority", "durability"],
        codeExample: "db.orders.insertOne({ doc }, { writeConcern: { w: 'majority', j: true } });"
    },
    {
        id: 57,
        topic: "mongo",
        question: "Explain the failover mechanism in a replica set?",
        answer: "The failover mechanism in a replica set ensures that a new primary is elected when the current primary becomes unavailable.\n- When the primary is unreachable, secondaries hold an <mark>election</mark> to choose a new primary.\n- The process is automatic and typically completes in 10–30 seconds.\n\n How Failover Works :\n\n1. Election:\n   - Secondaries call an election when primary is unreachable.\n   - Candidate needs majority of votes. Arbiter can vote but holds no data. Winner becomes primary.\n\n2. Detection:\n   - Heartbeats every 10s (default). Missed heartbeats trigger election.\n   - electionTimeoutMillis (default 10s) before a secondary tries to become primary.\n\n3. Recovery:\n   - Old primary rejoins as secondary, catches up via oplog.\n   - If it has writes not in majority, those writes are rolled back.\n\n Key Points :\n\n- Drivers detect \"not master\" errors and retry on new primary. Use retryWrites for automatic retry.\n\nIn summary, failover is automatic; the replica set elects a new primary when the current one fails.",
        tags: ["replication", "failover"],
        keyFeatures: [],
        actionWords: ["election", "heartbeat", "rollback"],
        codeExample: ""
    },
    {
        id: 58,
        topic: "mongo",
        question: "What makes a good shard key in MongoDB?",
        answer: "A good shard key is critical for even data distribution and query performance.\n- <mark>Cardinality</mark> and <mark>write distribution</mark> are key factors.\n- Poor shard key choice causes hotspots and imbalance; changing it later is very difficult.\n\n What Makes a Good Shard Key :\n\n1. Cardinality:\n   - High cardinality (many unique values) avoids large chunks.\n   - Low cardinality (e.g., boolean) = few chunks, poor distribution.\n\n2. Write Distribution:\n   - Avoid monotonic keys (timestamp, auto-increment)—all new writes hit last chunk = hotspot.\n   - Prefer hashed key or compound with high-cardinality first.\n\n3. Query Patterns:\n   - Ideally queries include shard key so mongos can target one shard.\n   - Scatter-gather (no shard key) hits all shards.\n\n Key Points :\n\n- Example: { userId: 1, createdAt: 1 } for user-scoped queries. { _id: \"hashed\" } for even distribution.\n- Single shard key value with many docs can create jumbo chunks that cannot be split.\n\nIn summary, choose a shard key with high cardinality, good write distribution, and alignment with query patterns.",
        tags: ["sharding"],
        keyFeatures: [],
        actionWords: ["shard key", "cardinality", "hotspot", "hashed"],
        codeExample: "sh.shardCollection(\"db.orders\", { userId: 1, orderId: 1 });"
    },
    {
        id: 59,
        topic: "mongo",
        question: "What is the mongos router and how does it work?",
        answer: "mongos is the routing service for MongoDB sharded clusters.\n- Clients connect to mongos, not directly to shards.\n- It acts as the <mark>query router</mark> between applications and the sharded cluster.\n\n Purpose of mongos :\n\n1. Role:\n   - Parses queries. Consults config servers for chunk mapping.\n   - Routes to appropriate shard(s). Merges and sorts results. Returns to client.\n\n2. Targeted vs Scatter-Gather:\n   - If query includes shard key, mongos targets specific shard(s).\n   - Otherwise, scatter-gather to all shards.\n\n3. Stateless:\n   - mongos holds no data. Run multiple instances for high availability and load distribution.\n   - Usually co-located with app servers.\n\n Key Points :\n\n- mongos is the main access point for clients in a sharded cluster.\n\nIn summary, mongos routes queries to the correct shards and returns combined results.",
        tags: ["sharding"],
        keyFeatures: [],
        actionWords: ["mongos", "router", "config servers"],
        codeExample: ""
    },
    {
        id: 60,
        topic: "mongo",
        question: "What is the Balancer in MongoDB sharding?",
        answer: "The Balancer in MongoDB sharding redistributes chunks across shards to balance data and load.\n- It runs on the primary config server.\n- When chunk distribution becomes skewed, the balancer <mark>migrates chunks</mark> from overloaded to underloaded shards.\n\n Purpose of the Balancer :\n\n1. When It Runs:\n   - Chunk distribution becomes skewed (e.g., after splits).\n   - Migrates chunks from overloaded to underloaded shards.\n\n2. Balancing Window:\n   - Can set window (e.g., 2am–6am) to avoid peak load.\n\n3. Jumbo Chunks:\n   - Chunks that exceed max size and cannot be split are not migrated.\n   - Can cause permanent imbalance. Resolve by refining shard key or splitting manually.\n\n Key Points :\n\n- Use sh.setBalancerState(false) to disable; sh.setBalancerState(true) to enable.\n\nIn summary, the Balancer ensures even data distribution across shards.",
        tags: ["sharding"],
        keyFeatures: [],
        actionWords: ["balancer", "chunk migration", "jumbo chunk"],
        codeExample: "sh.setBalancerState(false);  // disable\nsh.setBalancerState(true);   // enable"
    },
    {
        id: 61,
        topic: "mongo",
        question: "How does MongoDB implement ACID in multi-document transactions?",
        answer: "MongoDB implements ACID properties in multi-document transactions (v4.0+).\n- All operations in a transaction commit together or none do.\n- <mark>Snapshot isolation</mark> ensures reads see a consistent snapshot with no dirty reads.\n\n How MongoDB Implements ACID :\n\n1. Atomicity:\n   - All operations commit or none do. On abort, all changes rolled back.\n\n2. Consistency:\n   - Snapshot isolation. Constraints (e.g., unique indexes) enforced at commit.\n\n3. Isolation:\n   - Snapshot isolation. Concurrent transactions see consistent snapshots. First writer wins on conflict.\n\n4. Durability:\n   - Committed data is persisted. With journaling and replication, survives crashes.\n\n Key Points :\n\n- WiredTiger provides multi-version concurrency; MongoDB coordinates with replica set for multi-document transactions.\n\nIn summary, MongoDB transactions provide ACID guarantees with snapshot isolation.",
        tags: ["transactions", "acid"],
        keyFeatures: [],
        actionWords: ["ACID", "snapshot isolation", "atomicity"],
        codeExample: ""
    },
    {
        id: 62,
        topic: "mongo",
        question: "What is the working set and why does it matter?",
        answer: "The working set is the set of data and indexes that applications access frequently.\n- Ideally, the working set <mark>fits in RAM</mark> (WiredTiger cache) for best performance.\n- If it exceeds RAM, MongoDB must read from disk, causing latency and throughput issues.\n\n Purpose of the Working Set :\n\n1. Why It Matters:\n   - Disk is orders of magnitude slower than RAM.\n   - Working set in RAM = fast access. Working set larger than RAM = disk I/O bottleneck.\n\n2. Sizing:\n   - Estimate from data + index size of hot collections.\n   - Provision RAM >= working set for best performance. Use compression to reduce effective size.\n\n3. Reducing Working Set:\n   - Improve indexing (covered queries, right indexes). Archive old data. Split hot/cold data.\n\n Key Points :\n\n- Monitor working set size relative to WiredTiger cache for performance tuning.\n\nIn summary, the working set should fit in RAM for optimal MongoDB performance.",
        tags: ["performance", "memory"],
        keyFeatures: [],
        actionWords: ["working set", "RAM", "cache"],
        codeExample: ""
    },
    {
        id: 63,
        topic: "mongo",
        question: "Explain WiredTiger storage engine internals?",
        answer: "WiredTiger is MongoDB's default storage engine, handling how data is stored and accessed.\n- Key aspects include <mark>B-tree indexes</mark>, <mark>document-level locking</mark>, and in-memory caching.\n- It provides compression, journaling, and checkpointing for durability.\n\n WiredTiger Internals :\n\n1. Data Structures:\n   - B-tree for indexes. Column-store for data (efficient compression). Copy-on-write for concurrency.\n\n2. Caching:\n   - In-memory cache (default 50% RAM). Eviction when full. Compression (snappy default) reduces I/O.\n\n3. Journaling:\n   - Write-ahead log for durability. Checkpoints every 60s.\n\n4. Locking:\n   - Document-level. No collection or database lock for normal operations.\n\n Key Points :\n\n- Compression options: snappy, zlib, or zstd for data and indexes.\n\nIn summary, WiredTiger provides document-level concurrency, compression, and durability.",
        tags: ["WiredTiger", "storage", "internals"],
        keyFeatures: [],
        actionWords: ["WiredTiger", "B-tree", "compression", "document-level lock"],
        codeExample: ""
    },
    {
        id: 64,
        topic: "mongo",
        question: "What authentication mechanisms does MongoDB support?",
        answer: "MongoDB supports multiple authentication mechanisms for securing database access.\n- <mark>SCRAM-SHA-256</mark> is the default for username/password authentication.\n- x.509 certificates, LDAP, and Kerberos are available for enterprise deployments.\n\n Authentication Mechanisms in MongoDB :\n\n1. SCRAM-SHA-256 (Default):\n   - Username/password. Challenge-response. Replaces SCRAM-SHA-1.\n\n2. x.509 Certificates:\n   - Mutual TLS for internal auth (server-server, client-server). Common in Atlas and production.\n\n3. LDAP:\n   - Enterprise. External directory for users.\n\n4. Kerberos:\n   - Enterprise. SSO integration.\n\n5. Atlas:\n   - Also supports OAuth (e.g., Azure AD, Okta).\n\n Key Points :\n\n- Choose authentication based on deployment type and security requirements.\n\nIn summary, MongoDB supports SCRAM, x.509, LDAP, Kerberos, and OAuth for authentication.",
        tags: ["security", "authentication"],
        keyFeatures: [],
        actionWords: ["SCRAM", "x.509", "LDAP"],
        codeExample: ""
    },
    {
        id: 65,
        topic: "mongo",
        question: "Explain Role-Based Access Control (RBAC) in MongoDB?",
        answer: "Role-Based Access Control (RBAC) in MongoDB assigns users to roles that grant privileges.\n- Users are assigned roles; roles grant <mark>privileges</mark> (actions on resources).\n- Principle of least privilege: create app-specific users with narrow roles.\n\n Purpose of RBAC in MongoDB :\n\n1. Built-in Roles:\n   - read, readWrite, dbAdmin, userAdmin, clusterAdmin, root. Prefer minimal role.\n\n2. Custom Roles:\n   - db.createRole with role, privileges (resource + actions), and roles array.\n\n3. Resources:\n   - Database, collection, cluster. Wildcard for multiple.\n\n Key Points :\n\n- Never use root in application. Create app-specific users with minimal required privileges.\n- Example: db.createUser({ user: \"app\", pwd: \"...\", roles: [{ role: \"readWrite\", db: \"mydb\" }] });\n\nIn summary, RBAC controls access by assigning roles and privileges to users.",
        tags: ["security", "rbac"],
        keyFeatures: [],
        actionWords: ["RBAC", "roles", "privileges"],
        codeExample: "db.createUser({ user: \"app\", pwd: \"...\", roles: [{ role: \"readWrite\", db: \"mydb\" }] });"
    },
    {
        id: 66,
        topic: "mongo",
        question: "Explain encryption in transit (TLS) in MongoDB?",
        answer: "Encryption in transit (TLS) protects data as it travels between client and server.\n- TLS encrypts data between client and server and between replica set and shard members.\n- It <mark>prevents eavesdropping and tampering</mark> during network transmission.\n\n Purpose of TLS in MongoDB :\n\n1. Setup:\n   - Configure net.tls with certificates. Clients use TLS in connection string (mongodb+srv or tls=true).\n\n2. Certificate Validation:\n   - Use CA-signed certs in production.\n   - tlsAllowInvalidCertificates for dev only—disables verification.\n\n3. Atlas:\n   - TLS by default. No extra config required.\n\n Key Points :\n\n- Separate from storage encryption (data at rest). TLS protects data in transit.\n\nIn summary, TLS encrypts data in transit for secure communication.",
        tags: ["security", "tls"],
        keyFeatures: [],
        actionWords: ["TLS", "encryption in transit"],
        codeExample: ""
    },
    {
        id: 67,
        topic: "mongo",
        question: "What is Client-Side Field-Level Encryption (CSFLE)?",
        answer: "Client-Side Field-Level Encryption (CSFLE) encrypts specific fields in the application before sending to MongoDB.\n- The database stores ciphertext; keys are managed by the app or KMS.\n- It <mark>protects against database compromise</mark>—data is useless without keys.\n\n Purpose of CSFLE :\n\n1. Use Case:\n   - PII, PCI data. Protects against DB compromise.\n\n2. How It Works:\n   - Driver uses explicit encryption (encrypt before insert) and auto decryption (decrypt on read).\n   - Schema maps fields to keys. Key Vault collection stores data keys; master key in KMS.\n\n3. Atlas:\n   - Supports Queryable Encryption (encrypt and query encrypted fields).\n\n Key Points :\n\n- CSFLE provides field-level protection even if the database is compromised.\n\nIn summary, CSFLE encrypts sensitive fields before they reach the database.",
        tags: ["security", "encryption"],
        keyFeatures: [],
        actionWords: ["CSFLE", "field-level encryption", "KMS"],
        codeExample: ""
    },
    {
        id: 68,
        topic: "mongo",
        question: "What are recommended backup strategies for MongoDB?",
        answer: "Recommended backup strategies for MongoDB depend on deployment size and requirements.\n- <mark>mongodump/mongorestore</mark> for logical backup. Filesystem snapshots for large DBs.\n- 3-2-1 rule: 3 copies, 2 media types, 1 offsite. Test restore regularly.\n\n Backup Strategies for MongoDB :\n\n1. mongodump/mongorestore:\n   - Logical backup. Good for small/medium DBs.\n   - Inconsistent during dump unless from secondary with --oplog for point-in-time.\n\n2. Filesystem Snapshot:\n   - Snapshot storage (LVM, EBS) while mongod is running. Fast for large DBs.\n   - Requires journal and replica set coordination for consistency.\n\n3. Oplog + Backup:\n   - Backup + oplog allows replay to any point in time. Replica set required.\n\n4. Atlas:\n   - Continuous backup with point-in-time recovery. Automated.\n\n Key Points :\n\n- Use 3-2-1 rule. Test restore regularly.\n\nIn summary, choose backup strategy based on size and recovery requirements; test restores.",
        tags: ["backup", "production"],
        keyFeatures: [],
        actionWords: ["mongodump", "snapshot", "oplog", "point-in-time"],
        codeExample: "mongodump --uri=\"mongodb://...\" --oplog -o /backup"
    },
    {
        id: 69,
        topic: "mongo",
        question: "How do you design an index strategy for a new collection?",
        answer: "Designing an index strategy for a new collection requires understanding query patterns and workload.\n- <mark>Identify query patterns</mark> first: filter, sort, projection. Optimize for the hot path.\n- Follow the ESR rule: Equality, then Sort, then Range.\n\n How to Design an Index Strategy :\n\n1. Identify Query Patterns:\n   - List all queries (filter, sort, projection). Optimize for hot path.\n\n2. Index Selectivity:\n   - Prefer high-cardinality fields first in compound index. Put equality before range.\n\n3. ESR Rule:\n   - Equality, then Sort, then Range. E.g., status, createdAt, amount.\n\n4. Avoid Over-Indexing:\n   - Each index slows writes. Typical: 3-10 indexes per collection. Use partial indexes for conditional queries.\n\n5. Covered Queries:\n   - Include projected fields in index when beneficial.\n\n6. Monitor:\n   - Use explain(), profiler, slow query log. Add or remove based on production workload.\n\n Key Points :\n\n- Index based on actual query patterns; monitor and adjust in production.\n\nIn summary, design indexes around query patterns, follow ESR, and avoid over-indexing.",
        tags: ["indexing", "production"],
        keyFeatures: [],
        actionWords: ["index strategy", "ESR", "selectivity"],
        codeExample: ""
    },
    {
        id: 70,
        topic: "mongo",
        question: "How do you handle high write load in MongoDB?",
        answer: "Handling high write load in MongoDB requires a combination of scaling, indexing, and configuration.\n- <mark>Vertical scaling</mark> and <mark>sharding</mark> are primary strategies.\n- Reduce index count, batch writes, and use appropriate write concern.\n\n How to Handle High Write Load :\n\n1. Vertical Scaling:\n   - More CPU, RAM, faster disk. Increase WiredTiger cache.\n\n2. Sharding:\n   - Distribute writes across shards. Choose shard key for write distribution—avoid monotonic keys.\n\n3. Reduce Index Count:\n   - Each index is updated on write. Drop unused indexes.\n\n4. Batch Writes:\n   - Use bulkWrite, insertMany. Fewer round-trips.\n\n5. Write Concern:\n   - w:1 is faster than w:majority. Use majority only when needed for durability.\n\n6. Connection Pooling:\n   - Reuse connections. Avoid one connection per request.\n\n7. Hardware:\n   - SSD, sufficient I/O. Check disk saturation.\n\n Key Points :\n\n- Combine vertical scaling, sharding, and write optimization for high write workloads.\n\nIn summary, handle high write load with scaling, indexing, batching, and configuration tuning.",
        tags: ["performance", "production"],
        keyFeatures: [],
        actionWords: ["write load", "sharding", "bulk writes"],
        codeExample: ""
    },
    {
        id: 71,
        topic: "mongo",
        question: "What are common MongoDB anti-patterns to avoid?",
        answer: "Common MongoDB anti-patterns can cause performance issues and operational problems.\n- <mark>Unbounded document growth</mark> and <mark>poor shard key</mark> choice are among the most impactful.\n- Avoid these patterns to maintain performance and scalability.\n\n Common Anti-Patterns to Avoid :\n\n1. Unbounded Document Growth:\n   - Arrays that grow forever (e.g., comments). Causes relocation, fragmentation. Use bucketing or separate collection.\n\n2. Bloating Documents:\n   - Embedding too much. Hits 16MB limit, slows reads. Normalize when appropriate.\n\n3. Not Indexing Query Predicates:\n   - Results in COLLSCAN. Always index filtered/sorted fields for hot queries.\n\n4. Poor Shard Key:\n   - Monotonic (timestamp, _id) = hotspot. Low cardinality = few chunks.\n\n5. Over-Indexing:\n   - Many indexes slow writes. Audit and remove unused.\n\n6. $lookup on Large Collections:\n   - Expensive. Denormalize or pre-join in application.\n\n7. No Connection Pooling:\n   - Connection per request exhausts connections.\n\n8. Ignoring Schema:\n   - \"Schema-less\" without validation leads to inconsistent data.\n\n Key Points :\n\n- Design for access patterns; validate schema at application level.\n\nIn summary, avoid unbounded growth, poor shard keys, over-indexing, and schema neglect.",
        tags: ["anti-patterns", "production"],
        keyFeatures: [],
        actionWords: ["anti-patterns", "unbounded growth", "shard key"],
        codeExample: ""
    }
];
