import { firestore as db } from "firebase/firebase";
import { useEffect, useState } from "react";
import styles from "styles/home.module.css"
import CardComponent from "src/components/Card"
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card"

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState([])
  const [adminClick, setAdminClick] = useState(0)
  const [openSetting, setOpenSetting] = useState(false)
  const [value1, setValue1] = useState()
  const [value2, setValue2] = useState()
  const [value3, setValue3] = useState()
  const [bunsikWaiting, setBunsikWaiting] = useState([])
  const [hansikWaiting, setHansikWaiting] = useState([])
  const [dongasWaiting, setDongasWaiting] = useState([])
  const [chineseWaiting, setChineseWaiting] = useState([])
  const [pigWaiting, setPigWaiting] = useState([])
  const [ramenWaiting, setRamenWaiting] = useState([])
  const [malaWaiting, setMalaWaiting] = useState([])
  const [tangWaiting, setTangWaiting] = useState([])

  const [submitNumber, setSubmitNumber] = useState()
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    db.collection("kiosk").doc("startNumber").get().then((doc) => {
      setValue1(doc.data().first)
      setValue2(doc.data().second)
      setValue3(doc.data().third)
    })
    db.collection("menu").doc("분식")
        .onSnapshot((doc) => {
      setBunsikWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("한식")
        .onSnapshot((doc) => {
      setHansikWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("돈까스")
        .onSnapshot((doc) => {
      setDongasWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("짜장면&짬뽕")
        .onSnapshot((doc) => {
      setChineseWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("돼지갈비정식")
        .onSnapshot((doc) => {
      setPigWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("라면")
        .onSnapshot((doc) => {
      setRamenWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("마라샹궈")
        .onSnapshot((doc) => {
      setMalaWaiting(doc.data().waiting)
    });
    db.collection("menu").doc("갈비탕&육개장")
        .onSnapshot((doc) => {
      setTangWaiting(doc.data().waiting)
    });
  }, [])

  
  const menuList = ["김밥", "떡볶이", "순대", "오뎅", "한식", "돈까스", "짜장면", "짬뽕", "마라샹궈", "돼지갈비정식", "라면", "갈비탕","육개장"]
  
  const onMenuClick = (menu) => {
    let exist = false
    let temp = [...selectedMenu]
    for (let i = 0; i < selectedMenu.length; i++){
      if (selectedMenu[i].title===menu) {
        temp[i].value = temp[i].value + 1
        setSelectedMenu([...temp])
        exist = true
      }
    }
    if(!exist)
      setSelectedMenu([...selectedMenu, {title:menu, value: 1}])
  }

  const onSubmitClick = async (num) => {
    if (selectedMenu.length === 0)
      return
    const doc = await db.collection("kiosk").doc("number").get()
    let number
    if (num === 1) {
      number = doc.data().first + 1
      db.collection("kiosk").doc("number").update({ first: doc.data().first + 1 })
    }
    else if (num === 2) {
      number = doc.data().second + 1
      db.collection("kiosk").doc("number").update({second: doc.data().second+1})
    }
    else {
      number = doc.data().third + 1
      db.collection("kiosk").doc("number").update({third: doc.data().third+1})
    }
    setSubmitNumber(number)
    setOpenDialog(true)
  }

  const onPublishClick = () => {
    let orders = {
      num: submitNumber,
      bunsik: [],
      hansik: [],
      dongas: [],
      chinese: [],
      pig: [],
      ramen: [],
      mala: [],
      tang:[]
    }
    selectedMenu.forEach((menu) => {
      if (menu.title === "김밥" || menu.title === "떡볶이" || menu.title === "순대" || menu.title === "오뎅") {
        orders.bunsik.push(`${menu.title}${menu.value}`)
      } else if (menu.title === "한식") {
        orders.hansik.push(`${menu.title}${menu.value}`)
      } else if( menu.title==="돈까스"){orders.dongas.push(`${menu.title}${menu.value}`)}
      else if (menu.title==="짜장면"|| menu.title==="짬뽕"){ orders.chinese.push(`${menu.title}${menu.value}`)}
      else if(menu.title==="돼지갈비정식"){orders.pig.push(`${menu.title}${menu.value}`)}
      else if(menu.title==="라면"){orders.ramen.push(`${menu.title}${menu.value}`)}
      else if(menu.title==="마라샹궈"){orders.mala.push(`${menu.title}${menu.value}`)}
      else if(menu.title==="갈비탕" || menu.title==="육개장"){orders.tang.push(`${menu.title}${menu.value}`)}
    })
    if (orders.bunsik.length > 0) {
      db.collection("menu").doc("분식").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("분식").update({ waiting: [...doc.data().waiting, { orders: orders.bunsik, num:orders.num}] })
        else
          db.collection("menu").doc("분식").update({ waiting: [{ orders: orders.bunsik, num: orders.num }] })
      })
    }
    if (orders.hansik.length > 0) {
      db.collection("menu").doc("한식").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("한식").update({ waiting: [...doc.data().waiting, { orders: orders.hansik, num:orders.num}] })
        else
          db.collection("menu").doc("한식").update({ waiting: [{ orders: orders.hansik, num: orders.num }] })
      })
    }
    if (orders.dongas.length > 0) {
      db.collection("menu").doc("돈까스").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("돈까스").update({ waiting: [...doc.data().waiting, { orders: orders.dongas, num:orders.num}] })
        else
          db.collection("menu").doc("돈까스").update({ waiting: [{ orders: orders.dongas, num: orders.num }] })
      })
    }
    if (orders.chinese.length > 0) {
      db.collection("menu").doc("짜장면&짬뽕").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("짜장면&짬뽕").update({ waiting: [...doc.data().waiting, { orders: orders.chinese, num:orders.num}] })
        else
          db.collection("menu").doc("짜장면&짬뽕").update({ waiting: [{ orders: orders.chinese, num: orders.num }] })
      })
    }
    if (orders.pig.length > 0) {
      db.collection("menu").doc("돼지갈비정식").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("돼지갈비정식").update({ waiting: [...doc.data().waiting, { orders: orders.pig, num:orders.num}] })
        else
          db.collection("menu").doc("돼지갈비정식").update({ waiting: [{ orders: orders.pig, num: orders.num }] })
      })
    }
    if (orders.ramen.length > 0) {
      db.collection("menu").doc("라면").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("라면").set({ waiting: [...doc.data().waiting, { orders: orders.ramen, num:orders.num}] })
        else
          db.collection("menu").doc("라면").set({ waiting: [{ orders: orders.ramen, num: orders.num }] })
      })
    }
    if (orders.mala.length > 0) {
      db.collection("menu").doc("마라샹궈").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("마라샹궈").update({ waiting: [...doc.data().waiting, { orders: orders.mala, num:orders.num}] })
        else
          db.collection("menu").doc("마라샹궈").update({ waiting: [{ orders: orders.mala, num: orders.num }] })
      })
    }
    if (orders.tang.length > 0) {
      db.collection("menu").doc("갈비탕&육개장").get().then((doc) => {
        if(doc.data()&&doc.data().waiting)
          db.collection("menu").doc("갈비탕&육개장").update({ waiting: [...doc.data().waiting, { orders: orders.tang, num:orders.num}] })
        else
          db.collection("menu").doc("갈비탕&육개장").update({ waiting: [{ orders: orders.tang, num: orders.num }] })
      })
    }
    setSelectedMenu([])
    setOpenDialog(false)
    setSubmitNumber("0")
  }











  const onUndoClick = () => {
    const temp = selectedMenu
    let tempList = []
    for (let i = 0; i < temp.length-1; i++){
      tempList.push(temp[i])
    }
    setSelectedMenu(tempList)
  }

  const onAdminClick = () => {
    setAdminClick(adminClick+1)
    setTimeout(() => {
      setAdminClick(0)
    }, 3000)
    if (adminClick === 6) {
      setOpenSetting(true)
    }
      
  }

  const onSubmitSettingClick = () => {
    db.collection("kiosk").doc("startNumber").set({ first: value1, second: value2, third: value3 })
    console.log("success")
  }

  const onResetClick = () => {
    db.collection('kiosk').doc("number").set({ first: value1 - 1, second: value2 - 1, third: value3-1 })
    db.collection("menu").get().then((query) => {
      query.docs.map((doc) => {
        db.collection("menu").doc(doc.id).set({waiting:[], finished:[]})
      })
    })
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onPublishClick()
    }
  }

  return (
    <div>
      <div className={styles.content_container}>
        <Grid container spacing={1}>


          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>분식</h1>
                </Card>
              </Grid>
              {bunsikWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="분식" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>한식</h1>
                </Card>
              </Grid>
              {hansikWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="한식" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>돈까스</h1>
                </Card>
              </Grid>
              {dongasWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="돈까스" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", textAlign:"center" }}>
                  <h1>{`짜장면&짬뽕`}</h1>
                </Card>
              </Grid>
              {chineseWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="짜장면&짬뽕" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", textAlign:"center" }}>
                  <h1>돼지갈비정식</h1>
                </Card>
              </Grid>
              {pigWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="돼지갈비정식" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>라면</h1>
                </Card>
              </Grid>
              {ramenWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="라면" />
                )
              })}
              
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>마라샹궈</h1>
                </Card>
              </Grid>
              {malaWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="마라샹궈" />
                )
              })}
              
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2} sx={{mb:"0px"}}>
              <Grid item xs={1}>
                <Card sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h1>{`갈비탕&육개장`}</h1>
                </Card>
              </Grid>
              {tangWaiting?.map((item, index) => {
                if(index<5)
                return (
                  <CardComponent key={index} number={item.num} menu={item.orders} type="갈비탕&육개장" />
                )
              })}
              
            </Grid>
          </Grid>

          {openDialog ?
            <Grid item xs={2}>
              <div className={styles.dialog}  >
                <input className={styles.input} autoFocus onKeyPress={handleOnKeyPress} value={submitNumber} onChange={(e) => setSubmitNumber(e.target.value)} />
                <div className={styles.button} onClick={onPublishClick}>제출</div>
                <div className={styles.button2} onClick={()=>setOpenDialog(false)}>취소</div>
              </div>
            </Grid>
            :
          
            <Grid item xs={2}>
              <div className={styles.remote}>
                <Grid container spacing={2}>
                  {menuList.map((menu, index) => {
                    return (
                      <Grid item xs={6} onClick={() => onMenuClick(menu)}key={index}>
                        <p style={{
                          backgroundColor: "white", display: "flex",
                          height: "80px", fontSize: "20px", justifyContent:
                            "center", alignItems: "center", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
                        }} >
                          {menu}
                        </p>
                      </Grid>
                    )
                  })}
                  <Grid item xs={6} onClick={() => onSubmitClick(1)}>
                    <p style={{
                      backgroundColor: "blue", display: "flex", color: "white",
                      height: "80px", fontSize: "20px", justifyContent:
                        "center", alignItems: "center", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
                    }}>
                      키오스크 1
                    </p>
                  </Grid>
                  <Grid item xs={6} onClick={() => onSubmitClick(2)}>
                    <p style={{
                      backgroundColor: "red", display: "flex", color: "white",
                      height: "80px", fontSize: "20px", justifyContent:
                        "center", alignItems: "center", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
                    }}>
                      키오스크 2
                    </p>
                  </Grid>
                  <Grid item xs={6} onClick={() => onSubmitClick(3)}>
                    <p style={{
                      backgroundColor: "green", display: "flex", color: "white",
                      height: "80px", fontSize: "20px", justifyContent:
                        "center", alignItems: "center", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
                    }}>
                      키오스크 3
                    </p>
                  </Grid>
                  <Grid item xs={12} onClick={onUndoClick}>
                    <p style={{
                      backgroundColor: "purple", display: "flex", color: "white",
                      height: "100px", fontSize: "20px", justifyContent:
                        "center", alignItems: "center", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
                    }}>
                      Undo
                    </p>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          }
        </Grid>
      </div>
      {selectedMenu.length !== 0 && 
        <div className={styles.selected} style={{display: "flex", flexWrap:"wrap"}}>
          {selectedMenu.map((menu, index) => {
            console.log(selectedMenu)
            return (
              <p key={index}>{menu.title}{menu.value}, </p>
              )
            })
          }
        </div>
      }
      <div className={styles.admin} onClick={onAdminClick}></div>
      {openSetting && 
        <div className={styles.setting}>
          <div className={styles.close} onClick={()=>setOpenSetting(false)}>X</div>
          <input value={value1} onChange={(e)=>setValue1(e.target.value)}></input>
          <input value={value2} onChange={(e) => setValue2(e.target.value)}></input>
          <input value={value3} onChange={(e) => setValue3(e.target.value)}></input>
          <div onClick={onResetClick}>초기화</div>
          <h1 onClick={onSubmitSettingClick} >적용</h1>
        </div>
      }
    </div>
  )
}

export default Home;