import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
