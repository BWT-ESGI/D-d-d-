import { IEventHandler } from '@nestjs/cqrs';
import { MemberJoinedEvent } from '../communities/domain/events/community.events';
export declare class GamificationService implements IEventHandler<MemberJoinedEvent> {
    handle(event: MemberJoinedEvent): void;
}
