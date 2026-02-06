import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalyticsService } from './analytics.service';

@Module({
    imports: [CqrsModule],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
