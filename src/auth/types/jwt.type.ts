export type JwtPayload = {
  email: string;
  sub: number;
};

export type RefreshTokenJwtPayload = JwtPayload & { refresh_token: string };
