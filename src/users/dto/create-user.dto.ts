import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.de',
    description: 'Адрес электронной почты',
  })
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль',
  })
  readonly password: string;
}
