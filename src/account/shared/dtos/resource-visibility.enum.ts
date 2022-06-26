/**
 * Read only permission for a resource
 */
export enum ResourceVisibility {
  /**
   * Only owner can read this resource
   */
  Private = "Private",

  /**
   * Everyone can read
   */
  Public = "Public"
}
