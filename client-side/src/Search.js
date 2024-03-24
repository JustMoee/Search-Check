// client/src/SQLiteDataTable.js
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./App.css"

const Search = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleRadioChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {

    if (!selectedCategory) {
      alert('You have to pick the category of the search');
      return;
    }
    
    if (searchValue === "") {
      alert('You have to input a value');
      return;
    }

    fetch(`http://localhost:5000/search?query=${searchValue}&category=${selectedCategory}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setData([{result: 'No result'}]);
        } else {
          setData(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <h1 className='mainHeader'>Search&Check</h1>
      <div className="form">
        <OutlinedInput sx={{ width: 1300, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 30, borderTopLeftRadius: 30, height: 50, paddingLeft: 1}}
         value={searchValue} onChange={handleSearchInputChange}>
        <TextField label="Size" id="outlined-size-small" variant="outlined" size="small" value={searchValue} onChange={handleSearchInputChange} />
        </OutlinedInput>
        <Button variant="contained" onClick={handleSearch} sx={{ width: 200, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 30, borderBottomRightRadius: 30, fontWeight: "bold" }}>Search</Button>
      </div>
      <div>

        <FormControl sx={{ paddingBottom: 10}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Search category</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="accID" checked={selectedCategory === 'accID'} onChange={() => handleRadioChange('accID')} 
        control={<Radio />} label="Account ID" sx={{ color: '#000000'}} />
        <FormControlLabel value="nameEN" checked={selectedCategory === 'nameEN'} onChange={() => handleRadioChange('nameEN')} 
        control={<Radio />} label="Name(EN)" sx={{ color: '#000000'}} />
        <FormControlLabel value="nameAR" checked={selectedCategory === 'nameAR'} onChange={() => handleRadioChange('nameAR')} 
        control={<Radio />} label="Name(AR)" sx={{ color: '#000000'}} />
        <FormControlLabel value="nameC" checked={selectedCategory === 'nameC'} onChange={() => handleRadioChange('nameC')} 
        control={<Radio />} label="Name(C)" sx={{ color: '#000000'}} />
        <FormControlLabel value="services" checked={selectedCategory === 'services'} onChange={() => handleRadioChange('services')} 
        control={<Radio />} label="Services" sx={{ color: '#000000'}} />
        <FormControlLabel value="contractStatus" checked={selectedCategory === 'contractStatus'} onChange={() => handleRadioChange('contractStatus')} 
        control={<Radio />} label="Contract Status" sx={{ color: '#000000'}} />
        <FormControlLabel value="expiryDate" checked={selectedCategory === 'expiryDate'} onChange={() => handleRadioChange('expiryDate')} 
        control={<Radio />} label="Expiry Date" sx={{ color: '#000000'}} />
        <FormControlLabel value="notes" checked={selectedCategory === 'notes'} onChange={() => handleRadioChange('notes')} 
        control={<Radio />} label="Notes" sx={{ color: '#000000'}} />
      </RadioGroup>
    </FormControl>
      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell align="right">Name(EN)</TableCell>
            <TableCell align="right">Name(AR)</TableCell>
            <TableCell align="right">Name(C)</TableCell>
            <TableCell align="right">Services</TableCell>
            <TableCell align="right">Contract Status</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, index) => (
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.entries(row).map(([key, value]) => (  
          <TableCell align="right">{value}</TableCell>
          ))}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Search;
