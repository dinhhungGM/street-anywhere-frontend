import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const navigateToHome = (): void => {
    navigate('/home');
  };
  return (
    <>
      <Box style={{ height: '800px', position: 'relative' }}>
        <Box className={styles.carousel}>
          <Box className={styles.ca_title}>
            See Next Idea
            <br />
            <Typography>Nature Ideas</Typography>
          </Box>
        </Box>
        <Box className={styles.ca_list_img}>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/564x/57/34/13/573413216527571e0256193496b24f02.jpg' alt='#' />
            <img className='lazy' src='https://i.pinimg.com/564x/ba/5d/11/ba5d118df7b34bcd39526305952921a9.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/564x/90/d9/73/90d973cd4637f52f8b0cbe2e71ef3f7c.jpg' alt='#' />
            <img className='lazy' src='https://i.pinimg.com/736x/8d/ec/95/8dec957b2da18ce6a1f4b1c7fdff3ed4.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/736x/c9/2b/33/c92b335a3b6a920f28ce16c7585701d6.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/564x/2e/57/3c/2e573cfb0c5f733882f2b122ce56d97b.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/736x/01/75/0e/01750e79b49f2d256fa7a6ba17a2b454.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/564x/a9/f4/68/a9f468a00bfeeb705c9fc6ead66f99c2.jpg' alt='#' />
            <img className='lazy' src='https://i.pinimg.com/564x/e4/51/53/e451534987d71ac29ef10b636bfeb427.jpg' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img className='lazy' src='https://i.pinimg.com/564x/06/69/1c/06691c5c57f81e76debe03907291fcc0.jpg' alt='#' />
            <img className='lazy' src='https://i.pinimg.com/564x/f7/8d/e8/f78de893f8de5d157dee91ba66368904.jpg' alt='#' />
          </Box>
        </Box>
        <Box className={styles.ca_blur}></Box>
      </Box>
      <Box className={styles.page1}>
        <Box className={styles.image}>
          <img className='lazy' src='https://i.pinimg.com/564x/33/9e/10/339e1075b64e083508a163e1ea935613.jpg' alt='#' />
          <Box className={styles.search}>
            <SearchIcon style={{ fontSize: '35px', color: 'black' }} /> Having dinner with chicken
          </Box>
        </Box>
        <Box className={styles.content}>
          <Box style={{ maxWidth: '500px' }}>
            <Box className={styles.title}>Looking for ideas</Box>
            <Box className={styles.text}>
              What do you want to try next? Think about your favorite idea. Like an evening with
              chickens and pigs
            </Box>
            <Box>
              <button onClick={navigateToHome}>Discover</button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.page2}>
        <Box className={styles.content}>
          <Box style={{ maxWidth: '500px' }}>
            <Box className={styles.title}>Save ideas you like</Box>
            <Box className={styles.text}>Earning content you like so you can watch it later</Box>
            <Box>
              <button onClick={navigateToHome}>Discover</button>
            </Box>
          </Box>
        </Box>
        <Box className={styles.image}>
          <Box className={styles.left}>
            <Box>
              <img className='lazy' src='https://i.pinimg.com/564x/bb/70/40/bb704096070b10a4205f9856916204e8.jpg' alt='#' />
            </Box>
            <Box>
              <img className='lazy' src='https://picsum.photos/250/250' alt='#' />
            </Box>
          </Box>
          <Box className={styles.right}>
            <Box>
              <img className='lazy' src='https://picsum.photos/220/220' alt='#' />
            </Box>
            <Box>
              <img className='lazy' src='https://picsum.photos/160/160' alt='#' />
            </Box>
            <Box>
              <img className='lazy' src='https://picsum.photos/240/240' alt='#' />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.page3}>
        <Box className={styles.image}>
          <img
            className='lazy'
            src='https://images.unsplash.com/photo-1441239372925-ac0b51c4c250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=732&q=80'
            alt='Landing page'
          />
        </Box>
        <Box className={styles.content}>
          <Box style={{ maxWidth: '500px' }}>
            <Box className={styles.title}>Watch, do, try, do</Box>
            <Box className={styles.text}>
              The best thing about Street Anywhere is discovering new content and ideas from people
              around the world.
            </Box>
            <Box>
              <button onClick={navigateToHome}>Discover</button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box className={styles.footer}>
        <Box style={{ width: '80%' }}>
          <Box className={styles.info}>
            <Box>
              <Box className={styles.icon}>
                <LocalPhoneIcon />
              </Box>
              <p>12345678</p>
            </Box>
            <Box>
              <Box className={styles.icon}>
                <MailIcon />
              </Box>
              <p>12345rfnvirnvinriv678</p>
            </Box>
            <Box>
              <Box className={styles.icon}>
                <LocationOnIcon />
              </Box>
              <p>12345rfbirbfi678</p>
            </Box>
          </Box>
          <hr style={{ margin: '40px 0' }} />
          <Box className={styles.intro}>
            <Box>
              <p>About</p>
              <p>Our story</p>
              <p>Awards</p>
              <p>Our Team</p>
              <p>Career</p>
            </Box>
            <Box>
              <p>Company</p>
              <p>Our services</p>
              <p>Clients</p>
              <p>Contacts</p>
              <p>Press</p>
            </Box>
            <Box>
              <p>Resources</p>
              <p>Blog</p>
              <p>Newsletter</p>
              <p>Privacy Policy</p>
            </Box>
            <Box>
              <p>Subscribe</p>
              <TextField id='outlined-basic' label='Email Address' variant='outlined' />
              <p style={{ marginTop: '10px' }}>Get digital marketing updates in your mailbox</p>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default memo(WelcomeDashboard);
