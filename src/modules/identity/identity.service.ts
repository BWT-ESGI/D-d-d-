import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {
    isValidUser(userId: string): boolean {
        return userId.startsWith('user-');
    }

    getUserEmail(userId: string): string {
        return 'valid@example.com';
    }
}
