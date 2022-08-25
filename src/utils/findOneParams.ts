import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

class FindOneParams {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}

export default FindOneParams;
