import {Select, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SelectExample() {
  const [selected, setSelected] = useState('all-pages');
  const [textSpecificPages, setSpecificPages] = useState('');
  const [textAllPages, setAllPages] = useState('');

  const handleSelectChange = useCallback(value => setSelected(value), []);
  const handleSpecificPages = useCallback(value => setSpecificPages(value), []);
  const handleAllPages = useCallback(value => setAllPages(value), []);

  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <div>
      <Select
        label="PAGE RESTRICTION"
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
      {selected === 'specific' && (
        <TextField
          label="Included pages"
          value={textSpecificPages}
          onChange={handleSpecificPages}
          helpText="Page URLs to show the pop-up (separated by new lines)"
          multiline={5}
        />
      )}
      <TextField
        label="Excluded pages"
        value={textAllPages}
        onChange={handleAllPages}
        helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        multiline={5}
      />
    </div>
  );
}

export default SelectExample;
