import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();

//ROUTES
import routes from './routes/weatherRoute.js';
const PORT =5000;

routes(app);
const __dirname=path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"dist")));

app.listen(PORT,()=>{
    console.log("server started on port", PORT);
});

