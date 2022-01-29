import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AwsProfiles = () => {
    const [profile, setProfile] = React.useState('');
    const handleChange = (event: any) => {
        setProfile(event.target.value);
    };


    return (<Box sx={{ minWidth: 120 }}><FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">AWS Profile</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={profile}
            label="AWS Profiles"
            onChange={handleChange}
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </FormControl> </Box>);
}

export default AwsProfiles
