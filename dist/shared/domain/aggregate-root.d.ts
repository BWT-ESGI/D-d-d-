import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';
export declare abstract class AggregateRoot extends NestAggregateRoot {
    readonly id: string;
    constructor(id: string);
}
