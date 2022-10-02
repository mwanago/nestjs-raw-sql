import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  idsToSkip?: number;
}

export default PaginationParams;
