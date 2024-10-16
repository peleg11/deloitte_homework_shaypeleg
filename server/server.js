import express from 'express';
import cors from 'cors';
import { Users } from './users.js';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  const { q } = req.query;

  const keys = ['name', 'work_title'];

  const search = data => {
    return data.filter(item =>
      keys.some(key => item[key].toLowerCase().includes(q.toLowerCase()))
    );
  };

  res.json(search(Users));
});

app.listen(8080, () => {
  console.log('server started on port 8080');
});
