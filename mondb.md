# What is MongoDB?
- MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON)
- It is designed for scalability, high performance, and ease of development.

# What are the key features of MongoDB?
- **Schema-less**: MongoDB collections do not enforce a schema, allowing for flexible and dynamic data models.
- **Document-Oriented**: Data is stored in BSON format, which is similar to JSON.
- **Scalability**: Supports horizontal scaling through sharding.
- **Indexing**: Supports various types of indexes to improve query performance.
- **Aggregation**: Provides powerful aggregation framework for data processing and analysis.
- **Replication**: Supports replica sets for high availability and data redundancy.

# BSON in MongoDB
- BSON is a binary representation of JSON-like documents. This makes it more efficient for storage and transmission.
- BSON supports more data types than JSON, including:
    - int32 and int64 for integers
    - double for floating-point numbers
    - string for text
    - boolean for true/false values
    - date for date and time
    - binary for binary data
    - objectId for unique identifiers
    - array for arrays
    - null for null values
    - regex for regular expressions
- BSON is designed to be efficient to encode and decode, making it suitable for high-performance applications.
- BSON documents are traversable, meaning that the encoded data can be easily navigated and manipulated.  

# Aggregation
- MongoDB provides a powerful aggregation framework that allows you to process and analyze data in a collection.
-  The aggregation framework uses a pipeline approach, where documents pass through a series of stages that transform and aggregate the data. 

## Common Aggregation Operators
```
//dummy data

[
  { "_id": 1, "product": "Laptop", "quantity": 2, "price": 1000, "status": "A", "tags": ["electronics", "computer"] },
  { "_id": 2, "product": "Phone", "quantity": 5, "price": 500, "status": "B", "tags": ["electronics", "mobile"] },
  { "_id": 3, "product": "Tablet", "quantity": 3, "price": 300, "status": "A", "tags": ["electronics", "tablet"] },
  { "_id": 4, "product": "Monitor", "quantity": 4, "price": 200, "status": "C", "tags": ["electronics", "display"] },
  { "_id": 5, "product": "Keyboard", "quantity": 10, "price": 50, "status": "A", "tags": ["electronics", "accessory"] }
]
```

### 1. $match
- Filters the documents to pass only those that match the specified condition(s).
```
db.collection.aggregate([
  { $match: { status: 'A' } }
]);
```

### 2. $group
- Use the $group operator to group orders by status and calculate the total quantity for each status.
```
db.orders.aggregate([
  { $group: { _id: '$status', totalQuantity: { $sum: '$quantity' } } }
]);
```

### 3. $project
- Use the $project operator to project the product name and calculate the total price (quantity * price) for each order.
```
db.orders.aggregate([
  { $project: { product: 1, totalPrice: { $multiply: ['$quantity', '$price'] } } }
]);
```
### 4. $sort
- Use the $sort operator to sort orders by price in descending order.
```
db.orders.aggregate([
  { $sort: { price: -1 } }
]);
```

### 5. $limit
- Use the $limit operator to limit the number of orders to 3.
```
db.orders.aggregate([
  { $limit: 3 }
]);
```

### $skip
- Use the $skip operator to skip the first 2 orders.
```
db.orders.aggregate([
  { $skip: 2 }
]);
```

### 8 Unwind
- Deconstructs an array field from the input documents to output a document for each element.
```
db.orders.aggregate([
  { $unwind: '$tags' }
]);
```

### 8 Lookup
- Assume we have another collection named products with additional product details
-  Use the $lookup operator to join the orders collection with the products collection.
```
db.orders.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: 'product',
      foreignField: 'name',
      as: 'productDetails'
    }
  }
]);
```
### 9 $addFields
- Use the $addFields operator to add a new field discountedPrice which is 90% of the original price.
```
db.orders.aggregate([
  { $match: { status: 'A' } },
  { $count: 'totalOrders' }
]);
```

### 10 $count
- Use the $count operator to count the number of orders with status 'A'.

```
db.orders.aggregate([
  { $match: { status: 'A' } },
  { $count: 'totalOrders' }
]);
```

#  Update Operators in MongoDB
updateOne, updateMany, and findOneAndUpdate are update methods

