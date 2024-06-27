export function calculateAccessTokenExpires({
  createdAt,
  expiresIn
}: {
  createdAt: number;
  expiresIn: number;
}): number {
  const accessTokenExpires = new Date(createdAt * 1000);
  accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + expiresIn);
  return accessTokenExpires.getTime();
}
