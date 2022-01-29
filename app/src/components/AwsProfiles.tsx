import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as fs from 'fs';

interface AwsProfilesProps {
    setSelectedAwsProfile: (value: string) => void;
}

const AwsProfiles = ({ setSelectedAwsProfile }: AwsProfilesProps) => {
    const [profile, setProfile] = React.useState('');
    const [profileList, setProfileList] = React.useState([]);
    const handleChange = (event: any) => {
        const profile = event.target.value;
        setProfile(profile);
        setSelectedAwsProfile(profile);
    };

    useEffect(() => {
        console.log('env home:', `${process.env.HOME}`);
        fs.readFile(`${process.env.HOME}/.aws/credentials`, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const lines = data.split('\n');
            const profiles = lines.filter(line => line.startsWith('[')).map(line => line.replace(/\[|\]/g, ''));
            setProfileList(profiles);

        });
    }, [])


    return (<Box sx={{ minWidth: 120 }}><FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">AWS Profile</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={profile}
            label="AWS Profiles"
            onChange={handleChange}
        >
            {profileList.map((profile) => <MenuItem key={profile} value={profile}>{profile}</MenuItem>)}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty test</MenuItem> */}
        </Select>
    </FormControl> </Box>);
}

export default AwsProfiles
