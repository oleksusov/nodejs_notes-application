import express from 'express';
import bodyParser from 'body-parser';
import notesRouter from './routes/notes';

const app = express();
app.use(bodyParser.json());

app.use('/api', notesRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
