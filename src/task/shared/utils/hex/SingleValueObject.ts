export abstract class SingleValueObject<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  equals(singleValueObject: SingleValueObject<T>) {
    return this.value === singleValueObject.value;
  }
}
