import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GamificationService } from './gamification.service';

@Module({
    imports: [CqrsModule],
    providers: [GamificationService],
})
export class GamificationModule { }
