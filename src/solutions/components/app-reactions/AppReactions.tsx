import { Avatar, Paper, Stack, Tooltip } from '@mui/material';
import { memo, useMemo } from 'react';
import AngrySrc from './../../assets/images/reactions/angry.png';
import CareSrc from './../../assets/images/reactions/care.png';
import HahaSrc from './../../assets/images/reactions/haha.png';
import LikeSrc from './../../assets/images/reactions/like.png';
import LoveSrc from './../../assets/images/reactions/love.png';
import SadSrc from './../../assets/images/reactions/sad.png';
import WowSrc from './../../assets/images/reactions/wow.png';
import styles from './styles.module.scss';

interface IAppReactionsProps {
  isVerticalAlign?: boolean;
}

const AppReactions = ({ isVerticalAlign = false }: IAppReactionsProps) => {
  const reactionItems = useMemo(() => {
    return [
      {
        id: 'angry-icon',
        iconSrc: AngrySrc,
        tooltip: 'Angry',
        alt: 'Angry Icon',
      },
      {
        id: 'care-icon',
        iconSrc: CareSrc,
        tooltip: 'Care',
        alt: 'Care Icon',
      },
      {
        id: 'haha-icon',
        iconSrc: HahaSrc,
        tooltip: 'Haha',
        alt: 'Haha Icon',
      },
      {
        id: 'like-icon',
        iconSrc: LikeSrc,
        tooltip: 'Like',
        alt: 'Like Icon',
      },
      {
        id: 'love-icon',
        iconSrc: LoveSrc,
        tooltip: 'Love',
        alt: 'Love Icon',
      },
      {
        id: 'sad-icon',
        iconSrc: SadSrc,
        tooltip: 'Sad',
        alt: 'Sad Icon',
      },
      {
        id: 'wow-icon',
        iconSrc: WowSrc,
        tooltip: 'Wow',
        alt: 'Wow Icon',
      },
    ];
  }, []);
  return (
    <>
      <Stack
        direction={isVerticalAlign ? 'column' : 'row'}
        alignItems='center'
        justifyContent='center'
        spacing={2}
        paddingX={4}
        component={Paper}
        className={styles['reaction-container']}
        elevation={2}>
        {reactionItems.map((item) => (
          <Tooltip key={item.id} title={item.tooltip}>
            <Avatar
              src={item.iconSrc}
              alt={item.alt}
              component={Paper}
              elevation={2}
              className={styles['reaction-item']}
            />
          </Tooltip>
        ))}
      </Stack>
    </>
  );
};

export default memo(AppReactions);
