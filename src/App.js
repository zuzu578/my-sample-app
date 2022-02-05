import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Table,InputGroup,FormControl} from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';


axios.defaults.withCredentials = true;

const App = () =>{
  const [searchSongs, setSearchSongs] = useState('');
  const [songs, setSongs] = useState([]);
  const [Selected, setSelected] = useState("");
  const searchByName = (e) => {
    setSearchSongs(e.target.value);
  }
  const getSongs = () =>{
     axios({
      method:"GET",
      url:`http://localhost:3000/crawlling/?genre=${Selected}`
    }).then((res)=>{
      console.log(searchSongs)
      let search = new RegExp(searchSongs , 'i'); 
      let keyWord = res.data.filter(item => search.test(item));
      console.log(keyWord);
      if(keyWord.length === 0){
        alert('검색결과가 없습니다.');
        return false;
      }
      setSongs(keyWord)
    })
  }
const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(Selected);
};
const SelectBox = () => {
    return (
      <select  onChange={handleSelect} value={Selected}>
        <option key="game" value="game">게임뮤직</option>
        <option key="pops" value="pops">jpop</option>
        <option key="kids" value="kids">kids</option>
        <option key="anime" value="anime">애니메이션</option>
        <option key="vocaloid" value="vocaloid">보컬로이드</option>
        <option key="variety" value="variety">버라이어티</option>
        <option key="classic" value="classic">클래식</option>
        <option key="namco" value="namco">남코오리지널</option>
      </select>
    );
  };
  const RenderingSongList = () =>{
    return(
      <div className="tableArea">
      <Table striped bordered hover>
          <h1 className="songTitle">{Selected}</h1>
        <tbody>
          {songs.map((item,index)=>{
            return (
              <tr key={index}>
                <td>
                  <div>
                  <small className="smallFont_001">{item}</small>
                  </div>
                  </td>
              </tr>
            );
          })}
          
                 
        </tbody>
        </Table>
      </div>

      
    )
  }
  return(
    <div className="App">

      <h1> 수록곡 크롤링</h1>
  <div className="formArea">
  <InputGroup className="mb-3">
    <FormControl
      
      placeholder="곡이름을 검색하세요"
      onChange={searchByName}
      aria-describedby="basic-addon1"
    />
     <Button onClick={getSongs}>
        곡 가져오기 
      </Button>
      <SelectBox></SelectBox>
  </InputGroup>
  </div>
     

      <RenderingSongList></RenderingSongList>
    </div>
  )
}

export default App;
