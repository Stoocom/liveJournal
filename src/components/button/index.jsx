import React, { Component } from 'react';
import style from './style.css'

export default class Button extends Component {
  
  onClick = () => {
    const { onClick, id } = this.props

    onClick && onClick(id); // сначала проверяется существует ли onClick потом вызывает следующую функцию
  }
  
  render() {
    return (
      <button 
        className={style.button} 
        onClick={this.onClick}
      >
        {this.props.children}
      </button> 
    );
  }
}
