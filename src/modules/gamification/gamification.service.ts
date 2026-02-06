import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemberJoinedEvent } from '../communities/domain/events/community.events';

@Injectable()
@EventsHandler(MemberJoinedEvent)
export class GamificationService implements IEventHandler<MemberJoinedEvent> {
    handle(event: MemberJoinedEvent) {
        // Logic: Listen to CORE domain
        console.log(`[Gamification] badge to member ${event.memberId} for joining community ${event.aggregateId}`);
    }
}
