/**
 * Custom properties that you can add in you jwt
 */
export interface JwtCustomPayload {
  /**
   * Account id, managed by account service
   */
  accountId: string;

  /**
   * Account email
   */
  email: string;
}

/**
 * Final payload containing:
 * - custom properties you've set (JwtCustomPayload)
 * - auto generated properties
 */
export interface JwtPayload extends JwtCustomPayload {
  /**
   * Issued at timestamp
   */
  iat: number;

  /**
   * Expire at timestamp
   */
  exp: number;
}
