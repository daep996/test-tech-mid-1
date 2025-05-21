import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

export async function initializeTables(pool: Pool) {
    try {
        // Leer el archivo de esquema
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Ejecutar el esquema
        await pool.query(schema);
        console.log('Tablas inicializadas correctamente');
    } catch (error) {
        console.error('Error al inicializar las tablas:', error);
        throw error;
    }
}
