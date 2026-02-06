import { DomainEvent } from '../../../../shared/domain/domain-event.interface';
export declare class CommunityCreatedEvent implements DomainEvent {
    aggregateId: string;
    occurredOn: Date;
    readonly name: string;
    readonly isPrivate: boolean;
    constructor(communityId: string, name: string, isPrivate: boolean);
}
export declare class MemberJoinedEvent implements DomainEvent {
    aggregateId: string;
    occurredOn: Date;
    readonly memberId: string;
    constructor(communityId: string, memberId: string);
}
