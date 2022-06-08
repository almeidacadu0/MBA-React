import React from 'react';

export default function Option({
  children: optionContent,
  id = 1,
  value = '',
}) {
  console.log('entroy');
  return (
    <>
      <option key={id} value={id}>
        {optionContent}
      </option>
    </>
  );
}
