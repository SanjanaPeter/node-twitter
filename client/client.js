import express from 'express';
import next from 'next';

const port   = parseInt(process.env.PORT, 10) || 3001;
const dev    = process.env.NODE_ENV === "production";
var app      = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
 
    const server = express();
 
    /** The byte threshold for the response body size before compression is considered for the response, defaults to 1kb **/
    server.use(compression({ threshold: 0 })); 
  
    //HOME-PAGE
    server.get("/", (req, res) => {
        const actualPage = '/index';
        const queryParams = {};
        return renderAndCache(req, res, actualPage, queryParams);
    });

    server.get("/signup", (req, res) => {
        const actualPage = '/signup';
        const queryParams = {};
        return renderAndCache(req, res, actualPage, queryParams);
    });

    server.get("/profile/:userId", (req, res) => {
        const actualPage = '/profile';
        const queryParams = {userId: req.params.userId};
        return renderAndCache(req, res, actualPage, queryParams);
    });


    server.get("*", (req, res) => {
        return handle(req, res);
    });
  
    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
  
});

async function renderAndCache(req, res, actualPage, queryParams) {
    try {
        const html = await app.renderToHTML(req, res, actualPage, queryParams);
        //const html = await app.render(req, res, actualPage, queryParams);
        res.send(html)
    } catch (err) {
        app.renderError(err, req, res, req.path, req.query)
    }
  }
  