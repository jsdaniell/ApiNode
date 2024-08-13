const http = require('http');

const PORT = 3000;

const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api' && req.method === 'GET') {
        const response = { message: 'Hello, World!' }

        res.writeHead(200);
        res.end(JSON.stringify(response));
    } else if (req.url === "/api" && req.method === "POST") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const response = {
                message: 'Data received successfully',
                data: data,
                timestamp: new Date().toISOString()
            };

            res.writeHead(200);
            res.end(JSON.stringify(response));
        })
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not found' }));
    }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});