## $set
The $set operator is used to update the value of a field in a document. If the field does not exist, it will be created.
```
db.collection.updateOne(
  { _id: 1 },
  { $set: { name: 'John Doe', age: 30 } }
);
```

## $unset
The $unset operator is used to remove a field from a document.
```
db.collection.updateOne(
  { _id: 1 },
  { $unset: { age: '' } }
);
```
## $increment
The $inc operator is used to increment (or decrement) the value of a field by a specified amount.
```
db.collection.updateOne(
  { _id: 1 },
  { $inc: { age: 1 } }
);
```
## $push
The $push operator is used to add an element to an array field.
```
db.collection.updateOne(
  { _id: 1 },
  { $push: { tags: 'newTag' } }
);
```

## $pull
he $pull operator is used to remove all instances of a value from an array field.
```
db.collection.updateOne(
  { _id: 1 },
  { $pull: { tags: 'oldTag' } }
);
```
## $addToSet
The $addToSet operator is used to add an element to an array field only if it does not already exist in the array.
```
db.collection.updateOne(
  { _id: 1 },
  { $addToSet: { tags: 'uniqueTag' } }
);
```

## $rename
The $rename operator is used to rename a field.
```
db.collection.updateOne(
  { _id: 1 },
  { $rename: { oldName: 'newName' } }
);
```

## mul
The $mul operator is used to multiply the value of a field by a specified amount
```
db.collection.updateOne(
  { _id: 1 },
  { $mul: { price: 1.1 } } // Increase price by 10%
);
```

## $min
The $min operator is used to update the value of a field if the specified value is less than the current value of the field.
```
db.collection.updateOne(
  { _id: 1 },
  { $min: { age: 18 } }
);
```

## $max

The $max operator is used to update the value of a field if the specified value is greater than the current value of the field.
```
db.collection.updateOne(
  { _id: 1 },
  { $max: { age: 65 } }
);
```

# Indexing
- Indexing in MongoDB is a powerful feature that allows you to improve the performance of your queries.
- Indexes support the efficient execution of queries by providing quick access to documents in a collection. 
- Without indexes, MongoDB must perform a collection scan, which can be slow for large datasets.
- Index does is that it stores a small part of the data set in a form that is easy to traverse.
- The index stores the value of the specific field or set of fields, ordered by the value of the field as specified in the index. 

## Single Field Index
```
//specifies ascending order. Use -1 for descending order.
db.collection.createIndex({ fieldName: 1 });
```

## Compound Index
```
//Indexes field1 in ascending order and field2 in descending order.
db.collection.createIndex({ field1: 1, field2: -1 });
```

## Multikey Index
Indexes each element of the array arrayField.
```
db.collection.createIndex({ arrayField: 1 });
```

## Text Index
```
//Supports text search on the fieldName.
db.collection.createIndex({ fieldName: "text" });
```

## Geospatial Index
```
//Supports geospatial queries on the location field.
db.collection.createIndex({ location: "2dsphere" });
```
## Hashed Index
```
//Indexes the hash of the value of fieldName.
db.collection.createIndex({ fieldName: "hashed" });
```

## Index Management
```
//To list all indexes on a collection, use the getIndexes method.
db.employees.getIndexes();

//To drop an index, use the dropIndex method.
db.employees.dropIndex("indexName");

//To drop all indexes on a collection, use the dropIndexes method.
db.employees.dropIndexes();
```

# Optimizing the performance of MongoDB queries 
Optimizing the performance of MongoDB queries involves several strategies, including proper indexing, query optimization, and efficient schema design. Here are some key techniques to optimize your MongoDB queries:

## 1. Indexing
Indexes are crucial for improving query performance. They allow MongoDB to quickly locate documents without scanning the entire collection.

Identify fields that are frequently used in queries and create indexes on those fields.

###  Use Covered Queries: 
Ensure that your queries can be satisfied using indexes alone, without needing to read the actual documents.
```
db.collection.createIndex({ field1: 1, field2: 1 });
db.collection.find({ field1: value }, { field2: 1, _id: 0 });
```
## 2. Query Optimization
### Use Projections: 
Retrieve only the fields you need, rather than the entire document.
```
db.collection.find({ field: value }, { field1: 1, field2: 1 });
```
### Limit and Skip:,
Use limit and skip to paginate results and reduce the amount of data processed.
```
db.collection.find({ field: value }).skip(10).limit(10);
```

