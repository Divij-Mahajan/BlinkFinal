import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const API_URL = 'https://sublinks.onrender.com';

export const Home = () => {
  const [ blinks, setBlinks ] = useState([]);
  
  const fetchBlinks = async () => {
    try {
      // TODO: Fetch blinks from the API
      const response = await axios.get(`${API_URL}/blinks/all`);
      const data = response.data;
      console.log('Blinks:', data);
      setBlinks(data);
    } catch (error) {
      console.error('Error fetching blinks:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchBlinks();
  }, []);

  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar/>
      </div>

      <div className="w-full h-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
        <div className="flex gap-4 mb-5">
          <div className="bg-white flex flex-col gap-1 border-gray-200 border  w-full rounded-lg px-5 p-3">
            <h1 className="text-lg font-semibold text-gray-400">Total Revenue</h1>
            <p className="text-4xl font-bold text-gray-600">$400</p>
          </div>
          <div className="bg-white flex flex-col gap-1 border-gray-200 border  w-full rounded-lg px-5 p-3">
            <h1 className="text-lg font-semibold text-gray-400">Avg Engagement</h1>
            <p className="text-4xl font-bold text-gray-600">400</p>
          </div>
          <div className="bg-white flex flex-col gap-1 border-gray-200 border  w-full rounded-lg px-5 p-3">
            <h1 className="text-lg font-semibold text-gray-400">No. of Subscribers</h1>
            <p className="text-4xl font-bold text-gray-600">400</p>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">Your Sublinks</h2>
          <Button className="px-8">Create</Button>
        </div>
        {/* <p className="text-[14px]">Here are the latest blinks from the community.</p> */}
        <div className="grid sm:grid-cols-2 gap-10">
          {
            blinks.map((item) => (
              <BlinkCard key={item._id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const BlinkCard = ({item}) => {
  return (
    <Card key={item._id} className="flex flex-col shadow-none">
      <CardHeader>
      {/* {false ? item.premiumTitle : item.title} */}
        <CardTitle className="flex flex-col ">
            <h1 className="text-lg">{item.premiumTitle}</h1>
            <h3 className="text-md text-gray-300">{item.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <img
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-gray-600 mt-2">Normal Image</p>
          </div>
          <div className="flex-1">
            <img
              src={item.premiumImage}
              alt={item.premiumTitle}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-gray-600 mt-2">Premium Image</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 v </div>
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 e </div>
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 p </div>
        </div>
      </CardContent>
    </Card>
  )
}
{/* <p>{true ? item.premiumContent : item.content}</p>
<p>${item.price}</p>
{/* <p>{item.type}</p> 
<p>Revenue: ${item.revenue}</p>
{/* <p>Creator ID: {item.creator}</p> */}
{/* <p>Subscribers: {item.subscribers.length}</p> 
<p>Impressions: {item.impressionCount}</p>
<p>Engagements: {item.engagementCount}</p>
<p>Payments: {item.paymentCount}</p>
<p>Created: {new Date(item.createdAt).toLocaleString()}</p>
<p>Updated: {new Date(item.updatedAt).toLocaleString()}</p> */}