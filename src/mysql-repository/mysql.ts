import mysql from 'mysql';
import { clientSql, contactSql, clientPhoneSql, contactPhoneSql } from './mysqlQueries'

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DB, DB_PORT } = process.env;

export const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DB
});


export async function searchMysql(query: string) {
    const clients = new Promise((resolve, reject) => {
        connection.query(clientSql(query), function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });

    const contacts = new Promise((resolve, reject) => {
        connection.query(contactSql(query), function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });

    const phones = new Promise((resolve, reject) => {
        connection.query(clientPhoneSql(query), function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });

    const contactPhones = new Promise((resolve, reject) => {
        connection.query(contactPhoneSql(query), function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });

    const results = await Promise.all([clients, contacts, phones, contactPhones])
    return [...results]
};