import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

export const toSafeInteger = (value: string | number, defaultValue: number) => {
  const num = Number(value);
  if (!isNaN(num)) {
    return Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
  } else {
    return defaultValue ? defaultValue : 0;
  }
};

/**
 * Parses in the Nest ExecutionContext of the incoming request, accounting for both
 * GraphQL & REST requests.
 */
export function parseContext(context: ExecutionContext | ArgumentsHost): { req: Request; res: Response } {
  const req: Request = context.switchToHttp().getRequest();
  const res: Response = context.switchToHttp().getResponse();

  return {
    req,
    res,
  };
}

/**
 * Predicate with type guard, used to filter out null or undefined values
 * in a filter operation.
 */
export function notNullOrUndefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}

/**
 * Simple object check.
 * From https://stackoverflow.com/a/34749873/772859
 */
export function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function isClassInstance(item: any): boolean {
  return isObject(item) && item.constructor.name !== 'Object';
}

export * from './ms';
export * from './password-ciper';
