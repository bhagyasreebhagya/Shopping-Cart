import React from 'react';
import style from './ProductList.module.css'

const Notification = ({ message }) => (
  <div className={style.notification}>
    {message}
  </div>
);

export default Notification;
