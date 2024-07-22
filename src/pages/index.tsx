import { useEffect, useState } from 'react';
import { getDataProps } from '@/types/data';
import { dataService } from '@/services';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {

  const [data, setData] = useState<getDataProps[]>([]);

  useEffect(() => {
    dataService
      .getAll()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(data, "data");

  return (
    <>
      {data.length > 0 && (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>ID: {index}</p>
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
