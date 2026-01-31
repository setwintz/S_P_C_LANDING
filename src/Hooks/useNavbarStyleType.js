import { useSelector, useDispatch } from "react-redux";
import { handleNavBarStyleType } from "../store/layout";

const useNavbarStyleType = () => {
  const dispatch = useDispatch();
  const navbarStyleType = useSelector((state) => state.layout.navBarStyleType);
  const setNavbarStyleType = (val) => dispatch(handleNavBarStyleType(val));
  return [navbarStyleType, setNavbarStyleType];
};

export default useNavbarStyleType;