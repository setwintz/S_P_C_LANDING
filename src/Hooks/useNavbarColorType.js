import { useSelector, useDispatch } from "react-redux";
import { handleNavBarColorType } from "../store/layout";

const useNavbarColorType = () => {
  const dispatch = useDispatch();
  const navbarColorType = useSelector((state) => state.layout.navBarColorType);
  const setNavbarColorType = (val) => dispatch(handleNavBarColorType(val));
  return [navbarColorType, setNavbarColorType];
};

export default useNavbarColorType;