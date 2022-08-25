import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './database.module-definition';

@Injectable()
class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  async runQuery(query: string, params?: unknown[]) {
    const queryResponse = await this.pool.query(query, params);
    return queryResponse.rows;
  }
}

export default DatabaseService;
