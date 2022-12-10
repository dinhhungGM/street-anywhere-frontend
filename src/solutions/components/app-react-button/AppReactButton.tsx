import { Avatar, Paper, Tooltip } from '@mui/material';
import { memo } from 'react';
import AngrySrc from './../../assets/images/reactions/angry.png';
import CareSrc from './../../assets/images/reactions/care.png';
import UnReact from './../../assets/images/reactions/close.png';
import HahaSrc from './../../assets/images/reactions/haha.png';
import LikeSrc from './../../assets/images/reactions/like.png';
import LoveSrc from './../../assets/images/reactions/love.png';
import SadSrc from './../../assets/images/reactions/sad.png';
import WowSrc from './../../assets/images/reactions/wow.png';
import styles from './styles.module.scss';

const reactionConfigs = {
  Angry: {
    id: 'angry-icon',
    iconSrc: AngrySrc,
    tooltip: 'Angry',
    alt: 'Angry Icon',
    type: 'Angry',
  },
  Care: {
    id: 'care-icon',
    iconSrc: CareSrc,
    tooltip: 'Care',
    alt: 'Care Icon',
    type: 'Care',
  },
  'Ha Ha': {
    id: 'haha-icon',
    iconSrc: HahaSrc,
    tooltip: 'Haha',
    alt: 'Haha Icon',
    type: 'Ha Ha',
  },
  Like: {
    id: 'like-icon',
    iconSrc: LikeSrc,
    tooltip: 'Like',
    alt: 'Like Icon',
    type: 'Like',
  },
  Love: {
    id: 'love-icon',
    iconSrc: LoveSrc,
    tooltip: 'Love',
    alt: 'Love Icon',
    type: 'Love',
  },
  Sad: {
    id: 'sad-icon',
    iconSrc: SadSrc,
    tooltip: 'Sad',
    alt: 'Sad Icon',
    type: 'Sad',
  },
  Wow: {
    id: 'wow-icon',
    iconSrc: WowSrc,
    tooltip: 'Wow',
    alt: 'Wow Icon',
    type: 'Wow',
  },
  Remove: {
    id: 'remove-icon',
    iconSrc: UnReact,
    tooltip: 'Remove',
    alt: 'Remove Icon',
    type: 'Remove',
  },
};

interface IAppReactButtonProps {
  type: string;
  onClickReaction?: (e) => any;
}
const AppReactButton = ({
  type,
  onClickReaction = (e) => {
    e.stopPropagation();
    return;
  },
}: IAppReactButtonProps) => {
  const handleClickReaction = (e): void => {
    e.stopPropagation();
    onClickReaction(type);
  };

  return (
    <>
      <Tooltip title={type}>
        <Avatar
          src={reactionConfigs[type].iconSrc}
          alt={reactionConfigs[type].alt}
          component={Paper}
          elevation={2}
          className={styles['reaction-item']}
          onClick={handleClickReaction}
        />
      </Tooltip>
    </>
  );
};

export default memo(AppReactButton);
