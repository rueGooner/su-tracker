import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsDate()
  @IsOptional()
  moveIn: Date;

  @IsOptional()
  conditions: string[];
}
