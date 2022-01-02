const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const params = url.parse(req.url, true).query;
  const { archivo, contenido, otro } = params;

  if (req.url.includes("/crear")) {
    fs.writeFile(`${archivo}.txt`, contenido, () => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Archivo creado con éxito", "utf-8");
      return res.end();
    });
  }

  if (req.url.includes("/leer")) {
    fs.readFile(`${archivo}.txt`, (err, data) => {
      if (err) return res.end("no se puede leer", null);
      return res.end(data, null);
    });
  }

  if (req.url.includes("/renombrar")) {
    fs.rename(`${archivo}.txt`, `${otro}.txt`, (err, data) => {
      if (err) return res.end("no se puede modificar", null);
      return res.end("modificado", null);
    });
  }

  if (req.url.includes("/eliminar")) {
    fs.unlink(`${archivo}.txt`, (err, data) => {
      if (err) {
        res.write("no se puede renombrar");
        return res.end();
      }
      res.write(`archivo ${archivo} eliminado.`);
      return res.end();
    });
  }
});

const puerto = 5000;
server.listen(puerto, () => console.log("servidor activo"));
