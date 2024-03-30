import { ThemeEnum } from '.';

export interface CreateCodeDto {
  code: string;
  theme: ThemeEnum;
  language: string;
}
