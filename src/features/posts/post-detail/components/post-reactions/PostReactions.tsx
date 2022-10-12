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
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AppIcon } from '../../../../../solutions/components/app-icon';
import { IReaction, IReactionDetails, IUserReaction } from '../../../../../solutions/models/postModels';
import { postActions, postSelectors } from '../../../store';
import { default as reactionIconConfigs } from './reactionIconConfigs';
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

interface IReactionItemCountProps {
  reactionDetails?: IReactionDetails;
}
const ReactionItemCount = ({ reactionDetails }: IReactionItemCountProps) => {
  return <>{reactionDetails?.count ? <Typography marginLeft={1}>({reactionDetails?.count})</Typography> : null}</>;
};

interface IPostReactionsProps {
  currentUserId?: number;
  postId?: number;
}
const PostReactions = ({ currentUserId, postId }: IPostReactionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentUserReaction, setCurrentUserReaction] = useState<IUserReaction | null>(null);
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLDivElement>(null);
  const reactions = useAppSelector(postSelectors.selectReactions);
  const postReactionDetails = useAppSelector(postSelectors.selectPostReactionDetails); // select

  const handleMenuItemClick = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    if (index !== selectedIndex) {
      let response;
      const reactionId = reactions[index].id;
      if (_.isNull(currentUserReaction)) {
        response = await dispatch(
          postActions.addReactionAsync({
            reactionId,
            postId: postId,
            userId: currentUserId,
          }),
        );
      } else {
        response = await dispatch(
          postActions.updateReactionByPostReactionId({
            postReactionId: currentUserReaction.postReactionId,
            reactionId,
          }),
        );
      }
      if (response.meta.requestStatus === 'fulfilled') {
        setSelectedIndex(index);
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

  const deletePostReaction = async () => {
    if (_.isNil(currentUserReaction)) {
      handleToggle();
      return;
    }
    const res = await dispatch(postActions.deletePostReaction(currentUserReaction.postReactionId));
    if (res.meta.requestStatus === 'fulfilled') {
      setCurrentUserReaction(null);
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    dispatch(postActions.getReactionsAsync());
    dispatch(postActions.getReactionDetailsByPostIdAsync(postId));
  }, [selectedIndex]);

  useEffect(() => {
    setCurrentReactionOfCurrentUser();
  }, [postReactionDetails]);

  return (
    <>
      <Box position='relative'>
        <ButtonGroup variant='outlined' ref={anchorRef} aria-label='split button' fullWidth size='large'>
          <Button
            sx={{
              width: '30%',
            }}
          >
            <Typography marginRight={1}>({postReactionDetails?.reactionCountAll})</Typography>
            <AppIcon icon={AddReaction} color='#1976d2' />
          </Button>
          <Button onClick={deletePostReaction}>
            {currentUserReaction ? (
              <ReactionItem reaction={reactions[selectedIndex]} />
            ) : (
              <Typography>Add your reaction</Typography>
            )}
          </Button>
          {currentUserReaction && (
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
              <AppIcon icon={ArrowDropDown} color='#1976d2' />
            </Button>
          )}
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
                        <ReactionItemCount
                          reactionDetails={postReactionDetails?.reactionDetails[reactionItem.reactionType]}
                        />
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
