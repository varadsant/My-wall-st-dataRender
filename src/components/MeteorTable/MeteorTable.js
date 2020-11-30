import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './MeteorTable.css';



function MeteorTable(props) {


    const [meteorData, setMeteorData] = useState([]);

    useEffect(() => {
        fetchMeteorData();
    }, [])



    // generic function to compare elements of an array of objects based on a property
    const compare = (a, b, c) => {
        if (Number(a.mass) < Number(b.mass)) {
            return -1;
        }
        if (Number(a.mass) > Number(b.mass)) {
            return 1;
        }
        return 0;
    }

    const sortData = (colName) => {
        compare(null,null,colName);
    }

    // function to fetch meteor data from API
    const fetchMeteorData = () => {
        fetch("https://data.nasa.gov/resource/y77d-th95.json")
            .then(res => res.json())
            .then(
                (result) => {
                    // filtering array to only return those records which have year > 1900
                    const meteorsAfter1990 = result.filter(item => new Date(item.year).getFullYear() >= 1900);

                    // sorting meteorData array in ascending order based on their year
                    const sortedMeteorsAfter1990 = meteorsAfter1990.sort(compare);

                    // setting sorted array of meteor data in state of this component
                    setMeteorData(sortedMeteorsAfter1990);
                }
            )
            alert('Data Fetched Successful');
    }

    const tableStyle = {
    float:'left',
    width:'650px',
    overflow: 'auto',
    height: '500px',
    }

    return (
        <div className="meteorTable-wrapper" >
        <Button onClick={fetchMeteorData} color= 'primary' variant="contained">Fetch Satellite Data</Button>    
            <div className="meteorTable-title">
               <h1> Meteor Data </h1>
            </div>
            <TableContainer component={Paper}  style= {tableStyle}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Meteor Name</TableCell>
                            <TableCell>Year of sighting</TableCell>
                            <TableCell>Mass</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meteorData ? meteorData.map((meteor) => (
                            <TableRow
                                style={{cursor: 'pointer'}}
                                onClick={() => props.handleRowClick(meteor)}
                                key={meteor.name}>
                                <TableCell component="th" scope="row">
                                    {meteor.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {new Date(meteor.year).getFullYear()}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {meteor.mass}
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MeteorTable
