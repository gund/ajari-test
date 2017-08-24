import * as express from 'express';
import * as bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { TodoItem } from './app/features/case-three/todo/todo';

const PORT = 8088;
const app = express();
const TODO_PATH = resolve(__dirname, 'assets/getTodoList.json');
const TODO_LIST: TodoItem[] = JSON.parse(readFileSync(TODO_PATH, 'utf-8'));

const api = express()
  .get('/todo', (req, res) => {
    res.send(TODO_LIST);
  })
  .post('/todo', (req, res) => {
    try {
      const newItem = req.body as TodoItem;
      const id = getMaxKeyOf(TODO_LIST, 'id') + 1;
      newItem.id = id;
      TODO_LIST.push(newItem);
      res.send(newItem);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  })
  .patch('/todo/:id', (req, res) => {
    const id = parseInt(req.params['id'], 10);

    if (!id) {
      return res.sendStatus(400);
    }

    const item = getItemById(id);

    if (!item) {
      return res.sendStatus(404);
    }

    try {
      const newItem = req.body as TodoItem;
      delete newItem.id;
      Object.assign(item, newItem);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }

    res.send(item);
  })
  .delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params['id'], 10);

    if (!id) {
      return res.sendStatus(400);
    }

    const item = getItemById(id);

    if (!item) {
      return res.sendStatus(404);
    }

    try {
      TODO_LIST.splice(TODO_LIST.indexOf(item), 1);
      res.send(item);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

app.use(bodyParser());
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function getItemById(id: number) {
  return TODO_LIST.filter(i => i.id === id).shift();
}

function getMaxKeyOf<T>(list: T[], key: keyof T): number {
  return list
    .map(item => +item[key])
    .reduce((maxN, n) => n > maxN ? n : maxN, 0);
}
