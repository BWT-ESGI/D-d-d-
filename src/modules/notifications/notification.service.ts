import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`[Notification] To: ${to} | Subject: ${subject} | Body: ${body}`);
    }
}
