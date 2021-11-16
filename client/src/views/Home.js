import useMediaQuery from "@mui/material/useMediaQuery";
import Carousel from "../components/Home/Carousel";
import FlatContent from "../components/Home/FlatContent";

function MainContents() {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
  return (
    isSmallScreen ? <Carousel /> : <FlatContent />
  )
}

export default MainContents;
