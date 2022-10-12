import { SvgIcon } from '@mui/material';

type IconProps = {
  icon: any;
  fontSize?: number;
  color?: string;
};

const AppIcon = ({ icon, fontSize = 22, color = '#84849d' }: IconProps) => {
  return <SvgIcon component={icon} inheritViewBox sx={{ fontSize, color }} />;
};

export default AppIcon;
