import { AddReaction, ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AppIcon } from '../../../../../solutions/components/app-icon';
import { IReaction, IReactionDetails, IUserReaction } from '../../../../../solutions/models/postModels';
import { postActions, postSelectors } from '../../../store';
import { default as reactionIconConfigs } from './reactionIconConfigs';
import _ from 'lodash';
interface IPostReactionsProps {
  currentUserId?: number;
  postId?: number;
}

interface IReactionItemProps {
  reaction?: IReaction;
}

const ReactionItem = ({ reaction }: IReactionItemProps) => {
  return (
    <>
      {reactionIconConfigs[reaction?.reactionType?.toLowerCase()]}
      <Typography marginLeft={2}>{reaction?.reactionType}</Typography>
    </>
  );
};

const PostReactions = ({ currentUserId, postId }: IPostReactionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentUserReaction, setCurrentUserReaction] = useState<IUserReaction | null>(null);
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLDivElement>(null);
  const reactions = useAppSelector(postSelectors.selectReactions);
  const postReactionDetails = useAppSelector(postSelectors.selectPostReactionDetails);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      const reactionId = reactions[index].id;
      if (_.isNull(currentUserReaction)) {
        addReaction(reactionId);
      } else {
        updateReaction(reactionId);
      }
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setIsOpen(false);
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

  const updateReaction = async (reactionId: number) => {
    dispatch(
      postActions.updateReactionByPostReactionId({
        postReactionId: currentUserReaction.postReactionId,
        reactionId,
      }),
    );
  };

  const setCurrentReactionOfCurrentUser = (): void => {
    if (_.isNil(postReactionDetails) || _.isEmpty(postReactionDetails)) {
      return;
    }
    for (const reactionType in postReactionDetails?.reactionDetails) {
      const reactionDetails = postReactionDetails?.reactionDetails[reactionType] as IReactionDetails;
      const userReaction = _.find(reactionDetails?.users, (user) => user.userId === currentUserId);
      if (userReaction) {
        setCurrentUserReaction(userReaction);
        const idxOfReaction = _.findIndex(reactions, (reactionItem) => reactionItem.reactionType === reactionType);
        setSelectedIndex(idxOfReaction);
        return;
      }
    }
  };

  useEffect(() => {
    dispatch(postActions.getReactionsAsync());
    dispatch(postActions.getReactionDetailsByPostIdAsync(postId));
  }, []);

  useEffect(() => {
    setCurrentReactionOfCurrentUser();
  }, [postReactionDetails]);

  return (
    <>
      <Box position='relative'>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' spacing={2}>
            <AppIcon component={AddReaction} />
            <Typography>{postReactionDetails?.reactionCountAll || 0}</Typography>
          </Stack>
        </Stack>
        <ButtonGroup variant='outlined' ref={anchorRef} aria-label='split button' fullWidth>
          <Button>
            <ReactionItem reaction={reactions[selectedIndex]} />
          </Button>
          <Button
            size='small'
            aria-controls={isOpen ? 'split-button-menu' : undefined}
            aria-expanded={isOpen ? 'true' : undefined}
            aria-label='select merge strategy'
            aria-haspopup='menu'
            onClick={handleToggle}
            sx={{
              width: '20%',
            }}
          >
            <AppIcon component={ArrowDropDown} color='#1976d2' />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={isOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                width: '100%',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id='split-button-menu' autoFocusItem>
                    {reactions.map((reactionItem, idx) => (
                      <MenuItem
                        key={reactionItem.id}
                        selected={idx === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, idx)}
                      >
                        <ReactionItem reaction={reactionItem} />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

export default memo(PostReactions);
