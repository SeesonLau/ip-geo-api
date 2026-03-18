import { IsIP, IsNotEmpty, IsObject } from 'class-validator';

export class SaveHistoryDto {
  @IsIP(undefined, { message: 'Please provide a valid IP address' })
  @IsNotEmpty()
  ip: string;

  @IsObject()
  data: Record<string, unknown>;
}
