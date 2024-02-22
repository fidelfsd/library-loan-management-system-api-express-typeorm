export abstract class Factory<T> {
   // This method should be implemented in subclasses to generate instances of type T
   protected abstract generate(): T;

   // Creates and returns an array of 'count' instances of type T
   createMany(count: number = 1): T[] {
      return Array.from({ length: count }, this.generate);
   }

   // Creates and returns an array of 'count' instances of type T
   createOne(): T {
      return this.generate();
   }
}
