export class JoinCommunityCommand {
    constructor(
        public readonly communityId: string,
        public readonly userId: string,
        public readonly userName: string,
        public readonly userEmail: string,
    ) { }
}
