import { useEffect, useState } from "react"
import { firestore as db } from "firebase/firebase"
import styles from "styles/customer.module.css"
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card"

import Dialog from "src/components/Dialog"

const Customer = () => {
  const [menus, setMenus] = useState([])

  const [bunsikFinished, setBunsikFinished] = useState([])
  const [hansikFinished, setHansikFinished] = useState([])
  const [dongasFinished, setDongasFinished] = useState([])
  const [chineseFinished, setChineseFinished] = useState([])
  const [pigFinished, setPigFinished] = useState([])
  const [ramenFinished, setRamenFinished] = useState([])
  const [malaFinished, setMalaFinished] = useState([])
  const [tangFinished, setTangFinished] = useState([])

  const [newNum, setNewNum] = useState([])
  


  useEffect(() => {
    let list=[]
    db.collection("menu").get().then((query) => {
      query.docs.forEach((doc) => {
        list.push(doc.id)
      })
      setMenus(list)
    })
    db.collection("newNumber").doc("newNumber")
      .onSnapshot((doc) => {
        const value = doc.data().value
        setNewNum([...newNum, value])
        setTimeout(() => {
          const result = newNum.filter(num => num!==value)
          setNewNum([...result])
        },7000)
    });

    db.collection("menu").doc("분식")
      .onSnapshot((doc) => {
          setBunsikFinished(doc.data().finished)
    });
    db.collection("menu").doc("한식")
        .onSnapshot((doc) => {
      setHansikFinished(doc.data().finished)
    });
    db.collection("menu").doc("돈까스")
        .onSnapshot((doc) => {
      setDongasFinished(doc.data().finished)
    });
    db.collection("menu").doc("짜장면&짬뽕")
        .onSnapshot((doc) => {
      setChineseFinished(doc.data().finished)
    });
    db.collection("menu").doc("돼지갈비정식")
        .onSnapshot((doc) => {
      setPigFinished(doc.data().finished)
    });
    db.collection("menu").doc("라면")
        .onSnapshot((doc) => {
      setRamenFinished(doc.data().finished)
    });
    db.collection("menu").doc("마라샹궈")
        .onSnapshot((doc) => {
      setMalaFinished(doc.data().finished)
    });
    db.collection("menu").doc("갈비탕&육개장")
        .onSnapshot((doc) => {
      setTangFinished(doc.data().finished)
    });
  },[])
  return (
    <div className={styles.main_container}>
      <Grid container >
        {menus.map((menu, index) => {
          return (
            <Grid item xs={1.3} key={index} style={{paddingTop: "10px"}} className={index%2===0 && styles.container}>
              <Grid container spacing={2}>
                <Grid item xs={12} className={styles.menu_container}>
                  <h1>{menu}</h1>
                </Grid>
                {menu === "분식" &&
                  bunsikFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }
                
                {menu === "한식" &&
                  hansikFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "갈비탕&육개장" &&
                  tangFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "돈까스" &&
                  dongasFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "돼지갈비정식" &&
                  pigFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "라면" &&
                  ramenFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "마라샹궈" &&
                  malaFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }

                {menu === "짜장면&짬뽕" &&
                  chineseFinished?.map((number, index) => {
                    if(index<15)
                    return (
                      <Grid item xs={12} className={styles.number_container} key={index}>
                        {newNum.includes(number) ?
                          <p className={styles.new_effect}>{number}</p>
                          :
                          <p>{number}</p>
                        }
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Customer