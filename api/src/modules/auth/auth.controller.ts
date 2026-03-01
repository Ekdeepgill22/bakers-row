import { Controller,Get,UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authsServie: AuthService){}

    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req){
        return this.authsServie.validateUser(req.clerkPayload);
    }
}
