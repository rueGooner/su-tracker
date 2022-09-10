export type JwtPayload = {
  email: string;
  sub: number;
};

export type RefreshTokenJwtPayload = JwtPayload & { refreshToken: string };