### Avoid $where: 
Avoid using the $where operator, as it executes JavaScript code and can be slow.

## 3. Schema Design  Todo
### Embed vs. Reference:
Choose between embedding documents and referencing them based on your access patterns.

Embedding is generally faster for read operations, while referencing can be more efficient for write operations.

### Denormalization
Consider denormalizing your schema to reduce the number of joins and lookups required.

## 4. Monitoring and Analysis
### Use Explain: 
Use the explain method to analyze query performance and understand how MongoDB executes your queries.
```
db.collection.find({ field: value }).explain("executionStats");
```
### Profile Slow Queries: 
Use the MongoDB profiler to identify and analyze slow queries.
```
db.setProfilingLevel(1); // Enable profiling
db.system.profile.find({ millis: { $gt: 100 } }); // Find queries that took longer than 100ms
```

### 5. Caching
Cache frequently accessed data in memory or use an external caching layer like Redis to reduce the load on MongoDB.


# Advantages and advantages MongoDB
MongoDB offers many advantages, including schema flexibility, scalability, high performance, and a rich query language. However, it also has some disadvantages, such as memory usage, data consistency, and complexity of sharding. Understanding these pros and cons can help you determine whether MongoDB is the right choice for your specific use case and requirements.

## Advantages of MongoDB
### 1 Schema Flexibility:
MongoDB is a schema-less NoSQL database, which means you can store documents without having to define the structure of the documents in advance. This flexibility allows for easy and rapid development.

### Scalability:
MongoDB supports horizontal scaling through sharding. Sharding distributes data across multiple servers, allowing the database to handle large amounts of data and high throughput

### High Performance:

MongoDB is designed for high performance, with features like in-memory storage, efficient indexing, and support for complex queries. It can handle large volumes of read and write operations efficiently.


### Rich Query Language:

MongoDB provides a powerful and flexible query language that supports a wide range of operations, including filtering, sorting, aggregations, and geospatial queries

### Document-Oriented Storage:

Data is stored in BSON (Binary JSON) format, which allows for complex data structures and nested documents. This makes it easy to model real-world entities and relationships.

### Built-in Replication:

MongoDB supports replica sets, which provide high availability and data redundancy. Replica sets automatically replicate data across multiple nodes, ensuring data durability and fault tolerance.

### Ease of Use:

MongoDB has a simple and intuitive API, making it easy to learn and use. It also has extensive documentation and a large community, providing ample resources for developers.

### Aggregation Framework:

MongoDB's aggregation framework allows for complex data processing and transformation operations, similar to SQL's GROUP BY and JOIN operations.

## Disadvantages of MongoD

### Memory Usage:

MongoDB can be memory-intensive, especially when dealing with large datasets. It keeps frequently accessed data in memory to improve performance, which can lead to high memory consumption.

### Data Consistency:

MongoDB uses eventual consistency by default, which means that data may not be immediately consistent across all nodes. This can be a disadvantage for applications that require strong consistency.

### Limited Transaction Support:

While MongoDB supports multi-document transactions, its transaction capabilities are not as mature as those of traditional relational databases. Transactions can also impact performance

### Complexity of Sharding:

Sharding can add complexity to the database architecture and management. Properly configuring and maintaining a sharded cluster requires careful planning and expertise.

### Indexing Limitations:

MongoDB has limitations on the number and size of indexes. Creating too many indexes or large indexes can impact write performance and increase storage requirements.

### Lack of Joins:

MongoDB does not support traditional SQL-style joins. While it provides alternatives like embedding documents and using the $lookup aggregation stage, these can be less efficient and more complex to manage.

### Backup and Restore:

Backup and restore operations in MongoDB can be more complex and time-consuming compared to traditional relational databases. This is especially true for large datasets and sharded clusters.

### Tooling and Ecosystem:

While MongoDB has a growing ecosystem of tools and integrations, it may not be as extensive as that of traditional relational databases. Some advanced features and tools available in relational databases may be lacking or less mature in MongoDB.

