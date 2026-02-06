import { Community } from './community.aggregate';
import { Member } from './member.entity';
import { CommunityCreatedEvent, MemberJoinedEvent } from './events/community.events';

describe('Community Aggregate', () => {
    const creator = new Member('creator-id', 'Alice', 'alice@example.com');
    const member = new Member('member-id', 'Bob', 'bob@example.com');

    it('should create a community successfully', () => {
        const community = Community.create(
            'community-id',
            'Developers',
            'A group for devs',
            false,
            creator,
        );

        expect(community).toBeInstanceOf(Community);
        expect(community.name).toBe('Developers');
        expect(community.members).toHaveLength(1);
        expect(community.members[0]).toBe(creator); // Reference equality

        // Assert Events
        const events = community.getUncommittedEvents();
        expect(events).toHaveLength(2); // MemberJoined + CommunityCreated
        expect(events[0]).toBeInstanceOf(MemberJoinedEvent); // Added first
        expect(events[1]).toBeInstanceOf(CommunityCreatedEvent); // Applied second
    });

    it('should fail to create if name is empty', () => {
        expect(() =>
            Community.create('id', '', 'desc', false, creator)
        ).toThrow('Community name is required');
    });

    it('should add a member successfully', () => {
        const community = Community.create('id', 'Name', 'Desc', false, creator);
        // Clear events from creation
        community.commit();

        community.addMember(member);

        expect(community.members).toHaveLength(2);
        const events = community.getUncommittedEvents();
        expect(events).toHaveLength(1);
        expect(events[0]).toBeInstanceOf(MemberJoinedEvent);
        expect((events[0] as MemberJoinedEvent).memberId).toBe(member.id);
    });

    it('should fail to add duplicate member', () => {
        const community = Community.create('id', 'Name', 'Desc', false, creator);
        community.commit();

        community.addMember(member);

        expect(() => community.addMember(member)).toThrow('Member is already in the community');
    });
});
