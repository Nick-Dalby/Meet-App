import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App'


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper
  
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user is on the main view', () => {

    });
    when('nothing is clicked', () => {
    AppWrapper = mount(<App />)
    });

    then('the event details element should not be visible', () => {
    expect(AppWrapper.find('.event-details')).toHaveLength(0)
    });
});

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user wants event details', async () => {
      AppWrapper = await mount(<App />)
    });

    when('they click on the event details element', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event details element should be visible', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(1)
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user no longer needs to see the event details', async () => {
      AppWrapper = await mount(<App />)
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    when('they click on a close button', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event details element should not be visible', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0)
    });

});

})