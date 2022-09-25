import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './database.module-definition';

@Injectable()
class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  async runQuery(query: string, params?: unknown[]) {
    return this.pool.query(query, params);
  }

  async getPoolClient() {
    return this.pool.connect();
  }
}

export default DatabaseService;
