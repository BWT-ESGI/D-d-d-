export declare class CreateCommunityCommand {
    readonly name: string;
    readonly description: string;
    readonly isPrivate: boolean;
    readonly creatorId: string;
    readonly creatorName: string;
    readonly creatorEmail: string;
    constructor(name: string, description: string, isPrivate: boolean, creatorId: string, creatorName: string, creatorEmail: string);
}
