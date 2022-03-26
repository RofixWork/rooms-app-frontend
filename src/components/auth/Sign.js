import Container from "@mui/material/Container";
import {useAuth0} from '@auth0/auth0-react'
const urlImage = `/images/auth.png`;

const Sign = () => {
  const {loginWithRedirect} = useAuth0()
  return (
    <section className="min-h-screen grid place-items-center">
      <Container maxWidth="xs">
        <div className="h-[350px] border border-gray-200 shadow-md rounded-sm flex flex-col items-center justify-around px-4 sm:px-6 bg-white">
          <div className="w-[200px] h-[200px] ">
            <img
              src={urlImage}
              alt="logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-y-4 w-full">
            <button className="blozck px-4 py-2 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500 transition-colors text-white rounded-sm focus:outline-none w-full uppercase font-semibold" onClick={() => loginWithRedirect()}>
              Sign in
            </button>
            <button className="block px-4 py-2 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 transition-colors text-white rounded-sm focus:outline-none w-full uppercase font-semibold" onClick={() => loginWithRedirect({
  screen_hint: "signup",
})}>
              Register
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Sign;
