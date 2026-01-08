import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in environment variables");
}

//INITIALIZE PG POOL
const pool = new Pool({
    connectionString: ENV.DATABASE_URL
})

pool.on("connect", () => {
    console.log("Connected to the database");
})
pool.on("error", (err) => {
    console.error("Database error:", err);
})

export const db = drizzle({ client: pool, schema }); //this will be used in the future to interact with the db to create users or be any case.


//connection pool = is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.