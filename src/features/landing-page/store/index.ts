import { landingPageActionsAsync } from './landingPageActionsAsync';
import landingPageSlice from './landingPageSlice';
import * as landingPageSelectors from './landingPageSelectors';

const { actions, reducer: landingPageReducer } = landingPageSlice;
const landingPageActions = {
  ...actions,
  ...landingPageActionsAsync,
};

export { landingPageReducer, landingPageActions, landingPageSelectors };
