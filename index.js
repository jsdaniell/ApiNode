const http = require('http');

const PORT = 3000;

let cars = [
    { id: 1, brand: 'BMW', model: 'X5', cilinders: 6 },
    { id: 2, brand: 'Audi', model: 'Q7', cilinders: 4 },
    { id: 3, brand: 'Mercedes', model: 'GLE', cilinders: 6 },
]

const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.split("?")[0];

    if (url === '/cars' && req.method === 'GET') {
        let response;

        if(Boolean(req.url.split("?")[1])) {
            const idParam = req.url.split("?")[1];

            idToFind = Number(idParam.split("=")[1]);

            response = cars.find(car => car.id === idToFind);
        } else {
            response = cars;
        }
        
        res.writeHead(200);
        res.end(JSON.stringify(response));
    } else if (req.url === "/cars" && req.method === "POST") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            if(!data?.brand || !data?.model || !data?.cilinders) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Bad request' }));
                return;
            }

            const newCar = {
                id: cars.length + 1,
                brand: data.brand,
                model: data.model,
                cilinders: data.cilinders
            }

            cars.push(newCar);

            res.writeHead(201);
            res.end(JSON.stringify(newCar));
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