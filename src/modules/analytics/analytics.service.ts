import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommunityCreatedEvent } from '../communities/domain/events/community.events';

@Injectable()
@EventsHandler(CommunityCreatedEvent)
export class AnalyticsService implements IEventHandler<CommunityCreatedEvent> {
    handle(event: CommunityCreatedEvent) {
        console.log(`[Analytics] Community Created: ${event.name} (Private: ${event.isPrivate}) at ${event.occurredOn}`);
    }
}
