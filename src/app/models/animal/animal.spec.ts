import { Animal } from './animal';

describe('Animales', () => {
  it('should create an instance', () => {
    expect(new Animal()).toBeTruthy();
  });
});
