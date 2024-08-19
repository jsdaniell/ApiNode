const http = require('http');

const PORT = 3000;

const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.split("?")[0];

    if (url === '/api' && req.method === 'GET') {
        const cars = [
            { id: 1, brand: 'BMW', model: 'X5' },
            { id: 2, brand: 'Audi', model: 'Q7' },
            { id: 3, brand: 'Mercedes', model: 'GLE' }
        ]

        let idToFind = 1

        if(Boolean(req.url.split("?")[1])) {
            const idParam =req.url.split("?")[1];

            idToFind = Number(idParam.split("=")[1]);
        }

        const response = cars.find(car => car.id === idToFind);

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