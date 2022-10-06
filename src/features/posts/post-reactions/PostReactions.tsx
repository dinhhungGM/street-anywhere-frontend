import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IReaction } from '../../../solutions/models/postModels';
import { postActions, postSelectors } from '../store';
import { default as reactionIconConfigs } from './reactionIconConfigs';
import styles from './styles.module.scss';

interface IPostReactionsProps {
  currentUserId: number;
  postId: number;
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

const PostReactions = ({ currentUserId, postId }: IPostReactionsProps) => {
  const dispatch = useAppDispatch();
  const [reactionId, setReactionId] = useState<string | null>(null);
  const reactions = useAppSelector(postSelectors.selectReactions);

  const handleSelectReaction = (event: SelectChangeEvent) => {
    setReactionId(event.target.value as string);
  };

  useEffect(() => {
    dispatch(postActions.getReactionsAsync());
  }, []);

  return (
    <>
      <Box>
        <FormControl fullWidth>
          <InputLabel htmlFor='react'>React</InputLabel>
          <Select
            value={reactionId}
            id='react'
            label='React'
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
      </Box>
    </>
  );
};

export default memo(PostReactions);
