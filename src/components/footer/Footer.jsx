import React from 'react'
import classes from './footer.module.css'


const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>HBT- Đại học Sư phạm Kỹ thuật TPHCM</p>
        </div>

        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: 1234567</span>
          <span>ToanHuynh1</span>
        </div>

        <div className={classes.col}>
          <h2>Location</h2>
          <span>Contry: Binh Duong</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer