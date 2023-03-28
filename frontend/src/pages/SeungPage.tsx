import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/user';
import { useDispatch } from 'react-redux';

const SeungPage = () => {
  const queryParams = new URLSearchParams(document.location.search);
  const accessToken = queryParams.get('accessToken');
  const refreshToken = queryParams.get('accessToken');
  const join = queryParams.get('join');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(login());
      join ? navigate('/home') : navigate('level');
    }
  }, []);

  return (
    <div
      style={{
        background: 'red',
        width: '50vw',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'black',
          width: '50%',
          height: '50%',
          marginTop: '5%',
          marginBottom: '5%',
          border: '1px solid white',
        }}
      ></div>
      <div
        style={{
          background: 'black',
          width: '50%',
          height: '50%',
          border: '1px solid white',
          marginBottom: '5%',
        }}
      ></div>
    </div>
  );
};

export default SeungPage;
