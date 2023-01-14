import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">ExtraMinty</Translate>
    </span>
    <span className="navbar-version">{VERSION}</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Features = () => (
  <NavItem>
    <NavLink tag={Link} to="/features" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.features">Features</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Rewards = () => (
  <NavItem>
    <NavLink tag={Link} to="/rewards" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.rewards">Rewards</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const About = () => (
  <NavItem>
    <NavLink tag={Link} to="/about" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.about">About</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Budget = () => (
  <NavItem>
    <NavLink tag={Link} to="/userbudget" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.budget">Budget</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const UserAccount = () => (
  <NavItem>
    <NavLink tag={Link} to="/useraccount" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.useraccount">Account</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Peppermint = () => (
  <NavItem>
    <NavLink tag={Link} to="/userpeppermint" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.peppermint">Peppermint</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Profile = () => (
  <NavItem>
    <NavLink tag={Link} to="/userprofile" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.profile">Profile</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Userhome = () => (
  <NavItem>
    <NavLink tag={Link} to="/userhome" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);