import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'galio-framework';
import theme from '../../config/theme';

const MenuIcon = ({ name, family, focused }) => (
  <Icon
    name={name}
    family={family}
    size={theme.SIZES.FONT}
    color={focused ? theme.COLORS.WHITE : '#5D5D5D'}
  />
);

MenuIcon.propTypes = {
  name: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default MenuIcon;
