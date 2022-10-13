import {
  AddReaction, CameraIndoor,
  ColorLens, Comment, Headphones,
  Help,
  Map,
  Memory,
  Museum,
  Park,
  PersonAdd,
  Public, Room, SportsSoccer,
  VideogameAsset, Visibility
} from '@mui/icons-material';
import { AppIcon } from '../app-icon';

export const Icons = {
  Art: <AppIcon icon={ColorLens} color='#747df6' />,
  Entertainment: <AppIcon icon={CameraIndoor} color='#9391fd' />,
  Games: <AppIcon icon={VideogameAsset} color='#44ff00' />,
  History: <AppIcon icon={Museum} color='#eab171' />,
  'How to': <AppIcon icon={Help} color='#fbe44b' />,
  Internet: <AppIcon icon={Public} color='#9391fd' />,
  Music: <AppIcon icon={Headphones} color='#44ff00' />,
  Nature: <AppIcon icon={Park} color='#44ff00' />,
  Sports: <AppIcon icon={SportsSoccer} color='#f92bfd' />,
  Technology: <AppIcon icon={Memory} color='#1d1d1f' />,
  Traveling: <AppIcon icon={Map} color='#e60023' />,
  SignUp: <AppIcon icon={PersonAdd} />,
  Location: <AppIcon icon={Room} color='#e60023' />,
  View: <AppIcon icon={Visibility} />, 
  Reaction: <AppIcon icon={AddReaction} />, 
  Comment: <AppIcon icon={Comment} />, 
};
