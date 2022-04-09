import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const UserAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();
  const [UID, setUID] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [jobCode, setJobCode] = useState();
  const [permissions, setPermissions] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [preferredName, setPreferredName] = useState();

  const login = useCallback(
    (
      uid,
      token,
      expiration,
      email,
      firstName,
      lastName,
      imageUrl,
      jobCode,
      permissions,
      phoneNumber,
      preferredName
    ) => {
      setToken(token);
      setUID(uid);
      setEmail(email);
      setFirstName(firstName);
      setLastName(lastName);
      setImageUrl(imageUrl);
      setJobCode(jobCode);
      setPermissions(permissions);
      setPhoneNumber(phoneNumber);
      setPreferredName(preferredName);
      if (!expiration) {
        expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
        setTokenExpiration(expiration);
      } else {
        setTokenExpiration(expiration);
      }
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: expiration.toISOString(),
          email,
          firstName,
          lastName,
          imageUrl,
          jobCode,
          permissions,
          phoneNumber,
          preferredName,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setUID(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      logoutTimer = setTimeout(
        logout,
        tokenExpiration.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      //checks if token expired
      login(
        userData.userId,
        userData.token,
        new Date(userData.expiration),
        userData.email,
        userData.firstName,
        userData.lastName,
        userData.imageUrl,
        userData.jobCode,
        userData.permissions,
        userData.phoneNumber,
        userData.preferredName
      );
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    UID,
    email,
    firstName,
    lastName,
    imageUrl,
    jobCode,
    permissions,
    phoneNumber,
    preferredName,
  };
};
