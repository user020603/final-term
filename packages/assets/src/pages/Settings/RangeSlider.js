import {LegacyCard, RangeSlider, Layout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RangeSliderExample() {
  const [rangeValue_1, setRangeValue_1] = useState(50);
  const [rangeValue_2, setRangeValue_2] = useState(50);
  const [rangeValue_3, setRangeValue_3] = useState(50);
  const [rangeValue_4, setRangeValue_4] = useState(40);

  const handleRangeSliderChange_1 = useCallback(value => setRangeValue_1(value), []);
  const handleRangeSliderChange_2 = useCallback(value => setRangeValue_2(value), []);
  const handleRangeSliderChange_3 = useCallback(value => setRangeValue_3(value), []);
  const handleRangeSliderChange_4 = useCallback(value => setRangeValue_4(value), []);

  return (
    <LegacyCard sectioned title="Timing">
      <div
        style={{
          display: 'flex',
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <RangeSlider
          output
          label="Display duration"
          min={0}
          max={100}
          value={rangeValue_1}
          onChange={handleRangeSliderChange_1}
          helpText="Hong long each pop will display on your page."
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right'
              }}
            >
              {rangeValue_1}
            </p>
          }
        />

        <RangeSlider
          output
          label="Gap time between two pops"
          min={0}
          max={100}
          value={rangeValue_2}
          onChange={handleRangeSliderChange_2}
          helpText="The time interval between two popup notifications."
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right'
              }}
            >
              {rangeValue_2}
            </p>
          }
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <RangeSlider
          output
          label="Time before the first pop"
          min={0}
          max={100}
          value={rangeValue_3}
          onChange={handleRangeSliderChange_3}
          helpText="The delay time before the first notification."
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right'
              }}
            >
              {rangeValue_3}
            </p>
          }
        />

        <RangeSlider
          output
          label="Maximum of popups"
          min={0}
          max={80}
          value={rangeValue_4}
          onChange={handleRangeSliderChange_4}
          helpText="The time interval between two popup notifications."
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right'
              }}
            >
              {rangeValue_4}
            </p>
          }
        />
      </div>
    </LegacyCard>
  );
}

export default RangeSliderExample;
