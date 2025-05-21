import { Pool } from 'pg';

async function initializeTables(pool: Pool): Promise<void> {
    const tables = `
    -- Crear tabla de bibliotecas
    CREATE TABLE IF NOT EXISTS libraries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL
    );
    -- Crear tabla de libros
    CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(13) UNIQUE NOT NULL,
        published_date DATE,
        library_id INT,
        FOREIGN KEY (library_id) REFERENCES libraries(id) ON DELETE SET NULL
    );
    -- Crear tabla de miembros
    CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        joined_date DATE DEFAULT CURRENT_DATE
    );
    -- Crear tabla de préstamos
    CREATE TABLE IF NOT EXISTS loans (
        id SERIAL PRIMARY KEY,
        book_id INT NOT NULL,
        member_id INT NOT NULL,
        loan_date DATE DEFAULT CURRENT_DATE,
        return_date DATE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
    );`;
    try {
        await pool.query(tables);
        console.log('Tablas inicializadas correctamente');
    } catch (error) {
        console.error('Error al inicializar las tablas:', error);
        throw error;
    }
}

export { initializeTables };
