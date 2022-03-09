import { IInputProps } from '../../types';

export function InputNewExpense({ type, id, value, label, options, onInputChange, ...rest }: IInputProps) {
  if (type === 'select') {
    return (
      <label htmlFor={ id }>
        { label }
        <select
          data-testid={ `${id}-input` }
          id={ id }
          onChange={ onInputChange }
          value={ value }
        >
          { (options || []).map((option) => <option key={ option }>{option}</option>) }
        </select>
      </label>
    );
  }
  return (
    <label htmlFor={ id }>
      { label }
      <input
        data-testid={ `${id}-input` }
        type={ type }
        id={ id }
        onChange={ onInputChange }
        value={ value }
      />
    </label>
  );
}
