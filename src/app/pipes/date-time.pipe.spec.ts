import { DateTimePipe } from './date-time.pipe';

describe('DateTimePipe', () => {
  let pipe = new DateTimePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a valid format', () => {
    const date = new Date('2024-10-21T14:30:00');
    const result = pipe.transform(date);
    expect(result).toBe('21/10/2024 2:30 PM.'); // Verifica que el formato sea el esperado
  });
});
