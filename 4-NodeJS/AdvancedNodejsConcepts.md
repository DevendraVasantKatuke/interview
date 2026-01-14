### 1. Event Loop and Non-blocking I/O
The event loop is the heart of Node.js, allowing it to perform non-blocking I/O operations despite being single-threaded. Understanding its intricacies is crucial for optimizing application performance.

### Components:
	-	Call Stack: Executes synchronous code.
	-	Callback Queue: Holds callbacks waiting to be executed after their asynchronous operations complete.
	-	Event Loop: Checks if the call stack is empty, then fetches callbacks from the callback queue.

### Important Functions:
	-	process.nextTick(): Places callback in a separate queue, which runs before the next event loop cycle.
	-	setImmediate(): Queues callback to be executed in the next event loop cycle.

### Example:
```
const fs = require('fs');
const crypto = require('crypto');

console.log('Start');

// Microtask queue (nextTick)
process.nextTick(() => console.log('Next Tick 1'));

// Timer queue
setTimeout(() => console.log('Timeout 1'), 0);

// I/O queue
fs.readFile('file.txt', () => {
    console.log('File Read');
    
    // Nested nextTick and setImmediate
    process.nextTick(() => console.log('Next Tick 2'));
    setImmediate(() => console.log('Immediate 1'));
});

// Check queue (setImmediate)
setImmediate(() => console.log('Immediate 2'));

// Close queue
process.on('exit', () => console.log('Exit'));

// Expensive synchronous operation
crypto.pbkdf2Sync('password', 'salt', 100000, 512, 'sha512');
console.log('Crypto');

process.nextTick(() => console.log('Next Tick 3'));

console.log('End');
```
This example demonstrates the complex interplay between different types of operations and how they’re scheduled in the event loop. Understanding this order of execution is crucial for writing efficient Node.js applications.

### 2. Buffers and TypedArrays
Buffers are raw memory allocations outside V8’s heap, crucial for handling binary data efficiently.

### Buffer Operations:
```
// Creating a buffer
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.from([1, 2, 3]);
const buf3 = Buffer.from('Hello', 'utf8');

// Writing to a buffer
buf1.write('Hello');
console.log(buf1.toString()); // 'Hello\0\0\0\0\0'

// Reading from a buffer
console.log(buf2.readUInt8(1)); // 2

// Buffer slicing (creates a view, not a copy)
const slice = buf3.slice(0, 2);
slice[0] = 74; // 'J'
console.log(buf3.toString()); // 'Jello'

// Buffer copying
const bufCopy = Buffer.alloc(5);
buf3.copy(bufCopy);
console.log(bufCopy.toString()); // 'Jello'

// Using TypedArrays with Buffers
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf4 = Buffer.from(arr.buffer);
console.log(buf4); // <Buffer 88 13 A0 0F>

// Reverse with TypedArray
const numbers = new Uint32Array(buf4.buffer);
console.log(numbers); // Uint32Array [ 5000, 4000 ]
```
This example showcases advanced buffer operations, including slicing, copying, and interoperability with TypedArrays, which are crucial for high-performance data processing in Node.js.

### 3. Streams
Streams are powerful abstractions for handling data flow, especially when working with large datasets.

### Stream Example:
```
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

// Custom Transform stream for encryption
class Encrypt extends require('stream').Transform {
    constructor(key, iv) {
        super();
        this.cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    }

    _transform(chunk, encoding, callback) {
        this.push(this.cipher.update(chunk));
        callback();
    }

    _flush(callback) {
        this.push(this.cipher.final());
        callback();
    }
}

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Chaining multiple streams
fs.createReadStream('large_file.txt')
    .pipe(zlib.createGzip())
    .pipe(new Encrypt(key, iv))
    .pipe(fs.createWriteStream('large_file.txt.gz.enc'))
    .on('finish', () => console.log('File processed successfully'))
    .on('error', (err) => console.error('An error occurred:', err));4. Advanced Error Handling
```
Proper error handling is crucial for building robust Node.js applications. Here’s an advanced approach to centralized error handling:
```
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const handleError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Usage in Express.js
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    handleError(err, res);
});

// Example route
app.get('/api/item/:id', (req, res, next) => {
    if (req.params.id === '0') {
        return next(new AppError('Item not found', 404));
    }
    res.json({ id: req.params.id, name: 'Sample Item' });
});
```
This setup provides a centralized error handling mechanism, distinguishing between operational errors (which can be handled gracefully) and programming errors (which require immediate attention).

### 5. Clusters and Worker Threads
For CPU-intensive tasks, leveraging multiple cores is crucial. Node.js offers two main ways to do this: Clusters and Worker Threads.

