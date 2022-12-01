import PostgresErrorCode from '../database/postgresErrorCode.enum';
import isRecord from '../utils/isRecord';

interface DatabaseError {
  code: PostgresErrorCode;
  detail: string;
  table: string;
  column?: string;
}

export function isDatabaseError(value: unknown): value is DatabaseError {
  if (!isRecord(value)) {
    return false;
  }
  const { code, detail, table } = value;
  return Boolean(code && detail && table);
}

export default DatabaseError;
