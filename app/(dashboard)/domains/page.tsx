import AxiosClient from '@/lib/client';
import { FC } from 'react'
import { Name } from "namejs"
interface pageProps {

}

async function getDomains() {

    const url = 'https://api.dev.name.com/v4';
    const client = new AxiosClient(url);
    const username = 'amrikee7-test';
    const token = '7c11f0089786eb2f54b63685c7c1e7aaac72f3c5';

    const data = {
        domainNames: ['albahith.org']
    };
    
    const headers = {
        'Authorization': `Bearer ${username}:${token}`
    };

    const response = await client.get("/domains", { headers })
    
    if (response.status === 200) {
        // The request was successful.
      } else {
        // The request failed.
        response.catch((error: any) => {
          console.log(error);
        });
      }
    return { response }
}

async function fetchDomains() {
    'use server';
    const url = 'https://api.dev.name.com/v4';
    const client = new AxiosClient(url);
    const username = 'amrikee7-test';
    const token = '7c11f0089786eb2f54b63685c7c1e7aaac72f3c5';
    try {
    //   const response = await client.get('/domains', {
    //     Authorization: `${Buffer.from(`${username}:${token}`)}`
    //   });
    const name = new Name(username, token);
      const domains = name.data.domains;
      console.log('Domain list:', name);
      return { domains };
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  }
  const username = 'amrikee7-test';
  const token = '7c11f0089786eb2f54b63685c7c1e7aaac72f3c5';
  const name = new Name(username, token);

const fetchData = async () => {
  try {
    const domains = await name.listDomains();
    console.log(domains);
  } catch (error) {
    console.error('Error fetching domains:', error);
  }
};

fetchData();

const Page = async () => {
    // const  domains = await fetchDomains();

    return (

        <div>
            {/* <button formAction={fetchDomains}>Fetch Domains</button> */}
            {/* {JSON.stringify(domains)} */}
        </div>
    )
}

export default Page