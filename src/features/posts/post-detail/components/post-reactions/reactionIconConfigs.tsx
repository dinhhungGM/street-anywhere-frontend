import {
  Close,
  FavoriteBorder,
  Mood,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { AppIcon } from '../../../../../solutions/components/app-icon';

const REACTION_ICON_CONFIGS = {
  clearReaction: <AppIcon component={Close} color='#1976d2' />,
  like: <AppIcon component={ThumbUpOffAlt} color='#1976d2' />,
  'ha ha': <AppIcon component={Mood} color='#1976d2' />,
  love: <AppIcon component={FavoriteBorder} color='#1976d2' />,
  sad: <AppIcon component={SentimentDissatisfied} color='#1976d2' />,
  angry: <AppIcon component={SentimentVeryDissatisfied} color='#1976d2' />,
};
export default REACTION_ICON_CONFIGS;
