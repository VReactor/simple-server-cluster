const http = require('http');
const pid = process.pid;

const server = http.createServer((req, res) => {
    // Fake work
    for(let i = 0; i < 1e7; i++) {}

    res.end('Hello from Node.js! \n');
})
.listen(8800, () => {
    console.log(`Worker started. ${pid}`);
});

process.on('SIGINT', () => {
    console.log(`Signal is SIGINT. Pid: ${pid}`);

    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log(`Signal is SIGTERM. Pid: ${pid}`);

    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGUSR2', () => {
    console.log(`Signal is SIGUSR2. Pid: ${pid}`);

    server.close(() => {
        process.exit(1);
    });
});