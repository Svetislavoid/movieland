import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// services & store
import {
  getSessionId,
  getAccountDetails
} from '@/services';
import { Context } from '@/store/store';

const Auth = () => {
  // history
  const history = useHistory();

  // Context
  const [, dispatch] = useContext(Context);

  // component variables
  const { search } = useLocation();

  useEffect(() => {
    const requestToken = new URLSearchParams(search).get('request_token');
    const denied = new URLSearchParams(search).get('denied');

    if (denied) {
      history.replace('/');
    } else {
      getSessionId(requestToken).then((response) => {
        const { session_id } = response.data;

        localStorage.setItem('sessionId', session_id);

        getAccountDetails(session_id).then((response) => {
          const { id } = response.data;

          localStorage.setItem('accountId', id);

          dispatch({
            type: 'SET_LOGGED_IN',
            payload: true
          });

          history.replace('/');
        });
      });
    }
  }, [history, dispatch, search]);

  return <></>;
};

export default Auth;