# MongoDB $lookup vs Mongoose populate
- Mongoose's populate() method does not use MongoDB's $lookup behind the scenes. It simply makes another query to the database.
- Mongoose does not have functionalities that MongoDB does not have. populate() just makes two or more queries.

# What is the composition of Objecld?
- Timestamp
- Client machine ID
- Client process ID
- 3 byte incremented counter

# Text Search Operators in MongoDB
- MongoDB provides powerful text search capabilities that allow you to perform full-text search queries on string content.
- To use text search, you need to create a text index on the fields you want to search.

## Belowe are some common text search operators in MongoDB:
### 1. $text
- The $text operator performs a text search on the content of the fields indexed with a text inde
-  It returns documents that match the search criteria.
```
db.collection.createIndex({ description: "text" });

db.collection.find({ $text: { $search: "coffee" } });
```

### 2. $search
- The $search operator is used within the $text operator to specify the search string.
```
db.collection.find({ $text: { $search: "coffee" } });
```
### 3. $language
- The $language operator specifies the language for the text search. If not specified, the default language is used.

```
db.collection.find({ $text: { $search: "coffee", $language: "en" } });
```

### 4. $caseSensitive
The $caseSensitive operator specifies whether the search should be case-sensitive. The default is false.

```
db.collection.find({ $text: { $search: "Coffee", $caseSensitive: true } });
```


### 5. $diacriticSensitive
The $diacriticSensitive operator specifies whether the search should be diacritic-sensitive. The default is false.

```
db.collection.find({ $text: { $search: "café", $diacriticSensitive: true } });
```


### 6 $meta
The $meta operator can be used to project the text search score in the result documents. This is useful for sorting the results by relevance.

```
db.collection.find(
  { $text: { $search: "coffee" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```


### Practical

```
[
  { "_id": 1, "name": "Coffee Maker", "description": "Brews the best coffee" },
  { "_id": 2, "name": "Tea Kettle", "description": "Boils water for tea" },
  { "_id": 3, "name": "Espresso Machine", "description": "Makes espresso and coffee" },
  { "_id": 4, "name": "Coffee Grinder", "description": "Grinds coffee beans" }
]

```

# When to use and don't use MongoDB?
## Use MongoDB When:
- You need a flexible schema.
- Your application has a high write load.
- You require horizontal scalability.
- You need to store and query geospatial data.
- Your application deals with complex data structures.
- You need to rapidly prototype and iterate.

## Avoid MongoDB When:
- Your application requires complex, multi-document transactions.
- You have a fixed schema that does not change.
- Your application has a low write load but requires complex read queries.
- You have memory constraints.
- Your application requires strong consistency guarantees.
- You need to perform complex joins frequently.

# Common Backup and Disaster Recovery Strategies for MongoDB
- **Mongodump and Mongorestore**: Use for creating and restoring binary backups.
- **MongoDB Atlas Backup**: Automated, continuous backups with point-in-time recovery.
- **File System Snapshots**: Use storage solution snapshots for consistent backups.
- **Replica Sets**: Provide high availability and data redundancy.
- **Oplog Backup**: Include the oplog in backups for point-in-time recovery.
- **Continuous Backup Solutions**: Use third-party solutions for real-time backup and recovery.
- **Disaster Recovery Planning**: Develop and regularly update a comprehensive disaster recovery plan.

# Find Vs FindOne
- find() returns a cursor whereas findOne() returns the exact document.
- It is faster to use find() + limit() because findOne() will always read + return the document if it exists.
- find() just returns a cursor (or not) and only reads the data if you iterate through the cursor.
- find() has a cursor and hence you can use explain() with your query in the mongo shell to see the winning plan and other details on the execution of your query.

# Transactions
-MongoDB supports multi-document transactions, which allow you to perform multiple operations across one or more documents as a single, atomic operation.
- This ensures that either all operations in the transaction are committed or none are, maintaining data consistency.

## Key Features of Transactions

### 1.Atomicity: 
All operations within a transaction are atomic, meaning they either all succeed or all fail.

### 2. Consistency: 
Transactions ensure that the database remains in a consistent state.

