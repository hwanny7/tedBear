import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/user';
import { useDispatch } from 'react-redux';

const SeungPage = () => {
  const queryParams = new URLSearchParams(document.location.search);
  const accessToken = queryParams.get('accessToken');
  const join = queryParams.get('join');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      dispatch(login());
      join === 'true' ? navigate('/level') : navigate('/home');
    }
  }, []);

  return <div></div>;
};

export default SeungPage;
