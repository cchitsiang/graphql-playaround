import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export interface IPaginationMetadata {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
}

/**
 * Generic pagination interface
 */
export interface IPaginated<T> {
  /**
   * Items included in the current listing
   */
  readonly items: T[];

  readonly metadata: IPaginationMetadata;
}

@ObjectType('PaginatationMetadata')
export class PaginatationMetadata implements IPaginationMetadata {
  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;
}

export function Paginated<T>(classRef: ClassType<T>): ClassType<IPaginated<T>> {
  @ObjectType(`Paginated${classRef.name}`)
  abstract class PaginatedClass implements IPaginated<T> {
    @Field((type) => [classRef], { nullable: true })
    items: T[];

    @Field((type) => PaginatationMetadata)
    metadata: PaginatationMetadata;
  }

  return PaginatedClass as ClassType<IPaginated<T>>;
}
