import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

class IdParams {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}

export default IdParams;
