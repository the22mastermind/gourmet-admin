import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthState';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  return (
    <CustomDrawer auth={auth} />
  );
};

export default Dashboard;
