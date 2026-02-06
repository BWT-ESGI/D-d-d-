export class CreateCommunityCommand {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly isPrivate: boolean,
        public readonly creatorId: string,
        public readonly creatorName: string,
        public readonly creatorEmail: string,
    ) { }
}
