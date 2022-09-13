import { SvgIcon } from '@mui/material';

type IconProps = {
  component: any;
  fontSize?: number;
  color?: string;
};

const Icon = ({ component, fontSize = 22, color = '#84849d' }: IconProps) => {
  return <SvgIcon component={component} inheritViewBox sx={{ fontSize, color }} />;
};

export default Icon;
