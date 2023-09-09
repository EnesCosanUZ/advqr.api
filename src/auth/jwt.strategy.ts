import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

/**
 * JwtStrategy is passport JWT strategy.
 * 
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_TOKEN,
    })
  }

  /**
   * validate returns jwt payload.
   * @param payload - Payload with the info of the user
   * 
   * @returns
   * @memberof JwtStrategy
   */
  validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role }
  }
}