### 3. Isolation:
Transactions are isolated from each other, preventing concurrent transactions from interfering.

### 4. Durability: 
Once a transaction is committed, the changes are durable and will survive system failures.

```
const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const session = client.startSession();

    session.startTransaction();

    try {
      // Perform operations within the transaction
      await db.collection('users').updateOne({ _id: 1 }, { $set: { name: 'John Doe' } }, { session });
      await db.collection('orders').insertOne({ userId: 1, product: 'Laptop', quantity: 1 }, { session });

      // Commit the transaction
      await session.commitTransaction();
      console.log('Transaction committed.');
    } catch (error) {
      // Abort the transaction in case of an error
      await session.abortTransaction();
      console.error('Transaction aborted due to an error:', error);
    } finally {
      // End the session
      session.endSession();
    }
  } finally {
    await client.close();
  }
}

run().catch(console.error);
```
# Cursors in MongoDB
 In MongoDB, a cursor is an object that allows you to iterate over the results of a query.

 When you perform a query using methods like find, MongoDB returns a cursor to the result set, which you can then use to access the documents one by one or in batches.

- **Iteration**: Cursors allow you to iterate over the result set of a query.
- **Batch Processing**: Fetch documents in batches to reduce round trips to the server.
- **Lazy Evaluation**: Fetch documents as needed to improve performance for large result sets.
- **Methods**: Use methods like forEach, toArray, next, hasNext, limit, skip, and sort to control
and manipulate the result set.

# Oplog
- The oplog (operations log) is a special capped collection in MongoDB that keeps a rolling record of all operations that modify the data stored in your databases
- It is an essential component for replication in MongoDB, enabling replica sets to maintain data consistency across multiple nodes.

- **Replication**: The oplog is used to replicate data changes from the primary node to secondary nodes in a replica set.
- **Rolling Log**: The oplog is a capped collection, meaning it has a fixed size and operates in a circular fashion, overwriting the oldest entries when it reaches its size limit.
- **Operation Types**: The oplog records various types of operations, including inserts, updates, deletes, and commands.
- **Timestamps**: Each entry in the oplog includes a timestamp, which helps in maintaining the order of operations and supports point-in-time recovery.

# Capped Collection 
Capped collections are a special type of collection in MongoDB that have a fixed size and maintain insertion order.

They are designed to provide high-throughput operations with minimal maintenance, making them ideal for use cases like logging, caching, and real-time data feeds.

Ideal for logging, caching, and real-time data feeds.

### Fixed Size: 
Capped collections have a fixed size and automatically overwrite the oldest documents when the size limit is reached.

### Insertion Order:
Documents are stored and maintained in the order they are inserted.

### High Performance: 
Optimized for high-throughput insert operations.

### No Deletions: 
Documents cannot be deleted; they are only removed when overwritten.

### Use Cases:
Ideal for logging, caching, and real-time data feeds.

```
db.createCollection('logs', {
      capped: true,
      size: 1048576 // 1MB
    });
```

# time-to-live (TTL) indexes in MongoDB
Time-to-Live (TTL) indexes in MongoDB are a special type of index that allows you to automatically delete documents from a collection after a specified period of time.

This is particularly useful for managing data that is only relevant for a certain period, such as session data, logs, or temporary data.

```
// Create a TTL index on the 'createdAt' field with an expiration time of 3600 seconds (1 hour)
await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

# horizontal and vertical scaling
### Vertical Scaling: 
Involves adding more resources to a single server. It is simpler but has physical and cost limitations.
### Horizontal Scaling:
Involves adding more servers to distribute the load. It is more scalable and cost-effective but more complex to manage.
### Use Cases:
Vertical scaling is suitable for moderate growth and simplicity, while horizontal scaling is ideal for large datasets, high traffic, and high availability requirements.

# Replica Set in
# sharding
# GridFS in MongoDB
# MaP Reduce
# MongoDB WiredTiger cache
# handle schema changes
# journaling in MongoDB.
# enable auditing in MongoDB
# change streams in MongoDB 
# geospatial indexes
# point-in-time recovery in MongoDB 
# Write Concern 
# What are Geospatial Indexes in MongoDB?



### 

```

```
