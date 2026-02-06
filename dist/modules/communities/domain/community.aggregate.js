"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const aggregate_root_1 = require("../../../shared/domain/aggregate-root");
const community_events_1 = require("./events/community.events");
class Community extends aggregate_root_1.AggregateRoot {
    _name;
    _description;
    _isPrivate;
    _members;
    constructor(id, name, description, isPrivate) {
        super(id);
        this._name = name;
        this._description = description;
        this._isPrivate = isPrivate;
        this._members = new Map();
    }
    static create(id, name, description, isPrivate, creator) {
        if (!name || name.trim().length === 0) {
            throw new Error('Community name is required');
        }
        const community = new Community(id, name, description, isPrivate);
        community.addMember(creator);
        community.apply(new community_events_1.CommunityCreatedEvent(id, name, isPrivate));
        return community;
    }
    addMember(member) {
        if (this._members.has(member.id)) {
            throw new Error('Member is already in the community');
        }
        if (this._isPrivate) {
        }
        this._members.set(member.id, member);
        this.apply(new community_events_1.MemberJoinedEvent(this.id, member.id));
    }
    get name() { return this._name; }
    get description() { return this._description; }
    get isPrivate() { return this._isPrivate; }
    get members() { return Array.from(this._members.values()); }
}
exports.Community = Community;
//# sourceMappingURL=community.aggregate.js.map