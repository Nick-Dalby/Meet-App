import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App'
import NumberOfEvents from '../NumberOfEvents'

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
const numberOfEvents = 32
const updatedNumberOfEvents = 5

defineFeature(feature, test => {
  let AppWrapper

  test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user is on the main view', () => {
      AppWrapper = mount(<App />)
    });

    when('a number of events has not been specified', () => {
    });

    then('the default number of events will be 32', () => {
      AppWrapper.update()
      expect(AppWrapper.find('.event')).toHaveLength(numberOfEvents)
    });
});

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('a user specifies a number of events to see', async () => {
      AppWrapper = await mount(<App />);
    });

    when('they input or select this number', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
      NumberOfEventsWrapper.find('.number-of-events-input').simulate('change', { target: { value: updatedNumberOfEvents } });
    });

    then('their specified number of events will be listed', () => {
      AppWrapper.update()
      expect(AppWrapper.find('.event')).toHaveLength(updatedNumberOfEvents)
    });
});
})