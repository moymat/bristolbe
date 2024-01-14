// Material UI import
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// open-source illustration from undraw.co
import OneBristol from "../../assets/img/createOneBristol.svg";
import myCollection from "../../assets/img/myCollection.svg";
import fileBundle from "../../assets/img/fileBundle.svg";
import TeamSpirit from "../../assets/img/teamSpirit.svg";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FlatContent = () => (
  <Box sx={{ mx: "10%", mt: 4, mb: 8 }}>
    <Item elevation={0}>
      <Typography variant="h2" component="div" gutterBottom>
        Bristol organise le savoir
      </Typography>
    </Item>
    <Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
      <img src={myCollection} alt="illustration of one bristol" width="100%" />
    </Item>
    <Item elevation={0}>
      <Typography variant="subtitle1" gutterBottom component="div">
        Bristol est un site web collaboratif où des membres peuvent rédiger et
        partager des fiches méthodologiques. Bristol peut être utilisé comme
        simple carnet de note personnelle autant que pour la réalisation de base
        documentaire collaborative complexe.
      </Typography>
    </Item>
    <Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
      <img
        src={OneBristol}
        alt="illustration of a woman on a folder files"
        width="100%"
      />
    </Item>
    <Item elevation={0}>
      <Typography variant="subtitle1" gutterBottom component="div">
        Bristol inclut un éditeur de texte ayant une interface intuitive qui
        permet à l'utilisateur de voir son document tel qu'il sera publié.
        Ajouter de la couleur, des liens, des images... Bristol permet une mise
        en forme sans limite de vos documents ! Et tout ça sans avoir à utiliser
        des commandes complexes.
      </Typography>
    </Item>
    <Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
      <img
        src={fileBundle}
        alt="illustration of a woman on a folder files"
        width="100%"
      />
    </Item>
    <Item elevation={0}>
      <Typography variant="subtitle1" gutterBottom component="div">
        De la même manière qu'un château LEGO est composée de nombreuses
        briques, notre connaissance est la synthèse de nombreuse brique de
        savoir. Ce principe est le fondement de notre application. Chaque
        Bristol peut être imbriqué dans d'autres bristols.
      </Typography>
    </Item>
    <Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
      <img
        src={TeamSpirit}
        alt="illustration of a woman on a folder files"
        width="100%"
      />
    </Item>
    <Item elevation={0}>
      <Typography variant="subtitle1" gutterBottom component="div">
        Parce que la connaissance est le fruit d'un partage, Bristol est une
        application qui connecte les personnes. Vous pouvez partager en lecture
        ou en édition vos collections de Bristol.
      </Typography>
    </Item>
  </Box>
);

export default FlatContent;
