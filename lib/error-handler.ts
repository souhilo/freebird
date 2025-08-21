export function handleError(err: any) {
  if (typeof err === "string") {
    throw new Error(err);
  }

  throw err;
}
