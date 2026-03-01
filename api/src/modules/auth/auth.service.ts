import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async validateUser(clerkPayload:any){
        const clerkId = clerkPayload.sub;

        let user = await this.prisma.user.findUnique({
            where: {clerkId},
        });

        if (!user){
            user = await this.prisma.user.create({
                data: {
                    clerkId,
                    email: clerkPayload.email_addresses?.[0]?.email_address ?? '',
                    name: clerkPayload.first_name ?? '',
                    phone: clerkPayload.phone_number?.[0]?.phone_number ?? '',
                },
            });
        }
        return user;
    }
}
