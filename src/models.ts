import { Pool } from "pg";

export const pool =  new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'quillhash',
    database: 'quillhash',
    port: 5432    
});
