import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';

export abstract class AggregateRoot extends NestAggregateRoot {
    public readonly id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }
}
