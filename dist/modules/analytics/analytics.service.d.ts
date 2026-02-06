import { IEventHandler } from '@nestjs/cqrs';
import { CommunityCreatedEvent } from '../communities/domain/events/community.events';
export declare class AnalyticsService implements IEventHandler<CommunityCreatedEvent> {
    handle(event: CommunityCreatedEvent): void;
}
