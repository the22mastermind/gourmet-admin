import React, { useContext, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CustomTable from '../../components/CustomTable/CustomTable';
import Loader from '../../components/Loader/Loader';
import Title from '../../components/Title/Title';
import { DataContext } from '../../context/DataState';
import { AlertContext } from '../../context/AlertState';
import { getService } from '../../utils/api';

const OrdersListPage = () => {
  const [loading, setLoading] = useState(true);
  const { showAlert } = useContext(AlertContext);
  const { ordersList, getAllOrders } = useContext(DataContext);
  const tableHeadings = [
    { id: 1, name: 'Order number' },
    { id: 2, name: 'Date' },
    { id: 3, name: 'Customer' },
    { id: 4, name: 'Amount' },
    { id: 5, name: 'PaymentId' },
    { id: 6, name: 'Status' },
    { id: 7, name: 'Details' },
  ];
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    const fetchOrdersList = async () => {
      const { status, data, error } = await getService('/api/admin/orders');
      if (status === 200) {
        await getAllOrders(data.data);
      } else {
        await getAllOrders([]);
        showAlert({
          type: 'error',
          text: error,
        });
      }
      setLoading(false);
    };
    fetchOrdersList();
  }, []);

  return loading ? (
    <div className="page-wrapper">
      <Loader color="secondary" />
    </div>
  ) : (
    <animated.div style={props}>
      <div className="page-title">
        <Title
          variant="h4"
          text="Orders list"
          align="left"
          color="secondary"
          gutterBottom
        />
      </div>
      <CustomTable
        tableHeadings={tableHeadings}
        data={ordersList}
      />
    </animated.div>
  );
};

export default OrdersListPage;
