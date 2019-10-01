import React from 'react';

import NavigationItem from '../NavigationItem/NavigationItem'
import classes from'./NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem href="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem href="/orders">Orders</NavigationItem>: null}
        {props.isAuthenticated ? <NavigationItem href="/logout">Logout</NavigationItem> : <NavigationItem href="/auth">Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;