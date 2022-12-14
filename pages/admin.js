import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card"
import { firestore as db } from "firebase/firebase";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Admin = () => {
  const [menus, setMenus] = useState([])
  const [selectedMenu, setSelectedMenu] = useState()
  const [bunsikWaiting, setBunsikWaiting] = useState([])
  const [hansikWaiting, setHansikWaiting] = useState([])
  const [dongasWaiting, setDongasWaiting] = useState([])
  const [chineseWaiting, setChineseWaiting] = useState([])
  const [pigWaiting, setPigWaiting] = useState([])
  const [ramenWaiting, setRamenWaiting] = useState([])
  const [malaWaiting, setMalaWaiting] = useState([])
  const [tangWaiting, setTangWaiting] = useState([])

  const [selectedNum, setSelectedNum] = useState()

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClickOpen = () => {
    setOpenConfirm(true);
  };

  const handleNo = () => {
    setOpenConfirm(false);
  };
  const handleYes = () => {
    let list = []
    setOpenConfirm(false);
    db.collection("menu").doc(selectedMenu).get().then((doc) => {
      doc.data().waiting.map((item) => {
        if(item.num!==selectedNum)
          list.push(item)
      })
      db.collection("menu").doc(selectedMenu).update({ waiting: list })
      if(doc.data().finished===undefined)
        db.collection("menu").doc(selectedMenu).update({finished:[selectedNum]})
      else {
        db.collection("menu").doc(selectedMenu).get().then((doc) => {
          db.collection("menu").doc(selectedMenu).update({ finished: [selectedNum, ...doc.data().finished] })
          console.log([selectedNum, ...doc.data().finished])
        })
      }
      db.collection("newNumber").doc("newNumber").set({value: selectedNum})
    })
  }

  useEffect(() => {
    let list = []
    db.collection("menu").get().then((query) => {
      query.docs.forEach((doc) => {
        list.push(doc.id)
      })
      setMenus(list)
      console.log(list)
    })

    db.collection("menu").doc("??????")
        .onSnapshot((doc) => {
      setBunsikWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("??????")
        .onSnapshot((doc) => {
      setHansikWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("?????????")
        .onSnapshot((doc) => {
      setDongasWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("?????????&??????")
        .onSnapshot((doc) => {
      setChineseWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("??????????????????")
        .onSnapshot((doc) => {
      setPigWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("??????")
        .onSnapshot((doc) => {
      setRamenWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("????????????")
        .onSnapshot((doc) => {
      setMalaWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("?????????&?????????")
        .onSnapshot((doc) => {
      setTangWaiting(doc.data().waiting)
    });
  }, [])
  
  const onCardClick = (menu) => {
    setSelectedMenu(menu)
  }

  const onMenuClick = (num) => {
    setSelectedNum(num)
    setOpenConfirm(true)
  }


  return (
    <div style={{width:"100%", padding:"18px 12px"}}>
      <Grid container spacing={1}>
        {menus.map((menu, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card style={{textAlign:"center", fontSize:"23px", padding:"3px 4px", height:"30px"}} onClick={()=>onCardClick(menu)}>
                {menu}
              </Card>
            </Grid>
          )
        })}
      </Grid>
      <h1 style={{ color: "white", marginTop: "20px", fontSize: "30px", marginBottom:"15px" }}>{selectedMenu}</h1>
      {selectedMenu === "??????" &&
        <Grid container spacing={2}>
          {bunsikWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      
      {selectedMenu === "?????????&?????????" &&
        <Grid container spacing={2}>
          {tangWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      {selectedMenu === "?????????" &&
        <Grid container spacing={2}>
          {dongasWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      {selectedMenu === "??????????????????" &&
        <Grid container spacing={2}>
          {pigWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      {selectedMenu === "??????" &&
        <Grid container spacing={2}>
          {ramenWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      {selectedMenu === "????????????" &&
        <Grid container spacing={2}>
          {malaWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }

      {selectedMenu === "?????????&??????" &&
        <Grid container spacing={2}>
          {chineseWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }
      {selectedMenu === "??????" &&
        <Grid container spacing={2}>
          {hansikWaiting.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <Card style={{padding:"30px 6px"}} onClick={()=>onMenuClick(item.num)}>
                  <h1 style={{ fontSize: "19px", fontWeight: "bold", marginBottom:"10px" }} >
                    {item.num}
                  </h1>
                  <Grid container spacing={1}>
                    {item.orders?.map((item, index) => {
                      return (
                        <Grid item xs={6} key={index}>
                          <h1 style={{fontSize: "25px", fontWeight:"bold"}}>{item}</h1>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }


      {openConfirm &&
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={openConfirm}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"?????? ?????? ??????"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedNum}??? ????????? ?????????????????????????
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} style={{color:"red"}}>?????????</Button>
          <Button onClick={handleYes} autoFocus>
            ???
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
      }
    </div>
  )
}

export default Admin