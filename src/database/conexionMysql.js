import { createPool } from "mysql2/promise";

export default async function connect() {

    const connection = await createPool({
        host: "localhost",
        database: "app",
        user: "app",
        password: "admin123",
        connectionLimit: 2,
    });
    return connection;
}