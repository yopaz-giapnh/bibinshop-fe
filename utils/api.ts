export function isNotFound(response: Response) {
  return response.status === 404;
}
