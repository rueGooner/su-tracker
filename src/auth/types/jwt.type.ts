export type JwtPayload = {
  email: string;
  name: string;
  surname: string;
  sub: number;
};

export type RefreshTokenJwtPayload = JwtPayload & { refreshToken: string };
