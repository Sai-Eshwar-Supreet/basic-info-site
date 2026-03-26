const http = require('node:http');
const fs = require('fs/promises');

const routes = {
    '/' : './files/index.html',
    '/home' : './files/index.html',
    '/contact' : './files/contact-me.html',
    '/about' : './files/about.html',
};

function createServer(){
    const server = http.createServer( async (req, res) => {

        const errorFile = await fs.readFile('./files/404.html', {encoding: 'utf-8'});
        
        if(req.method !== 'GET'){
            res.writeHead(405);
            res.end('Method not allowed');
            return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);

        let pathname = url.pathname;

        pathname = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1): pathname

        const filePath = routes[pathname];


        if(!filePath){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(errorFile);
            return;
        }

        try{
            const file = await fs.readFile(filePath, {encoding: 'utf-8'});
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(file);
        }
        catch(e){
            res.writeHead(500);
            res.end('Internal server error');
        }
    });

    return server;
}

async function start(){
    const server = createServer();
    server.listen(8080);
}


start();