import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, Typography } from '@mui/material';
import styles from './styles.module.scss';

const WelcomeDashboard = () => {
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
            <img src='https://picsum.photos/220/400' alt='#' />
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
          <Box className={styles.ca_img}>
            <img src='https://picsum.photos/220/400' alt='#' />
            <img src='https://picsum.photos/220/400' alt='#' />
          </Box>
        </Box>
        <Box className={styles.ca_blur}></Box>
      </Box>
      <Box className={styles.page1}>
        <Box className={styles.image}>
          <img src='https://picsum.photos/400/700' alt='#' />
          <Box className={styles.search}>
            <SearchIcon style={{ fontSize: '35px', color: 'black' }} /> Bữa tối với món gà
          </Box>
        </Box>
        <Box className={styles.content}>
          <Box style={{ maxWidth: '500px' }}>
            <Box className={styles.title}>Looking for ideas</Box>
            <Box className={styles.text}>
              What do you want to try next? Think about your favorite idea. Like an evening with chickens and pigs
            </Box>
            <Box>
              <button>Discover</button>
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
              <button>Discover</button>
            </Box>
          </Box>
        </Box>
        <Box className={styles.image}>
          <Box className={styles.left}>
            <Box>
              <img src='https://picsum.photos/400/400' alt='#' />
            </Box>
            <Box>
              <img src='https://picsum.photos/250/250' alt='#' />
            </Box>
          </Box>
          <Box className={styles.right}>
            <Box>
              <img src='https://picsum.photos/220/220' alt='#' />
            </Box>
            <Box>
              <img src='https://picsum.photos/160/160' alt='#' />
            </Box>
            <Box>
              <img src='https://picsum.photos/240/240' alt='#' />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.page3}>
        <Box className={styles.image}></Box>
        <Box className={styles.content}>
          <Box style={{ maxWidth: '500px' }}>
            <Box className={styles.title}>Watch, do, try, do</Box>
            <Box className={styles.text}>
              The best thing about Street Anywhere is discovering new content and ideas from people around the world.
            </Box>
            <Box>
              <button>Discover</button>
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
      <Box className={styles.footerFinal}>2016 - 2022 Happy new years 2023 ^^_^^</Box>
    </>
  );
};

export default WelcomeDashboard;
