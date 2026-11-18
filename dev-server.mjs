import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.pdf':'application/pdf','.csv':'text/csv; charset=utf-8','.json':'application/json','.md':'text/plain; charset=utf-8','.py':'text/plain','.sql':'text/plain','.zip':'application/zip'};
http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const path=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!path.startsWith(root+sep)){res.writeHead(403).end();return;}
    const bytes=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store'}).end(bytes);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Page not found');}
}).listen(4321,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4321'));
