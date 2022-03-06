export function getSteps(state) {
  return [
    {
      name: 'chooseTimeFrame',
      nextStepDisabled: !state.application.timeFrame,
    },
    {
      name: 'chooseDurationRange',
    },
    {
      name: 'chooseOriginCities',
      nextStepDisabled: state.application.friends.length === 0,
    },
    {
      name: 'chooseDestination',
    },
    {
      name: 'resultsCities',
    },
    {
      name: 'resultsFinal',
    },
  ];
}