### Cluster Example:
```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // Replace the dead worker
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}`);

        // Simulate CPU work
        let i = 1e7; while(i--) {}
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}
```
### Worker Threads for CPU-Intensive Tasks:
```
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // This code is executed in the main thread

    // Create a worker
    const worker = new Worker(__filename, {
        workerData: { start: 0, end: 1000000000 }
    });

    // Listen for messages from the worker
    worker.on('message', (result) => {
        console.log('Sum is:', result);
    });

    worker.on('error', (error) => {
        console.error(error);
    });

    worker.on('exit', (code) => {
        if (code !== 0)
            console.error(new Error(`Worker stopped with exit code ${code}`));
    });

} else {
    // This code is executed in the worker thread

    const { start, end } = workerData;
    let sum = 0;
    for (let i = start; i < end; i++) {
        sum += i;
    }

    // Send the result back to the main thread
    parentPort.postMessage(sum);
}
```
These examples demonstrate how to use clusters to distribute incoming connections across multiple processes, and how to use worker threads for CPU-intensive tasks without blocking the event loop.

### 6. Advanced Asynchronous Patterns
While Promises and async/await are fundamental, there are more advanced patterns for handling complex asynchronous scenarios.

### Parallel Execution with Promise.all and Promise.allSettled:
```
const fetch = require('node-fetch');

const urls = [
    'https://api.github.com/users/github',
    'https://api.github.com/users/microsoft',
    'https://api.github.com/users/google',
    'https://api.github.com/users/nonexistent'
];

// Promise.all (fails if any promise rejects)
Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(results => console.log('All succeeded:', results))
    .catch(error => console.error('At least one failed:', error));

// Promise.allSettled (handles both fulfilled and rejected promises)
Promise.allSettled(urls.map(url => fetch(url).then(res => res.json())))
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`${urls[index]}: ${result.value.name}`);
            } else {
                console.log(`${urls[index]}: ${result.reason}`);
            }
        });
    });
```
### Advanced Error Handling with async/await:
```
const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch user data: ${error.message}`);
        throw error; // Re-throw for further handling
    }
};

const processUserData = async (userId) => {
    try {
        const userData = await fetchUserData(userId);
        // Process user data...
    } catch (error) {
        if (error instanceof NetworkError) {
            // Handle network errors
        } else if (error instanceof ValidationError) {
            // Handle validation errors
        } else {
            // Handle other types of errors
        }
    }
};
```
These examples showcase advanced asynchronous patterns, including parallel execution and sophisticated error handling strategies.


## Advanced Node.js Examples: Deep Dives for Senior Engineers
### 1. Custom Stream Implementation with Backpressure Handling
This example demonstrates how to create a custom Readable stream that generates large amounts of data, and a custom Writable stream that processes this data with proper backpressure handling.
```
const { Readable, Writable } = require('stream');

class LargeDataSource extends Readable {
    constructor(options) {
        super(options);
        this.dataSize = 10000000; // 10 million items
        this.currentIndex = 0;
    }

    _read(size) {
        if (this.currentIndex >= this.dataSize) {
            this.push(null); // End of data
            return;
        }

        const chunk = [];
        for (let i = 0; i < size && this.currentIndex < this.dataSize; i++, this.currentIndex++) {
            chunk.push(Math.random());
        }

        const pushOk = this.push(Buffer.from(new Float64Array(chunk).buffer));

        if (!pushOk) {
            console.log('Backpressure applied, waiting...');
        }
    }
}

class DataProcessor extends Writable {
    constructor(options) {
        super(options);
        this.processedCount = 0;
    }

    _write(chunk, encoding, callback) {
        // Simulate processing delay
        setTimeout(() => {
            const data = new Float64Array(chunk.buffer);
            this.processedCount += data.length;
            console.log(`Processed ${this.processedCount} items`);
            callback();
        }, 10);
    }
}

const source = new LargeDataSource();
const processor = new DataProcessor();

source.pipe(processor)
    .on('finish', () => console.log('Processing complete'));
```
This example showcases:
	-	Custom implementation of Readable and Writable streams
	-	Handling of backpressure in data generation and processing
	-	Efficient binary data handling using TypedArrays and Buffers

### 2. Advanced Clustering with Zero-Downtime Reloads
This example demonstrates how to implement a cluster with zero-downtime reloads, useful for deploying updates without interrupting service.
```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    let reloadingWorkers = false;

    // Zero-downtime reload function
    function reloadWorkers() {
        if (reloadingWorkers) return;
        reloadingWorkers = true;
        console.log('Reloading workers...');

        const workerIds = Object.keys(cluster.workers);
        
        function reloadNextWorker(i) {
            if (i >= workerIds.length) {
                reloadingWorkers = false;
                console.log('All workers reloaded');
                return;
            }

            const worker = cluster.workers[workerIds[i]];
            console.log(`Reloading worker ${worker.process.pid}`);

            worker.on('exit', () => {
                if (!worker.exitedAfterDisconnect) return;
                const newWorker = cluster.fork();
                newWorker.on('listening', () => {
                    reloadNextWorker(i + 1);
                });
            });

            worker.disconnect();
        }

        reloadNextWorker(0);
    }

    // Reload workers every 30 seconds
    setInterval(reloadWorkers, 30000);

    cluster.on('exit', (worker, code, signal) => {
        if (!worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        }
    });
} else {
    // Workers can share any TCP connection
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from worker ${process.pid}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}
```
This example showcases:
	-	Advanced cluster management
	-	Zero-downtime reloads of worker processes
	-	Graceful shutdown and restart of workers

