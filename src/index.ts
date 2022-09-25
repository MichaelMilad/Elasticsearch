import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

import { searchMysql } from './mysql-repository/mysql'

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello')
});

app.get('/search/sql', async (req: express.Request, res: express.Response) => {
    const { query } = req.query;

    if (!query) return res.send('ENTER QUERY');

    const result = await searchMysql(query as string);

    return res.json(result);

});

app.get('/search/elastic', async (req: express.Request, res: express.Response) => {
    const { query } = req.query;

    if (!query) return res.send('ENTER QUERY');

    try {
        const result: any =
            await axios.post('http://localhost:9200/client,client_contact,client_phone,client_contact_phone/_search', {
                "query": {
                    "multi_match": {
                        "query": query,
                        "fields": ["name", "key", "number", "email"]
                    }
                }
            });
        return res.json(result.data.hits.hits)
    } catch (e) {
        console.log('ERROR', e)
        res.send(e)
    }

})

app.listen(3000, () => console.log('SERVER STARTED ON 3000'));