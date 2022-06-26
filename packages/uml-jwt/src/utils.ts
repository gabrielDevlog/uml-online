import { JwtPayload } from "./jwt.model";
import * as jwt_decode from "jwt-decode";

/**
 * Say whether a Jwt has expired or not
 */
export function JwtHasExpired(jwt: JwtPayload) {
  const currentTmp = new Date().getTime() / 1000;
  return jwt.exp - currentTmp <= 0;
}

/**
 * Decode a jwt,
 * return an object corresponding to its payload
 */
export function JwtDecodePayload(jwt: string) {
  try {
    const decoded = jwt_decode(jwt) as JwtPayload;
    decoded.accountId = decoded.accountId + ""; // Force it to be a string as it's parsed as number.
    return decoded;
  } catch (e) {
    return null;
  }
}
