"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberJoinedEvent = exports.CommunityCreatedEvent = void 0;
class CommunityCreatedEvent {
    aggregateId;
    occurredOn;
    name;
    isPrivate;
    constructor(communityId, name, isPrivate) {
        this.aggregateId = communityId;
        this.occurredOn = new Date();
        this.name = name;
        this.isPrivate = isPrivate;
    }
}
exports.CommunityCreatedEvent = CommunityCreatedEvent;
class MemberJoinedEvent {
    aggregateId;
    occurredOn;
    memberId;
    constructor(communityId, memberId) {
        this.aggregateId = communityId;
        this.occurredOn = new Date();
        this.memberId = memberId;
    }
}
exports.MemberJoinedEvent = MemberJoinedEvent;
//# sourceMappingURL=community.events.js.map