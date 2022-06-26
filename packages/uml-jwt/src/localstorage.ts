import { JwtPayload } from "./jwt.model";
import { JwtDecodePayload } from "./utils";

/**
 * Store Jwt in local storage
 */
export function JwtToLocalStorage(jwt: string) {
  localStorage.setItem("uml-jwt", jwt);
}

/**
 * Retrieve jwt from localstorage
 */
export function JwtFromLocalStorage() {
  return localStorage.getItem("uml-jwt");
}

/**
 * Retrieve & parse jwt from localstorage
 */
export function JwtPayloadFromLocalStorage(): JwtPayload | null {
  const stored = JwtFromLocalStorage();
  if (!stored) {
    return null;
  }

  return JwtDecodePayload(stored);
}

/**
 * Remove a jwt from local storage
 */
export function JwtRemoveFromLocalStorage() {
  localStorage.removeItem("uml-jwt");
}