### 3. Custom Promise Implementation with Cancellation Support
This example demonstrates how to create a custom Promise implementation that supports cancellation, a feature not available in native Promises.
```
class CancellablePromise {
    constructor(executor) {
        this.promise = new Promise((resolve, reject) => {
            this.cancel = this.cancel.bind(this);
            this._reject = reject;

            executor(
                (value) => {
                    if (!this.isCancelled) resolve(value);
                },
                (reason) => {
                    if (!this.isCancelled) reject(reason);
                }
            );
        });
    }

    then(onFulfilled, onRejected) {
        return this.promise.then(onFulfilled, onRejected);
    }

    catch(onRejected) {
        return this.promise.catch(onRejected);
    }

    cancel(reason = 'Promise cancelled') {
        if (!this.isCancelled) {
            this.isCancelled = true;
            this._reject(new Error(reason));
        }
    }

    static all(promises) {
        const cancellablePromises = promises.map(p => 
            p instanceof CancellablePromise ? p : CancellablePromise.resolve(p)
        );
        const allPromise = Promise.all(cancellablePromises);

        return new CancellablePromise((resolve, reject) => {
            allPromise.then(resolve, reject);
        });
    }

    static resolve(value) {
        return new CancellablePromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new CancellablePromise((_, reject) => reject(reason));
    }
}

// Usage example
const delay = (ms) => new CancellablePromise(resolve => setTimeout(resolve, ms));

const task1 = delay(2000).then(() => console.log('Task 1 completed'));
const task2 = delay(3000).then(() => console.log('Task 2 completed'));

const allTasks = CancellablePromise.all([task1, task2]);

allTasks.then(() => console.log('All tasks completed'))
        .catch(error => console.error(error.message));

// Cancel after 1 second
setTimeout(() => allTasks.cancel(), 1000);
```
This example showcases:
	-	Custom Promise implementation
	-	Cancellation support for asynchronous operations
	-	Advanced Promise composition with all method

### 4. Memory-Efficient Processing of Large Datasets using Generators
This example demonstrates how to process large datasets efficiently using generators, without loading the entire dataset into memory.
```
const fs = require('fs');
const readline = require('readline');

function* processLargeFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Process each line
        yield line;
    }
}

async function analyzeData(filePath) {
    let count = 0;
    let sum = 0;

    for await (const line of processLargeFile(filePath)) {
        const value = parseFloat(line);
        if (!isNaN(value)) {
            count++;
            sum += value;
        }
    }

    return { count, average: sum / count };
}

// Usage
(async () => {
    try {
        const result = await analyzeData('very_large_dataset.txt');
        console.log(`Processed ${result.count} items`);
        console.log(`Average value: ${result.average}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```
This example showcases:
	-	Use of generators for memory-efficient data processing
	-	Asynchronous iteration over large datasets
	-	Combining generators with async/await for clean, efficient code

### 5. Advanced Error Handling with Domain Module (Deprecated but Instructive)
While the Domain module is deprecated, understanding its concept is valuable for error handling in complex applications. This example demonstrates its use and provides a modern alternative.
```
const domain = require('domain');
const fs = require('fs');

// Using Domain (deprecated, but instructive)
function legacyReadFileWithDomain(path, callback) {
    const d = domain.create();

    d.on('error', (err) => {
        console.error('Domain caught error:', err);
        callback(err);
    });

    d.run(() => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err; // This error will be caught by the domain
            callback(null, data);
        });
    });
}

// Modern approach using async/await and a custom error boundary
async function readFileWithErrorBoundary(path) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            try {
                const data = fs.readFileSync(path, 'utf8');
                resolve(data);
            } catch (error) {
                console.error('Error boundary caught:', error);
                reject(error);
            }
        });
    });
}

// Usage
console.log('Using deprecated Domain:');
legacyReadFileWithDomain('nonexistent.txt', (err, data) => {
    if (err) console.log('Error handled in callback');
    else console.log('File content:', data);
});

console.log('\nUsing modern error boundary:');
readFileWithErrorBoundary('nonexistent.txt')
    .then(data => console.log('File content:', data))
    .catch(err => console.log('Error handled in catch'));
```
This example showcases:
	-	Use of the deprecated Domain module for error handling
	-	A modern alternative using async/await and custom error boundaries
	-	Comparison between legacy and modern error handling approaches

These advanced examples provide deep dives into complex Node.js concepts and techniques, offering valuable learning opportunities for senior engineers.
