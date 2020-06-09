import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'

let ItemWidth = 40;
let MarginButton= 10;
let displayItemsCount = 6;

let styles ={
    ScrollBar: {
        margin: "0 auto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        margin: "10px",
        height: "25px",
        width: "25x",
        borderRadius: "4px",
        color: "rgba(0,0,0,.3)",
        boxShadow: "0 3px 7px -2px rgba(0,0,0, .3)",
        zIndex: '100',
        borderStyle: "none",
        outline: "none",
        cursor: "pointer"
    },
    left: {
        marginRight: 0
    },
    right: {
        marginLeft: 0
    },
    ScrollContainer: {
        width: `calc(${ItemWidth * displayItemsCount + MarginButton * displayItemsCount}px)`,
        overflow: "hidden",
        display: "flex",
        margin: 0
    },
    ScrollItem: {
        minWidth: `${ItemWidth-20}px`,
        padding: "10px",
        marginRight: `${MarginButton}px`,
        transition: "all 0.2s ease-in"
    },
    hidden: {
        display: "none"
    }
}

class Scrollbar extends Component {

    
    static defaultProps = {
        items: [1,2,3,4,5,6,7,8,9,10,11,12,13] /*[1,2,3,4]*/,
        scrollSize: 6
    }

    constructor(props) {
        super(props)
        this.state = {
            transition: 0,
            sIndex: 0,
            isScrollable: this.props.items.length > displayItemsCount
        }
        this.leftButtonClick = this.leftButtonClick.bind(this)
        this.rightButtonClick = this.rightButtonClick.bind(this)
    }

    leftButtonClick() {
        this.setState({transition : this.state.transition + ItemWidth + 10 , sIndex: this.state.sIndex - 1})
    }

    rightButtonClick() {
        this.setState({transition : this.state.transition - ItemWidth - 10 , sIndex: this.state.sIndex + 1})
    }    

    render() {
        let {classes,items,scrollSize} = this.props
        let {transition,sIndex,isScrollable} = this.state
        let displayItems = items.map((item,idx) => <div className={classes.ScrollItem} key={idx}  style={{transform:`translateX(${transition}px)`}}>{item}</div>)
        return (
            <div className={classes.ScrollBar}>
                {isScrollable && 
                <button 
                className={`${classes.button} ${classes.left} ${sIndex === 0 && classes.hidden}`} 
                onClick={this.leftButtonClick} disabled={sIndex === 0}
                >&larr;
                </button>
                }
                <div className={classes.ScrollContainer}>
                    {displayItems}
                </div>
                {isScrollable && 
                <button 
                className={`${classes.button} ${classes.right} ${sIndex === items.length - scrollSize && classes.hidden}`} 
                onClick={this.rightButtonClick} 
                disabled={sIndex === items.length - scrollSize}
                >&rarr;
                </button>
                }

            </div>
        )
    }
}

export default withStyles(styles)(Scrollbar)
