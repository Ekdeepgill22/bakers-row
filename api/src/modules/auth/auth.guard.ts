import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken } from '@clerk/backend';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No token');

    const token = authHeader.replace('Bearer','');
    try{
      const payload = await verifyToken(token,{
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      request['clerkPayload'] = payload;
      return true;
    }catch(err){
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
