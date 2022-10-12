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
  clearReaction: <AppIcon icon={Close} color='#1976d2' />,
  like: <AppIcon icon={ThumbUpOffAlt} color='#1976d2' />,
  'ha ha': <AppIcon icon={Mood} color='#1976d2' />,
  love: <AppIcon icon={FavoriteBorder} color='#1976d2' />,
  sad: <AppIcon icon={SentimentDissatisfied} color='#1976d2' />,
  angry: <AppIcon icon={SentimentVeryDissatisfied} color='#1976d2' />,
};
export default REACTION_ICON_CONFIGS;
