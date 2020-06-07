import express from 'express';
import indexRoute from './routes/index'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoute)
 
app.listen("3000", () => {
  return console.log(`server is listening on https://localhost:3000`);
});

