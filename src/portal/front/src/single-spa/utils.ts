/**
 * Return true if current location begin given paths
 */
export const activateForPath = (basePaths: string[]) => (location: any) =>
  basePaths.some(basePath => location.pathname.startsWith(basePath));
