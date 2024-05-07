import {LegacyCard, Tabs, Checkbox, RangeSlider, Select, TextField, Grid} from '@shopify/polaris';
import {useState, useEffect} from 'react';
import DesktopPositionInput from './DesktopPositionInput';
import useFetchApi from '../../hooks/api/useFetchApi.js';

import {api} from '../../helpers';

const triggerOptions = [
  {label: 'All pages', value: 'all'},
  {label: 'Specific pages', value: 'specific'}
];

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];

function TabsInsideOfACardExample() {
  const [selectedTab, setSelectedTab] = useState(0);

  async function callApi() {
    const data = await api('/settings');
    console.log(data);
    setInput(data);
  }

  useEffect(() => {
    callApi();
  }, []);

  const {loading, data: input, setData: setInput, setLoading} = useFetchApi('/settings');

  const handleChangeInput = (key, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [key]: value
    }));
  };

  const handleRangeSliderChange = (key, value) => {
    handleChangeInput(key, value);
  };

  const handleTriggerPage = (key, value) => {
    handleChangeInput(key, value);
  };

  const tabs = [
    {
      id: 'display-1',
      content: 'Display',
      accessibilityLabel: 'Display',
      panelID: 'display-setting-1',
      component: (
        <>
          <DesktopPositionInput
            label="Desktop Position"
            value={input.position}
            onChange={newValue => handleChangeInput('position', newValue)}
            helpText="The display position of the pop on your website."
            options={defaultOptions}
          />

          <Checkbox
            label="Hide time ago"
            checked={input.hideTimeAgo}
            onChange={newChecked => handleChangeInput('hideTimeAgo', newChecked)}
          />
          <Checkbox
            label="Truncate content text"
            checked={input.truncateProductName}
            onChange={newChecked => handleChangeInput('truncateProductName', newChecked)}
            helpText="If your product name is long for one line, it will be truncated to 'Product na...' "
          />

          <LegacyCard sectioned title="Timing">
            <Grid>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                <RangeSlider
                  output
                  label="Display duration"
                  min={0}
                  max={100}
                  value={input.displayDuration}
                  onChange={newValue => handleRangeSliderChange('displayDuration', newValue)}
                  helpText="Hong long each pop will display on your page."
                  suffix={
                    <p
                      style={{
                        minWidth: '24px',
                        textAlign: 'right'
                      }}
                    >
                      {input.displayDuration}
                    </p>
                  }
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                <RangeSlider
                  output
                  label="Gap time between two pops"
                  min={0}
                  max={100}
                  value={input.popsInterval}
                  onChange={newValue => handleRangeSliderChange('popsInterval', newValue)}
                  helpText="The time interval between two popup notifications."
                  suffix={
                    <p
                      style={{
                        minWidth: '24px',
                        textAlign: 'right'
                      }}
                    >
                      {input.popsInterval}
                    </p>
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                {' '}
                <RangeSlider
                  output
                  label="Time before the first pop"
                  min={0}
                  max={100}
                  value={input.firstDelay}
                  onChange={newValue => handleRangeSliderChange('firstDelay', newValue)}
                  helpText="The delay time before the first notification."
                  suffix={
                    <p
                      style={{
                        minWidth: '24px',
                        textAlign: 'right'
                      }}
                    >
                      {input.firstDelay}
                    </p>
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                <RangeSlider
                  output
                  label="Maximum of popups"
                  min={0}
                  max={80}
                  value={input.maxPopsDisplay}
                  onChange={newValue => handleRangeSliderChange('maxPopsDisplay', newValue)}
                  helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
                  suffix={
                    <p
                      style={{
                        minWidth: '24px',
                        textAlign: 'right'
                      }}
                    >
                      {input.maxPopsDisplay}
                    </p>
                  }
                />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
        </>
      )
    },
    {
      id: 'trigger-1',
      content: 'Triggers',
      accessibilityLabel: 'Trigger',
      panelID: 'trigger-setting-1',
      // component: <TriggersPage />
      component: (
        <div>
          <Select
            label="PAGE RESTRICTION"
            options={triggerOptions}
            onChange={newValue => handleTriggerPage('allowShow', newValue)}
            value={input.allowShow}
          />
          {input.allowShow === 'specific' && (
            <TextField
              label="Included pages"
              value={input.includedUrls}
              onChange={newValue => handleTriggerPage('includedUrls', newValue)}
              helpText="Page URLs to show the pop-up (separated by new lines)"
              multiline={5}
            />
          )}
          <TextField
            label="Excluded pages"
            value={input.excludedUrls}
            onChange={newValue => handleTriggerPage('excludedUrls', newValue)}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            multiline={5}
          />
        </div>
      )
    }
  ];

  console.log(input);

  return {
    input,
    component: (
      <LegacyCard>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
          <LegacyCard.Section title={tabs[selectedTab].content}>
            {tabs[selectedTab].component}
          </LegacyCard.Section>
        </Tabs>
      </LegacyCard>
    )
  };
}

export default TabsInsideOfACardExample;
