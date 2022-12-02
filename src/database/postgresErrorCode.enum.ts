enum PostgresErrorCode {
  UniqueViolation = '23505',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
  CheckViolation = '23514',
}

export default PostgresErrorCode;
