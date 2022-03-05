export function getSteps(state) {
  return [
    {
      name: 'chooseTimeFrame',
      nextStepAvailable: !!state.application.timeFrame,
    },
    {
      name: 'chooseDurationRange',
    },
    {
      name: 'chooseOriginCities',
      nextStepAvailable: state.application.friends.length > 0,
    },
  ];
}
