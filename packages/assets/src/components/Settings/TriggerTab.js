import {Select, TextField} from '@shopify/polaris';
import triggerOptions from '../../helpers/triggerOptions.js';

function TriggerTab({input, handleChangeInput}) {
  return (
    <div>
      <Select
        label="PAGE RESTRICTION"
        options={triggerOptions}
        onChange={newValue => handleChangeInput('allowShow', newValue)}
        value={input.allowShow}
      />
      {input.allowShow === 'specific' && (
        <TextField
          label="Included pages"
          value={input.includedUrls}
          onChange={newValue => handleChangeInput('includedUrls', newValue)}
          helpText="Page URLs to show the pop-up (separated by new lines)"
          multiline={5}
        />
      )}
      <TextField
        label="Excluded pages"
        value={input.excludedUrls}
        onChange={newValue => handleChangeInput('excludedUrls', newValue)}
        helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        multiline={5}
      />
    </div>
  );
}

export default TriggerTab;
