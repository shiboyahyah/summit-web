const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 26070;
const routes = {
  "/": "index.html",
  "/home": "index.html",
  "/about": "about.html",
  "/teslaobby": "tesla-roadster-obby.html"
};
const redirects = {
  "/index.html": "/",
  "/home.html": "/",
  "/about.html": "/about",
  "/tesla-roadster-obby.html": "/teslaobby"
};
const mime = {".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".png":"image/webp", ".png":"image/png", ".svg":"image/svg+xml", ".ico":"image/x-icon", ".txt":"text/plain; charset=utf-8"};
function sendFile(file, res, status=200) {
  fs.readFile(file, (err, data) => {
    if (err) return send404(res);
    res.writeHead(status, {"Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream", "X-Content-Type-Options":"nosniff", "Cache-Control": path.extname(file)===".html" ? "no-cache" : "public, max-age=604800, immutable"});
    res.end(data);
  });
}
function send404(res) {
  fs.readFile(path.join(ROOT,"404.html"),(err,data)=>{
    res.writeHead(404,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff"});
    res.end(err ? "<!doctype html><title>404: Not found</title><h1>404: Not found</h1><a href='/'>Go back to home</a>" : data);
  });
}
http.createServer((req,res)=>{
  if(req.method!=="GET" && req.method!=="HEAD") {res.writeHead(405,{Allow:"GET, HEAD"});return res.end("Method not allowed");}
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname); } catch {res.writeHead(400);return res.end("Bad request");}
  if(redirects[pathname]) {res.writeHead(301,{Location:redirects[pathname]});return res.end();}
  let relative=routes[pathname];
  if(!relative && pathname.startsWith("/assets/")) relative=pathname.slice(1);
  if(!relative) return send404(res);
  const target=path.resolve(ROOT,relative);
  if(target!==ROOT && !target.startsWith(ROOT+path.sep)) {res.writeHead(403);return res.end("Forbidden");}
  sendFile(target,res);
}).listen(PORT,"0.0.0.0",()=>console.log(`Summit Interactive running on port ${PORT}`));
