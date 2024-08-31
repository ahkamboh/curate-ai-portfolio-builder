// lib/db.ts
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().catch((err) => console.error('Connection error', err.stack));

export default client;
