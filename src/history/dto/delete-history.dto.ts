import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class DeleteHistoryDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one ID must be provided' })
  @IsInt({ each: true, message: 'Each ID must be an integer' })
  ids: number[];
}
