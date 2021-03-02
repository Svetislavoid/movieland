import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// services
import {
  getSessionId,
  getAccountDetails
} from '@/services';

const Auth = () => {
  // history
  const history = useHistory();

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
          history.replace('/');
        });
      });
    }
  }, [history, search]);

  return <></>;
};

export default Auth;