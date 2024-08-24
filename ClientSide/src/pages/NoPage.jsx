import React from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    // localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      UserName: name,
      image: imageUrl,
    };
    console.log(doc)
  };
  return (
    <GoogleOAuthProvider clientId="214256255395-rirnc4gi27cbi7jdbojlcom3mo98rq67.apps.googleusercontent.com">
            <div className="shadow-2xl">
              <GoogleLogin
                clientId={"214256255395-rirnc4gi27cbi7jdbojlcom3mo98rq67.apps.googleusercontent.com"}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with your Google
                    Account
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </GoogleOAuthProvider>
  )
}

export default NoPage