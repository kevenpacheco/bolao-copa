import {useContext} from 'react'

import {AuthContext, AuthProvider, AuthContextDataProps} from '../contexts/AuthContext';

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext);
  return context;
}