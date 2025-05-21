import { Pool } from 'pg';

const pooldb = new Pool({
  user: 'daep',
  host: 'localhost',
  database: 'library_system',
  password: 'daep',
  port: 5432,
});

export default pooldb;
