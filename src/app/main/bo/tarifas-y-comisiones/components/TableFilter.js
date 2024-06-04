import React from 'react';

// Common components
import { InputSearch } from './Table.styles';

export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = setGlobalFilter(value || undefined);

  return (
    <span>
      <InputSearch
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={'Buscar'}
      />
    </span>
  );
}
