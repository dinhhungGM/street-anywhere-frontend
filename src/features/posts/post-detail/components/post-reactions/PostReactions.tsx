import { Close } from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AppIcon } from '../../../../../solutions/components/app-icon';
import { IReaction } from '../../../../../solutions/models/postModels';
import { postActions, postSelectors } from '../../../store';
import { default as reactionIconConfigs } from './reactionIconConfigs';
import styles from './styles.module.scss';

interface IReactionValue {
  reactionId?: number;
  count?: number;
  users?: number[];
}

interface IPostReactionsProps {
  currentUserId?: number;
  postId?: number;
  reactionDetails?: any;
}

interface IReactionItemProps {
  reaction?: IReaction;
}

const ReactionItem = ({ reaction }: IReactionItemProps) => {
  return (
    <>
      {reactionIconConfigs[reaction.reactionType.toLowerCase()]}
      <Typography marginLeft={2}>{reaction.reactionType}</Typography>
    </>
  );
};

const PostReactions = ({ currentUserId, postId, reactionDetails }: IPostReactionsProps) => {
  const dispatch = useAppDispatch();
  const [reactionId, setReactionId] = useState<string | null>(null);
  const reactions = useAppSelector(postSelectors.selectReactions);

  const handleSelectReaction = (event: SelectChangeEvent) => {
    setReactionId((prevReaction) => {
      const newReaction = event.target.value as string;
      addReaction(+newReaction);
      return newReaction;
    });
  };

  const addReaction = async (reactionId: number) => {
    dispatch(
      postActions.addReactionAsync({
        reactionId,
        postId: postId,
        userId: currentUserId,
      }),
    );
  };

  useEffect(() => {
    dispatch(postActions.getReactionsAsync());
  }, []);

  return (
    <>
      <Box position='relative'>
        <FormControl fullWidth>
          <InputLabel htmlFor='react'>React</InputLabel>
          <Select
            value={reactionId}
            id='react'
            onChange={handleSelectReaction}
            variant='standard'
            displayEmpty
            className={styles.custom__select}
          >
            {reactions.map((reaction) => (
              <MenuItem key={reaction.id} value={reaction.id}>
                <ReactionItem reaction={reaction} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box position='absolute' className={styles['clear-reaction']}>
          <AppIcon component={Close} fontSize={28} color='#e60023' />
        </Box>
      </Box>
    </>
  );
};

export default memo(PostReactions);
