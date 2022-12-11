import { Box, Paper, Stack } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { IReactedPost } from '../../../features/user/userModels';
import { AppReactButton } from '../app-react-button';
import styles from './styles.module.scss';

interface IAppReactionsProps {
  isVerticalAlign?: boolean;
  onClickReactionIcon?: (e) => any;
  boxShadowSize?: number;
  isReacted?: boolean;
  reactedDetail?: IReactedPost;
}

const AppReactions = ({
  isVerticalAlign = false,
  onClickReactionIcon = (e) => null,
  boxShadowSize = 0,
  isReacted,
  reactedDetail,
}: IAppReactionsProps) => {

  const handleClickReactionItem = (reactionType: string) => {
    onClickReactionIcon(reactionType);
  };

  const reactionItems = useMemo(() => {
    return ['Angry', 'Care', 'HaHa', 'Like', 'Love', 'Sad', 'Wow', 'Remove'];
  }, []);

  const isReactedItem = (type): boolean => {
    return isReacted && type === reactedDetail.reactionType;
  };

  return (
    <>
      <Stack
        direction={isVerticalAlign ? 'column' : 'row'}
        alignItems='center'
        justifyContent='center'
        spacing={2}
        paddingX={isVerticalAlign ? 1 : 4}
        component={Paper}
        className={styles['reaction-container']}
        elevation={boxShadowSize}>
        {reactionItems.map((item, idx) => {
          if (isReactedItem(item)) {
            return (
              <Box className={styles.active} key={idx}>
                <AppReactButton type={item} onClickReaction={handleClickReactionItem} />
              </Box>
            );
          } else {
            return <AppReactButton key={idx} type={item} onClickReaction={handleClickReactionItem} />;
          }
        })}
      </Stack>
    </>
  );
};

export default memo(AppReactions);
