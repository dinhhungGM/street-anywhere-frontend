import { FavoriteBorder, Mood, SentimentDissatisfied, SentimentVeryDissatisfied, ThumbUpOffAlt } from '@mui/icons-material';
import { AppIcon } from '../../../solutions/components/app-icon';

const REACTION_ICON_CONFIGS = {
  like: <AppIcon component={ThumbUpOffAlt} />,
  'ha ha': <AppIcon component={Mood} />,
  love: <AppIcon component={FavoriteBorder} />,
  sad: <AppIcon component={SentimentDissatisfied} />,
  angry: <AppIcon component={SentimentVeryDissatisfied} />,
};
export default REACTION_ICON_CONFIGS;
