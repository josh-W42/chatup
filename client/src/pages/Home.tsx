import { Redirect } from "react-router-dom";

const Home = (): JSX.Element => {
  return <Redirect to="/auth/login" />;
};

export default Home;
