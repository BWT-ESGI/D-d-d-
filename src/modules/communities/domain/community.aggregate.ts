import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { Member } from './member.entity';
import { CommunityCreatedEvent, MemberJoinedEvent } from './events/community.events';

export class Community extends AggregateRoot {
    private _name: string;
    private _description: string;
    private _isPrivate: boolean;
    private _members: Map<string, Member>;

    private constructor(
        id: string,
        name: string,
        description: string,
        isPrivate: boolean,
    ) {
        super(id);
        this._name = name;
        this._description = description;
        this._isPrivate = isPrivate;
        this._members = new Map<string, Member>();
    }

    // Factory Method
    public static create(
        id: string,
        name: string,
        description: string,
        isPrivate: boolean,
        creator: Member,
    ): Community {
        if (!name || name.trim().length === 0) {
            throw new Error('Community name is required');
        }

        const community = new Community(id, name, description, isPrivate);

        // Logic: Creator always joins the community
        community.addMember(creator);

        // Emit Event
        community.apply(new CommunityCreatedEvent(id, name, isPrivate));

        return community;
    }

    public addMember(member: Member): void {
        if (this._members.has(member.id)) {
            throw new Error('Member is already in the community');
        }

        if (this._isPrivate) {
            // Example Rule: Private communities need invitation (omitted for now)
            // console.log('Checking invitation...');
        }

        this._members.set(member.id, member);
        this.apply(new MemberJoinedEvent(this.id, member.id));
    }

    // Getters for read-only access
    get name(): string { return this._name; }
    get description(): string { return this._description; }
    get isPrivate(): boolean { return this._isPrivate; }
    get members(): Member[] { return Array.from(this._members.values()); }
}
