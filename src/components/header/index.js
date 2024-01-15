//
import { Box } from '@mui/material';
//
import bgPic from '../../assets/header-bg.jpg';
// ==============================================================

export const Header = props => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <img src={bgPic} alt="header" />;
        </Box>
    )
};