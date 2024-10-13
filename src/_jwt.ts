import { createSecretKey, KeyObject } from "crypto";
import { errors, jwtVerify, SignJWT } from "jose";
import { AppError } from "./_error";

export class JWT {
  private secretKey: KeyObject;
  constructor() {
    this.secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
  }

  create(payload: Record<string, unknown>, exp: number, issuer: string) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: process.env.JWT_ALG! })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(process.env.JWT_AUDIENCE!)
      .setExpirationTime(exp)
      .sign(this.secretKey);
  }

  verify(token: string, issuer: string) {
    try {
      return jwtVerify(token, this.secretKey, {
        issuer,
        audience: process.env.JWT_AUDIENCE,
      });
    } catch (error) {
      throw new AppError({
        code: "InvalidJWT",
        message:
          error instanceof errors.JOSEError
            ? error.message
            : "Failed JWT validation.",
        statusCode: "UNAUTHORIZED",
        logLevel: "INFO",
      });
    }
  }
}
