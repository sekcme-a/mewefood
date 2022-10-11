import { useEffect, useState } from 'react';

import { firestore as db } from 'firebase/firebase';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({ number, menu, type, index }) {
  const [isOpenSetting, setIsOpenSetting] = useState(false)
  const [num, setNum] = useState()
  useEffect(() => {
    setNum(number)
  }, [])
  
  const onMouseRightClick = (e) => {
    e.preventDefault()
    setIsOpenSetting(true)
  }
  const onBackClick = () => {setIsOpenSetting(false)}

  const onDeleteClick = () => {
    let list = []
    db.collection("menu").doc(type).get().then((doc) => {
      doc.data().waiting.forEach((item) => {
        if (item.num !== number) {
          list.push(item)
        }
      })
      db.collection("menu").doc(type).update({waiting: list})
    })
    setIsOpenSetting(false)
  }
  const onSubmitClick = () => {
    let list = []
    db.collection("menu").doc(type).get().then((doc) => {
      doc.data().waiting.forEach((item) => {
        if (item.num !== number)
          list.push(item)
        else {
          list.push({...item, num:num, })
        }
      })
      db.collection("menu").doc(type).update({waiting: list})
    })
    setIsOpenSetting(false)
  }
  return (
    <Grid item xs={2.1} key={index}>
      <Card sx={{ height: "100px", padding: "0", }} onContextMenu={onMouseRightClick}>
        <CardContent style={{ padding: "5px 7px" }}>
          {isOpenSetting ? 
            <>
              <div style={{color:"blue",fontWeight:"bold", cursor:"pointer", marginLeft: "80px"}} onClick={onBackClick}>나가기</div>
              <div style={{color:"red",fontWeight:"bold", cursor:"pointer",marginTop:"10px"}} onClick={onDeleteClick}>삭제</div>
              <input style={{fontWeight:"bold", fontSize:"21px", marginTop: "2px"}} value={num} onChange={(e)=>setNum(e.target.value)} autoFocus/>
              <div style={{color:"red",fontWeight:"bold", marginTop:"3px", cursor:"pointer"}} onClick={onSubmitClick}>적용</div>
            </>  
            :
            <>
              <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                {num}
              </h1>
              <Grid container spacing={1}>
                {menu?.map((item, index) => {
                  return (
                    <Grid item xs={6} key={index}>
                      <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                    </Grid>
                  )
                })}
              </Grid>
            </>
        }

        </CardContent>
      </Card>
    </Grid>
  );
}
