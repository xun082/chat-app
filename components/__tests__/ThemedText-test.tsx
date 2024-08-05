import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <ThemedText>
        <Text>Snapshot test!</Text>
      </ThemedText>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
