import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/user.service';
import { UserProps } from '@/types/user';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '@/types/page';
import Layout from '@/libs/common-layout/layout';
import { HOME_META_DATA } from '@/constants/meta-data';

const DynamicCustomerDetails = dynamic(() => import("./CustomerDetails"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicTopMeasurements = dynamic(() => import("./TopMeasurements"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicBottomMeasurements = dynamic(() => import("./BottomMeasurements"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicReviewCustomer = dynamic(() => import("./ReviewCustomer"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Home: NextPageWithLayout = () => {
  const { user, logout } = useAuth();
  const [key, setKey] = useState('customer');
  const [data, setData] = useState<UserProps | null>(null);
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    if (user?.emailID) {
      userService
        .dashboard({ emailID: user.emailID })
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleNext = () => {
    switch (key) {
      case "customer":
        setKey("top-measurements");
        break;
      case "top-measurements":
        setKey("bottom-measurements");
        break;
      case "bottom-measurements":
        setKey("review-customer");
        break;
      default:
        break;
    }
  };

  

  console.log(customerData, "customerData")

  return (
    <> 
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k:any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="customer" title="Customer Details">
          <DynamicCustomerDetails 
          setCustomerData={setCustomerData} 
          onNextClick={handleNext}
          />
        </Tab>
        <Tab eventKey="top-measurements" title="Top Measurements">
          <DynamicTopMeasurements 
          setCustomerData={setCustomerData} 
          onNextClick={handleNext}
          />
        </Tab>
        <Tab eventKey="bottom-measurements" title="Bottom Measurements">
          <DynamicBottomMeasurements 
          customerData={customerData} 
          onNextClick={handleNext}
          setCustomerData={setCustomerData} 
          />
        </Tab>
        <Tab eventKey="review-customer" title="Review">
          <DynamicReviewCustomer 
          customerData={customerData}
           />
        </Tab>
      </Tabs>
    </>
  );
};

Home.metadata=HOME_META_DATA
Home.getLayout = function getLayout(page){
  return <Layout>{page}</Layout>
}

export default Home;
