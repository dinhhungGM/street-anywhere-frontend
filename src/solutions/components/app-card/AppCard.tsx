import { ChatBubble, KeyboardArrowUp, Share, VisibilityRounded } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { AppIcon } from '../app-icon';
import styles from './styles.module.scss';

type AppCardProps = {
  imgSrc: string;
  alt: string;
};

const AppCard = ({ imgSrc, alt }: AppCardProps) => {
  return (
    <>
      <Box className={styles.card}>
        <Box className={styles['card__actions']}>
          <Tooltip title='Quick view' placement='right-end'>
            <IconButton className={styles['card__actions__btn']}>
              <AppIcon component={KeyboardArrowUp} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Share' placement='right-end'>
            <IconButton className={styles['card__actions__btn']}>
              <AppIcon component={Share} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className={styles['card__image']}>
          <img src={imgSrc} alt={alt} />
          <Box className={styles['card__image__tags']}></Box>
        </Box>
        <Box className={styles['card__footer']}>
          <Stack direction='column'>
            <h3 className={styles['card__footer__caption']}>Rolling eyes mp4 demo</h3>
            <Stack direction='row' alignItems='center' justifyContent='space-between' marginTop={2}>
              <Box className={styles['card__footer__avatar']}>
                <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt='Avatar' />
                <span>king</span>
              </Box>
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Box className={styles['card__footer__info']}>
                  <AppIcon component={ChatBubble} color='#84849d' />
                  <span>0</span>
                </Box>
                <Box className={styles['card__footer__info']}>
                  <AppIcon component={VisibilityRounded} />
                  <span>0</span>
                </Box>
                <Box className={styles['card__footer__info']}>
                  <AppIcon component={KeyboardArrowUp} />
                  <span>0</span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AppCard;
