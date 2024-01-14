import EmptyHolder from "../assets/img/emptyHolder.svg";
import AppIcon from "../assets/img/appIcon.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  boxSizing: "border-box",
});

const Logo = styled("img")({
  position: "absolute",
  top: 20,
  left: 20,
  width: "100px",
  opacity: 0.5,
});

const IllusContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 600,
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
  [theme.breakpoints.down("md")]: {
    width: 500,
  },
  marginBottom: 64,
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: -80,
  left: "50%",
  textShadow: "2px 2px white, -2px -2px white",
  transform: "translateX(-50%)",
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: 220,
  [theme.breakpoints.down("sm")]: {
    fontSize: 150,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 180,
  },
}));

const Illus = styled("img")({
  objectFit: "cover",
  width: "100%",
});

const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
});

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  alignItems: "center",
  fontSize: 24,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

export default function NotFound({ buttonText, link }) {
  const user = useSelector((state) => state.user.user);

  return (
    <Container sx={{ minHeight: user.id ? "100%" : "100vh" }}>
      {!user.id && <Logo alt="brisol" src={AppIcon} />}
      <IllusContainer>
        <ErrorTitle variant="h1">404</ErrorTitle>
        <Illus src={EmptyHolder} alt="not found"></Illus>
      </IllusContainer>
      <TextContainer>
        <Text>
          Sorry, but the page you are looking for
          <br />
          has not been found
        </Text>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          component={Link}
          size="large"
          to={link}
        >
          {buttonText}
        </Button>
      </TextContainer>
    </Container>
  );
}
