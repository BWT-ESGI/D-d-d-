import { DomainEvent } from '../../../../shared/domain/domain-event.interface';

export class CommunityCreatedEvent implements DomainEvent {
    aggregateId: string;
    occurredOn: Date;
    readonly name: string;
    readonly isPrivate: boolean;

    constructor(communityId: string, name: string, isPrivate: boolean) {
        this.aggregateId = communityId;
        this.occurredOn = new Date();
        this.name = name;
        this.isPrivate = isPrivate;
    }
}

export class MemberJoinedEvent implements DomainEvent {
    aggregateId: string;
    occurredOn: Date;
    readonly memberId: string;

    constructor(communityId: string, memberId: string) {
        this.aggregateId = communityId;
        this.occurredOn = new Date();
        this.memberId = memberId;
    }
}
