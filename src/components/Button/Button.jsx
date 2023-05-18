import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => (
  <ButtonMore onClick={onClick}>{children}</ButtonMore>
);

Button.propType = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};
