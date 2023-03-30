import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/user';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const SeungPage = () => {
  const queryParams = new URLSearchParams(document.location.search);
  const accessToken = queryParams.get('accessToken');
  const refreshToken = queryParams.get('refreshToken');
  const join = queryParams.get('join');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['refreshToken']);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      setCookie('refreshToken', refreshToken, { path: '/' });
      // localStorage.setItem('refreshToken', refreshToken);
      dispatch(login());
      join ? navigate('/home') : navigate('level');
    }
  }, []);

  return <div></div>;
};

export default SeungPage;
