import {LegacyCard, Checkbox, RangeSlider, Grid} from '@shopify/polaris';
import DesktopPositionInput from './DesktopPositionInput';
import defaultDisplay from '../../helpers/defaultDisplay';

function DisplayTab({input, handleChangeInput}) {
  return (
    <>
      <DesktopPositionInput
        label="Desktop Position"
        value={input.position}
        onChange={newValue => handleChangeInput('position', newValue)}
        helpText="The display position of the pop on your website."
        options={defaultDisplay}
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
              onChange={newValue => handleChangeInput('displayDuration', newValue)}
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
              onChange={newValue => handleChangeInput('popsInterval', newValue)}
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
              onChange={newValue => handleChangeInput('firstDelay', newValue)}
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
              onChange={newValue => handleChangeInput('maxPopsDisplay', newValue)}
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
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
  );
}

export default DisplayTab;
