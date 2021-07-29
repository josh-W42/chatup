import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import SearchBar from "../SearchBar";

const ChatSearchCard = (): JSX.Element => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
          Search For More Chats!
        </Typography>
        <SearchBar />
      </CardContent>
    </Card>
  );
};

export default ChatSearchCard;
