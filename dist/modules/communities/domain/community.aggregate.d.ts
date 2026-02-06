import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { Member } from './member.entity';
export declare class Community extends AggregateRoot {
    private _name;
    private _description;
    private _isPrivate;
    private _members;
    private constructor();
    static create(id: string, name: string, description: string, isPrivate: boolean, creator: Member): Community;
    addMember(member: Member): void;
    get name(): string;
    get description(): string;
    get isPrivate(): boolean;
    get members(): Member[];
}
